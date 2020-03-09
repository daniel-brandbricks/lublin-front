<template>
  <div class="wrap">
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="align-items-center mb-3">
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedDisciplines"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="disciplinesTreeselect"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedSportObjects"
                        :multiple="true"
                        placeholder="Obiekt"
                        :options="sportObjectsTreeselect"/>
          </b-col>
          <b-col cols="4">
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <!--  :fieldsParams="[{key: 'status', label: 'Status dla tego obiektu'}]" :parentType="'school'"  -->
    <leader-table :is-confirmed="'all'" :ids-to-pass="leadersIdsToPass" :key="$route.params.tab"
                  @school-leader-change-status="$parent.changeSchoolLeaderStatus" :status-slot="statusSlot"
                  ref="leaderComponent"
                  :filters="{selectedDisciplines: selectedDisciplines, selectedSportObjects: selectedSportObjects, search: search}"/>

    <b-modal ref="leaderModal" centered title="Zapiąć/Odpiąć prowadzącego" hide-footer size="lg">
      <treeselect class="custom"
                  v-model="selectedLeaders"
                  :multiple="true"
                  placeholder="Prowadzący"
                  :options="leadersTreeselect"/>
      <b-row class="mt-2">
        <b-col>
          <b-btn variant="primary" class="w-25 float-right" @click="submit">Zapisz</b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import LeaderTable from '@/views/leaders/components/LeaderTable'
  import {mapGetters} from 'vuex'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import EventBus from '@/event-bus'

  export default {
    name: 'FormLeaders',
    props: ['school'],
    components: {LeaderTable, Treeselect},
    mixins: [EventBusEmit],
    data () {
      return {
        id: this.$route.params.id,
        // tmp
        selectedLeaders: [],

        selectedDisciplines: [],
        selectedSportObjects: [],
        search: ''
      }
    },
    computed: {
      ...mapGetters(['leaders', 'disciplines', 'sportObjects']),
      leadersTreeselect () {
        let leadersPrepared = []
        for (let index in this.leaders) {
          leadersPrepared.push({
            id: this.leaders[index].id,
            label: this.leaders[index].email
          })
        }
        return leadersPrepared
      },
      disciplinesTreeselect () {
        let disciplinesPrepared = []
        for (let index in this.disciplines) {
          disciplinesPrepared.push({
            id: this.disciplines[index].id,
            label: this.disciplines[index].title
          })
        }
        return disciplinesPrepared
      },
      sportObjectsTreeselect () {
        let sportObjectsPrepared = []
        for (let index in this.sportObjects) {
          sportObjectsPrepared.push({
            id: this.sportObjects[index].id,
            label: this.sportObjects[index].title
          })
        }
        return sportObjectsPrepared
      },
      leadersIdsToPass () {
        let schoolsUsers = this.school.schoolsUsers || []
        let ids = []

        for (let index in schoolsUsers) {
          if (parseInt(schoolsUsers[index].role) === 0 && parseInt(schoolsUsers[index].user.role) === 1) {
            ids.push(schoolsUsers[index].user.id)
          }
        }

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.selectedLeaders = [...ids]

        return ids
      },
      statusSlot () {
        let data = {}
        let leaderIds = {}

        let schoolsUsers = this.school.schoolsUsers || []
        for (let index in schoolsUsers) {
          console.log(schoolsUsers[index])
          console.log(schoolsUsers[index])
          if (parseInt(schoolsUsers[index].role) === 0 && parseInt(schoolsUsers[index].user.role) === 1) {
            leaderIds[schoolsUsers[index].user.id] = schoolsUsers[index].status
          }
        }
        data['ids'] = leaderIds
        data['columnWord'] = 'Status dla szkoły / klubu'
        data['event'] = 'school-leader-change-status'
        console.log(data)
        return data
      }
    },
    methods: {
      // for FormLeaders to change field status (to use SchoolUser status)
      getStatusPersonInSchool (item) {
        let schoolUser = this.school.schoolsUsers.find(x => {
          return parseInt(x.user.id) === parseInt(item.id)
        })

        return schoolUser.status
      },

      openLeadersModal () {
        if (this.$refs.leaderModal) this.$refs.leaderModal.show()
      },
      submit () {
        let school = {
          id: this.$route.params.id,
          leaders: this.selectedLeaders
        }

        console.log(school)
        this.$store.dispatch('putSchool', school)
          .then((response) => {
            this.$parent.updateSchool()
          })
        this.$refs.leaderModal.hide()
      }
    },
    mounted () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({eventBusMethod: 'OPEN_SCHOOLS_LEADERS_MODAL'})
      console.log(this.$refs)
    },
    created () {
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getSportObjects')

      EventBus.$on('OPEN_SCHOOLS_LEADERS_MODAL', (params) => {
        this.openLeadersModal()
      })

      let breadcrumbs = [
        {text: 'Kłuby i szkoły', to: {name: 'schools.and.clubs', params: {'tab': 'confirmed'}}},
        {text: this.id ? parseInt(this.school.type) === 1 ? 'Szkoła' : 'Klub' : 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
