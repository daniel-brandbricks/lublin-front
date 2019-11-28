<template>
  <div class="d-flex" id="wrapper" :class="{'toggled': showSidebar}">
    <Sidebar></Sidebar>

    <main class="" id="page-content-wrapper">
      <perfect-scrollbar id="scrollbar" class="custom ps-content">

        <nav class="mb-3">
          <!--todo Переделать-->
          <AdminNavbar></AdminNavbar>
        </nav>

        <div class="container-fluid">
          <button class="btn btn-primary btn-sidebar-toggle" id="menu-toggle" @click="toggleSidebar">
            <span class="icon-icon_arrow_24"></span>
          </button>
          <router-view/>

        </div>
      </perfect-scrollbar>

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
    methods: {
      toggleSidebar () {
        EventBus.$emit('TOGGLE_SIDEBAR')
      }
    },
    created () {
      EventBus.$on('TOGGLE_SIDEBAR', (payload) => {
        this.showSidebar = !this.showSidebar
      })
    }
  }
</script>

<style>

</style>
