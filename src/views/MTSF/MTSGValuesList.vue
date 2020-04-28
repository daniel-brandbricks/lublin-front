<template>
  <div class="container">
    <b-row class="justify-content-between">
      <b-col class="col-lg-6 col-md-6 col-sm-12">
        <b-row class="mb-3 justify-content-between" v-if="index < 13" :key="index" v-for="(item,index) in mtsfDataList">
          <b-col>{{item.name}}</b-col>
          <b-col>
            <b-btn variant="primary" @click="openModal(item, false)" class="custom mb-2">Zobacz</b-btn>
            <b-btn variant="primary" @click="openModal(item, true)" class="custom mb-2">Edytuj</b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="col-lg-6 col-md-6 col-sm-12">
        <b-row class="mb-3 justify-content-between" v-if="index > 12" :key="index" v-for="(item,index) in mtsfDataList">
          <b-col>{{item.name}}</b-col>
          <b-col>
            <b-btn variant="primary" @click="openModal(item, false)" class="custom mb-2">Zobacz</b-btn>
            <b-btn variant="primary" @click="openModal(item, true)" class="custom mb-2">Edytuj</b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-modal ref="MTSFDataModal"
             class="modal-mtsf-values"
             modal-class="custom modal-mtsf-values justify-content-between"
             scrollable
             centered
             size="xl"
             :hide-footer="!editCells"
             @hidden="resetModal"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        {{selectedItem.name}}
      </template>
      <div>
        <div class="mw-1000">
        <span class="text-center d-inline-block mw-100">
          <span class="border-span">Punkty</span><br><span>Pkt</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Bieg na 50 m</span><br><span>s</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Skok w dal z miejsca</span><br><span>cm</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Bieg na 600 m</span><br><span>s</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Siła dłoni</span><br><span>kg</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Zwis na ugiętych rękach</span><br><span>s</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Bieg 4 x 10m</span><br><span>s</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Siady z leżenia</span><br><span>liczba</span>
        </span>
          <span class="text-center d-inline-block mw-100">
          <span class="border-span">Skłon tułowia</span><br><span>cm</span>
        </span>
        </div>
        <hr>
        <div class="mw-1000">
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in 100">
              {{item}}
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.bieg50m">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.bieg50m[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.skokDalZMiejsca">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.skokDalZMiejsca[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.biegDlugaDystancja">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.biegDlugaDystancja[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.silaDloni">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.silaDloni[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.zwisNaUgietychRekach">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.zwisNaUgietychRekach[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.bieg4x10">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.bieg4x10[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.siadyZLezenia">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.siadyZLezenia[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
          <div class="text-center d-inline-block mw-100">
            <div class="h-50" :key="index" v-for="(item,index) in selectedItem.sklonTulowia">
              <template v-if="editCells">
                <b-form-input id="name-1" class="custom m-0" type="number"
                              v-model="selectedItem.sklonTulowia[index]"/>
              </template>
              <template v-else>
                {{item.length > 0 ? item : '-'}}
              </template>
            </div>
          </div>
        </div>
      </div>

      <template slot="modal-footer" v-if="editCells">
        <b-btn variant="primary" @click="submit()" class="custom mb-2">Zapisz</b-btn>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    components: {},
    mixins: [EventBusEmit],
    data() {
      return {
        selectedItem: {
          name: null
        },
        editCells: false
      }
    },
    computed: {
      mtsfDataList() {
        return this.$store.getters.mtsfDataList
      }
    },
    methods: {
      submit () {
        this.selectedItem.bieg50m = this.selectedItem.bieg50m.join('|')
        this.selectedItem.skokDalZMiejsca = this.selectedItem.skokDalZMiejsca.join('|')
        this.selectedItem.biegDlugaDystancja = this.selectedItem.biegDlugaDystancja.join('|')
        this.selectedItem.silaDloni = this.selectedItem.silaDloni.join('|')
        this.selectedItem.zwisNaUgietychRekach = this.selectedItem.zwisNaUgietychRekach.join('|')
        this.selectedItem.bieg4x10 = this.selectedItem.bieg4x10.join('|')
        this.selectedItem.siadyZLezenia = this.selectedItem.siadyZLezenia.join('|')
        this.selectedItem.sklonTulowia = this.selectedItem.sklonTulowia.join('|')

        this.$store.dispatch('putMtsfData', this.selectedItem)

        this.resetModal()
        this.$refs['MTSFDataModal'].hide()
      },
      parseColumn(data) {
        if (data) {
          if (typeof data === 'string') {
            return data.split('|')
          }
          return data
        }
        return 'Nie ma danych'
      },
      resetModal() {
        this.selectedItem = {
          name: null
        }
      },
      openModal(item, toEdit) {
        this.$set(this, 'selectedItem', item)
        this.selectedItem.bieg50m = this.parseColumn(this.selectedItem.bieg50m)
        this.selectedItem.skokDalZMiejsca = this.parseColumn(this.selectedItem.skokDalZMiejsca)
        this.selectedItem.biegDlugaDystancja = this.parseColumn(this.selectedItem.biegDlugaDystancja)
        this.selectedItem.silaDloni = this.parseColumn(this.selectedItem.silaDloni)
        this.selectedItem.zwisNaUgietychRekach = this.parseColumn(this.selectedItem.zwisNaUgietychRekach)
        this.selectedItem.bieg4x10 = this.parseColumn(this.selectedItem.bieg4x10)
        this.selectedItem.siadyZLezenia = this.parseColumn(this.selectedItem.siadyZLezenia)
        this.selectedItem.sklonTulowia = this.parseColumn(this.selectedItem.sklonTulowia)

        this.editCells = toEdit
        this.$refs['MTSFDataModal'].show()
      }
    },
    created() {
      this.$store.dispatch('getMtsfDataList')
    }
  }
</script>

<style scoped>
  .mw-100 {
    margin: 10px 3px;
    min-width: 150px !important;
    max-width: 150px !important;
    word-wrap: break-word !important;
    white-space: pre-line;
  }

  .mw-1000 {
    min-width: 1000px !important;
  }

  .border-span {
    padding-bottom: 2px;
    border-bottom: 1px solid black;
  }

  .h-50 {
    max-height: 50px;
    min-height: 50px;
    height: 50px;
  }
</style>
