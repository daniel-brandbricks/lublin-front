<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <h2 class="mb-4">Aktywuj</h2>
        <b-form-group>
          <b-form-radio v-model="admin.active" :value="element.value" class="d-inline-block mr-3"
                        :class="{'error-input-custom': veeErrors.has('admin.active')}"
                        name="admin.active" :key="'admin.active'+index" v-validate="{'required':true}"
                        v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
            {{ element.title }}
          </b-form-radio>
        </b-form-group>

        <h5 class="mb-3">Dane ogólne</h5>
        <b-form-group class="custom mb-2">
          <b-form-input id="name-1" class="custom m-0"
                        placeholder="Imię"
                        :class="{'error-input-custom': veeErrors.has('admin.firstName')}"
                        name="admin.firstName" key="admin.firstName" v-validate="{'required':true}"
                        v-model="admin.firstName"/>
        </b-form-group>
        <b-form-group class="custom mb-2">
          <b-form-input id="surname-1" class="custom m-0"
                        placeholder="Nazwisko"
                        :class="{'error-input-custom': veeErrors.has('admin.lastName')}"
                        name="admin.lastName" key="admin.lastName" v-validate="{'required':true}"
                        v-model="admin.lastName"/>
        </b-form-group>
        <b-form-group class="custom mb-2">
          <b-form-input id="phone-1" class="custom m-0"
                        placeholder="Telefon" type="number"
                        :class="{'error-input-custom': veeErrors.has('admin.phone')}"
                        name="admin.phone" key="admin.phone" v-validate="{'required':true}"
                        v-model="admin.phone"/>
        </b-form-group>
        <b-form-group class="custom mb-2">
          <b-form-input id="email-1" class="custom m-0"
                        placeholder="E-mail"
                        :class="{'error-input-custom': veeErrors.has('admin.email')}"
                        name="admin.email" key="admin.email" v-validate="{'required':true, 'email': true}"
                        v-model="admin.email"/>
        </b-form-group>

        <div v-if="id !== undefined" class="mt-5">
          <b-form-group class="custom mb-2">
            <b-form-input id="password-1" class="custom m-0"
                          placeholder="Stare hasło (zostaw pustym jeśli nie chcesz zmieniać)" type="password"
                          :class="{'error-input-custom': veeErrors.has('admin.password')}"
                          name="admin.password" key="admin.password" v-validate="{'required': admin.id === undefined}"
                          v-model="admin.password"/>
          </b-form-group>
          <b-form-group class="custom mb-2">
            <b-form-input id="password-1" class="custom m-0"
                          placeholder="Nowe hasło (zostaw pustym jeśli nie chcesz zmieniać)" type="password"
                          :class="{'error-input-custom': veeErrors.has('admin.newPassword')}"
                          name="admin.newPassword" key="admin.newPassword" v-validate="{'required': admin.id === undefined}"
                          v-model="admin.newPassword"/>
          </b-form-group>
          <b-form-group class="custom mb-2">
            <b-form-input id="password-1" class="custom m-0"
                          placeholder="Powtórz nowe hasło (zostaw pustym jeśli nie chcesz zmieniać)" type="password"
                          :class="{'error-input-custom': veeErrors.has('admin.confirmPassword')}"
                          name="confirmPassword" key="confirmPassword" v-validate="{'required': admin.id === undefined}"
                          v-model="confirmPassword"/>
          </b-form-group>
        </div>

        <!--buttons-->
        <b-row class="mt-4">
          <b-col>
            <b-btn variant="delete" class="custom"
                   @click="deleteFromForm('deleteAdministrator', admin.id, undefined, 'co.administrators', {})">
              Usuń
            </b-btn>
          </b-col>
          <b-col>
            <b-link block class="custom btn" :to="{ name: 'co.administrators' }">
              Anuluj
            </b-link>
          </b-col>
          <b-col>
            <b-btn block class="custom" @click="submit">
              Zapisz
            </b-btn>
          </b-col>
        </b-row>
      </b-col>

    </b-row>

  </div>
</template>

<script>
  import FormMixin from '@/mixins/form-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    mixins: [EventBusEmit, FormMixin],
    name: 'CoAdministrator',
    data () {
      return {
        admin: {
          role: 2,
          active: false,
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: '',
          newPassword: ''
        },
        confirmPassword: ''
      }
    },
    methods: {
      submit () {
        this.$validator.validateScopes()
          .then((result) => {
            if (result === false) return
            const method = this.id === undefined ? 'postAdministrator' : 'putAdministrator'

            if (this.confirmPassword.length > 0 || this.admin.password.length > 0 || this.admin.newPassword.length > 0) {
              if (!this.checkPassword()) return
            }

            this.$store.dispatch(method, this.admin)
              .then((response) => {
                let routeParams = {}
                routeParams['toastText'] = 'Dane zostały zapisane' + this.id === undefined
                  ? '. Email zostal nadeslany z linkiem do wprowadzenia hasła' : ''
                routeParams['toastVariant'] = 'success'
                this.$router.push({
                  name: 'co.administrators',
                  params: routeParams
                })
              })
              // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                console.log(error)
                this.showToast((error && error.data && error.data.error)
                ? error.data.error : 'Wystąpil błąd', 'Uwaga', 'danger')
              })
          })
      },
      checkPassword () {
        if (this.confirmPassword !== this.admin.newPassword) {
          this.showToast('Hasła nie są identyczne', 'Uwaga', 'danger')
          return false
        }
        if (this.admin.newPassword.length < 6) {
          this.showToast('Hasło nie może być mniej niż 6 znaków', 'Uwaga', 'danger')
          return false
        }
        return true
      }
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      let breadcrumbs = [
        {text: 'Współadministratorzy', to: {name: 'co.administrators'}},
        {text: 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getAdministrator', {id: this.id})
          .then((response) => {
            this.admin = response
            this.admin.password = ''
            this.admin.newPassword = ''
            console.log(response)

            let breadcrumbs = [
              {text: 'Współadministratorzy', to: {name: 'co.administrators'}},
              {text: response.firstName + ' ' + response.lastName, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
