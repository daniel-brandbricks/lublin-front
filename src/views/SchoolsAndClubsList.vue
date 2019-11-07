
<template>

    <section>
      <!--  from restaurants  -->
      <b-row class="align-items-center">
        <b-col class="">
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
        <b-col cols="12">
          <button class="btn btn-primary" id="menu-toggle" @click="toggleSidebar">Toggle Menu</button>
        </b-col>
      </b-row>
      <b-row class="align-items-center mb-5">
        <b-col cols="4" >
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
          <treeselect class="custom" v-model="districtValue" :multiple="true" :options="optionsTS"/>
        </b-col>
        <b-col cols="4">
          <treeselect class="custom" v-model="districtValue" :multiple="true" :options="optionsTS"/>
        </b-col>
      </b-row>
      <b-row class="align-items-center justify-content-center">
      <b-col cols="12" lg="8" class="">
          <b-table
            :items="items"
            :fields="fields"
            striped
            sort-icon-left
            responsive="sm"
            class="custom table-responsive"
          ></b-table>
        </b-col>
      </b-row>
    </section>

</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import EventBus from '../event-bus'

export default {
  name: 'SchoolAndClubListList',
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
        { key: 'age', sortable: false },
        { key: 'isActive', sortable: false }
      ],
      items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  },
  methods:{
    toggleSidebar () {
      EventBus.$emit('TOGGLE_SIDEBAR')
    }
  }
}
</script>

<style scoped>

</style>
