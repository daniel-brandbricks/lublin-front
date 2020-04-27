<template>
  <div class="container">
    <b-row class="justify-content-between">
      <b-col class="col-lg-6 col-md-6 col-sm-12">
        <b-row class="mb-3 justify-content-between" :key="index" v-for="(item,index) in mtsfDataList">
          <b-col>{{item.name}}</b-col>
          <b-col>
            <b-btn variant="primary" @click="openModal(item, false)" class="custom mb-2">Zobacz</b-btn>
            <b-btn variant="primary" @click="openModal(item, true)" class="custom">Edytuj</b-btn>
          </b-col>
        </b-row>
      </b-col>
      <b-col class="col-lg-6 col-md-6 col-sm-12">qwe</b-col>
    </b-row>

    <b-modal ref="MTSFDataModal"
             modal-class="custom AAAAAA"
             centered
             size="xl"
             @hidden="resetModal"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        {{selectedItem.name}}
      </template>

      <b-row class="justify-content-around">
        <b-col><span class="text-center">Punkty</span></b-col>
        <b-col><span class="text-center">Bieg na 50 m</span></b-col>
        <b-col><span class="text-center">Skok w dal z miejsca</span></b-col>
        <b-col><span class="text-center">Bieg na 600 m</span></b-col>
        <b-col><span class="text-center">Siła dłoni</span></b-col>
        <b-col><span class="text-center">Zwis na ugiętych rękach</span></b-col>
        <b-col><span class="text-center">Bieg 4 x 10m</span></b-col>
        <b-col><span class="text-center">Siady z leżenia</span></b-col>
        <b-col><span class="text-center">Skłon tułowia</span></b-col>
      </b-row>
      <b-row>
        <b-col><span class="text-center">Pkt</span></b-col>
        <b-col><span class="text-center">s</span></b-col>
        <b-col><span class="text-center">cm</span></b-col>
        <b-col><span class="text-center">s</span></b-col>
        <b-col><span class="text-center">kg</span></b-col>
        <b-col><span class="text-center">s</span></b-col>
        <b-col><span class="text-center">s</span></b-col>
        <b-col><span class="text-center">liczba</span></b-col>
        <b-col><span class="text-center">cm</span></b-col>
      </b-row>
      <div :key="index" v-for="(item,index) in 100">

      </div>
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
          name: null,
        },
      }
    },
    computed: {
      mtsfDataList() {
        return this.$store.getters.mtsfDataList
      }
    },
    methods: {
      resetModal () {
        this.selectedItem = {
          name: null,
        }
      },
      openModal (item, toEdit) {
        this.selectedItem = item
        this.$refs['MTSFDataModal'].show()
      }
    },
    created() {
      this.$store.dispatch('getMtsfDataList')
    }
  }
</script>

<style scoped>
  .AAAAAA div {
    min-width: 1000px !important;
    margin: 0 auto;
  }
</style>
