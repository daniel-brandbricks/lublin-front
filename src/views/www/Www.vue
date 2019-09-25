<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks></TabLinks>
      </b-col>
      <b-col cols="12" lg="3" class="">
        <h2>Logo</h2>
        <div class="wrap-img-input mb-3">
          <img src="https://placeimg.com/200/200/any" alt="img">
        </div>
        <b-row class="justify-content-center justify-content-md-end">
          <b-col cols="12" sm="6" md="4" lg="12">
            <b-btn variant="primary" class="custom" block>Zmień</b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="5">
        <h2>Struktura menu</h2>

        <b-table
          :items="items"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        ></b-table>
        <b-row class="justify-content-center justify-content-sm-end">
          <b-col cols="12" sm="4">
            <b-btn variant="secondary" class="custom" block>Anuluj</b-btn>
          </b-col>
          <b-col cols="12" sm="4">
            <b-btn variant="primary" class="custom" block>Zapisz</b-btn>
          </b-col>

        </b-row>

      </b-col>
    </b-row>

    <!--page 2 -->
    <b-row class="justify-content-center">
      <b-col cols="12" lg="8">
        <h2>Struktura menu</h2>

        <b-table
          :items="items"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        ></b-table>
        <b-row class="justify-content-center justify-content-sm-end">
          <b-col cols="12" sm="4">
            <b-btn variant="secondary" class="custom" block>Anuluj</b-btn>
          </b-col>
          <b-col cols="12" sm="4">
            <b-btn variant="primary" class="custom" block>Zapisz</b-btn>
          </b-col>

        </b-row>

      </b-col>
    </b-row>

    <!--page 3 -->
    <b-row class="justify-content-center">
      <b-col cols="12" lg="3" class="">
        <h2>Logo</h2>
        <div class="wrap-img-input mb-3">
          <img src="https://placeimg.com/200/200/any" alt="img">
        </div>
        <b-row class="justify-content-center justify-content-md-end">
          <b-col cols="12" sm="6" md="4" lg="12">
            <b-btn variant="primary" class="custom" block>Zmień</b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" lg="5">
        <h2>Struktura menu</h2>

        <b-form-group
          class="custom"
          label-for="input-1">
          <b-form-input id="input-1" class="custom"
                        placeholder="Adres"
                        v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group
          class="custom"
          label-for="input-2">
          <b-form-input id="input-2" class="custom"
                        placeholder="E-mail"
                        type="email"
                        v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group
          class="custom"
          label-for="input-3">
          <b-form-input id="input-3" class="custom"
                        placeholder="Telefon"
                        type="phone"
                        v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group
          class="custom"
          label-for="input-4">
          <b-form-input id="input-4" class="custom"
                        placeholder="Facebook"
                        v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group
          class="custom"
          label-for="input-5">
          <b-form-input id="input-5" class="custom"
                        placeholder="YouTube"
                        v-model="name"></b-form-input>
        </b-form-group>

        <b-row class="justify-content-center justify-content-sm-end">
          <b-col cols="12" sm="4">
            <b-btn variant="secondary" class="custom" block>Anuluj</b-btn>
          </b-col>
          <b-col cols="12" sm="4">
            <b-btn variant="primary" class="custom" block>Zapisz</b-btn>
          </b-col>

        </b-row>

      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';
  import TabLinks from '../../components/main/TabLinks'


  export default {
    components: {TabLinks, Datepicker, Treeselect,DatePick },
    data () {
      return {
        date: '2019-09-01',
        selected: [],
        selectedRadio: 'A',
        options: [
          {text: 'first', value: '1'},
          {text: 'secondary', value: '2'},
          {text: 'third', value: '3'},
        ],
        // define the default value
        value: null,
        // define options
        optionsTS: [ {
          id: 'a',
          label: 'first',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'second',
        }, {
          id: 'c',
          label: 'third',
        } ],

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
    }
  }
</script>

<style scoped>

</style>
