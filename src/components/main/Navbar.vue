<template>
  <div class="container">
    <b-navbar toggleable="xl" type="white" class="custom p-0">
      <b-navbar-brand :to="{name:'home'}">
        <img src="/static/img/logo.svg" alt="LOGO">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        A
      </b-navbar-toggle>

      <b-collapse id="nav-collapse"  class="justify-content-xl-end" is-nav>
        <b-navbar-nav class="text-center ">
          <b-nav-item :to="{name:'sports'}">
            Zajęcia  <br>
            sportowe
          </b-nav-item>
          <b-nav-item :to="{name:'sportEvents'}">
            Imprezy  <br>
            sportowe
          </b-nav-item>
          <b-nav-item :to="{name:'sportProjects'}">
            projekty <br>
            sportowe
          </b-nav-item>
          <b-nav-item :to="{name:'sks'}">
            SKSy
          </b-nav-item>
          <b-nav-item :to="{name:'sportClasses'}">
            Klasy sportowe <br>
            i profilowane
          </b-nav-item>
          <b-nav-item href="#">
            Współzawodnictwo Sportowe <br>
            Szkół Miasta Lublin
          </b-nav-item>
          <b-nav-item href="#">
            <b-btn variant="outline-primary" class="custom text-nowrap">
              <span class="icon-icon_login pr-2"></span> zaloguj się
            </b-btn>
          </b-nav-item>

        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      resetModal () {
        this.email = ''
        this.password = ''
      },
      validateEmail (email) {
        // @todos
        console.log('@todo')
        console.log('fix that')
        return email
        // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        // return re.test(String(email)
        //   .toLowerCase())
      },
      login () {
        if (this.email === '') {
          this.emptyEmail = false
          return false
        }
        if (this.password.length < 6) {
          this.passwordSimilarity = false
          return false
        }

        if (!this.validateEmail(this.email)) {
          this.$bvToast.toast('Niepoprawny format adresu e-mail', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-full',
            solid: true,
            variant: 'danger'
          })

          return false
        }

        let data = { email: this.email, password: this.password }
        this.$store.dispatch('login', data)
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
