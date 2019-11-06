<template>
  <div class="container">
    <b-row class="justify-content-center align-items-center">
      <b-col cols="8">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="3">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedGender"
                :options="genderOptions"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="9">
            <b-row class="align-items-center">
              <b-col cols="4">
                <treeselect class="custom"
                            v-model="selectedYear"
                            :multiple="true"
                            placeholder="Rocznik"
                            :options="years"/>
              </b-col>
              <b-col cols="4">
                <treeselect class="custom"
                            v-model="selectedClass"
                            :multiple="true"
                            placeholder="Klasa"
                            :options="classes"/>
              </b-col>
              <b-col cols="4">
                <b-form-group class="custom">
                  <b-form-input id="input-1" class="custom m-0"
                                placeholder="Szukaj"
                                v-model="search"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col cols="8" class="mt-4">
        <b-table
          :items="participants"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <!--          @row-clicked="rowRedirect"-->

          <template slot="status" slot-scope="scope">
            <span class="status" :class="{'active': scope.item.status}">{{scope.item.status == 1 ? 'aktywny' : 'nieaktywny'}}</span>
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
// node_modules
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import EventBusEmit from '@/mixins/event-bus-emit'

export default {
  components: {Treeselect},
  mixins: [EventBusEmit],
  data () {
    return {
      fields: [
        {key: 'name', label: 'Imię', sortable: true},
        {key: 'surname', label: 'Nazwisko', sortable: true},
        {key: 'gender', label: 'Płeć', sortable: true},
        {key: 'year', label: 'Rocznik', sortable: true},
        {key: 'class', label: 'Klasa', sortable: true},
        {key: 'status', label: 'Status w systemie', sortable: true},
        {key: 'edit', label: ''}
      ],

      search: '',

      selectedGender: [],
      genderOptions: [
        {text: 'kobieta', value: 0},
        {text: 'mężczyzna', value: 1}
      ],

      selectedClass: null,
      selectedYear: null,
      // temp
      years: [
        {id: 1, label: '2000'},
        {id: 2, label: '2001'},
        {id: 3, label: '2002'}
      ],
      classes: [
        {id: 1, label: '2b'},
        {id: 2, label: '6a'},
        {id: 3, label: '8c'}
      ]
    }
  },
  computed: {
    participants () {
      return [
        {name: 'Name', surname: 'Surname', gender: 1, year: 1, class: 1, status: 0},
        {name: 'Name', surname: 'Surname', gender: 1, year: 1, class: 1, status: 0},
        {name: 'Name', surname: 'Surname', gender: 1, year: 1, class: 1, status: 1},
        {name: 'Name', surname: 'Surname', gender: 1, year: 1, class: 1, status: 1}
      ]
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: 'participant'})
    this.changeAdminNavbarBreadcrumbs([{text: 'Zawodnicy', active: true}])
  }
}
</script>

<style scoped>

</style>
