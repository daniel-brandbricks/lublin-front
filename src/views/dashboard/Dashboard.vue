<template>
  <div class="container">
    <b-row class="justify-content-between">
      <b-col cols="6">
        <h3 class="mb-4">Do zatwierdzenia</h3>

        <!--    Schools And Clubs    -->
        <h4 v-b-toggle.collapse-schools><span class="mr-3">^</span>Kłuby i szkoły</h4>
        <b-collapse visible id="collapse-schools" class="mt-2">
          <b-table
            :items="schoolListFiltered"
            :fields="fieldsSchools"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
            @row-clicked="schoolRowRedirect"
          >

            <template slot="type" slot-scope="scope">
              <div class="d-flex align-items-center justify-content-between">
                <div class="wrap-img-type-table mr-3">
                  <img :src="scope.item.image || 'https://placeimg.com/50/50/any'" alt="">
                </div>
                <span>{{scope.item.type == 0 ? 'Klub' : 'Szkoła'}}</span>
              </div>

            </template>

            <template slot="object" slot-scope="scope">
              <span>{{scope.item.places.length}}</span>
            </template>

            <template slot="data" slot-scope="scope">
              <span>{{scope.item.created}}</span>
            </template>

            <template slot="btnTable" slot-scope="scope" v-if="$store.getters.isDirector">
              <b-btn variant="primary" class="custom mb-0" @click="confirmSchoolAndClubItem(scope.item.id)">
                Zatwierdź
              </b-btn>
            </template>
            <template slot="edit" slot-scope="scope">
              <b-link class="icon-link">
                <span class="icon icon-iconm_search"></span>
              </b-link>
            </template>

          </b-table>
        </b-collapse>

        <!--    Sports Objects    -->
        <h4 v-b-toggle.collapse-sport-objects><span class="mr-3">^</span>Obiekty sportowe</h4>
        <b-collapse visible id="collapse-sport-objects" class="mt-2">
          <b-table
            :items="sportObjectsListFiltered"
            :fields="fieldsSportObjects"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
            @row-clicked="sportObjectRowRedirect"
          >

            <template slot="name" slot-scope="scope">
              <span v-if="scope.item">{{scope.item.title}}</span>
            </template>
            <template slot="type" slot-scope="scope">
              <span>{{getSportObjectTypeNameById(scope.item.type)}}</span>
            </template>

            <template slot="data" slot-scope="scope">
              <span>{{scope.item.created}}</span>
            </template>

            <template slot="btnTable" slot-scope="scope" v-if="$store.getters.isDirector">
              <b-btn variant="primary" class="custom mb-0" @click="confirmSportObjectItem(scope.item.id)">
                Zatwierdź
              </b-btn>
            </template>
            <template slot="edit" slot-scope="scope">
              <b-link class="icon-link">
                <span class="icon icon-iconm_search"></span>
              </b-link>
            </template>

          </b-table>
        </b-collapse>

        <!--    Teachers    -->
        <h4 v-b-toggle.collapse-leaders><span class="mr-3">^</span>Prowadzący</h4>
        <b-collapse visible id="collapse-leaders" class="mt-2">
          <b-table
            :items="leadersFiltered"
            :fields="fieldsLeaders"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
            @row-clicked="leaderRowRedirect"
          >

            <template slot="fullName" slot-scope="scope">
              <span>{{scope.item.firstName + ' ' + scope.item.lastName}}</span>
            </template>

            <template slot="disciplines" slot-scope="scope">
              <span/>
              <span class="d-inline" v-for="(discipline,index) in scope.item.disciplines" :key="index">
            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}
          </span>
            </template>

            <template slot="status" slot-scope="scope">
          <span class="status" :class="{'active': scope.item.status}">
            {{scope.item.status == 1 ? 'aktywny' : 'nieaktywny'}}
          </span>
            </template>

            <template slot="edit" slot-scope="scope">
              <b-link class="icon-link">
                <span class="icon icon-iconm_search"></span>
              </b-link>
            </template>

          </b-table>
        </b-collapse>
        <!--    Parties    -->
        <h4 v-b-toggle.collapse-parties><span class="mr-3">^</span>Imprezy</h4>
      </b-col>

      <b-col cols="6">
        <h3 class="mb-4">Ostatnie zmiany</h3>

        <b-table
          :items="historyTempData"
          :fields="fieldsHistory"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        ></b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import SchoolsAndClubsMixin from '@/mixins/schools-and-clubs-mixin'
  import SportObjectsMixin from '@/mixins/sport-objects-mixin'
  import LeaderMixin from '@/mixins/leader-mixin'
  import LeaderTable from '@/views/leaders/components/LeaderTable'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import { mapGetters } from 'vuex'

  export default {
    components: { LeaderTable },
    mixins: [ SchoolsAndClubsMixin, SportObjectsMixin, EventBusEmit, LeaderMixin ],
    data () {
      return {
        fieldsSchools: [
          { key: 'type', label: 'Typ', sortable: true },
          { key: 'name', label: 'Nazwa', sortable: true },
          { key: 'object', label: 'Obiekty sportowe', sortable: true },
          { key: 'data', label: 'Data dodania', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ],
        fieldsSportObjects: [
          { key: 'name', label: 'Nazwa obiektu', sortable: true },
          { key: 'type', label: 'Typ obiektu', sortable: true },
          { key: 'data', label: 'Data dodania', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ],
        fieldsLeaders: [
          { key: 'fullName', label: 'Imię i Nazwisko', sortable: true },
          { key: 'disciplines', label: 'Dyscyplina', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true }
        ],
        fieldsHistory: [
          { key: 'person', label: 'Kto', sortable: true },
          { key: 'date', label: 'Data', sortable: true },
          { key: 'changes', label: 'Zmiana', sortable: true }
        ],
        historyTempData: [
          { person: 'Marek', date: '23-11-2019', changes: 'Dodal klub "Fire"' },
          { person: 'Kasia', date: '13-10-2019', changes: 'Edytowala zajecia "Poker"' },
          { person: 'Ola', date: '11-10-2019', changes: 'Usunela trenera "Adam"' },
          { person: 'Rafal', date: '03-10-2019', changes: 'Dodal obiekt sportowy "KKK"' }
        ]
      }
    },
    computed: {
      ...mapGetters(['sportObjects', 'sportObjectTypes', 'disciplines', 'leaders']),
      schoolsToConfirm () {
        return this.$store.getters.schoolsToConfirm
      }
    },
    methods: {
      confirmSchoolAndClubItem (id) {
        this.$store.dispatch('putSchool', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getSchools', { confirmed: 0 })
          })
      },
      confirmSportObjectItem (id) {
        this.$store.dispatch('putSportObject', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getSportObjects', { confirmed: 0 })
          })
      },
      schoolRowRedirect (school, isConfirmed) {
        this.$router.push({
          name: 'school.or.club',
          params: { 'tab': 'main-data', 'id': school.id, 'isConfirmed': isConfirmed }
        })
      },
      sportObjectRowRedirect (sportObject, isConfirmed) {
        this.$router.push({
          name: 'sport.object',
          params: { 'tab': 'main-data', 'id': sportObject.id, 'isConfirmed': isConfirmed }
        })
      },
      leaderRowRedirect (leader, isConfirmed) {
        this.$router.push({
          name: 'leader',
          params: { 'tab': 'main-data', 'id': leader.id, 'isConfirmed': isConfirmed }
        })
      }
    },
    created () {
      this.$store.dispatch('getSchools', { confirmed: 0 })
      this.$store.dispatch('getSportObjects', { confirmed: 0 })
      this.$store.dispatch('getSportObjectTypes')
      this.$store.dispatch('getLeaders', {confirmed: 0})
      this.$store.dispatch('getDisciplines')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Dashboard', active: true } ])
    }
  }
</script>

<style scoped>

</style>
