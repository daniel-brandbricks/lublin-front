<template>
  <div v-if="id && hash && !passwordExists">
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
    name: 'ConfirmMail',
    mixins: [ToastMixin],
    data () {
      return {
        password: '',
        passwordConfirm: '',
        id: this.$route.params.id,
        hash: this.$route.params.hash,
        passwordExists: true
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

        this.$store.dispatch('sendMailConfirmed', {
          password: this.password,
          id: this.id,
          hash: this.hash,
          method: 'confirmEmail'
        })
          .then((response) => {
            if (response && response.status && response.status === 'OK') {
              let routeParams = {}
              routeParams['toastText'] = 'Konto zostało aktywowane'
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
        this.$store.dispatch('getMailConfirmed', {
          id: this.id,
          hash: this.hash,
          method: 'checkConfirmedMail'
        })
          .then((response) => {
            if (response && response.message && response.message === 'password does not exists') {
              this.passwordExists = false
            }
            console.log(response)
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.showToast(error.data.error, 'Uwaga', 'success')
          })
      }
    }
  }
</script>

<style scoped>
</style>
