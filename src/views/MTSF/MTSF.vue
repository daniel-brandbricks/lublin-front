<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>
    </b-row>

    <b-row :key="$route.params.tab" v-if="$route.params.tab === 'participants'" class="justify-content-center">
      <b-col cols="6">
        <h4>Zakres</h4>
        <b-row class="my-3">
          <b-col cols="5">
            <treeselect class="custom"
                        v-model="dateFrom"
                        :multiple="true"
                        placeholder="Od"
                        :options="years"/>
          </b-col>
          <b-col cols="2">
            <hr class="mt-4">
          </b-col>
          <b-col cols="5">
            <treeselect class="custom"
                        v-model="dateTo"
                        :multiple="true"
                        placeholder="Do"
                        :options="years"/>
          </b-col>
        </b-row>

        <h4>Zajęcia</h4>
        <treeselect class="custom mb-2"
                    v-model="lessons.districtValue"
                    :multiple="true"
                    placeholder="Dzielnica"
                    :options="lessons.districts"/>
        <treeselect class="custom mb-2"
                    v-model="lessons.selectedDiscipline"
                    :multiple="true"
                    placeholder="Dyscyplina"
                    :options="lessons.disciplines"/>

        <treeselect v-model="lessons.schoolsAndClubs"
                    :multiple="true"
                    :searchable="false"
                    placeholder="Nazwa klubu/Szkoły"
                    :options="schoolsAndClubsPrepared"
                    :class="{'error-input-custom': veeErrors.has('sportObject.schools')}"
                    name="sportObject.schools" key="sportObject.schools" v-validate="{'required':true}"
                    class="custom mb-2"/>

        <!--        <treeselect class="custom mb-2"-->
        <!--                    v-model="lessons.selectedCategory"-->
        <!--                    :multiple="true"-->
        <!--                    placeholder="Kategoria"-->
        <!--                    :options="lessons.categories"/>-->
        <!--        <treeselect class="custom mb-2"-->
        <!--                    v-model="lessons.selectedClass"-->
        <!--                    :multiple="true"-->
        <!--                    placeholder="Klasa"-->
        <!--                    :options="lessons.classes"/>-->

        <b-row class="my-3">
          <b-col cols="5">
            <treeselect class="custom"
                        v-model="selectedYearFrom"
                        :multiple="true"
                        placeholder="Rocznik od"
                        :options="years"/>
          </b-col>
          <b-col cols="2">
            <hr class="mt-4">
          </b-col>
          <b-col cols="5">
            <treeselect class="custom"
                        v-model="selectedYearTo"
                        :multiple="true"
                        placeholder="Rocznik do"
                        :options="years"/>
          </b-col>
        </b-row>

        <treeselect class="custom mb-2"
                    v-model="lessons.selectedSportObject"
                    :multiple="true"
                    placeholder="Obiekt sportowy"
                    :options="lessons.sportObjects"/>
        <treeselect class="custom mb-2"
                    v-model="lessons.selectedLeader"
                    :multiple="true"
                    placeholder="Prowadzący"
                    :options="lessons.leaders"/>

        <b-row class="align-items-center mb-2">
          <b-col>
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-gender"
                v-model="lessons.selectedGender"
                :options="lessons.genderOptions"
                name="checkbox-group-gender"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col>
            <treeselect v-model="lessons.schoolsAndClubs"
                        :multiple="true"
                        :searchable="false"
                        placeholder="Lista"
                        :options="schoolsAndClubsPrepared"
                        :class="{'error-input-custom': veeErrors.has('sportObject.schools')}"
                        name="sportObject.schools" key="sportObject.schools" v-validate="{'required':true}"
                        class="custom"/>
          </b-col>
        </b-row>

        <treeselect class="custom mb-2"
                    v-model="lessons.selectedParticipant"
                    :multiple="true"
                    placeholder="Imię i Nazwisko zawodnika"
                    :options="lessons.leaders"/>
        <treeselect class="custom mb-2"
                    v-model="lessons.selectedLesson"
                    :multiple="true"
                    placeholder="Nazwa zajęcia"
                    :options="lessons.sportObjects"/>
      </b-col>
      <b-col cols="6">
        <h4>Wyniki</h4>
        <b-table
          :items="listItems"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <!--              @row-clicked="rowRedirect"-->
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <MTSFValuesList :key="$route.params.tab" v-if="$route.params.tab === 'values'">

    </MTSFValuesList>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { DISTRICTS } from '@/config/AppConfig'
  import MTSFValuesList from '@/views/MTSF/MTSGValuesList'
  import TabLinks from '../../components/TabLinks'

  export default {
    components: { Treeselect, MTSFValuesList, TabLinks },
    mixins: [ EventBusEmit ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Wyniki',
            link: 'mtsf',
            tab: 'participants'
          },
          {
            title: 'Dane Podstawowe',
            link: 'mtsf',
            tab: 'values'
          }
        ],

        dateFrom: null,
        dateTo: null,
        selectedYearFrom: null,
        selectedYearTo: null,
        // temp
        years: [
          { id: 1, label: '2000' },
          { id: 2, label: '2001' },
          { id: 3, label: '2002' }
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
          selectedYear: null,
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
        },

        fields: [
          { key: 'name', label: 'Nazwa listy', sortable: true },
          { key: 'gender', label: 'Płeć', sortable: true },
          { key: 'date', label: 'Data ostatniego obliczenia', sortable: true },
          { key: 'points', label: 'Punkty sumeryczne', sortable: true },
          { key: 'edit', label: '' }
        ],
        listItems: [
          { id: 1, name: 'Lista 1', gender: 'M', date: '04/11/19', points: '3623' },
          { id: 2, name: 'Lista 2', gender: 'K', date: '01/11/19', points: '4234' },
          { id: 3, name: 'Lista 3', gender: 'K', date: '21/12/19', points: '1242' }
        ]
      }
    },
    computed: {
      // copied in FormMainData.vue -> sports-objects
      schoolsAndClubsPrepared () {
        let data = this.$store.getters.schools
        let preparedSchools = []

        for (let schoolIndex in data) {
          preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
        }

        // console.log(preparedSchools)
        return preparedSchools
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'mtsf', params: { 'tab': 'participants' } })
      }

      this.$store.dispatch('getSchools', {})

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false, generateExcel: true, generatePdf: true })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Lista MTSF', active: true } ])
    }
  }
</script>

<style scoped>

</style>
