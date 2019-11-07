<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="justify-content-between align-items-center">
          <b-col cols="6">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedGender"
                :options="genderOptions"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-2"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="8" class="mt-4">
        <b-row class="justify-content-between align-items-center">
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedDiscipline"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="disciplines"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedCategory"
                        :multiple="true"
                        placeholder="Kategoria"
                        :options="categories"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedClass"
                        :multiple="true"
                        placeholder="Klasa"
                        :options="classes"/>
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col cols="8" class="mt-4">
        <b-table
          :items="participantList"
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
        {key: 'name', label: 'Nazwa listy', sortable: true},
        {key: 'discipline', label: 'Dyscyplina', sortable: true},
        {key: 'gender', label: 'Płeć', sortable: true},
        {key: 'category', label: 'Kategoria', sortable: true},
        {key: 'class', label: 'Klasa', sortable: true},
        {key: 'status', label: 'Status w systemie', sortable: true},
        {key: 'edit', label: ''}
      ],

      search: '',

      selectedGender: [],
      selectedType: [],
      typeOptions: [
        {text: 'klub', value: 0},
        {text: 'szkola', value: 1}
      ],
      genderOptions: [
        {text: 'kobieta', value: 0},
        {text: 'mężczyzna', value: 1}
      ],

      selectedDiscipline: null,
      selectedCategory: null,
      selectedClass: null,
      // temp
      disciplines: [
        {id: 1, label: 'Basen'},
        {id: 2, label: 'Siłownia'},
        {id: 3, label: 'Bieg'}
      ],
      categories: [
        {id: 1, label: 'pierwsza'},
        {id: 2, label: 'druga'},
        {id: 3, label: 'cos cos'}
      ],
      classes: [
        {id: 1, label: '2b'},
        {id: 2, label: '6a'},
        {id: 3, label: '8c'}
      ],
    }
  },
  computed: {
    participantList () {
      return [
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, status: 0},
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, status: 0},
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, status: 1},
        {name: 'Test', discipline: 'Biegun', gender: 1, category: 1, class: 1, status: 1}
      ]
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: 'participant.group'})
    this.changeAdminNavbarBreadcrumbs([{text: 'Lista zawodników', active: true}])
  }
}
</script>

<style scoped>

</style>
