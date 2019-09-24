<template>
  <div class="d-flex" id="wrapper" :class="{'toggled': showSidebar}">
    <Sidebar></Sidebar>

    <main class="">
      <nav>
        <Navbar></Navbar>
      </nav>

      <div class="page-content-wrapper">
        <perfect-scrollbar id="scrollbar" class="custom pt75">
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
import Navbar from '@/components/main/Navbar'
import Sidebar from '../components/main/Sidebar'
import Footer from '../components/main/Footer'

import EventBus from '../event-bus'

export default {
  name: 'Admin',
  components: {
    Footer,
    Sidebar,
    Navbar
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
