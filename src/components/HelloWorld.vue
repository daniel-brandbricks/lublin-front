<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <b-button v-b-modal.modal-login>Login</b-button>

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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      email: '',
      password: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    resetModal () {
      this.email = ''
      this.password = ''
    },
    validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email)
        .toLowerCase())
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
