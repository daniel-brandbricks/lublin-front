<template>
  <div class="wrap">
    <div class="container">
      <b-navbar toggleable="xl" type="white" class="custom p-0">
        <b-navbar-brand :to="{name:'home'}">
          <img src="/static/img/logo.svg" alt="LOGO">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse">
          <img src="/static/img/burger.svg" alt="">
        </b-navbar-toggle>

        <b-collapse id="nav-collapse" class="justify-content-xl-end" is-nav>
          <b-navbar-nav class="text-center ">
            <b-nav-item :to="{name:'sports'}">
              Zajęcia <br class="d-sm-none d-xl-block">
              sportowe
            </b-nav-item>
            <b-nav-item :to="{name:'sportEvents'}">
              Imprezy <br class="d-sm-none d-xl-block">
              sportowe
            </b-nav-item>
            <b-nav-item :to="{name:'sportProjects'}">
              projekty <br class="d-sm-none d-xl-block">
              sportowe
            </b-nav-item>
            <b-nav-item :to="{name:'sks'}">
              SKSy
            </b-nav-item>
            <b-nav-item :to="{name:'sportClasses'}">
              Klasy sportowe <br class="d-sm-none d-xl-block">
              i profilowane
            </b-nav-item>
            <b-nav-item href="#">
              Współzawodnictwo Sportowe <br class="d-sm-none d-xl-block">
              Szkół Miasta Lublin
            </b-nav-item>
            <b-nav-item href="#">
              <b-btn variant="outline-primary" class="custom text-nowrap" v-b-modal.modal-login>
                <span class="icon icon-login pr-2"></span> zaloguj się
              </b-btn>
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!--  LOGIN  -->
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
        <b-tab title="Logowanie" class="" active @click="resetModal">
          <b-form ref="form" @submit.prevent="login">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="E-mail"
                            :class="{'error-input-custom': veeErrors.has('login.email') || loginError}"
                            name="login.email" key="login.email" v-validate="{'required':true}"
                            v-model="email"></b-form-input>
            </b-form-group>
            <b-form-group
              class="custom">
              <b-form-input type="password" class="custom"
                            placeholder="Haslo"
                            :class="{'error-input-custom': veeErrors.has('login.password') || loginError}"
                            name="login.password" key="login.password" v-validate="{'required':true}"
                            v-model="password"></b-form-input>
            </b-form-group>
            <div class="btn-container d-flex flex-column w-100">
              <b-btn type="submit" variant="primary"
                     class="custom text-nowrap mb-sm-0 w-100">
                <span class="icon icon-login pr-2"></span> zaloguj się
              </b-btn>
              <b-btn variant="icon" @click="showForgotPassModal" class="custom mt-3 fsz-13"
                     v-b-modal.modal-login-newPass>
                Zapomniałeś hasła?
              </b-btn>
            </div>
          </b-form>
        </b-tab>

        <!--  SING UP  -->
        <b-tab title="Rejstracja" @click="resetModal">
          <b-form-group class="custom">
            <b-form-group>
              <div class="d-flex">
                <b-form-radio v-model="selectedRegister" name="some-radios" value="1" class="mr-3">Klub / Szkoła
                </b-form-radio>
                <b-form-radio v-model="selectedRegister" name="some-radios" value="2">Prowadzący</b-form-radio>
              </div>
            </b-form-group>

            <div v-if="selectedRegister === '1'">
              <b-form-group
                class="custom">
                <b-form-input type="text" class="custom"
                              placeholder="Nazwa"
                              v-model="schoolName"></b-form-input>
              </b-form-group>
              <b-form-group
                class="custom">
                <b-form-input type="text" class="custom mb-3"
                              placeholder="E-mail"
                              v-model="schoolEmail"></b-form-input>
              </b-form-group>
              <b-form-group
                class="custom">
                <b-form-input class="custom mb-3"
                              placeholder="Telefon" type="number"
                              v-model="schoolPhone"></b-form-input>
              </b-form-group>

              <div class="btn-container d-flex flex-column w-100 mt-3">
                <b-btn variant="primary" @click="sendCreateSchool"
                       class="custom text-nowrap   mb-sm-0 w-100">
                  <span class="icon icon-mail pr-2"></span> Wyślij danne
                </b-btn>

              </div>
            </div>
            <div v-else>
              <b-form-group
                class="custom">
                <b-form-input type="text" class="custom"
                              placeholder="Imię"
                              v-model="firstName"></b-form-input>
              </b-form-group>
              <b-form-group
                class="custom">
                <b-form-input type="text" class="custom mb-3"
                              placeholder="Nazwisko"
                              v-model="lastName"></b-form-input>
              </b-form-group>
              <treeselect v-model="leaderDisciplines"
                          :multiple="true"
                          :options="disciplinesTreeselect"
                          class="custom mb-4"/>
              <!--            <b-btn variant="icon" class="custom my-2 text-uppercase fix-sub">-->
              <!--              dodaj kolejną <span class="_plus ml-2"></span>-->
              <!--            </b-btn>-->
              <b-form-group
                class="custom">
                <b-form-input id="input-1" class="custom"
                              placeholder="E-mail" type="email"
                              v-model="leaderEmail"></b-form-input>
              </b-form-group>
              <b-form-group
                class="custom">
                <b-form-input type="number" class="custom"
                              placeholder="Telefon"
                              v-model="leaderPhone"></b-form-input>
              </b-form-group>
              <div class="btn-container d-flex flex-column w-100 mt-3">
                <b-btn variant="primary" @click="sendCreateLeader"
                       class="custom text-nowrap   mb-sm-0 w-100">
                  <span class="icon icon-mail pr-2"></span> Wyślij danne
                </b-btn>

              </div>
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
        <b-btn variant="primary"
               @click="$bvModal.hide('modal-login-registration')"
               class="custom text-nowrap   mb-sm-0 w-100">
          <span class="icon icon-arrow_left pr-2"></span>Wróć do strony
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
             @hidden="emailResetPass = ''"
             size="sm">
      <div class="wrap-logo text-center">
        <img src="/static/img/logo.svg" alt="LOGO">
      </div>
      <h2 class="mb-3 text-center">
        Odzyskanie hasła
      </h2>
      <b-form-input id="input-1" class="custom"
                    placeholder="E-mail"
                    v-model="emailResetPass"></b-form-input>
      <div class="btn-container d-flex flex-column w-100 mt-3">
        <b-btn variant="primary"
               @click="sendResetPass"
               class="custom text-nowrap mb-sm-0 w-100">
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
  import listMixin from '@/mixins/list-mixin'
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    components: {Treeselect},
    mixins: [listMixin, ToastMixin],
    name: 'Navbar',
    data () {
      return {
        selectedRegister: '1',

        // school
        schoolName: '',
        schoolEmail: '',
        schoolPhone: '',

        // leader
        firstName: '',
        lastName: '',
        leaderDisciplines: null,
        leaderEmail: '',
        leaderPhone: '',

        // emailSignUp: '',
        emailResetPass: '',
        phone: '',

        email: '',
        password: '',

        loginError: false,
      }
    },
    watch: {
      selectedRegister: function (val) {
        this.resetModal()
      }
    },
    computed: {
      disciplines () {
        return this.$store.getters.disciplines
      },
      disciplinesTreeselect () {
        let disciplines = this.disciplines
        let prepared = []

        for (let disciplineIndex in disciplines) {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
        }

        return prepared
      }
    },
    methods: {
      sendResetPass () {
        if (!this.validateEmail(this.emailResetPass)) {
          this.$bvToast.toast('Niepoprawny format adresu e-mail', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-full',
            solid: true,
            variant: 'danger'
          })

          return false
        }
        this.$store.dispatch('sendResetPassword', {
          email: this.emailResetPass,
          method: 'sendResetPassword'
        })
          .then((response) => {
            // todo check response
            console.log(response)
            this.$bvModal.hide('modal-login-newPass')
            this.$bvModal.show('modal-login-registration')
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            console.log(error)
            this.showToast(error.data.error, 'Wystąpil błąd')
          })
      },
      sendCreateSchool () {
        if (!this.validateEmail(this.schoolEmail)) {
          this.$bvToast.toast('Niepoprawny format adresu e-mail', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-full',
            solid: true,
            variant: 'danger'
          })

          return false
        }
        this.$store.dispatch('sendCreateSchool', {
          email: this.schoolEmail,
          name: this.schoolName,
          phone: this.schoolPhone,
          method: 'sendCreateSchool'
        })
          .then((response) => {
            console.log(response)
            this.$bvModal.hide('modal-login')
            this.$bvModal.show('modal-login-registration')
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.showToast(error.data.error, 'Wystąpil błąd')
            console.log(error)
          })
      },
      // todo
      sendCreateLeader () {
        if (!this.validateEmail(this.leaderEmail)) {
          this.$bvToast.toast('Niepoprawny format adresu e-mail', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-full',
            solid: true,
            variant: 'danger'
          })

          return false
        }
        // todo
        this.$store.dispatch('sendCreateLeader', {
          email: this.leaderEmail,
          phone: this.leaderPhone,
          disciplines: this.leaderDisciplines,
          firstName: this.firstName,
          lastName: this.lastName,
          method: 'sendCreateLeader'
        })
          .then((response) => {
            console.log(response)
            this.$bvModal.hide('modal-login')
            this.$bvModal.show('modal-login-registration')
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.showToast(error.data.error, 'Wystąpil błąd')
            console.log(error)
          })
      },
      showForgotPassModal () {
        this.resetModal()
        this.$bvModal.hide('modal-login')
        this.$bvModal.show('modal-login-newPass')
      },
      resetModal () {
        this.leaderEmail = ''
        this.leaderPhone = ''
        this.leaderDisciplines = null
        this.firstName = ''
        this.lastName = ''

        this.schoolPhone = ''
        this.schoolEmail = ''
        this.schoolName = ''

        this.phone = ''
        this.email = ''
        this.password = ''
        this.emailResetPass = ''
      },
      validateEmail (email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
      },
      login () {
        console.log(111)
        if (this.email === '') {
          this.emptyEmail = false
          return false
        }
        if (this.password.length < 6) {
          this.passwordSimilarity = false
          return false
        }

        if (!this.validateEmail(this.email)) {
          // todo mixin
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
            this.$router.push({name: 'test.content'})
          })
          .catch((error) => {
            this.loginError = true

            // todo mixin
            this.$bvToast.toast('Nieprawidłowy adres e-mail lub hasło', {
              title: 'Uwaga!',
              toaster: 'b-toaster-bottom-full',
              solid: true,
              variant: 'danger'
            })

            console.log(error)
          })
      }
    },
    created () {
      this.$store.dispatch('getDisciplines')
    }
  }
</script>

<style scoped>

</style>
