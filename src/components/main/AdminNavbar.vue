<template>
  <!--todo Переделать  хреново ломается -->
  <b-col cols="12" class="mt-2">
    <b-row>
      <b-col>
        <b-breadcrumb :items="items" class="custom"></b-breadcrumb>
      </b-col>
      <b-col cols="2" v-if="buttonLink">
        <b-link class="nowrap btn btn-primary btn-block" :to="{ name: buttonLink }">
          Dodaj...
        </b-link>
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
      this.buttonLink = params.buttonLink
    })
    EventBus.$on('NAVBAR_CHANGE_BREADCRUMBS', (params) => {
      // todo
    })
  }
}
</script>

<style scoped>

</style>
