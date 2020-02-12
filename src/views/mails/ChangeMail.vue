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
  </div>
</template>

<script>

  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'ChangeMail',
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
          method: 'checkChangeMail'
        })
          .then((response) => {
            this.hashExists = true
            this.showToast('Mail się zmienił, możesz zalogować się ponownie!',
              'Uwaga', 'success')
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            if (error && error.data && error.data.error) {
              this.showToast(error.data.error,'Uwaga', 'success')
              this.hashExists = false
            }
          })
      }
    }
  }
</script>

<style scoped>
</style>
