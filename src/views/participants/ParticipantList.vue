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
                <treeselect v-model="years.id" v-if="years"
                            :multiple="false" class="custom"
                            placeholder="Rocznik" :options="participantYears"
                            :class="{'error-input-custom': veeErrors.has('years')}"
                            name="years" key="years" v-validate="{'required':true}"
                />
              </b-col>
              <b-col cols="4">
                <treeselect v-model="classes.id" v-if="classes"
                            :multiple="false" class="custom"
                            placeholder="Klasa" :options="participantClass"
                            :class="{'error-input-custom': veeErrors.has('title')}"
                            name="title" key="title" v-validate="{'required':true}"
                />
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
          :items="participantList"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirect"
        >

          <template slot="class" slot-scope="scope">
            <span>{{scope.item.class.title}}</span>
          </template>
          <!--          <template slot="year" slot-scope="scope">-->
          <!--            <span>{{scope.item.years}}</span>-->
          <!--          </template>-->
          <template slot="status" slot-scope="scope">
            <span class="status"
                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
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
  import ParticipantMixin from '@/mixins/participant-mixin'

  export default {
    components: { Treeselect },
    props: [ 'participant' ],
    mixins: [ EventBusEmit, ParticipantMixin ],
    data () {
      return {
        fields: [
          { key: 'firstName', label: 'Imię', sortable: true },
          { key: 'lastName', label: 'Nazwisko', sortable: true },
          { key: 'sex', label: 'Płeć', sortable: true },
          { key: 'year', label: 'Rocznik', sortable: true },
          { key: 'class', label: 'Klasa', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ],

        search: '',

        selectedGender: [],
        genderOptions: [
          { text: 'kobieta', value: 0 },
          { text: 'mężczyzna', value: 1 }
        ],

        selectedClass: null,
        selectedYear: null,
        // temp
        years: [],
        classes: []
      }
    },
    computed: {
      participantList () {
        return this.$store.getters.participants
      }
    },
    methods: {
      rowRedirect (row) {
        this.$router.push({
          name: 'participant',
          params: { 'tab': 'main-data', 'id': row.id }
        })
      }
    },
    created () {
      this.$store.dispatch('getParticipants')
      this.$store.dispatch('getClasses')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'participant', params: { tab: 'main-data' } })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Zawodnicy', active: true } ])
    }
  }
</script>

<style scoped>

</style>
