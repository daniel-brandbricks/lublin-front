<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="10">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="4">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                :id="'checkbox-group-1'+statusSlot?'111':'222'"
                v-model="selectedGender"
                :options="genderOptions"
                :name="'checkbox-group-1'+statusSlot?'111':'222'"
              />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-row class="align-items-center">
              <b-col cols="6">
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
              <b-col cols="6">
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
      <b-col cols="10" class="mt-4">
        <b-table
          :items="participantList"
          :fields="fields"
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
            <span>{{scope.item.sex === 1 ? 'Mężczyzna' : 'Kobieta'}}</span>
          </template>

          <template slot="status" slot-scope="scope">

            <b-dropdown class="status-dropdown">
              <template v-if="undefined === statusSlot" v-slot:button-content>
                <span class="status c-pointer"
                      :class="{'active': scope.item.active}">
                  {{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}
                </span>
              </template>
              <template v-else v-slot:button-content>
                <span class="status c-pointer"
                      :class="{'active': scope.item.status}">
                  {{scope.item.status == 1 ? 'aktywny' : 'nieaktywny'}}
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

            <span class="ml-2 c-pointer" @click="rowRedirect(scope.item)">Więcej info</span>
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

  import {YEARS} from '@/config/AppConfig'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import ParticipantMixin from '@/mixins/participant-mixin'
  import EventBus from '@/event-bus'

  export default {
    components: {Treeselect},
    props: ['participant', 'statusSlot', 'school', 'schoolIds', 'lesson', 'disableNavButton'],
    mixins: [EventBusEmit, ParticipantMixin],
    data () {
      return {
        fields: [
          {key: 'firstName', label: 'Imię', sortable: true},
          {key: 'lastName', label: 'Nazwisko', sortable: true},
          {key: 'sex', label: 'Płeć', sortable: true},
          {key: 'year', label: 'Rocznik', sortable: true},
          // {key: 'class', label: 'Klasa', sortable: true},
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
        let search = this.search || ''
        let selectedGender = this.selectedGender || []
        let yearValue = this.yearValue || []
        let classes = this.selectedClasses || []

        for (let index in participants) {
          if (undefined === participants[index] || participants[index] === null) {
            continue
          }

          let firstName = participants[index].firstName || ''
          let lastName = participants[index].lastName || ''
          let fullName = firstName.toLowerCase() + lastName.toLowerCase()

          if (search.length > 0 && fullName.indexOf(search.toLowerCase()) === -1) continue
          if (selectedGender.length > 0 && !selectedGender.includes(participants[index].sex)) continue
          if (yearValue.length > 0 && !yearValue.includes(parseInt(participants[index].year))) continue
          if (classes.length > 0 && !classes.includes(parseInt(participants[index].class))) continue

          // for school & leader & lesson component
          if ((this.lesson && this.lesson.participantGroup && this.lesson.participantGroup.id)) {
            if (participants[index].participantGroups.length < 1) continue
            let lessonExists = participants[index].participantGroups.find(x => {
              return x.participantGroup.id === this.lesson.participantGroup.id
            })
            console.log(lessonExists)
            if (undefined === lessonExists) continue
          }
          if ((this.school && this.school.id)) {
            if (this.school.id !== participants[index].school.id) continue
          }
          if ((this.schoolIds && this.schoolIds.length > 0)) {
            if (!this.schoolIds.includes(participants[index].school.id)) continue
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
    methods: {
      changeParticipantStatus (id, status) {
        console.log(this.statusSlot)
        console.log(status)

        if (undefined === this.statusSlot) {
          this.$store.dispatch('putParticipant', {
            id: id,
            active: status,
            actionType: 'put-partly'
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
      }
    },
    created () {
      if (undefined === this.school) {
        this.$store.dispatch('getParticipants')
      } else {
        this.$store.dispatch('getParticipants', {schools: this.school.id})
      }
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
