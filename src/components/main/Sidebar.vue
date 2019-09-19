<template>
  <section class="sidebar" :class="showSidebar ? '' : 'sidebarShowMobile'">

    <b-list-group class="custom sidebar-list">
      <b-list-group-item>
        <b-link :to="{name:'dashboard'}" active-class="active" class="d-flex align-items-center">
          <span class="icon icon-home_off"></span>
          <span>DASHBOARD</span>
        </b-link>
      </b-list-group-item>
    </b-list-group>

    <footer class="sidebar-footer">
    </footer>

  </section>
</template>

<script>
import EventBus from '../../event-bus'

export default {
  name: 'Sidebar',
  data () {
    return {
      showSidebar: true
    }
  },
  methods: {
  },
  watch: {
  },
  created () {
    console.log('sidebar created')
    EventBus.$on('toggleSidebar', () => {
      this.showSidebar = !this.showSidebar
    })
  }
}
</script>

<style scoped>

</style>
