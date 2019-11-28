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
          <b-link class="nowrap btn btn-primary btn-block">
            Wygeneruj EXCEL
          </b-link>
        </b-col>
        <b-col cols="2" v-if="generatePdf">
          <b-link class="nowrap btn btn-primary btn-block">
            Wygeneruj PDF
          </b-link>
        </b-col>
      </b-row>
    </b-col>
  </div>
</template>

<script>
  import EventBus from '@/event-bus'

  export default {
    name: 'AdminNavbar',
    data () {
      return {
        generateExcel: false,
        generatePdf: false,
        buttonLink: '#',
        buttonLinkParams: {},

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
    methods: {},
    created () {
      EventBus.$on('NAVBAR_BUTTON_LINK', (params) => {
        this.generateExcel = params.generateExcel
        this.generatePdf = params.generatePdf
        this.buttonLink = params.buttonLink
        this.buttonLinkParams = params.params
      })
      EventBus.$on('NAVBAR_CHANGE_BREADCRUMBS', (params) => {
        this.items = params
        // todo
      })
    }
  }
</script>

<style scoped>

</style>
