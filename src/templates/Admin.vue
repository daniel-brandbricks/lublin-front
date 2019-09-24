<template>
  <div class="d-flex container" id="wrapper" :class="{'toggled': showSidebar}">
    <Sidebar></Sidebar>

    <main class="px-5" id="page-content-wrapper">
      <nav>
        <AdminNavbar></AdminNavbar>
      </nav>

      <div class="h-100">
        <perfect-scrollbar id="scrollbar" class="custom pt75 h-100">
          <router-view/>
        </perfect-scrollbar>
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
