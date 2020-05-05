<template>
  <div class="container">
    <b-row class="justify-content-between">
      <b-col :cols="$store.getters.isAdmin ? 6 : 12">
        <h3 class="mb-4">Do zatwierdzenia</h3>

        <!--    Schools And Clubs    -->
        <h4 v-b-toggle.collapse-schools v-if="$store.getters.isAdmin"><span class="mr-3">^</span>Kłuby i szkoły</h4>
        <b-collapse v-if="$store.getters.isAdmin" visible id="collapse-schools" class="mt-2">
          <b-table
            :items="schoolListFiltered"
            :fields="fieldsSchools"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
            @row-clicked="schoolRowRedirect"
          >

            <template v-slot:cell(type)="scope">
              <div class="d-flex align-items-center justify-content-between">
                <div class="wrap-img-type-table mr-3">
                  <img :src="scope.item.image || 'https://placeimg.com/50/50/any'" alt="">
                </div>
                <span>{{scope.item.type == 0 ? 'Klub' : 'Szkoła'}}</span>
              </div>

            </template>

            <template v-slot:cell(object)="scope">
              <span>{{scope.item.places.length}}</span>
            </template>

            <template v-slot:cell(data)="scope">
              <span>{{scope.item.created}}</span>
            </template>

            <template v-slot:cell(btnTable)="scope" v-if="$store.getters.isDirector">
              <b-btn variant="primary" class="custom mb-0" @click="confirmSchoolAndClubItem(scope.item.id)">
                Zatwierdź
              </b-btn>
            </template>
            <template v-slot:cell(edit)="scope">
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
            :items="sportObjectsToConfirm"
            :fields="fieldsSportObjects"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
            @row-clicked="sportObjectRowRedirect"
          >

            <template v-slot:cell(name)="scope">
              <span v-if="scope.item">{{scope.item.title}}</span>
            </template>
            <template v-slot:cell(type)="scope">
              <span>{{getSportObjectTypeNameById(scope.item.type)}}</span>
            </template>

            <template v-slot:cell(data)="scope">
              <span>{{scope.item.created}}</span>
            </template>

            <template v-slot:cell(btnTable)="scope" v-if="$store.getters.isDirector">
              <b-btn variant="primary" class="custom mb-0" @click="confirmSportObjectItem(scope.item.id)">
                Zatwierdź
              </b-btn>
            </template>
            <template v-slot:cell(edit)="scope">
              <b-link class="icon-link">
                <span class="icon icon-iconm_search"></span>
              </b-link>
            </template>

          </b-table>
        </b-collapse>

        <!--    Teachers    -->
        <h4 v-b-toggle.collapse-leaders v-if="$store.getters.isAdmin"><span class="mr-3">^</span>Prowadzący</h4>
        <b-collapse v-if="$store.getters.isAdmin" visible id="collapse-leaders" class="mt-2">
          <b-table
            :items="leadersToConfirm"
            :fields="fieldsLeaders"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
            @row-clicked="leaderRowRedirect"
          >

            <template v-slot:cell(fullName)="scope">
              <span>{{scope.item.firstName + ' ' + scope.item.lastName}}</span>
            </template>

            <template v-slot:cell(disciplines)="scope">
              <span/>
              <span class="d-inline" v-for="(discipline,index) in scope.item.disciplines" :key="index">
            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}
          </span>
            </template>

            <template v-slot:cell(status)="scope">
          <span class="status" :class="{'active': scope.item.status}">
            {{scope.item.status == 1 ? 'aktywny' : 'nieaktywny'}}
          </span>
            </template>

            <template v-slot:cell(edit)="scope">
              <b-link class="icon-link">
                <span class="icon icon-iconm_search"></span>
              </b-link>
            </template>

            <template v-slot:cell(btnTable)="scope" v-if="$store.getters.isAdmin">
              <b-btn variant="primary" size="sm" class="custom mb-0" @click="confirmLeader(scope.item.id)">
                Zatwierdź
              </b-btn>
            </template>
          </b-table>
        </b-collapse>
        <!--    Parties    -->
        <h4 v-b-toggle.collapse-parties><span class="mr-3">^</span>Imprezy</h4>
        <b-collapse visible id="collapse-parties" class="mt-2">
            <b-table
              :items="eventsToConfirm"
              :fields="fieldsEvents"
              striped
              sort-icon-left
              responsive="md"
              class="custom table-responsive"
              @row-clicked="eventRowRedirect"
            >
              <template v-slot:cell(dateStart)="scope">
                <span>{{scope.item.dateStart.substr(0, scope.item.dateStart.indexOf(' '))}}</span>
              </template>

              <template v-slot:cell(discipline)="scope">
          <span v-if="scope.item.discipline && scope.item.discipline.id">
            {{getDisciplineTitleById(scope.item.discipline.id)}}
          </span>
              </template>

              <template v-slot:cell(organization)="scope">
                <span v-if="scope.item.organization">{{scope.item.organization}}</span>
                <span v-else-if="scope.item.school && scope.item.school.id">
            {{getSchoolNameById(scope.item.school.id)}}
          </span>
              </template>

              <template v-slot:cell(btnTable)="scope" v-if="$store.getters.isAdmin">
                <b-btn variant="primary" class="custom mb-0" @click="confirmEvent(scope.item.id)">
                  Zatwierdź
                </b-btn>
              </template>
              <template v-slot:cell(edit)="scope">
                <span class="c-pointer">Szczegóły</span>
              </template>

            </b-table>
        </b-collapse>
      </b-col>

      <b-col cols="6" v-if="$store.getters.isAdmin">
        <h3 class="mb-4">Ostatnie zmiany</h3>

        <b-table
          id="history-table"
          :items="historyData"
          :fields="historyFields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <template v-slot:cell(user)="scope">
            <span v-if="scope.item.user">{{scope.item.user.firstName}} {{scope.item.user.lastName}}</span>
            <br>
            <span v-if="scope.item.user">{{scope.item.user.email}}</span>
          </template>
          <template v-slot:cell(method)="scope">
            <span v-if="scope.item">{{getMethodName(scope.item.method)}}</span>
          </template>
          <template v-slot:cell(school)="scope">
            <span v-if="scope.item.school">{{scope.item.school.name}}</span>
          </template>
          <template v-slot:cell(changes)="scope">
                <span v-show="scope.item.method !== 'DELETE'" class="c-pointer"
                      @click="showChanges(scope.item.changes)">Szczegóły</span>
          </template>
          <!--              @row-clicked="rowRedirect"-->
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="modalChanges"
             modal-class="custom"
             centered size="md"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        Dane po zmianie
      </template>

      <div slot="default" class="d-flex">
        <b-row>
          <ul class="d-block">
            <li :key="index" v-for="(val, changesName, index) in parsedChanges">
              {{changesName}}: {{val}}
            </li>
          </ul>
        </b-row>
      </div>
    </b-modal>
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
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'btnTable', label: '', sortable: true }
        ],
        fieldsEvents: [
          { key: 'dateStart', label: 'Data rozpoczęcia', sortable: true },
          { key: 'title', label: 'Nazwa', sortable: true },
          { key: 'discipline', label: 'Dyscyplina', sortable: true },
          { key: 'organization', label: 'Organizator', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
        ],

        // LOGS
        parsedChanges: {},
        historyFields: [
          {key: 'createdLog', label: 'Kiedy', sortable: true},
          {key: 'user', label: 'Kto', sortable: true},
          {key: 'method', label: 'Rodzaj akcji', sortable: true},
          {key: 'object', label: 'Gdzie', sortable: true},
          {key: 'school', label: 'szkoła / klub', sortable: true},
          {key: 'changes', label: 'Zmiana', sortable: true},
          {key: 'id', label: 'id', sortable: true}
        ],
        historyData: [],
        actionsBE: [
          {val: 'POST', label: 'Dodanie'},
          {val: 'PUT', label: 'Edycja'},
          {val: 'DELETE', label: 'Usunięcie'}
        ],
      }
    },
    computed: {
      ...mapGetters(['sportObjectsToConfirm', 'sportObjectTypes',
        'disciplines', 'leadersToConfirm', 'eventsToConfirm']),
      schoolsToConfirm () {
        return this.$store.getters.schoolsToConfirm
      },
    },
    methods: {
      confirmEvent (id) {
        this.$store.dispatch('putEvent', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getEvents', { confirmed: 0, forSchool: true })
          })
      },
      confirmLeader (id) {
        this.$store.dispatch('putLeader', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getLeaders', { confirmed: 0 })
          })
      },
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
      },
      eventRowRedirect (event, isConfirmed) {
        this.$router.push({
          name: 'event',
          params: { 'tab': 'main-data', 'id': event.id, 'isConfirmed': isConfirmed }
        })
      },

      // LOG
      hideModal() {
        this.$refs.modalChanges.hide()
      },
      showChanges(val) {
        this.parsedChanges = JSON.parse(val)
        this.$refs.modalChanges.show()
      },
      getMethodName(name) {
        let namePrepared = this.actionsBE.find(x => {
          return x.val === name
        })
        return undefined === namePrepared ? '' : namePrepared.label
      },
    },
    created () {
      this.$store.dispatch('getSchools')
      this.$store.dispatch('getSportObjects', { confirmed: 0 })
      this.$store.dispatch('getSportObjectTypes')
      this.$store.dispatch('getLeaders', {confirmed: 0})
      this.$store.dispatch('getEvents', { confirmed: 0, forSchool: true })
      this.$store.dispatch('getDisciplines')

      if (this.$store.getters.isAdmin) {
      this.$store.dispatch('getLogs', {currentPage: 1, perPage: 10})
        .then(response => {
          this.historyData = response.data
        })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Dashboard', active: true } ])
    }
  }
</script>

<style scoped>

</style>
