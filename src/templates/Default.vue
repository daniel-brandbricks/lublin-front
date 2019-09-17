<template>
  <div class="main-wrap">
    <nav>
      <Navbar></Navbar>
    </nav>

    <main>
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
import Footer from '../components/main/Footer'

export default {
  name: 'Admin',
  components: {
    Footer,
    Navbar
  },
  created () {
    console.log(this.$refs)
    console.log('default template created')
  }
}
</script>

<style scoped>

</style>
