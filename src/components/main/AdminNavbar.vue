<template>
  <!--todo Переделать  хреново ломается -->
  <b-col cols="12" class="mt-2">
    <b-row>
      <b-col>
        <b-breadcrumb :items="items"></b-breadcrumb>
      </b-col>
      <b-col cols="2">
        <b-link class="btn btn-primary w-100" :to="{ name: buttonLink }">
          Dodaj...
        </b-link>
<!--        <router-link class="btn btn-primary" :to="{ name: buttonLink }">Dodaj...</router-link>-->
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  name: 'AdminNavbar',
  data () {
    return {
      buttonLink: '#',

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
      if (params.buttonLink) {
        this.buttonLink = params.buttonLink
      }
      console.log(params)
    })
    EventBus.$on('CHANGE_BREADCRUMBS', (params) => {
      // todo
      console.log(params)
    })
  }
}
</script>

<style scoped>

</style>
