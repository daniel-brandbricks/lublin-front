<template>
  <section>
    <!--  from restaurants  -->
    <b-col class="flex-shrink-1">
      <div class="navbar-content-tabs-box">
        <b-row class="justify-content-center justify-content-lg-start">
          <b-col cols="12" class="text-center text-lg-left">
            <b-link class="link-content" :active="showAdminsOnly"
                    @click="showAdminsOnly = !showAdminsOnly">administratorzy
            </b-link>
            <b-link class="link-content" :active="!showAdminsOnly"
                    @click="showAdminsOnly = !showAdminsOnly">użytkownicy
            </b-link>
          </b-col>
        </b-row>
      </div>
    </b-col>

    <div class="px-5 mt-3 row">
      <b-col cols="4">
        <div class="d-inline-flex">
          <b-form-group class="custom">
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selectedType"
              :options="typeOptions"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
      </b-col>

      <b-col cols="4">
        <treeselect class="" v-model="districtValue" :multiple="true" :options="optionsTS"/>
      </b-col>
      <b-col cols="4">
        <treeselect class="" v-model="districtValue" :multiple="true" :options="optionsTS"/>
      </b-col>

      <b-col class="mt-5">
        <b-table
          :items="items"
          :fields="fields"
          sort-icon-left
          responsive="sm"
        ></b-table>
      </b-col>
    </div>

  </section>
</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'SchoolsAndClubsList',
  components: {Treeselect},
  data () {
    return {
      // checkboxes
      selectedType: [],
      typeOptions: [
        {text: 'klub', value: '1'},
        {text: 'szkola', value: '2'}
      ],

      // treeselect
      districtValue: null,
      optionsTS: [{
        id: 'a',
        label: 'a',
        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }]
      }, {
        id: 'b',
        label: 'b'
      }, {
        id: 'c',
        label: 'c'
      }],

      // table
      fields: [
        { key: 'last_name', sortable: true },
        { key: 'first_name', sortable: true },
        { key: 'age', sortable: true },
        { key: 'isActive', sortable: false }
      ],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
