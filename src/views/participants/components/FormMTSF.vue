<template>
  <div class="wrap">
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <b-form-group class="custom">
              <treeselect class="custom m-0"
                          v-model="selectedSeasons"
                          :multiple="true"
                          placeholder="Sezon" :options="seasonsTreeselect"
                          name="season" key="season" v-validate="{'required':true}"/>
            </b-form-group>
          </b-col>
<!--          <b-col>-->
<!--            <date-picker v-model="selectedDate" :lang="datepickerParams.lang"-->
<!--                         :class="{'error-input-custom': veeErrors.has('selectedYear')}"-->
<!--                         :name="'selectedYear'" :key="'selectedYear'"-->
<!--                         value-type="format" format="YYYY-MM-DD"-->
<!--                         v-validate="{'required': true}"-->
<!--                         type="date"-->
<!--                         :id="'selectedYear'" placeholder="Wybierz datę" class="w-100 custom mt-1">-->
<!--            </date-picker>-->
<!--          </b-col>-->
          <b-col>
            <b-form-group class="custom mb-2">
              <b-form-input id="title-1" class="custom m-0"
                            placeholder="Szukaj po imieniu oraz nazwisku"
                            name="searchText" key="searchText" v-validate="{'required':true}"
                            v-model="searchText"/>
            </b-form-group>
          </b-col>
        </b-row>

