<template>
  <div class="d-flex" id="wrapper" :class="{'toggled': showSidebar}">
    <Sidebar></Sidebar>

    <main class="" id="page-content-wrapper">
      <nav>
        <!--todo Переделать-->
        <AdminNavbar></AdminNavbar>
      </nav>

      <div class="container-fluid">
        <button class="btn btn-primary btn-sidebar-toggle" id="menu-toggle" @click="toggleSidebar">
          <span class="icon-icon_arrow_24"></span>
        </button>
        <router-view/>
      </div>
    </main>

    <!--    <footer>-->
    <!--      <Footer></Footer>-->
    <!--    </footer>-->
  </div>
</template>

<script>
import AdminNavbar from '@/components/main/AdminNavbar'
import Sidebar from '../components/main/Sidebar'
import Footer from '../components/main/Footer'

import EventBus from '../event-bus'

export default {
  name: 'Admin',
  components: {
    AdminNavbar,
    Footer,
    Sidebar
  },
  data () {
    return {
      showSidebar: false
    }
  },
  methods:{
    toggleSidebar () {
      console.log(111)
      EventBus.$emit('TOGGLE_SIDEBAR')
    }
  },
  created () {
    console.log('Admin template created')

    EventBus.$on('TOGGLE_SIDEBAR', (payload) => {
      console.log(111222)
      this.showSidebar = !this.showSidebar
    })
  }
}
</script>

<style scoped>

</style>
