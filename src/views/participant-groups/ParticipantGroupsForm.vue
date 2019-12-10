<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
        <template>
          <FormMainData :participantGroup="participantGroup" @childSubmit="submit" ref="FormMainData"
                        :key="$route.params.tab+'FormMainData'" v-if="$route.params.tab === 'main-data'"/>
          <!--        Component for ParticipantEntity   -->
          <FormParticipants :participantGroup="participantGroup" :isValidForm="isValidForm" @childSubmit="submit"
                            ref="FormParticipants"
                            :key="$route.params.tab+'FormParticipants'" v-if="$route.params.tab === 'participants'"/>
          <!--        Component for todo Entity isValidForm for ALL  -->
          <FormActivities :participantGroup="participantGroup" @childSubmit="submit" ref="FormActivities"
                          :key="$route.params.tab+'FormActivities'" v-if="$route.params.tab === 'activities'"/>
          <!--        Component for todo Entity   -->
          <FormCalendar :participantGroup="participantGroup" @childSubmit="submit" ref="FormCalendar"
                        :key="$route.params.tab+'FormCalendar'" v-if="$route.params.tab === 'calendar'"/>
          <!--        Component for todo Entity   -->
          <FormFrequency :participantGroup="participantGroup" @childSubmit="submit" ref="FormFrequency"
                         :key="$route.params.tab+'FormFrequency'" v-if="$route.params.tab === 'frequency'"/>
          <!--        Component for todo Entity   -->
          <FormMTSF :participantGroup="participantGroup" @childSubmit="submit" ref="FormMTSF"
                    :key="$route.params.tab+'FormMTSF'" v-if="$route.params.tab === 'mtsf'"/>
        </template>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import TabLinks from '@/components/TabLinks'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormParticipants from '@/views/participant-groups/components/FormParticipants'
  import FormMainData from '@/views/participant-groups/components/FormMainData'
  import FormActivities from '@/views/participant-groups/components/FormActivities'
  import FormCalendar from '@/views/schools-and-clubs/components/FormCalendar'
  import FormFrequency from '@/views/schools-and-clubs/components/FormFrequency'
  import FormMTSF from '@/views/participant-groups/components/FormMTSF'

  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'ParticipantGroupsForm',
    components: {
      TabLinks,
      Treeselect,
      FormMainData,
      FormParticipants,
      FormActivities,
      FormCalendar,
      FormFrequency,
      FormMTSF
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'participant.group',
            tab: 'main-data'
          },
          {
            title: 'Zawodnicy',
            link: 'participant.group',
            tab: 'participants',
            method: 'checkValidMainForm'
          }
        ],

        // todo maybe
        participantGroup: {
          active: 1,
          title: '',
          sex: 1,
          discipline: {
            id: null
          },
          class: {
            id: null
          },
          lessonCategory: {
            id: null
          },
          participants: [],

          years: [],

          // checkbox
          selectedGender: [],
          selectedType: [],

          genderOptions: [
            { text: 'kobieta', value: 0 },
            { text: 'mężczyzna', value: 1 }
          ]
        },

        isValidForm: false
      }
    },
    computed: {},
    methods: {
      checkValidMainForm () {
        this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            this.isValidForm = result
          })
      },
      // addParticipant (participantDefault) {
      //   // let copy = {...participantDefault}
      //   this.participantGroup.participants.push(participantDefault)
      // },
      addParticipant () {
        this.participantGroup.participants.push({})
      },
      removeParticipant (index) {
        this.participantGroup.participants.splice(index, 1)
      },
      submit () {
        let participantGroup = {...this.participantGroup}
        console.log(this.participantGroup)

        const method = this.id === undefined ? 'postParticipantGroup' : 'putParticipantGroup'
        this.$store.dispatch(method, participantGroup)
          .then(() => {
            this.postSubmitRedirect('participant.groups')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      goToFormTab (tabName, params = {}) {
        this.checkValidMainForm()
        let defaultParams = { ...{ 'tab': tabName, 'id': this.id }, ...params }
        this.$router.push({ name: 'participant.group', params: defaultParams })
      }
    },
    created () {
      // init participantGroup
      // this.participantGroup = Object.assign(this.participantGroup, this.$store.getters.participantGroup(this.id))

      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'participant.group', params: { 'tab': 'main-data' } })
      }

      // from data todo in participant
      if (this.id) {
        this.$store.dispatch('getParticipantGroup', { id: this.id })
          .then((response) => {
            this.participantGroup = response

            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'participant.group',
                tab: 'main-data'
              },
              {
                title: 'Zawodnicy',
                link: 'participant.group',
                tab: 'participants',
                method: 'checkValidMainForm'
              },
              {
                title: 'Zajęcia',
                link: 'participant.group',
                tab: 'activities'
              },
              {
                title: 'Kalendarz',
                link: 'participant.group',
                tab: 'calendar'
              },
              {
                title: 'Frekwencja',
                link: 'participant.group',
                tab: 'frequency'
              },
              {
                title: 'MTSF',
                link: 'participant.group',
                tab: 'mtsf'
              }
            ]
          })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      let breadcrumbs = [
        { text: 'Lista zawodników', to: { name: 'participant.groups' } },
        { text: this.id ? this.participantGroup.name : 'Nowa', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
