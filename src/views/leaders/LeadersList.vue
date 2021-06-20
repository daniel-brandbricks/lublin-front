<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
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

    <leader-table :is-confirmed="true"
      :filters="{selectedDisciplines: selectedDisciplines, selectedSportObjects: selectedSportObjects, search: search}"
      :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"/>
    <leader-table :is-confirmed="false"
      :filters="{selectedDisciplines: selectedDisciplines, selectedSportObjects: selectedSportObjects, search: search}"
      :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"/>

  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import ListMixin from '@/mixins/list-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'

  import LeaderTable from '@/views/leaders/components/LeaderTable'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Leaders',
    components: { TabLinks, Treeselect, LeaderTable },
    mixins: [ EventBusEmit, ListMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Zatwierdzone',
            link: 'leaders',
            tab: 'confirmed'
          },
          // {
          //   title: 'Do zatwierdzenia (' + this.$store.getters.leadersToConfirm.length + ')',
          //   link: 'leaders',
          //   tab: 'to-confirm'
          // }
        ],

        selectedDisciplines: [],
        selectedSportObjects: [],
        search: ''
      }
    },
    computed: {
      ...mapGetters([ 'disciplines', 'sportObjects' ]),
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
      isDirector () {
        return this.$store.getters.isDirector
      }
    },
    watch: {
      isDirector: function (val) {
        this.checkNavButton(val)
      },
      '$store.getters.leadersToConfirm': function (val) {
        this.tabLinks = [
          {
            title: 'Zatwierdzone',
            link: 'leaders',
            tab: 'confirmed'
          },
          // {
          //   title: 'Do zatwierdzenia (' + val.length + ')',
          //   link: 'leaders',
          //   tab: 'to-confirm'
          // }
        ]
      }
    },
    methods: {
      checkNavButton (val) {
        if (val) {
          /** @buttonLink route name || false if button must be hidden */
          this.changeAdminNavbarButton({ buttonLink: 'leader', params: { tab: 'main-data' } })
        } else {
          this.changeAdminNavbarButton({buttonLink: false})
        }
      }
      // rowRedirect (id, isConfirmed) {
      //   this.$router.push({
      //     name: 'leader',
      //     params: { 'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed }
      //   })
      // }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'leaders', params: { 'tab': 'confirmed' } })
      }

      this.$store.dispatch('getLeaders', {confirmed: 1, returnType: 'short'})
      this.$store.dispatch('getLeaders', {confirmed: 0, returnType: 'short'})

      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getSportObjects', {returnType: 'short'})

      this.checkNavButton(this.isDirector)
      this.changeAdminNavbarBreadcrumbs([ { text: 'Prowadzący', active: true } ])
    }
  }
</script>

<style scoped>

</style>
