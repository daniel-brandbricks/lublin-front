<template>
  <div class="container">
    <TabLinks :links="tabLinks"/>
    <template>
      <FormMainData :lesson="lesson" @submit="submit" ref="main-data"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
      <!--      Component for Objects    -->
      <!--      <FormObjects :lesson="lesson" @submit="submit" ref="objects" v-if="undefined === lesson.sportObjects ||-->
      <!--       lesson.sportObjects.length < 1"-->
      <!--                   :key="$route.params.tab+'FormObjects'" v-show="$route.params.tab === 'objects'"/>-->
      <!--      <ListObjects :lesson="lesson" ref="objects" v-else-->
      <!--                   :key="$route.params.tab+'ListObjects'" v-show="$route.params.tab === 'objects'"/>-->

      <FormParticipantGroupsList :lesson="lesson" :isValidForm="isValidForm" @submit="submit"
                                 ref="participants-list"
                                 :key="$route.params.tab+'FormParticipantGroupsList'"
                                 v-if="$route.params.tab === 'participants-list'"/>
      <FormParticipants :lesson="lesson" ref="participants" :key="$route.params.tab+'FormParticipants'"
                        v-if="$route.params.tab === 'participants'"/>
      <FormFrequency :lesson-id="lesson.id" ref="frequency" :key="$route.params.tab+'Formfrequency'"
                     v-if="$route.params.tab === 'frequency' && lesson && lesson.id"/>
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
  import FormParticipants from '@/views/lessons/components/FormParticipants'
  import FormFrequency from '@/views/lessons/components/FormFrequency'

  import {mapGetters} from 'vuex'

  export default {
    name: 'LessonForm',
    components: {
      TabLinks,
      Treeselect,
      FormMainData,
      FormObjects,
      ListObjects,
      FormParticipants,
      FormFrequency,
      FormParticipantGroupsList
    },
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'lesson',
            tab: 'main-data',
            method: 'changeTab',
            methodParams: 'main-data'
          }
        ],

        lesson: {
          repetition: null,
          date: null,
          newDate: null,
          timeRange: [],
          newTimeRange: [],
          active: true,
          canceled: false,
          replaced: false,
          sex: [0, 1],
          title: '',
          participantGroup: {
            id: null
          },
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
          replacementLeaders: []
          // participantGroups: []
        },

        // schoolIds: [],

        isValidForm: false
      }
    },
    computed: {
      ...mapGetters(['lessonSportObjects'])
    },
    methods: {
      changeTab(tabToRedirect) {
        console.log(tabToRedirect)
        return new Promise((resolve, reject) => {
          return this.$refs[this.$route.params.tab].$validator.validateScopes()
            .then(response => {
              if (response === false) {
                resolve(false)
                return
              }

              // this.$refs[this.$route.params.tab].submit(tabToRedirect)
              this.$router.push({name: 'lesson', params: {'tab': tabToRedirect, 'id': this.id}})
              resolve(response)
            })
            .catch(e => reject(e))
        })
      },
      submit(lesson, tabToRedirect) {
        if (undefined === lesson) lesson = this.lesson

        const method = this.id === undefined ? 'postLesson' : 'putLesson'

        if (this.id === undefined) {
          delete lesson.newDate
          delete lesson.newTimeRange
        }

        this.$store.dispatch(method, lesson)
          .then((response) => {
            this.$router.push({name: 'lessons', params: {filters: this.$route.params.filters}})
          })
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
      prepareLesson(lesson) {
        // let leaderIds = []
        // for (let leaderIndex in lesson.leaders) {
        //   leaderIds.push(lesson.leaders[leaderIndex].id)
        // }
        // lesson.leaders = leaderIds
        this.lesson = lesson
        if (lesson.replacementLeaders && lesson.replacementLeaders.length > 0) this.lesson.replaced = true
        if (lesson.newDate && lesson.newTimeRange && lesson.newTimeRange.length > 0) this.lesson.canceled = true
      },
      goToFormTab(tabName, params = {}) {
        this.checkValidMainForm()
        let defaultParams = {...{'tab': tabName, 'id': this.id}, ...params}
        this.$router.push({name: 'lesson', params: defaultParams})
      }
    },
    created() {
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
              // {
              //   title: 'Lista Zawodników',
              //   link: 'lesson',
              //   tab: 'participants-list',
              //   method: 'changeTab',
              //   methodParams: 'participants-list'
              // },
              {
                title: 'Zawodnicy',
                link: 'lesson',
                tab: 'participants',
                method: 'changeTab',
                methodParams: 'participants'
              },
              {
                title: 'Frekwencja',
                link: 'lesson',
                tab: 'frequency',
                method: 'changeTab',
                methodParams: 'frequency'
              },
              // {
              //   title: 'Kalendarz',
              //   link: 'lesson',
              //   tab: 'calendar',
              //   method: 'changeTab',
              //   methodParams: 'calendar'
              // },
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
