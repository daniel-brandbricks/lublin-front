<template>
  <div class="container">
    <b-row class="justify-content-center align-items-center">
<!--      todo выровнять чекбокс-->
      <b-col cols="8">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedGender"
                :options="genderOptions"
                name="flavour-1"
              />
            </b-form-group>
          </b-col>
          <b-col cols="9">
            <b-row class="align-items-center">
              <b-col cols="4">
                <treeselect class="custom"
                            v-model="yearValue"
                            :multiple="true"
                            placeholder="Rocznik"
                            :options="years"/>
              </b-col>
              <b-col cols="4">
                <treeselect v-model="selectedClasses" v-if="selectedClasses"
                            :multiple="true" class="custom"
                            placeholder="Klasa" :options="participantListClass"
                />
              </b-col>
              <b-col cols="4">
                <b-form-group class="custom">
                  <b-form-input id="input-1" class="custom m-0"
                                placeholder="Szukaj"
                                v-model="search"/>
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
            <span>{{getClassTitleById(scope.item.class.id)}}</span>
          </template>
<!--          todo rocznik-->
          <template slot="sex" slot-scope="scope">
            <span>{{scope.item.sex === 1 ? 'Mężczyzna' : 'Kobieta'}}</span>
          </template>

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

  import { YEARS } from '@/config/AppConfig'

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

        selectedGender: [],
        genderOptions: [
          { text: 'kobieta', value: 0 },
          { text: 'mężczyzna', value: 1 }
        ],

        yearValue: null,
        years: YEARS,
        selectedClasses: [],
        search: ''
      }
    },
    computed: {
      classes () {
        return this.$store.getters.classes
      },
      participantList () {
        let participantList = this.$store.getters.participants

        let filteredParticipantList = []
        let search = this.search || ''
        let selectedGender = this.selectedGender || []
        //  todo for years
        let classes = this.selectedClasses || []

        for (let index in participantList) {
          if (search.length > 0 && participantList[index].title.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
          if (selectedGender.length > 0 && !selectedGender.includes(participantList[index].sex)) continue
          if (classes.length > 0 && !classes.includes(parseInt(participantList[index].class.id))) continue
          filteredParticipantList.push(participantList[index])
        }

        return filteredParticipantList
      }
    },
    methods: {
      getClassTitleById (id) {
        if (undefined === this.classes || this.classes === null || this.classes.length < 1) return ''
        return this.classes.find((obj) => {
          return obj.id === id
        }).title
      },
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
