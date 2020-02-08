<template>
  <div class="container">
        <TabLinks :links="tabLinks"/>
    <template>
      <FormMainData :lesson="lesson" @submit="submit" ref="main-data"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
      <!--      Component for Objects    -->
      <FormObjects :lesson="lesson" @submit="submit" ref="objects" v-if="undefined === lesson.sportObjects ||
       lesson.sportObjects.length < 1"
                   :key="$route.params.tab+'FormObjects'" v-show="$route.params.tab === 'objects'"/>
      <ListObjects :lesson="lesson" ref="objects" v-else
                   :key="$route.params.tab+'ListObjects'" v-show="$route.params.tab === 'objects'"/>

      <FormParticipantGroupsList :lesson="lesson" :isValidForm="isValidForm" @submit="submit"
                                 ref="participants-list"
                                 :key="$route.params.tab+'FormParticipantGroupsList'"
                                 v-show="$route.params.tab === 'participants-list'"/>
    </template>
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
  import ListObjects from '@/views/lessons/components/ListObjects'
  import FormParticipantGroupsList from '@/views/lessons/components/FormParticipantGroupsList'

  import { mapGetters } from 'vuex'

  export default {
    name: 'LessonForm',
    components: {
      TabLinks,
      Treeselect,
      FormMainData,
      FormObjects,
      ListObjects,
      FormParticipantGroupsList
    },
    mixins: [EventBusEmit, FormMixin],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'lesson',
            tab: 'main-data',
            method: 'changeTab',
            methodParams: 'main-data'
          },
          // {
          //   title: 'Obiekty',
          //   link: 'lesson',
          //   tab: 'objects',
          //   method: 'changeTab',
          //   methodParams: 'objects'
          // },
          {
            title: 'Lista Zawodników',
            link: 'lesson',
            tab: 'participant-group-list',
            method: 'changeTab',
            methodParams: 'participant-group-list'
          },
          {
            title: 'Kalendarz',
            link: 'lesson',
            tab: 'calendar',
            method: 'changeTab',
            methodParams: 'calendar'
          }
        ],

        lesson: {
          // todo 09.02.2020 repetition, dates than POST PUT GET DELETE lessons
          repetition: null,
          date: null,
          timeRange: [],
          active: true,
          sex: 1,
          title: '',
          school: {
            id: null
          },
          place: {
            id: null
          },
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
          // sportObjects: [],
          // participantGroups: []
        },

        // schoolIds: [],

        isValidForm: false
      }
    },
    computed: {
      ...mapGetters([ 'lessonSportObjects' ])
    },
    methods: {
      changeTab (tabToRedirect) {
        console.log(tabToRedirect)
        return new Promise((resolve, reject) => {
          return this.$refs[this.$route.params.tab].$validator.validateScopes()
            .then(response => {
              if (response === false) {
                resolve(false)
                return
              }

              this.$refs[this.$route.params.tab].submit(tabToRedirect)
              resolve(response)
            })
            .catch(e => reject(e))
        })
      },
      submit (lesson, tabToRedirect) {
        if (undefined === lesson) lesson = this.lesson

        const method = this.id === undefined ? 'postLesson' : 'putLesson'
        this.$store.dispatch(method, lesson)
          // .then((response) => {
          //   this.prepareLesson(response)
          //   if (tabToRedirect) {
          //     this.$router.push({ name: 'lesson', params: { 'tab': tabToRedirect, 'id': response.id } })
          //   }
          // })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      prepareLesson (lesson) {
        // let leaderIds = []
        // for (let leaderIndex in lesson.leaders) {
        //   leaderIds.push(lesson.leaders[leaderIndex].id)
        // }
        // lesson.leaders = leaderIds
        this.lesson = lesson
      },
      goToFormTab (tabName, params = {}) {
        this.checkValidMainForm()
        let defaultParams = {...{'tab': tabName, 'id': this.id}, ...params}
        this.$router.push({name: 'lesson', params: defaultParams})
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({name: 'lesson', params: {'tab': 'main-data'}})
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      let breadcrumbs = [
        {text: 'Lista zajęć', to: {name: 'lessons'}},
        {text: 'Nowa', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getLesson', {id: this.id})
          .then((response) => {
            this.prepareLesson(response)
            // this.lesson = response

            this.tabLinks = [
              {
                title: 'Dane ogólne',
                link: 'lesson',
                tab: 'main-data',
                method: 'changeTab',
                methodParams: 'main-data'
              },
              // {
              //   title: 'Obiekty',
              //   link: 'lesson',
              //   tab: 'objects',
              //   method: 'changeTab',
              //   methodParams: 'objects'
              // },
              {
                title: 'Lista Zawodników',
                link: 'lesson',
                tab: 'participants-list',
                method: 'changeTab',
                methodParams: 'participants-list'
              },
              {
                title: 'Zawodnicy',
                link: 'lesson',
                tab: 'participants',
                method: 'changeTab',
                methodParams: 'participants'
              },
              {
                title: 'Kalendarz',
                link: 'lesson',
                tab: 'calendar',
                method: 'changeTab',
                methodParams: 'calendar'
              },
              {
                title: 'Frekwencja',
                link: 'lesson',
                tab: 'frequency',
                method: 'changeTab',
                methodParams: 'frequency'
              },
              {
                title: 'MTSF',
                link: 'lesson',
                tab: 'MTSF',
                method: 'changeTab',
                methodParams: 'MTSF'
              }
            ]

            let breadcrumbs = [
              {text: 'Lista zajęć', to: {name: 'lessons'}},
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
