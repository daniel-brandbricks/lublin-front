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
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormMainData from '@/views/lessons/components/FormMainData'

  export default {
    name: 'LessonForm',
    components: {
      TabLinks, Treeselect, FormMainData
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
            tab: 'participants-list'
          },
          {
            title: 'Kalendarz',
            link: 'lesson',
            tab: 'calendar'
          }
        ],
        lesson: {
          active: true,
          sex: 1,
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
          schools: []
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
      prepareLesson (response) {
        console.log(response)
        response.schools = response.schools.map(school => school.id)
        if (undefined === response.type || response.type === null) {
          response.type = {
            id: null
          }
        }
        this.sportObject = response
      },
      goToFormTab (tabName, params = {}) {
        this.checkValidMainForm()
        let defaultParams = { ...{ 'tab': tabName, 'id': this.id }, ...params }
        this.$router.push({ name: 'lesson', params: defaultParams })
      }
    },
    created () {
      this.lesson = Object.assign(this.lesson, this.$store.getters.lesson(this.id))

      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'lesson', params: {'tab': 'main-data'} })
      }

      if (this.id) {
        this.$store.dispatch('getLesson', { id: this.id })
          .then((response) => {
            // this.lesson = response

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
          })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      let breadcrumbs = [
        { text: 'Lista zajęć', to: { name: 'lessons' } },
        { text: this.id ? this.participantGroup.name : 'Nazwa zajęcia', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
