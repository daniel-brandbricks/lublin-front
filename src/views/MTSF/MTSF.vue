<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>
    </b-row>

    <b-row :key="$route.params.tab" v-if="$route.params.tab === 'participants'" class="justify-content-center">
      <b-col cols="12">
        <b-row>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-form-group class="custom">
              <treeselect class="custom m-0"
                          v-model="selectedSeasons"
                          :multiple="true"
                          placeholder="Sezon" :options="seasonsTreeselect"
                          name="season" key="season" v-validate="{'required':true}"/>
            </b-form-group>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-form-group class="custom">
              <treeselect class="custom m-0"
                          v-model="selectedLeaders"
                          :multiple="true"
                          placeholder="Prowadzący" :options="leadersTreeselect"
                          name="leaders" key="leaders" v-validate="{'required':true}"/>
            </b-form-group>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-form-group class="custom mb-2">
              <b-form-input id="title-1" class="custom m-0"
                            placeholder="Szukaj po imieniu lub nazwisku zawodnika"
                            name="searchText" key="searchText" v-validate="{'required':true}"
                            v-model="searchText"/>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="text-right">
          <b-col>
            <b-btn class="m-0 mb-2" @click="filterMtsfList(1, true)" variant="primary">Filtruj</b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          aria-controls="history-table"
        />

        <h4>Wyniki</h4>
        <b-table
          :items="listItems"
          :fields="fields"
          :per-page="perPage"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <template slot="firstName" slot-scope="scope">
            <span>{{scope.item.participant.firstName}}</span>
          </template>
          <template slot="lastName" slot-scope="scope">
            <span>{{scope.item.participant.lastName}}</span>
          </template>
          <template slot="sex" slot-scope="scope">
            <span>{{scope.item.participant.sex === 1 ? 'Mężczyzna' : 'Kobieta'}}</span>
          </template>
          <template slot="season" slot-scope="scope">
            <span>{{scope.item.season.title}}</span>
          </template>
          <template slot="date" slot-scope="scope">
            <span>{{scope.item.finalDate}}</span>
          </template>
          <template slot="points" slot-scope="scope">
            <span>{{scope.item.totalPoints}}</span>
          </template>
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <MTSFValuesList :key="$route.params.tab" v-if="$route.params.tab === 'values'">
    </MTSFValuesList>

    <b-modal ref="loadingModal" centered hide-header hide-header-close
             hide-footer size="lg">
      <h3 class="text-center">Trwa ladowanie...</h3>
    </b-modal>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {DISTRICTS} from '@/config/AppConfig'
  import MTSFValuesList from '@/views/MTSF/MTSGValuesList'
  import TabLinks from '../../components/TabLinks'

  export default {
    components: {Treeselect, MTSFValuesList, TabLinks},
    mixins: [EventBusEmit],
    data () {
      return {
        currentPage: 1,
        perPage: 20,
        totalRows: 0,

        generateExcel: true,
        generatePdf: true,
        selectedType: 'Mtsf',

        tabLinks: [
          {
            title: 'Wyniki',
            link: 'mtsf',
            tab: 'participants'
          },
          {
            title: 'Dane Podstawowe',
            link: 'mtsf',
            tab: 'values'
          }
        ],

        searchText: '',
        selectedLeaders: null,
        selectedSeasons: null,

        fields: [
          {key: 'firstName', label: 'Imię', sortable: true},
          {key: 'lastName', label: 'Nazwisko', sortable: true},
          {key: 'sex', label: 'Płeć', sortable: true},
          {key: 'season', label: 'Sezon', sortable: true},
          {key: 'date', label: 'Data obliczenia', sortable: true},
          {key: 'points', label: 'Punkty sumeryczne', sortable: true},
          {key: 'edit', label: ''}
        ],
        listItems: []
      }
    },
    computed: {
      isLoading () {
        return this.$store.getters.isLoading
      },
      seasonsTreeselect () {
        let data = this.$store.getters.seasons
        let preparedSeasons = []

        for (let seasonIndex in data) {
          preparedSeasons.push({id: data[seasonIndex].id, label: data[seasonIndex].title})
        }

        return preparedSeasons
      },
      leadersTreeselect () {
        let leadersPrepared = []
        for (let index in this.$store.getters.leadersConfirmed) {
          leadersPrepared.push({
            id: this.$store.getters.leadersConfirmed[index].id,
            label: this.$store.getters.leadersConfirmed[index].email
          })
        }
        return leadersPrepared
      }
    },
    watch: {
      currentPage: function (val) {
        this.filterMtsfList(val)
      },
      isLoading: function (val) {
        if (val) {
          this.$refs.loadingModal.show()
        } else {
          this.$refs.loadingModal.hide()
          this.$bvToast.toast('Ilość wyników przy wygenerowaniu MTSF zależy od uprawnień, które masz w szkołach / klubach lub wybranej filtracji.', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-right',
            solid: true,
            variant: 'info',
            appendToast: false,
            autoHideDelay: 10000
          })
        }
      },
      searchText: function (val) {
        this.changeAdminNavbarButtonWithParams()
      },
      selectedLeaders: function (val) {
        this.changeAdminNavbarButtonWithParams()
      },
      selectedSeasons: function (val) {
        this.changeAdminNavbarButtonWithParams()
      },
      '$route.params.tab': function (val) {
        if (val === 'values') {
          this.changeAdminNavbarButton({buttonLink: false})
        } else {
          this.changeAdminNavbarButtonWithParams()
        }
      }
    },
    methods: {
      filterMtsfList (currentPage = 1, reset = false) {
        let filters = {
          searchText: this.searchText,
          selectedLeaders: this.selectedLeaders,
          selectedSeasons: this.selectedSeasons
        }
        this.$store.dispatch('getMtsfList',
                             {filters: filters, currentPage: currentPage, perPage: this.perPage})
          .then(response => {
            console.log(response.data)
            this.totalRows = response.totalCount
            this.listItems = response.data
            if (reset) this.currentPage = 1
          })
      },
      changeAdminNavbarButtonWithParams () {
        this.changeAdminNavbarButton({
          buttonLink: false,
          generateExcel: this.generateExcel,
          generatePdf: this.generatePdf,
          generationParams: {
            type: this.selectedType,
            filters: {
              searchText: this.searchText,
              selectedLeaders: this.selectedLeaders,
              selectedSeasons: this.selectedSeasons
            },
            results: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          }
        })
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({name: 'mtsf', params: {'tab': 'participants'}})
      }

      this.filterMtsfList()

      this.$store.dispatch('getSchools', {})
      this.$store.dispatch('getLeaders', {confirmed: 1, returnType: 'short'})
      this.$store.dispatch('getSeasons')

      this.changeAdminNavbarButtonWithParams()
      this.changeAdminNavbarBreadcrumbs([{text: 'Lista MTSF', active: true}])
    }
  }
</script>

<style scoped>

</style>
