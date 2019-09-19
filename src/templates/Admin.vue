<template>
  <div class="main-wrap">
    <nav>
      <Navbar></Navbar>
    </nav>

    <main>
      <div class="sidebar-wrap float-left">
        <Sidebar></Sidebar>
      </div>
      <div class="content-wrap">
        <perfect-scrollbar id="scrollbar" class="custom pt75">
          <router-view/>
        </perfect-scrollbar>
      </div>
    </main>

    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/main/Navbar'
import Sidebar from '../components/main/Sidebar'
import Footer from '../components/main/Footer'

export default {
  name: 'Admin',
  components: {
    Footer,
    Sidebar,
    Navbar
  },
  created () {
    console.log('Admin template created')
  }
}
</script>

<style scoped>

</style>
