<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks></TabLinks>
      </b-col>

    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="8">

        <b-row class="align-items-center mb-3">
          <b-col>
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="optionsTS"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Szukaj"
                        :options="optionsTS"/>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-table
          :items="items"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <template slot="type" slot-scope="scope">
            <div class="d-flex align-items-center justify-content-between">
              <div class="wrap-img-type-table mr-3">
                <img src="https://placeimg.com/50/50/any" alt="">
              </div>
              <span>club/szkola</span>
            </div>

          </template>
          <template slot="status" slot-scope="scope">
            <span class="status active">aktywny</span>
          </template>
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>

        </b-table>
      </b-col>
    </b-row>
    <!--page 2-->
    <b-row class="justify-content-center">
      <b-col cols="8">

        <b-row class="align-items-center mb-3">
          <b-col>
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="optionsTS"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Szukaj"
                        :options="optionsTS"/>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-table
          :items="itemsTwo"
          :fields="fieldsTwo"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <template slot="type" slot-scope="scope">
            <div class="d-flex align-items-center justify-content-between">
              <div class="wrap-img-type-table mr-3">
                <img src="https://placeimg.com/50/50/any" alt="">
              </div>
              <span>club/szkola</span>
            </div>

          </template>
          <template slot="btnTable" slot-scope="scope">
            <b-btn variant="primary" class="custom mb-0">
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
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'

  import TabLinks from '../../components/main/TabLinks'
  import EventBus from '@/event-bus'

  export default {
    components: {TabLinks, Treeselect},
    mixins: [EventBusEmit],
    data () {
      return {
        // checkboxes
        selectedType: [],
        typeOptions: [
          {text: 'klub', value: 'club'},
          {text: 'szkola', value: 'school'}
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
          {key: 'type', label: 'Typ', sortable: true},
          {key: 'name', label: 'Nazwa', sortable: true},
          {key: 'object', label: 'Obiekty sportowe', sortable: true},
          {key: 'email', label: 'E-mail', sortable: true},
          {key: 'status', label: 'status w systemie', sortable: true},
          {key: 'edit', label: ''}
        ],
        items: [
          {type: 'type', name: 'name', object: 'object', email: 'email@email.com', status: 'status', edit: '2'},
          {type: 'type', name: 'name', object: 'object', email: 'email@email.com', status: 'status', edit: '2'},
          {type: 'type', name: 'name', object: 'object', email: 'email@email.com', status: 'status', edit: '2'}
        ],
        // table
        fieldsTwo: [
          {key: 'type', label: 'Typ', sortable: true},
          {key: 'name', label: 'Nazwa', sortable: true},
          {key: 'object', label: 'Obiekty sportowe', sortable: true},
          {key: 'data', label: 'Data dodania', sortable: true},
          {key: 'btnTable', label: '', sortable: true},
          {key: 'edit', label: ''}
        ],
        itemsTwo: [
          {type: 'type', name: 'name', object: 'object', data: 'Data dodania', status: 'status', edit: '2'},
          {type: 'type', name: 'name', object: 'object', data: 'Data dodania', status: 'status', edit: '2'},
          {type: 'type', name: 'name', object: 'object', data: 'Data dodania', status: 'status', edit: '2'}
        ]
      }
    },
    computed: {},
    methods: {},
    created () {
      /**
       * @buttonLink route name
       */
      this.changeAdminNavbarButton({buttonLink: 'school.or.club'})
      this.changeAdminNavbarBreadcrumbs()
    }
  }
</script>

<style scoped>

</style>
