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
<!--        <b-form-group class="custom mb-2">-->
<!--          <b-form-input id="password-1" class="custom m-0"-->
<!--                        placeholder="Hasło" type="password"-->
<!--                        :class="{'error-input-custom': veeErrors.has('admin.password')}"-->
<!--                        name="admin.password" key="admin.password" v-validate="{'required': admin.id === undefined}"-->
<!--                        v-model="admin.password"/>-->
<!--        </b-form-group>-->

        <!--buttons-->
        <b-row class="mt-4">
          <b-col>
            <b-btn variant="delete" class="custom"
                   @click="deleteFromForm('deleteAdministrator', admin.id, undefined, 'co.administrators')">
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
          active: false,
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      submit () {
        this.$validator.validateScopes()
          .then((result) => {
            if (result === false) return
            const method = this.id === undefined ? 'postAdministrator' : 'putAdministrator'
            this.$store.dispatch(method, this.admin)
              .then((response) => {
                this.routeParams['toastText'] = 'Dane zostały zapisane' + this.id === undefined
                  ? '. Email zostal nadeslany z linkiem do wprowadzenia hasła' : ''
                this.routeParams['toastVariant'] = 'success'
                this.$router.push({
                  name: 'co.administrators',
                  params: this.routeParams
                })
              })
              // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                console.log(error)
                this.showToast((error && error.data && error.data.error)
                ? error.data.error : 'Wystąpil błąd', 'Uwaga', 'danger')
              })
          })
      }
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      this.changeAdminNavbarBreadcrumbs([{text: 'Współadministratorzy', active: true}])
    }
  }
</script>

<style scoped>

</style>
