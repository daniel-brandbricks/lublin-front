<template>
  <div class="wrap">
    <div class="container">
      <b-navbar toggleable="xl" type="white" class="custom p-0">
        <b-navbar-brand :to="{name:'home'}">
          <img src="/static/img/logo.svg" alt="LOGO">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse">
          A
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" class="justify-content-xl-end" is-nav>
          <b-navbar-nav class="text-center ">
            <b-nav-item :to="{name:'sports'}">
              Zajęcia <br>
              sportowe
            </b-nav-item>
            <b-nav-item :to="{name:'sportEvents'}">
              Imprezy <br>
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
              <b-btn variant="outline-primary" class="custom text-nowrap" v-b-modal.modal-login>
                <span class="icon-icon_login pr-2"></span> zaloguj się
              </b-btn>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-modal id="modal-login"
             centered hide-header-close
             modal-class="custom"
             body-class="pb-4"
             hide-header
             hide-footer
             @show="resetModal"
             @hidden="resetModal"
             title-tag="div"
             size="sm">
      <div class="wrap-logo text-center">
        <img src="/static/img/logo.svg" alt="LOGO">
      </div>
      <b-tabs pills class="custom">
        <b-tab title="Logowanie" class="" active>
          <b-form ref="form" @submit.prevent="login">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="E-mail"
                            v-model="email"></b-form-input>
            </b-form-group>
            <b-form-group
              class="custom">
              <b-form-input type="password" class="custom"
                            placeholder="Haslo"
                            v-model="password"></b-form-input>
            </b-form-group>
            <div class="btn-container d-flex flex-column w-100">
              <b-btn type="submit" variant="primary"
                     class="custom text-nowrap mb-sm-0 w-100">
                <span class="icon-icon_login pr-2"></span> zaloguj się
              </b-btn>
              <b-btn variant="icon" class="custom mt-1 fsz-13" v-b-modal.modal-login-newPass>
                Zapomniałeś hasła?
              </b-btn>
            </div>
          </b-form>
        </b-tab>

        <b-tab title="Rejstracja">
          <b-form-group class="custom">
            <b-form-group>
              <div class="d-flex">
                <b-form-radio v-model="selectedRadio" name="some-radios" value="A" class="mr-3">Klub / Szkoła
                </b-form-radio>
                <b-form-radio v-model="selectedRadio" name="some-radios" value="B">Prowadzący</b-form-radio>
              </div>
            </b-form-group>

            <b-form-group
              class="custom">
              <b-form-input type="text" class="custom"
                            placeholder="Imię"
                            v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group
              class="custom">
              <b-form-input type="text" class="custom mb-3"
                            placeholder="Nazwisko"
                            v-model="name"></b-form-input>
            </b-form-group>
            <treeselect v-model="value"
                        :multiple="false"
                        :options="optionsTS"
                        class="custom"/>
            <b-btn variant="icon" class="custom my-2 text-uppercase fix-sub">
              dodaj kolejną <span class="fsz-22 pl-2">+</span>
            </b-btn>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="E-mail"
                            v-model="name"></b-form-input>
            </b-form-group>
            <b-form-group
              class="custom">
              <b-form-input type="phone" class="custom"
                            placeholder="Telefon"
                            v-model="name"></b-form-input>
            </b-form-group>
            <div class="btn-container d-flex flex-column w-100 mt-3">
              <b-btn variant="primary" v-b-modal.modal-login-registration
                     class="custom text-nowrap   mb-sm-0 w-100">
                <span class="icon-icon_mail pr-2"></span> Wyślij danne
              </b-btn>

            </div>

          </b-form-group>

        </b-tab>
      </b-tabs>

    </b-modal>
    <b-modal id="modal-login-registration"
             centered hide-header-close
             modal-class="custom"
             body-class="pb-4"
             hide-header
             hide-footer
             title-tag="div"
             size="sm">
      <div class="wrap-logo text-center">
        <img src="/static/img/logo.svg" alt="LOGO">
      </div>
      <h2 class="mb-3 text-center">
        Dziękujemy <br>
        za złożenie danych
      </h2>
      <p class="fix-card-text">
        Nulla massa leo, semper lacinia elit vel, semper molestie justo.
      </p>
      <div class="btn-container d-flex flex-column w-100 mt-3">
        <b-btn variant="primary" v-b-modal.modal-login-registration
               class="custom text-nowrap   mb-sm-0 w-100">
          <span class="icon-icon_arrow_2_left pr-2"></span>Wróć do strony
        </b-btn>
      </div>

    </b-modal>

    <b-modal id="modal-login-newPass"
             centered hide-header-close
             modal-class="custom"
             body-class="pb-4"
             hide-header
             hide-footer
             title-tag="div"
             size="sm">
      <div class="wrap-logo text-center">
        <img src="/static/img/logo.svg" alt="LOGO">
      </div>
      <h2 class="mb-3 text-center">
        Odzyskanie hasła
      </h2>
      <p class="fix-card-text">
        Nulla massa leo, semper lacinia elit vel, semper molestie justo.
      </p>
      <div class="btn-container d-flex flex-column w-100 mt-3">
        <b-btn variant="primary" v-b-modal.modal-login-registration
               class="custom text-nowrap   mb-sm-0 w-100">
          <span class="icon-icon_mail pr-2"></span>wyślij
        </b-btn>
      </div>

    </b-modal>

  </div>

</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: {Treeselect},
    name: 'Navbar',
    data () {
      return {
        email: '',
        password: '',
        optionsTS: [{
          id: 'a',
          label: 'first',
          children: [{
            id: 'aa',
            label: 'aa'
          }, {
            id: 'ab',
            label: 'ab'
          }]
        }, {
          id: 'b',
          label: 'second'
        }, {
          id: 'c',
          label: 'third'
        }]
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

        let data = {email: this.email, password: this.password}
        this.$store.dispatch('login', data)
          .then((response) => {
            console.log(response)
            this.$router.push({ name: 'test.content' })
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
