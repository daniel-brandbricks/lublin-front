<template>
  <!--todo Переделать  хреново ломается -->
  <div class="container">
    <b-col cols="12" class="p-0 mt-2">
      <b-row>
        <b-col>
          <b-breadcrumb :items="items" class="custom"></b-breadcrumb>
        </b-col>
        <b-col cols="2" v-if="buttonLink">
          <b-link class="nowrap btn btn-primary btn-block" :to="{ name: buttonLink, params: buttonLinkParams }">
            Dodaj...
          </b-link>
        </b-col>
        <b-col cols="2" v-if="generateExcel">
          <b-link class="nowrap btn btn-primary btn-block" @click="callGenerateExcel">
            Wygeneruj EXCEL
          </b-link>
        </b-col>
        <b-col cols="2" v-if="generatePdf">
          <b-link class="nowrap btn btn-primary btn-block" @click="callGeneratePdf">
            Wygeneruj PDF
          </b-link>
        </b-col>
        <b-col cols="2" v-if="eventBusMethod">
          <b-link class="nowrap btn btn-primary btn-block" @click="callEventBusMethod">
            Dodaj...
          </b-link>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
  import EventBus from '@/event-bus'
  import * as apiService from '@/services/apiService'
  import axios from 'axios'
  import {BASE_API_URL} from '@/config/AppConfig'

  export default {
    name: 'AdminNavbar',
    data () {
      return {
        eventBusMethod: false,
        generateExcel: false,
        generatePdf: false,
        buttonLink: '#',
        buttonLinkParams: {},
        generationParams: {},

        // breadcrumb
        items: [
          {
            text: 'Admin',
            href: '#'
          },
          {
            text: 'Manage',
            href: '#'
          },
          {
            text: 'Library',
            active: true
          }
        ]
      }
    },
    computed: {},
    methods: {
      callEventBusMethod (params = {}) {
        EventBus.$emit(this.eventBusMethod, (params))
      },
      callGeneratePdf () {
        if (undefined === this.generationParams || this.generationParams.results.length < 1) {
          this.$bvToast.toast('Wybierz wyniki oraz zaznacz filtry', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-right',
            solid: true,
            variant: 'danger',
            appendToast: false,
            autoHideDelay: 10000
          })
          return
        }
        this.$store.dispatch('getPDF', this.generationParams)
      },
      callGenerateExcel (params = {}) {
        if (undefined === this.generationParams || this.generationParams.results.length < 1) {
          this.$bvToast.toast('Wybierz wyniki oraz zaznacz filtry', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-right',
            solid: true,
            variant: 'danger',
            appendToast: false,
            autoHideDelay: 10000
          })
          return
        }
        this.$store.dispatch('getExcel', this.generationParams)
      }
    },
    created () {
      EventBus.$on('NAVBAR_BUTTON_LINK', (params) => {
        this.eventBusMethod = params.eventBusMethod
        this.generateExcel = params.generateExcel
        this.generatePdf = params.generatePdf
        this.generationParams = params.generationParams
        this.buttonLink = params.buttonLink
        this.buttonLinkParams = params.params
      })
      EventBus.$on('NAVBAR_CHANGE_BREADCRUMBS', (params) => {
        this.items = params
      })
    }
  }
</script>

<style scoped>

</style>
