<template>
  <div class="container">
    <b-row class="justify-content-center" >
    <b-col cols="12">
    <TabLinks :links="tabLinks"/>
      {{isValidForm}}
    </b-col>
    </b-row>

          <FormMainData :lesson="lesson" :isValidForm="isValidForm" @childSubmit="submit" ref="FormMainData"
                        :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
          <!--      Component for Objects    -->
          <FormObjects :lesson="lesson" :isValidForm="isValidForm" @childSubmit="submit" ref="FormObjects"
                       :key="$route.params.tab+'FormObjects'" v-show="$route.params.tab === 'objects'"/>
          <FormParticipantGroupsList :lesson="lesson" :isValidForm="isValidForm" @childSubmit="submit" ref="FormParticipantGroupsList"
                       :key="$route.params.tab+'FormParticipantGroupsList'" v-show="$route.params.tab === 'participants-list'"/>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormMainData from '@/views/lessons/components/FormMainData'
  import FormObjects from '@/views/lessons/components/FormObjects'
  import FormParticipantGroupsList from '@/views/lessons/components/FormParticipantGroupsList'

  export default {
    name: 'LessonForm',
    components: {
      TabLinks,
      Treeselect,
      FormMainData,
      FormObjects,
      FormParticipantGroupsList
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'lesson',
            tab: 'main-data'
          },
          {
            title: 'Obiekty',
            link: 'lesson',
            tab: 'objects',
            method: 'checkValidMainForm'
          },
          {
            title: 'Lista Zawodników',
            link: 'lesson',
            tab: 'participant-group-list'
          },
          {
            title: 'Kalendarz',
            link: 'lesson',
            tab: 'calendar'
          }
        ],
        lesson: {
          active: true,
          sex: true,
          title: '',
          leader: {
            id: null
          },
          discipline: {
            id: null
          },
          lessonCategory: {
            id: null
          },
          class: {
            id: null
          },
          schoolsOrClubs: {
            id: null,
            type: null
          },
          places: [],
          participantGroups: []
        },

        isValidForm: false
      }
    },
    methods: {
      checkValidMainForm () {
        this.$refs.FormMainData.checkValidForm()
          .then((result) => {
            this.isValidForm = result
          })
      },
      submit () {
        let lesson = {...this.lesson}

        const method = this.id === undefined ? 'postLesson' : 'putLesson'
        this.$store.dispatch(method, lesson)
          .then(() => {
            this.postSubmitRedirect('lessons')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      goToFormTab (tabName, params = {}) {
        this.checkValidMainForm()
        let defaultParams = { ...{ 'tab': tabName, 'id': this.id }, ...params }
        this.$router.push({ name: 'lesson', params: defaultParams })
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'lesson', params: {'tab': 'main-data'} })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      let breadcrumbs = [
        { text: 'Lista zajęć', to: { name: 'lessons' } },
        { text: 'Nowa', active: true }
      ]
      console.log(breadcrumbs)
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getLesson', { id: this.id })
          .then((response) => {
            this.lesson = response

            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'lesson',
                tab: 'main-data'
              },
              {
                title: 'Obiekty',
                link: 'lesson',
                tab: 'objects',
                method: 'checkValidMainForm'
              },
              {
                title: 'Lista Zawodników',
                link: 'lesson',
                tab: 'participants-list'
              },
              {
                title: 'Zawodnicy',
                link: 'lesson',
                tab: 'participants'
              },
              {
                title: 'Kalendarz',
                link: 'lesson',
                tab: 'calendar'
              },
              {
                title: 'Frekwencja',
                link: 'lesson',
                tab: 'frequency'
              },
              {
                title: 'MTSF',
                link: 'lesson',
                tab: 'MTSF'
              }
            ]

            let breadcrumbs = [
              { text: 'Lista zajęć', to: { name: 'lessons' } },
              { text: response.title, active: true }
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
