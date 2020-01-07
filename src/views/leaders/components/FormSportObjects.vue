<template>
  <div class="wrap">

    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="align-items-center mb-3">
          <!--          <b-col>-->
          <!--            <b-form-group class="custom">-->
          <!--              <b-form-checkbox-group-->
          <!--                id="checkbox-group-1"-->
          <!--                v-model="selectedType"-->
          <!--                :options="typeOptions"-->
          <!--                name="flavour-1"-->
          <!--              ></b-form-checkbox-group>-->
          <!--            </b-form-group>-->
          <!--          </b-col>-->
          <b-col cols="6">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="districts"/>
          </b-col>
          <b-col cols="6">
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

    <SportObjectTable :filters="{districtValue: districtValue, search: search}" :leader="leader" @childSubmit="submit"
                      ref="SportObjects" :is-confirmed="'all'" :key="$route.params.tab+'SportObjects'"
                      v-show="$route.params.tab === 'sport-objects'"
                      :fieldsParams="[
                        { key: 'schoolOrClub', label: 'Nazwa Klubu/Szkoły', toInsert: true },
                        { key: 'lessons', label: 'Zajęcia', toInsert: true },
                        { key: 'status', label: 'Status w systemie', sortable: true, toInsert: true }
                        ]"/>

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
  import SportObjectTable from '@/views/sport-objects/components/SportObjectTable'
  import {DISTRICTS} from '@/config/AppConfig'

  export default {
    name: 'FormSportObjects',
    props: ['leader'],
    components: {LeaderTable, Treeselect, SportObjectTable},
    mixins: [EventBusEmit],
    data () {
      return {
        id: this.$route.params.id,

        // treeselect
        districtValue: null,
        districts: DISTRICTS,

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
    created () {
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getSportObjects')
    }
  }
</script>

<style scoped>

</style>
