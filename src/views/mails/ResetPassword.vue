<template>
  <div v-if="id && hash && hashExists">
    <b-row class="justify-content-center">
      <b-col class="mt-5 d-flex justify-content-center">
        <b-link :to="{name:'home'}">
          <div class="sidebar-heading">
            <img src="/static/img/logo.svg" alt="">
          </div>
        </b-link>
      </b-col>
    </b-row>
    <b-row class="justify-content-center mt-5">
      <b-col class="col-lg-4 col-md-6 col-sm-10">
        <b-input v-model="password" placeholder="Wprowadż hasło" type="password" class="mb-3"/>
        <b-input v-model="passwordConfirm" placeholder="Powtórz hasło" type="password"/>
      </b-col>
    </b-row>
    <b-row class="justify-content-center mt-4">
      <b-col class="d-flex justify-content-end col-lg-4 col-md-6 col-sm-10">
        <b-btn @click="submit" variant="primary">Zapisz</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'ResetPassword',
    mixins: [ToastMixin],
    data () {
      return {
        password: '',
        passwordConfirm: '',
        id: this.$route.params.id,
        hash: this.$route.params.hash,
        hashExists: false
      }
    },
    methods: {
      submit () {
        if (this.password.length < 6 || this.passwordConfirm.length < 6) {
          this.showToast('Hasło nie może być mniej niż 6 znaków', 'Uwaga', 'danger')
          return
        }
        if (this.password !== this.passwordConfirm) {
          this.showToast('Hasła nie są identyczne', 'Uwaga', 'danger')
          return
        }

        this.$store.dispatch('passwordReset', {
          password: this.password,
          id: this.id,
          hash: this.hash,
          method: 'passwordReset'
        })
          .then((response) => {
            if (response && response.status && response.status === 'OK') {
              let routeParams = {}
              routeParams['toastText'] = 'Hasło zostało zmienione'
              routeParams['toastVariant'] = 'success'
              this.$router.push({
                name: 'home',
                params: routeParams
              })
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            console.log(error)
          })
      }
    },
    created () {
      if (undefined === this.id || undefined === this.hash) {
        this.showToast('Nieprawidłowy URL', 'Uwaga', 'danger')
      } else {
        this.$store.dispatch('getPasswordReset', {
          id: this.id,
          hash: this.hash,
          method: 'checkPasswordReset'
        })
          .then((response) => {
            this.hashExists = true
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            if (error && error.data && error.data.error && error.data.error === 'Nie ma haszu') {
              this.showToast('Sprobuj zresetować hasło jeszcze raz, żeby otrzymać nowy link',
                             'Uwaga', 'success')
              this.hashExists = false
            }
          })
      }
    }
  }
</script>

<style scoped>
</style>
