<template>
  <div class="container">
    <b-row class="justify-content-center" v-if="$route.params.id !== undefined">
    <b-col cols="12">
    <TabLinks :links="tabLinks"></TabLinks>
    </b-col>
    </b-row>

          <FormMainData :lesson="lesson" @childSubmit="submit" ref="FormMainData"
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
            tab: 'objects'
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
        ],

        lesson: {
          active: 1,
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
          }

          // selectedGender: [],
          // genderOptions: [
          //   { text: 'kobieta', value: 0 },
          //   { text: 'mężczyzna', value: 1 }
          // ]
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
            this.postSubmitRedirect('lesson')
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
        this.$router.push({ name: 'lesson', params: { 'tab': 'main-data'} })
      }

      if (this.id) {
        this.$store.dispatch('getLesson', { id: this.id })
          .then((response) => {
            this.lesson = response
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
