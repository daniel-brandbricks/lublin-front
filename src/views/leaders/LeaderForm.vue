<template>
  <div class="container">
    <b-row class="justify-content-center" v-if="$route.params.id !== undefined">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <FormMainData :leader="leader" @childSubmit="submit" ref="FormMainData"
                  :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import FormMainData from '@/views/leaders/components/FormMainData'

  export default {
    name: 'LeaderForm',
    components: {
      TabLinks, FormMainData
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'leader',
            tab: 'main-data'
          },
          {
            title: 'Uprawnienia',
            link: 'leader',
            tab: 'permissions'
          },
          {
            title: 'Obiekty',
            link: 'leader',
            tab: 'sport-objects'
          },
          {
            title: 'Lista Zawodników',
            link: 'leader',
            tab: 'participant-list'
          },
          {
            title: 'Zawodnicy',
            link: 'leader',
            tab: 'participants'
          },
          {
            title: 'Zajęcia',
            link: 'leader',
            tab: 'lessons'
          },
          {
            title: 'Kalendarz',
            link: 'leader',
            tab: 'calendar'
          },
          {
            title: 'Frekwencja',
            link: 'leader',
            tab: 'frequency'
          },
          {
            title: 'MTSF',
            link: 'leader',
            tab: 'mtsf'
          },
          {
            title: 'Wydarzenia',
            link: 'leader',
            tab: 'events'
          }
        ],

        leader: {
          id: this.id,
          role: 1,
          confirmed: 0,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          active: true,
          disciplines: [
            // { id: 1 },
            // { id: 2 }
          ]
        }
      }
    },
    computed: {},
    methods: {
      // todo maybe for mixin?
      prepareToSubmit (leader) {
        let disciplines = leader.disciplines
        let disciplinesPrepared = []

        for (let disciplinesIndex in disciplines) {
          disciplinesPrepared.push(disciplines[disciplinesIndex].id)
        }
        leader.disciplines = disciplinesPrepared
      },
      submit () {
        let leader = {...this.leader}
        this.prepareToSubmit(leader)
        console.log(leader)
        // school.image = this.mixinImage

        const method = this.id === undefined ? 'postLeader' : 'putLeader'
        this.$store.dispatch(method, leader)
          .then(() => {
            this.postSubmitRedirect('leaders')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      addDiscipline () {
        this.leader.disciplines.push({})
      },
      removeDiscipline (index) {
        this.leader.disciplines.splice(index, 1)
      },
      prepareLeader (leader) {
        this.leader = leader
      }
    },
    created () {
      // set isConfirmed data from table redirect only
      if (this.$route.params.isConfirmed) {
        this.isConfirmed = this.$route.params.isConfirmed
      }

      // init leader
      this.leader = Object.assign(this.leader, this.$store.getters.leader(this.isConfirmed, this.id))

      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'leader', params: { 'tab': 'main-data' } })
      }

      if (this.id) {
        this.$store.dispatch('getLeader', { id: this.id })
          .then((response) => {
            this.prepareLeader(response)
          })
      }

      this.$store.dispatch('getDisciplines')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      let breadcrumbs = [
        { text: 'Prowadzący', to: { name: 'leaders', params: { 'tab': 'confirmed' } } },
        { text: this.id ? this.leader.name : 'Nowy', active: true }
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
