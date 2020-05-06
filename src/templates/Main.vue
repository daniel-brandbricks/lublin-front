<template>
<!--  colors-yb colors-by colors-wb -->
  <div class="main-wrap">
    <nav>
      <Navbar></Navbar>
    </nav>

    <main>
      <div class="content-wrap">
        <perfect-scrollbar id="scrollbar" class="custom">
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
    mounted() {
      if (document.cookie.length > 0) {
        let keyVal = document.cookie.split('=')
        let main = document.getElementsByClassName('main-wrap')[0]
        main.classList.add(keyVal[1])

        console.log(keyVal)
      }
      console.log(document.cookie)
    },
    created () {
      console.log('Main template created')
    }
  }
</script>

<style type="text/css">
  .ql-container.ql-snow {
     border: unset !important;
  }

  .help-items-container .contrast-wb {
    background-color: white;
    color: black;
    border: 3px solid black;
    text-align: center;
    width: 30px;
    height: 30px;
  }
  .help-items-container .contrast-by {
    background-color: yellow;
    color: black;
    border: 3px solid black;
    text-align: center;
    width: 30px;
    height: 30px;
  }
  .help-items-container .contrast-yb {
    background-color: black;
    color: yellow;
    border: 3px solid black;
    text-align: center;
    width: 30px;
    height: 30px;
  }
  .help-items-container .contrast-classic {
    background-color: white;
    color: black;
    border: 3px solid #fc8989;
    text-align: center;
    width: 30px;
    height: 30px;
  }

  .help-items-container .font-size-1 {
    background-color: white;
    color: black;
    border: 3px solid black;
    text-align: center;
    width: 30px;
    height: 30px;
  }
  .help-items-container .font-size-2 {
    background-color: white;
    color: black;
    border: 3px solid black;
    text-align: center;
    width: 40px;
    height: 30px;
  }
  .help-items-container .font-size-3 {
    background-color: white;
    color: black;
    border: 3px solid black;
    text-align: center;
    width: 50px;
    height: 30px;
  }
</style>
