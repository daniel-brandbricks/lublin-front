<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks v-if="$route.params.tab !== 'clone'" :links="tabLinks"/>
        <template>
          <FormMainData :participantGroup="participantGroup" @childSubmit="submit" ref="FormMainData"
                        :key="$route.params.tab+'FormMainData'" v-if="$route.params.tab === 'main-data'"/>
          <FormClone :participantGroup="participantGroup" @childSubmit="submit" ref="FormClone"
                     :key="$route.params.tab+'FormClone'" v-if="$route.params.tab === 'clone'"/>
          <!--        Component for ParticipantEntity   -->
          <FormParticipants :participantGroup="participantGroup" :isValidForm="isValidForm" @childSubmit="submit"
                            ref="FormParticipants" :participantYearsSelected="participantYearsSelected"
                            :key="$route.params.tab+'FormParticipants'"
                            v-if="dbParticipants.length < 1 && $route.params.tab === 'participants'"/>

          <ListParticipants :participantGroup="participantGroup" :isValidForm="isValidForm" ref="ListParticipants"
                            :key="$route.params.tab+'ListParticipants'+dbParticipants.length"
                            v-if="participantGroup.id && dbParticipants.length > 0
                            && $route.params.tab === 'participants' && participantGroup.school && participantGroup.school.id"/>

          <!--        Component for todo Entity isValidForm for ALL  -->
          <FormLessons :participantGroup="participantGroup" @childSubmit="submit" ref="FormLessons"
                       :key="$route.params.tab+'FormLessons'" v-if="$route.params.tab === 'lessons'"/>
          <!--        Component for todo Entity   -->
          <FormCalendar :participantGroup="participantGroup.id" @childSubmit="submit" ref="FormCalendar"
                        :key="$route.params.tab+'FormCalendar'" v-if="participantGroup.id && $route.params.tab === 'calendar'"/>
          <!--        Component for todo Entity   -->
          <!--          <FormFrequency :participantGroup="participantGroup" @childSubmit="submit" ref="FormFrequency"-->
          <!--                         :key="$route.params.tab+'FormFrequency'" v-show="$route.params.tab === 'frequency'"/>-->
          <!--        Component for todo Entity   -->
          <FormMTSF :participantGroup="participantGroup" @childSubmit="submit" ref="FormMTSF"
                    :key="$route.params.tab+'FormMTSF'" v-if="$route.params.tab === 'mtsf'"/>
        </template>
      </b-col>
    </b-row>

    <b-modal ref="loadingModal" centered hide-header hide-header-close
             hide-footer size="lg">
      <h3 class="text-center">Trwa ladowanie...</h3>
    </b-modal>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormParticipants from '@/views/participant-groups/components/FormParticipants'
  import FormMainData from '@/views/participant-groups/components/FormMainData'
  import FormLessons from '@/views/participant-groups/components/FormLessons'
  import FormCalendar from '@/views/schools-and-clubs/components/FormCalendar'
  import FormFrequency from '@/views/schools-and-clubs/components/FormFrequency'
  import FormMTSF from '@/views/participant-groups/components/FormMTSF'
  import ListParticipants from '@/views/participant-groups/components/ListParticipants'

  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import FormClone from "@/views/participant-groups/components/FormClone";

  export default {
    name: 'ParticipantGroupsForm',
    components: {
      FormClone,
      ListParticipants,
      TabLinks,
      Treeselect,
      FormMainData,
      FormParticipants,
      FormLessons,
      FormCalendar,
      FormFrequency,
      FormMTSF
    },
    mixins: [EventBusEmit, FormMixin],
    data() {
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
            method: 'checkValidMainForm',
            methodParams: 'participants'
          }
        ],

        participantGroup: {
          active: true,
          title: '',
          sex: [0, 1],
          discipline: {
            id: null
          },
          class: {
            id: null
          },
          season: {
            id: null
          },
          lessonCategory: {
            id: null
          },
          participants: [],
          school: {
            id: null
          },
          leader: {
            id: null
          },
          lessons: []
        },

        participantYearsSelected: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
        ],

        isValidForm: false,
        dbSchoolId: null,
        dbParticipants: []
      }
    },
    computed: {
      isLoading () {
        return this.$store.getters.isLoading
      }
    },
    watch: {
      isLoading: function (val) {
        if (val) {
          this.$refs.loadingModal.show()
        } else {
          this.$refs.loadingModal.hide()
          this.$bvToast.toast('Ilość wyników przy wygenerowaniu MTSF zależy od uprawnień, które masz w szkołach / klubach lub wybranej filtracji.', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-right',
            solid: true,
            variant: 'info',
            appendToast: false,
            autoHideDelay: 20000
          })
        }
      }
    },
    methods: {
      clearParticipants(schoolId) {
        if (parseInt(schoolId) !== this.dbSchoolId) {
          this.participantGroup.participants = []
          this.participantYearsSelected = []
        }

        if (this.dbSchoolId !== null) this.dbSchoolId = null
      },
      setDataFromExistedParticipantGroup(participantGroup) {
        this.dbSchoolId = participantGroup.school.id
        this.dbParticipants = JSON.parse(JSON.stringify(participantGroup.participants))

        let participants = participantGroup.participants || []
        for (let index in participants) {
          console.log(participants[index])
          this.participantYearsSelected.push({year: participants[index].year})
        }
      },
      prepareParticipantGroupToSubmit(participantGroup) {
        let participants = participantGroup.participants || []
        let preparedParticipants = []
        for (let index in participants) {
          preparedParticipants.push(participants[index].id)
        }

        participantGroup.participants = preparedParticipants
      },
      checkValidMainForm(params) {
        if (this.$route.params.tab === 'main-data') {
          return this.$refs.FormMainData.checkValidForm()
            .then((result) => {
              this.isValidForm = result
              if (result) {
                this.$router.push({
                  name: 'participant.group',
                  params: {'tab': params, id: this.id}
                })
              }
            })
        } else {
          return new Promise((resolve, reject) => {
            this.$router.push({
              name: 'participant.group',
              params: {'tab': params, id: this.id}
            })
          })
        }
      },
      addParticipant() {
        this.participantGroup.participants.push({id: null})
        this.participantYearsSelected.push({year: null})
      },
      // addParticipant () {
      //   this.participantGroup.participants.push({})
      // },
      removeParticipant(index) {
        this.participantGroup.participants.splice(index, 1)
        this.participantYearsSelected.splice(index, 1)
      },
      submit() {
        let participantGroup = {...this.participantGroup}
        console.log(this.participantGroup)

        this.prepareParticipantGroupToSubmit(participantGroup)
        const method = this.id === undefined ? 'postParticipantGroup' : 'putParticipantGroup'
        this.$store.dispatch(method, participantGroup)
          .then(() => {
            this.postSubmitRedirect('participant.groups')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      goToFormTab(tabName, params = {}) {
        this.checkValidMainForm(tabName)
        // let defaultParams = { ...{ 'tab': tabName, 'id': this.id }, ...params }
        // this.$router.push({ name: 'participant.group', params: defaultParams })
      },
      changeParticipantStatusInList(params) {
        this.$store.dispatch('changeParticipantStatusInList', {
          listId: this.id,
          participantId: params.id,
          status: params.status
        }).then((response) => {
          console.log(response)
          this.participantGroup = response
          this.setDataFromExistedParticipantGroup(response)
        })
      },
      refreshParticipantGroup() {
        this.$store.dispatch('getParticipantGroup', {id: this.id})
          .then((response) => {
            console.log(response)
            this.participantGroup = response
            this.setDataFromExistedParticipantGroup(response)
          })
      }
    },
    created() {
      // init participantGroup
      // this.participantGroup = Object.assign(this.participantGroup, this.$store.getters.participantGroup(this.id))

      if (this.$route.params.tab === undefined) {
        this.$router.push({name: 'participant.group', params: {'tab': 'main-data'}})
      }

      let breadcrumbs = [
        {text: 'Lista zawodników', to: {name: 'participant.groups'}},
        {text: 'Nowa', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getParticipantGroup', {id: this.id})
          .then((response) => {
            console.log(response)
            this.participantGroup = response
            if (response.season === null) this.participantGroup.season = {id: null}
            if (response.leader === null) this.participantGroup.leader = {id: null}
            this.setDataFromExistedParticipantGroup(response)

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
                method: 'checkValidMainForm',
                methodParams: 'participants'
              },
              {
                title: 'Zajęcia',
                link: 'participant.group',
                tab: 'lessons',
                // method: 'checkValidMainForm',
                // methodParams: 'lessons'
              },
              {
                title: 'Kalendarz',
                link: 'participant.group',
                tab: 'calendar',
                // method: 'checkValidMainForm',
                // methodParams: 'calendar'
              },
              // {
              //   title: 'Frekwencja',
              //   link: 'participant.group',
              //   tab: 'frequency',
              //   method: 'checkValidMainForm',
              //   methodParams: 'frequency'
              // },
              {
                title: 'MTSF',
                link: 'participant.group',
                tab: 'mtsf',
                // method: 'checkValidMainForm',
                // methodParams: 'mtsf'
              }
            ]

            let breadcrumbs = [
              {text: 'Lista zawodników', to: {name: 'participant.groups'}},
              {text: response.title, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