<!--        <b-row class="justify-content-end">-->
<!--          <b-btn variant="primary" class="custom mr-3">Filtruj</b-btn>-->
<!--        </b-row>-->

        <b-table
          :items="participantMtsfs"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <template slot="firstName" slot-scope="scope">
            <span v-if="scope.item">{{scope.item.participant.firstName}}</span>
          </template>
          <template slot="lastName" slot-scope="scope">
            <span v-if="scope.item">{{scope.item.participant.lastName}}</span>
          </template>
          <template slot="sex" slot-scope="scope">
            <span v-if="scope.item">{{scope.item.participant.sex === 1 ? 'Mężczyzna' : 'Kobieta'}}</span>
          </template>
          <template slot="enterDate" slot-scope="scope">
            <span v-if="scope.item">{{scope.item.participant.enterDate}}</span>
          </template>
          <template slot="removeDate" slot-scope="scope">
            <span v-if="scope.item">{{scope.item.participant.removeDate}}</span>
          </template>
          <template slot="season" slot-scope="scope">
            <span v-if="scope.item">{{scope.item.season.title}}</span>
          </template>
          <template slot="edit" slot-scope="scope">
            <span v-if="scope.item" class="c-pointer" @click="openMTSFModal(scope.item.id)">
              Więcej info
            </span>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="modalMTSF"
             modal-class="custom"
             centered size="sm"
             :hide-footer="true"
             @hidden="resetModal"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        {{participant.firstName}} {{participant.lastName}}
      </template>

      <div slot="default">
        <b-row class="justify-content-center">
          <b-col cols="12">
            <b-form-group class="custom">
              <treeselect class="custom m-0"
                          v-model="mtsf.season.id"
                          :multiple="false"
                          :disabled="!!mtsf.id"
                          placeholder="Sezon" :options="seasonsForFormTreeselect"
                          :class="{'error-input-custom': veeErrors.has('mtsf.season.id')}"
                          name="mtsf.season.id" key="mtsf.season.id" v-validate="{'required':true}"/>
            </b-form-group>

            <b-form-group class="custom mb-2" label="Data urodzenia">
              <date-picker id="name-1" class="custom m-0" :lang="datepickerParams.lang"
                           value-type="format" format="YYYY-MM-DD"
                           :class="{'error-input-custom': veeErrors.has('mtsf.birthday')}"
                           name="mtsf.birthday" key="mtsf.birthday" v-validate="{'required':true}"
                           v-model="mtsf.birthday"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Wzrost (cm)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.height')}"
                            name="mtsf.height" key="mtsf.height" v-validate="{'required':true}"
                            v-model="mtsf.height"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Waga (kg)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.weight')}"
                            name="mtsf.weight" key="mtsf.weight" v-validate="{'required':true}"
                            v-model="mtsf.weight"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Bieg na 50m (s)">
              <b-input-group :append="checkPoints('bieg50m')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.bieg50m')}"
                            name="mtsf.bieg50m" key="mtsf.bieg50m" v-validate="{'required':true}"
                            v-model="mtsf.bieg50m"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Skok dal z miejsca (cm)">
              <b-input-group :append="checkPoints('skokDalZMiejsca')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.skokDalZMiejsca')}"
                            name="mtsf.skokDalZMiejsca" key="mtsf.skokDalZMiejsca" v-validate="{'required':true}"
                            v-model="mtsf.skokDalZMiejsca"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2"
                          label="Bieg na 600m (Dzieci 7-11lat) / 800m (Dziewczyny 12-19lat) / 1000 m ( Chłopcy 12-19 lat)">
              <b-input-group :append="checkPoints('biegDlugaDystancja')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.biegDlugaDystancja')}"
                            name="mtsf.biegDlugaDystancja" key="mtsf.biegDlugaDystancja" v-validate="{'required':true}"
                            v-model="mtsf.biegDlugaDystancja"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Siła dłoni (kG)">
              <b-input-group :append="checkPoints('silaDloni')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.silaDloni')}"
                            name="mtsf.silaDloni" key="mtsf.silaDloni" v-validate="{'required':true}"
                            v-model="mtsf.silaDloni"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2"
                          label="Zwis na ugiętych rękach / Uginanie rąk w zwisie ( Chłopcy 12 -19 lat)">
              <b-input-group :append="checkPoints('zwisNaUgietychRekach')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.zwisNaUgietychRekach')}"
                            name="mtsf.zwisNaUgietychRekach" key="mtsf.zwisNaUgietychRekach"
                            v-validate="{'required':true}"
                            v-model="mtsf.zwisNaUgietychRekach"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class=" mb-2" label="Bieg 4x10m(s)">
              <b-input-group :append="checkPoints('bieg4x10')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.bieg4x10')}"
                            name="mtsf.bieg4x10" key="mtsf.bieg4x10" v-validate="{'required':true}"
                            v-model="mtsf.bieg4x10"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Siady z leżenia">
              <b-input-group :append="checkPoints('siadyZLezenia')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.siadyZLezenia')}"
                            name="mtsf.siadyZLezenia" key="mtsf.siadyZLezenia" v-validate="{'required':true}"
                            v-model="mtsf.siadyZLezenia"/>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-4" label="Skłon tułowia (cm)">
              <b-input-group :append="checkPoints('sklonTulowia')">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.sklonTulowia')}"
                            name="mtsf.sklonTulowia" key="mtsf.sklonTulowia" v-validate="{'required':true}"
                            v-model="mtsf.sklonTulowia"/>
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-3" v-if="undefined === mtsf.finalDate || null === mtsf.finalDate">
          <b-col>
            <b-btn variant="primary" @click="submit(false)" class="custom">
              Zapisz
            </b-btn>
          </b-col>
          <b-col>
            <b-btn variant="primary" @click="checkPunkts" class="custom">
              Zobacz punkty
            </b-btn>
          </b-col>
          <b-col cols="12">
            <b-btn variant="primary" @click="submit(true)" class="custom mt-3">
              Zakończ test
            </b-btn>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import {DATEPICKER_PARAMS} from '@/config/AppConfig'
  import DatePicker from 'vue2-datepicker'
  import EventBus from '@/event-bus'

  export default {
    name: 'FormMTSF',
    props: ['participant'],
    components: {Treeselect, DatePicker},
    mixins: [EventBusEmit, FormMixin],
    data () {
      return {
        generateExcel: true,
        generatePdf: true,
        selectedType: 'Mtsf',

        datepickerParams: DATEPICKER_PARAMS,
        searchText: '',
        selectedSeasons: null,
        selectedDate: null,

        mtsf: {
          season: {
            id: null
          },
          birthday: null,
          height: null,
          weight: null,
          bieg50m: null,
          skokDalZMiejsca: null,
          biegDlugaDystancja: null,
          silaDloni: null,
          zwisNaUgietychRekach: null,
          bieg4x10: null,
          siadyZLezenia: null,
          sklonTulowia: null,
          finalDate: null,
          index: null
        },

        points: {},

        fields: [
          {key: 'firstName', label: 'Imię', sortable: true},
          {key: 'lastName', label: 'Nazwisko', sortable: true},
          {key: 'sex', label: 'Płec', sortable: true},
          {key: 'enterDate', label: 'Data wpisu', sortable: true},
          {key: 'removeDate', label: 'Data wypisania', sortable: true},
          {key: 'season', label: 'Sezon', sortable: true},
          {key: 'finalDate', label: 'Data obliczenia', sortable: true},
          {key: 'totalPoints', label: 'Punkty', sortable: true},
          {key: 'edit', label: 'Zobacz'}
        ]
      }
    },
    computed: {
      participantMtsfs () {
        let mtsfList = this.$store.getters.mtsfList
        let prepared = []

        console.log(this.searchText)
        for (let index in mtsfList) {
          if (mtsfList[index] && mtsfList[index].participant) {
            let string = ' ' +
              (mtsfList[index].participant.firstName ? (mtsfList[index].participant.firstName.toLowerCase() + ' ') : '') +
              (mtsfList[index].participant.lastName ? (mtsfList[index].participant.lastName.toLowerCase() + ' ') : '') +
              (mtsfList[index].participant.enterDate ? (mtsfList[index].participant.enterDate.toLowerCase() + ' ') : '') +
              (mtsfList[index].participant.removeDate ? (mtsfList[index].participant.removeDate.toLowerCase() + ' ') : '') +
              (mtsfList[index].finalDate ? (mtsfList[index].finalDate.toLowerCase() + ' ') : '')

            if (this.searchText.length > 0 && string.indexOf(this.searchText.toLowerCase()) === -1) continue
          }

          if (this.selectedSeasons && this.selectedSeasons.length > 0 &&
            !this.selectedSeasons.includes(mtsfList[index].season.id)) continue

          prepared.push(mtsfList[index])
        }

        return prepared
      },
      seasonsTreeselect () {
        let data = this.$store.getters.seasons
        let preparedSeasons = []

        for (let seasonIndex in data) {
          preparedSeasons.push({id: data[seasonIndex].id, label: data[seasonIndex].title})
        }

        return preparedSeasons
      },
      seasonsForFormTreeselect () {
        let data = this.$store.getters.seasons
        if (data.length < 1) return []
        let preparedSeasons = []
        let participantMtsfs = this.participantMtsfs || []

        for (let seasonIndex in data) {
          let seasonsCount = participantMtsfs.filter(x => {
            return x.season.id == data[seasonIndex].id
          })

          if (seasonsCount && seasonsCount.length > 1) {
            preparedSeasons.push({id: data[seasonIndex].id, label: data[seasonIndex].title, isDisabled: true})
          } else {
            preparedSeasons.push({id: data[seasonIndex].id, label: data[seasonIndex].title})
          }
        }

        return preparedSeasons
      }
    },
    watch: {
      searchText: function (val) {
        this.changeAdminNavbarButtonWithParams()
      },
      selectedSeasons: function (val) {
        this.changeAdminNavbarButtonWithParams()
      }
    },
    methods: {
      changeAdminNavbarButtonWithParams () {
        this.changeAdminNavbarButton({
          eventBusMethod: 'OPEN_MTSF_MODAL',
          generateExcel: this.generateExcel,
          generatePdf: this.generatePdf,
          generationParams: {
            type: this.selectedType,
            filters: {
              searchText: this.searchText,
              selectedSeasons: this.selectedSeasons,
              participant: this.id
            },
            results: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
          }
        })
      },
      checkPoints (key) {
        if (Object.keys(this.points).length === 0) return ''
        return 'Punkty: ' + this.points[key]
      },
      resetModal () {
        this.mtsf = {
          season: {
            id: null
          },
          birthday: null,
          height: null,
          weight: null,
          bieg50m: null,
          skokDalZMiejsca: null,
          biegDlugaDystancja: null,
          silaDloni: null,
          zwisNaUgietychRekach: null,
          bieg4x10: null,
          siadyZLezenia: null,
          sklonTulowia: null,
          finalDate: null,
          index: null
        }
        this.points = {}
      },
      checkPunkts () {
        let mtsf = this.mtsf
        mtsf.participant = {
          id: this.id
        }
        console.log(mtsf)
        this.$store.dispatch('checkMtsfPoints', {data: {actionType: 'checkMtsfPoints', mtsf: mtsf}})
          .then(response => {
            this.points = {...response}
          })
          .catch(error => {
            this.showToast(error.data.error, 'Uwaga', 'danger')
          })
      },
      submit (endTest = false) {
        if (endTest) this.mtsf.finalDate = true

        let method, id
        if (this.mtsf.id) {
          method = 'putMtsf'
          id = this.mtsf.id
        } else {
          method = 'postMtsf'
          id = this.id
        }
        // const method = this.mtsf.id ? 'putMtsf' : 'postMtsf'
        // const id = this.mtsf.id ? this.mtsf.id : this.id

        this.$store.dispatch(method, {id: id, data: this.mtsf})
          .then(response => {
            this.$refs.modalMTSF.hide()
          })
          .catch(error => {
            console.log(error)
            this.showToast(error.data.error, 'Uwaga', 'danger')
            this.$refs.modalMTSF.hide()
          })
      },
      openMTSFModal (mtsfId) {
        if (mtsfId) {
          let mtsf = this.$store.getters.mtsf(mtsfId)
          if (mtsf) this.mtsf = JSON.parse(JSON.stringify(mtsf))
        }
        if (this.$refs.modalMTSF) {
          this.$refs.modalMTSF.show()
        }
      }
    },
    created () {
      EventBus.$on('OPEN_MTSF_MODAL', (params) => {
        this.openMTSFModal()
      })

      this.changeAdminNavbarButtonWithParams()

      this.$store.dispatch('getMtsfList', {participantId: this.id})
      this.$store.dispatch('getSeasons')
    }
  }
</script>

<style scoped>

</style>
