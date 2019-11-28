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
          >
            <!--            @row-clicked="rowRedirect"-->
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

            <template slot="btnTable" slot-scope="scope">
              <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
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
          >
            <!--            @row-clicked="rowRedirect"-->

            <template slot="type" slot-scope="scope">
              <span>{{scope.item.title}}</span>
            </template>

            <template slot="object" slot-scope="scope">
              <span>{{scope.item.placeType.title}}</span>
            </template>

            <template slot="data" slot-scope="scope">
              <span>{{scope.item.created}}</span>
            </template>

            <template slot="btnTable" slot-scope="scope">
              <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
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
        <h4 v-b-toggle.collapse-teachers><span class="mr-3">^</span>Prowadzący</h4>

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
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    components: {},
    mixins: [ SchoolsAndClubsMixin, SportObjectsMixin, EventBusEmit ],
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
          { key: 'type', label: 'Nazwa obiektu', sortable: true },
          { key: 'name', label: 'Typ obiektu', sortable: true },
          { key: 'data', label: 'Data dodania', sortable: true },
          { key: 'btnTable', label: '', sortable: true },
          { key: 'edit', label: '' }
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
      schoolsToConfirm () {
        return this.$store.getters.schoolsToConfirm
      },
      sportObjectsToConfirm () {
        return this.$store.getters.sportObjectsToConfirm
      }
    },
    created () {
      this.$store.dispatch('getSchools', { confirmed: 0 })
      this.$store.dispatch('getSportObjects', { confirmed: 0 })

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Dashboard', active: true } ])
    }
  }
</script>

<style scoped>

</style>
