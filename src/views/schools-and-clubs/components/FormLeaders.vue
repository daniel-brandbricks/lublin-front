<template>
  <div class="wrap">
    <b-row class="justify-content-center mb-4"
           v-if="school && school.invitations && school.invitations.length > 0">
      <b-col class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <h5 v-b-toggle.collapse-invitations class="c-pointer">
          <span class="mr-3">^</span>Aplikacje prowadzących
        </h5>
        <b-collapse visible id="collapse-invitations" class="mt-2">
          <div :key="index" v-for="(invitation, index) in school.invitations"
               class="row justify-content-between mb-2 align-items-center">
            <div class="col-9">
              <p class="mb-0">{{index + 1}}. {{invitation.leader.firstName}} {{invitation.leader.lastName}}
                ({{invitation.leader.email}})</p>
            </div>
            <div class="col-3 text-right">
              <b-btn v-if="invitation.active === false" variant="primary" class="custom mb-0"
                     @click="acceptLeaderInvitation(invitation.leader.id)">
                Zatwierdź
              </b-btn>
              <span v-else class="status active">zatwierdzony</span>
            </div>
          </div>
        </b-collapse>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <b-row class="align-items-center mb-3">
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="selectedDisciplines"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="disciplinesTreeselect"/>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="selectedSportObjects"
                        :multiple="true"
                        placeholder="Obiekt"
                        :options="sportObjectsTreeselect"/>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
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
                  ref="leaderComponent" :forSchool="true"
                  :filters="{selectedDisciplines: selectedDisciplines, selectedSportObjects: selectedSportObjects, search: search}"/>

    <b-modal ref="leaderModal" centered title="Dodaj prowadzącego" hide-footer size="lg">
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
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'FormLeaders',
    props: ['school'],
    components: {LeaderTable, Treeselect},
    mixins: [EventBusEmit, ToastMixin],
    data() {
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
      ...mapGetters(['leaders', 'disciplines', 'sportObjects', 'lessons']),
      leadersTreeselect() {
        let leadersPrepared = []
        for (let index in this.leaders) {
          let leaderExists = false
          if (this.school.schoolsUsers && this.school.schoolsUsers.length > 0) {
            leaderExists = this.school.schoolsUsers.find(x => {
              return x.user.id === this.leaders[index].id
            })
          }
          if (leaderExists === undefined || leaderExists === false) {
            leadersPrepared.push({
              id: this.leaders[index].id,
              label: this.leaders[index].email
            })
          }
        }
        return leadersPrepared
      },
      disciplinesTreeselect() {
        let disciplinesPrepared = []
        for (let index in this.disciplines) {
          disciplinesPrepared.push({
            id: this.disciplines[index].id,
            label: this.disciplines[index].title
          })
        }
        return disciplinesPrepared
      },
      sportObjectsTreeselect() {
        let sportObjectsPrepared = []
        for (let index in this.sportObjects) {
          sportObjectsPrepared.push({
            id: this.sportObjects[index].id,
            label: this.sportObjects[index].title
          })
        }
        return sportObjectsPrepared
      },
      leadersIdsToPass() {
        let schoolsUsers = this.school.schoolsUsers || []
        let ids = []

        for (let index in schoolsUsers) {
          if (parseInt(schoolsUsers[index].role) === 0 && parseInt(schoolsUsers[index].user.role) === 1) {
            ids.push(schoolsUsers[index].user.id)
          }
        }

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // this.selectedLeaders = [...ids]

        return ids
      },
      statusSlot() {
        let data = {}
        let leaderIds = {}

        let schoolsUsers = this.school.schoolsUsers || []
        for (let index in schoolsUsers) {
          if (parseInt(schoolsUsers[index].role) === 0 && parseInt(schoolsUsers[index].user.role) === 1) {
            leaderIds[schoolsUsers[index].user.id] = schoolsUsers[index].status
          }
        }
        data['ids'] = leaderIds
        data['columnWord'] = 'Status dla szkoły / klubu'
        data['event'] = 'school-leader-change-status'
        data['schoolName'] = this.school.name
        data['schoolId'] = this.school.id
        return data
      }
    },
    methods: {
      acceptLeaderInvitation(leaderId) {
        let school = {
          id: this.$route.params.id,
          leaders: [leaderId]
        }

        this.$store.dispatch('putSchool', school)
          .then((response) => {
            this.$parent.updateSchool()
            this.$store.dispatch('getLeaders', {confirmed: 0, forLesson: true, returnType: 'short'})
            this.$store.dispatch('getLeaders', {confirmed: 1, forLesson: true, returnType: 'short'})
          })
      },
      // for FormLeaders to change field status (to use SchoolUser status)
      getStatusPersonInSchool(item) {
        let schoolUser = this.school.schoolsUsers.find(x => {
          return parseInt(x.user.id) === parseInt(item.id)
        })

        return schoolUser.status
      },

      openLeadersModal() {
        if (this.$refs.leaderModal) this.$refs.leaderModal.show()
      },
      submit() {
        let school = {
          id: this.$route.params.id,
          leaders: this.selectedLeaders
        }

        this.$store.dispatch('putSchool', school)
          .then((response) => {
            this.$parent.updateSchool()
            this.selectedLeaders = []
          })
        .catch((error) => {
          console.log(error)
          if (error && error.data && error.data.error) {
            this.showToast(error.data.error, 'Uwaga!', 'danger')
          } else {
            this.showToast('Wystąpił błąd', 'Uwaga!', 'danger')
          }
        })
        this.$refs.leaderModal.hide()
      }
    },
    mounted() {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({eventBusMethod: 'OPEN_SCHOOLS_LEADERS_MODAL'})
    },
    created() {
      this.$store.dispatch('getLessons', {filters: {lesson: {schoolsAndClubs: [this.id]}}})

      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getSportObjects')
      this.$store.dispatch('getLeaders', {confirmed: 1, forLesson: true, returnType: 'short'})

      EventBus.$on('OPEN_SCHOOLS_LEADERS_MODAL', (params) => {
        this.openLeadersModal()
      })

      let breadcrumbs = [
        {text: 'Kluby i szkoły', to: {name: 'schools.and.clubs', params: {'tab': 'confirmed'}}},
        {text: this.id ? parseInt(this.school.type) === 1 ? 'Szkoła' : 'Klub' : 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    }
  }
</script>

<style scoped>

</style>
