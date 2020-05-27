<template>
  <div class="container">
    <b-row class="justify-content-center" v-if="$route.params.id !== undefined">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <template>
      <!--   Component for UserEntity   -->
      <FormMainData :leader="leader" @childSubmit="submit" ref="FormMainData"
                    :key="$route.params.tab+'FormMainData'" v-if="$route.params.tab === 'main-data'"/>
      <form-permissions :leader="leader" :schoolIds="schoolIds" @childSubmit="submit" ref="Permissions"
                        :key="$route.params.tab+'Permissions'" v-if="$route.params.tab === 'permissions'"/>
      <FormParticipantGroups :leader="leader" :schoolIds="schoolIds" @childSubmit="submit" ref="ParticipantList"
                             :key="$route.params.tab+'ParticipantList'"
                             v-if="$route.params.tab === 'participant-list'"/>
      <FormParticipants :leader="leader" :schoolIds="schoolIds" @childSubmit="submit" ref="Participants"
                        :key="$route.params.tab+'Participants'" v-if="$route.params.tab === 'participants'"/>
      <FormLessons :leader="leader" :schoolIds="schoolIds" @childSubmit="submit" ref="Lessons"
                   :key="$route.params.tab+'Lessons'" v-if="$route.params.tab === 'lessons'"/>
      <!--      <FormSportObjects :leader="leader" ref="SportObjects"-->
      <!--                        :key="$route.params.tab+'SportObjects'" v-show="$route.params.tab === 'sport-objects'"/>-->
    </template>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import FormMainData from '@/views/leaders/components/FormMainData'
  import FormPermissions from '@/views/leaders/components/FormPermissions'
  import FormSportObjects from '@/views/leaders/components/FormSportObjects'
  import FormParticipantGroups from '@/views/leaders/components/FormParticipantGroups'
  import FormParticipants from '@/views/leaders/components/FormParticipants'
  import FormLessons from '@/views/leaders/components/FormLessons'
  import LeaderMixin from '@/mixins/leader-mixin'

  export default {
    name: 'LeaderForm',
    components: {
      TabLinks, FormParticipants, FormLessons, FormMainData, FormPermissions, FormSportObjects, FormParticipantGroups
    },
    mixins: [EventBusEmit, FormMixin, LeaderMixin],
    data () {
      return {
        tabLinks: [],

        leader: {
          id: this.id,
          role: 1,
          active: true,
          confirmed: true,
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          newPassword: '',

          phone: '',
          disciplines: [
            // { id: 1 },
            // { id: 2 }
          ]
        },

        schoolIds: []
      }
    },
    computed: {},
    watch: {
      leader: function (val) {
        console.log(val)
        if (val.id) {
          let breadcrumbs = []
          if (this.$route.params.schoolName === undefined || this.$route.params.schoolName === null) {
            breadcrumbs = [
              {text: 'Prowadzący', to: {name: 'leaders', params: {'tab': 'confirmed'}}},
              {text: this.leader.firstName + ' ' + this.leader.lastName, active: true}
            ]
          } else {
            breadcrumbs = [
              {
                text: this.$route.params.schoolName,
                to: {
                  name: 'school.or.club',
                  params: {'tab': 'leaders', 'id': this.$route.params.schoolId}
                }
              },
              {text: this.id ? this.leader.firstName + ' ' + this.leader.lastName : 'Nowy', active: true}
            ]
          }
          this.changeAdminNavbarBreadcrumbs(breadcrumbs)
        }
      }
    },
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
        let schoolsIds = []
        for (let schoolIndex in leader.schoolsUsers) {
          schoolsIds.push(leader.schoolsUsers[schoolIndex].school.id)
        }
        this.schoolIds = schoolsIds
        this.leader = leader
        this.leader.password = ''
        this.leader.newPassword = ''
        console.log(this.leader)
      }
    },
    created () {
      // init leader
      this.leader = Object.assign(this.leader, this.$store.getters.leader(this.id, this.isConfirmed))

      if (this.$route.params.tab === undefined) {
        this.$router.push({name: 'leader', params: {'tab': 'main-data'}})
      }

      if (this.$store.getters.isDirector && !this.$store.getters.isAdmin) {
        this.$router.push({name: 'leader',
                           params: {
                             'tab': 'permissions',
                             'id': this.$route.params.id,
                             'schoolName': undefined === this.statusSlot ? null : this.statusSlot.schoolName,
                             'schoolId': undefined === this.statusSlot ? null : this.statusSlot.schoolId
        }})
      }

      // set isConfirmed data from table redirect only
      if (this.$route.params.isConfirmed) {
        this.isConfirmed = this.$route.params.isConfirmed
      }

      if (this.id) {
        this.$store.dispatch('getLeader', {id: this.id})
          .then((response) => {
            this.prepareLeader(response)
            console.log(response)

            // get permissions by separate request from server
            this.$store.dispatch('getPermissionsByIds', !Array.isArray(response.schoolsUsers)
              ? false : response.schoolsUsers.map(obj => {
                if (obj.permission && obj.permission.hasOwnProperty('id')) return obj.permission.id
            }))

            // this.$store.dispatch('getPermissionsByIds', !Array.isArray(response.schoolsUsers)
            //   ? false : response.schoolsUsers.map(obj => {
            //     if (obj.permissions && obj.permissions.length > 0) return obj.permissions
            //   }))

            this.tabLinks = [
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
              // {
              //   title: 'Obiekty',
              //   link: 'leader',
              //   tab: 'sport-objects'
              // },
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
              }
              // {
              //   title: 'Kalendarz',
              //   link: 'leader',
              //   tab: 'calendar'
              // },
              // {
              //   title: 'Frekwencja',
              //   link: 'leader',
              //   tab: 'frequency'
              // },
              // {
              //   title: 'MTSF',
              //   link: 'leader',
              //   tab: 'mtsf'
              // }
              // ,
              // {
              //   title: 'Imprezy sportowe',
              //   link: 'leader',
              //   tab: 'events'
              // }
            ]

            if (this.$store.getters.isDirector && !this.$store.getters.isAdmin) {
              this.tabLinks = [
                {
                  title: 'Uprawnienia',
                  link: 'leader',
                  tab: 'permissions'
                }
              ]
            }
          })
      }

      this.$store.dispatch('getDisciplines')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})

      let breadcrumbs = []
      if (this.$route.params.schoolName === undefined || this.$route.params.schoolName === null) {
        breadcrumbs = [
          {text: 'Prowadzący', to: {name: 'leaders', params: {'tab': 'confirmed'}}},
          {text: this.id ? this.leader.firstName + ' ' + this.leader.lastName : 'Nowy', active: true}
        ]
      } else {
        breadcrumbs = [
          {
            text: this.$route.params.schoolName,
            to: {
              name: 'school.or.club',
              params: {'tab': 'leaders', 'id': this.$route.params.schoolId}
            }
          },
          {text: this.id ? this.leader.firstName + ' ' + this.leader.lastName : 'Nowy', active: true}
        ]
      }
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
    },
    destroyed () {
      this.$store.dispatch('clearPermissions')
    }
  }
</script>

<style scoped>
</style>
