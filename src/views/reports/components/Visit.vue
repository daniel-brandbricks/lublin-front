<template>
  <b-row>
    <b-col>
      <h2 class="my-3">Lokalizacja</h2>
      <treeselect class="custom mb-2"
                  v-model="districtValue"
                  :multiple="true"
                  placeholder="Dzielnica"
                  :options="districts"/>
      <treeselect class="custom mb-2"
                  v-model="addressValue"
                  :multiple="true"
                  placeholder="Adres"
                  :options="addresses"/>
      <treeselect class="custom mb-2"
                  v-model="distanceValue"
                  :multiple="true"
                  placeholder="W odległości 1km"
                  :options="distances"/>

      <h2 class="my-3">Zajęcia</h2>

      <b-form-group class="custom my-3">
        <b-form-checkbox-group
          id="checkbox-group-type"
          v-model="selectedAccepted"
          :options="acceptedValues"
          name="checkbox-group-type"
        ></b-form-checkbox-group>
      </b-form-group>

      <lessons-visit :lessons="lessons"/>
    </b-col>
    <b-col>
      <h2 class="my-3">Mapa</h2>
      <h1>MAP</h1>
    </b-col>
  </b-row>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Events from '@/components/common-views/Events'
  import { DISTRICTS } from '@/config/AppConfig'
  import TabLinks from '@/components/TabLinks'
  import Calendar from '@/components/common-views/Calendar'
  import LessonsVisit from '@/views/reports/components/lessonsVisit'
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    name: 'Reporting',
    components: { Treeselect, Events, TabLinks, Calendar, LessonsVisit },
    mixins: [ EventBusEmit ],
    data () {
      return {
        districtValue: null,
        addressValue: null,
        distanceValue: null,
        districts: DISTRICTS,
        addresses: [
          { id: 1, label: 'Centrum' },
          { id: 2, label: 'Al. Jana Pawła II' },
          { id: 3, label: 'Ratusz Arsenal' }
        ],
        distances: [
          { id: 1, label: '1km' },
          { id: 2, label: '2km' },
          { id: 3, label: '3km' }
        ],

        selectedAccepted: [],
        acceptedValues: [
          { text: 'Zatwierdzone', value: 1 },
          { text: 'Do zatwierdzenia', value: 0 }
        ],

        lessons: {
          districtValue: null,
          districts: DISTRICTS,

          selectedType: [],
          typeOptions: [
            { text: 'klub', value: 0 },
            { text: 'szkola', value: 1 }
          ],
          selectedGender: [],
          genderOptions: [
            { text: 'kobieta', value: 0 },
            { text: 'mężczyzna', value: 1 }
          ],

          schoolsAndClubs: null,
          selectedDiscipline: null,
          selectedCategory: null,
          selectedClass: null,
          selectedSportObject: null,
          selectedLeader: null,
          selectedParticipant: null,
          selectedLesson: null,

          // temp
          disciplines: [
            { id: 1, label: 'Basen' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Bieg' }
          ],
          categories: [
            { id: 1, label: 'pierwsza' },
            { id: 2, label: 'druga' },
            { id: 3, label: 'cos cos' }
          ],
          classes: [
            { id: 1, label: '2b' },
            { id: 2, label: '6a' },
            { id: 3, label: '8c' }
          ],
          sportObjects: [
            { id: 1, label: 'Park' },
            { id: 2, label: 'Siłownia' },
            { id: 3, label: 'Basen' }
          ],
          leaders: [
            { id: 1, label: 'Mark White' },
            { id: 2, label: 'Ben Stiffler' },
            { id: 3, label: 'Thomas Shelby' }
          ]
        }
      }
    },
    computed: {},
    methods: {},
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false, generatePdf: true })
    }
  }
</script>

<style scoped>

</style>
