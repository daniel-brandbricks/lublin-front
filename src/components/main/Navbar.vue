<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-container>
      <b-navbar-brand href="#">LOGO</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <a href="#">zajęcia</a>
        <a href="#">wydarzenia</a>
        <a href="#">projekty
          sportowe</a>
        <a href="#">Pozalekcyjne
          zajęcia sportowe</a>
        <a href="#">Klasy sportowe
          i profilowane</a>
        <a href="#">współwazwodnictwo</a>
        <a href="#" class="ml-3" v-b-modal.modal-login>zaloguj się</a>
      </b-navbar-nav>
    </b-container>

    <b-modal
      id="modal-login"
      ref="modal-login"
      title="Logowanie"
      size="sm"
      hide-footer
      @show="resetModal"
      @hidden="resetModal">
      <b-form ref="form" @submit.prevent="login">
        <b-form-group
          label-for="name-input">
          <b-form-input
            id="name-input"
            type="email"
            required
            placeholder="E-mail"
            v-model="email"></b-form-input>
        </b-form-group>

        <b-form-group
          label-for="name-input">
          <b-form-input
            id="name-input"
            type="password"
            placeholder="Hasło"
            required
            v-model="password"></b-form-input>
        </b-form-group>

        <b-btn type="submit" block class="mt-4">
          Zaloguj się
        </b-btn>
      </b-form>
    </b-modal>

  </b-navbar>
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
