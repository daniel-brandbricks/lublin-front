<template>
  <div class="wrap">
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <b-form-group class="custom">
              <treeselect class="custom m-0"
                          v-model="selectedSeasons"
                          :multiple="false"
                          placeholder="Sezon" :options="seasonsTreeselect"
                          :class="{'error-input-custom': veeErrors.has('season')}"
                          name="season" key="season" v-validate="{'required':true}"/>
            </b-form-group>
          </b-col>
          <b-col>
            <date-picker v-model="selectedDate" :lang="datepickerParams.lang"
                         :class="{'error-input-custom': veeErrors.has('selectedYear')}"
                         :name="'selectedYear'" :key="'selectedYear'"
                         value-type="format" format="YYYY-MM-DD"
                         v-validate="{'required': true}"
                         type="date"
                         :id="'selectedYear'" placeholder="Wybierz datę" class="w-100 custom mt-1">
            </date-picker>
          </b-col>
          <b-col>
            <b-form-group class="custom mb-2">
              <b-form-input id="title-1" class="custom m-0"
                            placeholder="Szukaj"
                            :class="{'error-input-custom': veeErrors.has('searchText')}"
                            name="searchText" key="searchText" v-validate="{'required':true}"
                            v-model="searchText"/>
            </b-form-group>
          </b-col>
        </b-row>

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
            <b-form-group class="custom mb-2" label="Wzrosc (cm)">
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
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.bieg50m')}"
                            name="mtsf.bieg50m" key="mtsf.bieg50m" v-validate="{'required':true}"
                            v-model="mtsf.bieg50m"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Skok dal z miejsca (cm)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.skokDalZMiejsca')}"
                            name="mtsf.skokDalZMiejsca" key="mtsf.skokDalZMiejsca" v-validate="{'required':true}"
                            v-model="mtsf.skokDalZMiejsca"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2"
                          label="Bieg na 600m (Dzieci 7-11lat) / 800m (Dziewczyny 12-19lat) / 1000 m ( Chłopcy 12-19 lat)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.biegDlugaDystancja')}"
                            name="mtsf.biegDlugaDystancja" key="mtsf.biegDlugaDystancja" v-validate="{'required':true}"
                            v-model="mtsf.biegDlugaDystancja"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Siła dłoni (kG)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.silaDloni')}"
                            name="mtsf.silaDloni" key="mtsf.silaDloni" v-validate="{'required':true}"
                            v-model="mtsf.silaDloni"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2"
                          label="Zwis na ugiętych rękach / Uginanie rąk w zwisie ( Chłopcy 12 -19 lat)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.zwisNaUgietychRekach')}"
                            name="mtsf.zwisNaUgietychRekach" key="mtsf.zwisNaUgietychRekach"
                            v-validate="{'required':true}"
                            v-model="mtsf.zwisNaUgietychRekach"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Bieg 4x10m(s)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.bieg4x10')}"
                            name="mtsf.bieg4x10" key="mtsf.bieg4x10" v-validate="{'required':true}"
                            v-model="mtsf.bieg4x10"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-2" label="Siady z leżenia">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.siadyZLezenia')}"
                            name="mtsf.siadyZLezenia" key="mtsf.siadyZLezenia" v-validate="{'required':true}"
                            v-model="mtsf.siadyZLezenia"/>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group class="custom mb-4" label="Skłon tułowia (cm)">
              <b-form-input id="name-1" class="custom m-0"
                            :class="{'error-input-custom': veeErrors.has('mtsf.sklonTulowia')}"
                            name="mtsf.sklonTulowia" key="mtsf.sklonTulowia" v-validate="{'required':true}"
                            v-model="mtsf.sklonTulowia"/>
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
            <b-btn variant="primary" @click="submit(true)" class="custom">
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

        fields: [
          {key: 'firstName', label: 'Imię', sortable: true},
          {key: 'lastName', label: 'Nazwisko', sortable: true},
          {key: 'sex', label: 'Płec', sortable: true},
          {key: 'enterDate', label: 'Data wpisu', sortable: true},
          {key: 'removeDate', label: 'Data wypisania', sortable: true},
          {key: 'season', label: 'Sezon', sortable: true},
          {key: 'finalDate', label: 'Data obliczenia', sortable: true},
          {key: 'points', label: 'Punkty', sortable: true},
          {key: 'edit', label: 'Zobacz'}
        ]
      }
    },
    computed: {
      participantMtsfs () {
        return this.$store.getters.mtsfList
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
    methods: {
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
      },
      submit (endTest = false) {
        if (endTest) this.mtsf.finalDate = true

        const method = this.mtsf.id ? 'putMtsf' : 'postMtsf'
        const id = this.mtsf.id ? this.mtsf.id : this.id

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
          if (mtsf) this.mtsf = mtsf
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

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({eventBusMethod: 'OPEN_MTSF_MODAL', generateExcel: true, generatePdf: true})

      this.$store.dispatch('getMtsfList', {participantId: this.id})
      this.$store.dispatch('getSeasons')
    }
  }
</script>

<style scoped>

</style>
