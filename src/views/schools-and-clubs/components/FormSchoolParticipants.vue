<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-center align-items-center">
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                :id="'checkbox-group-1'+statusSlot?'111':'222'"
                v-model="selectedGender"
                :options="genderOptions"
                :name="'checkbox-group-1'+statusSlot?'111':'222'"
              />
            </b-form-group>
          </b-col>
          <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
            <b-row class="align-items-center">
              <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
                <treeselect class="custom"
                            v-model="yearValue"
                            :multiple="true"
                            placeholder="Rocznik"
                            :options="years"/>
              </b-col>
              <!--              <b-col cols="4">-->
              <!--                <treeselect class="custom"-->
              <!--                            v-model="selectedClasses" v-if="selectedClasses"-->
              <!--                            :multiple="true"-->
              <!--                            placeholder="Klasa"-->
              <!--                            :options="classesTreeselect"-->
              <!--                />-->
              <!--              </b-col>-->
              <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
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
      <b-col class="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-4">
        <b-row class="justify-content-end mb-3">
          <b-btn variant="primary" class="mr-3" @click="filter(1, true)">Filtruj</b-btn>
        </b-row>

        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
          aria-controls="history-table"
        />

        <b-table
          :items="participantList"
          :fields="fields"
          :per-page="perPage"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >

          <!--          todo class-->
          <!--          <template slot="class" slot-scope="scope">-->
          <!--            <span>{{getClassTitleById(scope.item.class.id)}}</span>-->
          <!--          </template>-->
          <!--          todo rocznik-->
          <template slot="sex" slot-scope="scope">
            <span>{{ scope.item.sex === 1 ? 'Mężczyzna' : 'Kobieta' }}</span>
          </template>

          <template slot="enterDate" slot-scope="scope">
            <span>{{ scope.item.enterDate }}</span>
          </template>

          <template slot="schoolstatus" slot-scope="scope">
            <template>
              <b-dropdown class="status-dropdown">
                <template v-slot:button-content>
                <span class="status c-pointer"
                    :class="{'active': !!getParticipantSchoolStatus(scope.item.schoolsParticipants)}">
                  {{ !!getParticipantSchoolStatus(scope.item.schoolsParticipants) ? 'aktywny' : 'nieaktywny' }}
                </span>
                </template>
                <b-dropdown-item :disabled="getParticipantSchoolStatus(scope.item.schoolsParticipants) == 1"
                                 @click="changeParticipantStatusSchool(scope.item.id, 1)">
                  Aktywuj
                </b-dropdown-item>
                <b-dropdown-item :disabled="getParticipantSchoolStatus(scope.item.schoolsParticipants) == 0"
                                 @click="changeParticipantStatusSchool(scope.item.id, 0)">
                  Dezaktywuj
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </template>

          <template slot="status" slot-scope="scope">
            <b-dropdown class="status-dropdown">
              <template v-if="undefined === statusSlot" v-slot:button-content>
                <span class="status c-pointer"
                      :class="{'active': scope.item.active}">
                  {{ scope.item.active == 1 ? 'aktywny' : 'nieaktywny' }}
                </span>
              </template>
              <template v-else v-slot:button-content>
                <span class="status c-pointer"
                      :class="{'active': scope.item.status}">
                  {{ scope.item.status == 1 ? 'aktywny' : 'nieaktywny' }}
                </span>
              </template>
              <b-dropdown-item :disabled="undefined === statusSlot ? scope.item.active : scope.item.status"
                               @click="changeParticipantStatus(scope.item.id, 1)">
                Aktywuj
              </b-dropdown-item>
              <b-dropdown-item :disabled="undefined === statusSlot ? !scope.item.active : !scope.item.status"
                               @click="changeParticipantStatus(scope.item.id, 0)">
                Dezaktywuj
              </b-dropdown-item>
            </b-dropdown>

            <!--            <span class="ml-2 c-pointer" @click="rowRedirect(scope.item)">Więcej info</span>-->
          </template>

          <template slot="edit" slot-scope="scope">
            <span class="ml-2 c-pointer" @click="rowRedirect(scope.item)">Więcej info</span>
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

  import {YEARS} from '@/config/AppConfig'

  import ToastMixin from '@/mixins/toast-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import ParticipantMixin from '@/mixins/participant-mixin'

  export default {
    components: {Treeselect},
    props: ['participant', 'statusSlot', 'school', 'schoolIds', 'lesson', 'disableNavButton'],
    mixins: [EventBusEmit, ParticipantMixin, ToastMixin],
    data () {
      return {
        id: this.$route.params.id,
        currentPage: 1,
        perPage: 20,
        totalRows: 0,

        fields: [
          {key: 'firstName', label: 'Imię', sortable: true},
          {key: 'lastName', label: 'Nazwisko', sortable: true},
          {key: 'sex', label: 'Płeć', sortable: true},
          {key: 'year', label: 'Rocznik', sortable: true},
          {key: 'enterDate', label: 'Data wpisu', sortable: true},
          {key: 'removeDate', label: 'Data wypisania', sortable: true},
          // {key: 'class', label: 'Klasa', sortable: true},
          {key: 'schoolstatus', label: 'Status w szkołe/klubu', sortable: true},
          {key: 'status', label: this.statusSlot ? this.statusSlot.columnWord : 'Status w systemie', sortable: true},
          {key: 'edit', label: ''}
        ],

        selectedGender: [],
        genderOptions: [
          {text: 'kobieta', value: 0},
          {text: 'mężczyzna', value: 1}
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
        let participants = this.$store.getters.participants
        let filteredParticipants = []

        for (let index in participants) {
          if (undefined === participants[index] || participants[index] === null) {
            continue
          }

          if (this.statusSlot) {
            let ids = Object.keys(this.statusSlot.ids)
            let preparedParticipant = participants[index]
            if (ids.includes(participants[index].id.toString())) {
              preparedParticipant.status = this.statusSlot.ids[participants[index].id]
              filteredParticipants.push(preparedParticipant)
            }
          } else {
            filteredParticipants.push(participants[index])
          }
        }

        return filteredParticipants
      }
    },
    watch: {
      currentPage: function (val) {
        this.filter(val)
      }
    },
    methods: {
      changeParticipantStatusSchool (participantId, status) {
        this.$store.dispatch('putParticipant', {
          id: participantId,
          schoolId: this.id,
          status: status,
          actionType: 'changeSchoolStatus'
        })
      },
      filter (currentPage = 1, reset = false) {
        let filters = {
          search: this.search || '',
          selectedGender: this.selectedGender || [],
          yearValue: this.yearValue || [],
          schoolId: this.id
        }

        if ((this.lesson && this.lesson.participantGroup && this.lesson.participantGroup.id)) {
          filters.participantGroupId = this.lesson.participantGroup.id
        }
        // if (this.school && this.school.id) {
        //   // filters.schoolId = this.school.id
        //   filters.schoolId = this.id
        // }
        // if (this.schoolIds && this.schoolIds.length > 0) {
        //   filters.schoolIds = this.schoolIds
        // }
        if (this.statusSlot && this.statusSlot.ids) {
          filters.participantIds = Object.keys(this.statusSlot.ids)
        }
        this.$store.dispatch('getParticipants', {
          filters: filters, currentPage: currentPage, perPage: this.perPage
        })
          .then(response => {
            this.filterResponse(response, reset)
          })
      },
      filterResponse (response, reset) {
        // this.historyData = response.data
        this.totalRows = response.totalCount

        if (reset) this.currentPage = 1
      },
      changeParticipantStatus (id, status) {
        if (undefined === this.statusSlot) {
          this.$store.dispatch('putParticipant', {
            id: id,
            active: status,
            actionType: 'put-partly'
          }).catch(error => {
            this.showToast(error.data.error, 'Wystąpil błąd')
          })
          return
        }

        this.$emit(this.statusSlot.event, ({id: id, status: status}))
      },
      getClassTitleById (id, index = null, arrayLength = null) {
        if (undefined === this.classes || this.classes === null) return ''
        // todo error title of undefined
        let dictionaryClass = this.classes.find((obj) => {
          return obj.id === id
        })

        return undefined === dictionaryClass ? '' : dictionaryClass.title + ((index + 1) < arrayLength ? ',' : '')
      },
      //  todo check
      rowRedirect (row) {
        this.$router.push({
          name: 'participant',
          params: {'tab': 'main-data', 'id': row.id}
        })
      },
      getParticipantSchoolStatus (schoolsParticipants) {
        if (schoolsParticipants && schoolsParticipants.length > 0) {
          let element = schoolsParticipants.find(e => {
            return Number(e.school.id) === Number(this.id)
          })
          return element.status
        }
        return false
      }
    },
    created () {
      this.filter()
      this.$store.dispatch('getClasses')

      if (undefined === this.disableNavButton) {
        /** @buttonLink route name || false if button must be hidden */
        this.changeAdminNavbarButton({buttonLink: 'participant', params: {tab: 'main-data'}})
      }
      if (this.statusSlot === undefined && undefined === this.school && undefined === this.schoolIds &&
        undefined === this.lesson) {
          this.changeAdminNavbarBreadcrumbs([{text: 'Zawodnicy', active: true}])
        }
    }
  }
</script>

<style scoped>

</style>
