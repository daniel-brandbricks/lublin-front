<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-form-group class="custom mb-2" v-if="isDirector && authUser.role === 1"
                      label="Nazwa profilu (Szkoła / Klub)">
          <b-form-input id="name-1" class="custom m-0"
                        :disabled="true"
                        v-model="schoolName"/>
        </b-form-group>

        <b-form-group class="custom mb-2" v-if="!isDirector || authUser.role !== 1"
                      label="Imię">
          <b-form-input id="name-1" class="custom m-0"
                        :class="{'error-input-custom': veeErrors.has('user.firstName')}"
                        name="user.firstName" key="user.firstName" v-validate="{'required':true}"
                        v-model="user.firstName"/>
        </b-form-group>
        <b-form-group class="custom mb-2" v-if="!isDirector || authUser.role !== 1"
                      label="Nazwisko">
          <b-form-input id="surname-1" class="custom m-0"
                        :class="{'error-input-custom': veeErrors.has('user.lastName')}"
                        name="user.lastName" key="user.lastName" v-validate="{'required':true}"
                        v-model="user.lastName"/>
        </b-form-group>
        <b-form-group class="custom mb-2" v-if="!isDirector || authUser.role !== 1"
                      label="Telefon">
          <b-form-input id="phone-1" class="custom m-0"
                        type="number"
                        :class="{'error-input-custom': veeErrors.has('user.phone')}"
                        name="user.phone" key="user.phone" v-validate="{'required':true}"
                        v-model="user.phone"/>
        </b-form-group>
<!--        <b-form-group class="custom mb-2" :label="(isDirector && authUser.role === 1) ? 'E-mail dla konta' : 'E-mail'">-->
        <b-form-group class="custom mb-2" label="Email do logowania">
          <b-form-input id="email-1" class="custom m-0"
                        :class="{'error-input-custom': veeErrors.has('user.email')}"
                        name="user.email" key="user.email" v-validate="{'required':true, 'email': true}"
                        v-model="user.email"/>
        </b-form-group>

        <div class="mt-5">
          <b-form-group class="custom mb-2">
            <b-form-input id="password-1" class="custom m-0"
                          placeholder="Stare hasło (zostaw puste jeśli nie chcesz zmieniać)" type="password"
                          :class="{'error-input-custom': veeErrors.has('user.password')}"
                          name="user.password" key="user.password" v-validate="{'required': user.id === undefined}"
                          v-model="password"/>
          </b-form-group>
          <b-form-group class="custom mb-2">
            <b-form-input id="password-1" class="custom m-0"
                          placeholder="Nowe hasło (zostaw puste jeśli nie chcesz zmieniać)" type="password"
                          :class="{'error-input-custom': veeErrors.has('user.newPassword')}"
                          name="user.newPassword" key="user.newPassword"
                          v-validate="{'required': user.id === undefined}"
                          v-model="newPassword"/>
          </b-form-group>
          <b-form-group class="custom mb-2">
            <b-form-input id="password-1" class="custom m-0"
                          placeholder="Powtórz nowe hasło (zostaw puste jeśli nie chcesz zmieniać)" type="password"
                          :class="{'error-input-custom': veeErrors.has('user.confirmPassword')}"
                          name="confirmPassword" key="confirmPassword" v-validate="{'required': user.id === undefined}"
                          v-model="confirmPassword"/>
          </b-form-group>
        </div>

        <!--buttons-->
        <b-row class="mt-4 justify-content-end">
          <b-col lg="3" md="6" sm="12">
            <b-btn block class="custom" @click="submit">
              Zapisz
            </b-btn>
          </b-col>
        </b-row>

        <div class="mt-2" v-if="authUser && authUser.replacements.length > 0">
          <h4>Zastępstwa</h4>
          <div v-if="item.checked === false" v-for="(item,index) in authUser.replacements" class="mb-1">
            <b-row class="justify-content-end">
              <b-col>
                {{item.lesson.title}}
              </b-col>
              <b-col>
                <b-link :to="{ name: 'lesson', params: { tab: 'main-data', id: item.lesson.id } }"
                        :target="'_blank'"
                        active-class="active"
                        event=""
                        class="tab-link-item">
                  Zobacz
                </b-link>
              </b-col>
              <b-col>
                <b-btn variant="primary" class="custom" @click="submitReplacement(item.id)">
                  Zatwierdż
                </b-btn>
              </b-col>
            </b-row>
          </div>
        </div>

      </b-col>

    </b-row>

    <b-modal ref="schoolInviteModal" centered title="Dodaj szkołę / klub" hide-footer size="lg">
      <treeselect class="custom"
                  v-model="selectedSchools"
                  :multiple="true"
                  placeholder="Szkoła / klub"
                  :options="schoolsTreeselect"/>
      <b-row class="mt-2">
        <b-col>
          <b-btn variant="primary" class="w-25 float-right" @click="sendInvite">Wyślij</b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  import FormMixin from '@/mixins/form-mixin'
  import ToastMixin from '@/mixins/toast-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import EventBus from '@/event-bus'
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    mixins: [EventBusEmit, FormMixin, ToastMixin],
    name: 'Profile',
    components: {Treeselect},
    data () {
      return {
        selectedSchools: [],

        user: {
          role: 2,
          active: false,
          firstName: '',
          lastName: '',
          phone: '',
          email: ''
        },

        password: '',
        newPassword: '',
        confirmPassword: '',

        schoolName: ''
      }
    },
    watch: {
      authUser: function (val) {
        if (this.authUser && this.authUser.role === 1 &&
        (this.authUser.schoolsUsers.length < 1 || this.authUser.schoolsUsers[0].role === 0)) {
          /** @buttonLink route name || false if button must be hidden */
          this.changeAdminNavbarButton({
            eventBusMethod: 'OPEN_SCHOOLS_INVITE_MODAL',
            eventBusButtonName: 'Dodaj szkołę / klub'
          })
        }
        if (this.authUser && this.authUser.role === 1 &&
        (this.authUser.schoolsUsers.length > 0 && this.authUser.schoolsUsers[0].role === 1)) {
          this.$store.dispatch('getSchool', {id: this.authUser.schoolsUsers[0].school.id})
            .then(response => {
              this.schoolName = response.name
            })
        }
      }
    },
    computed: {
      authUser () {
        return this.$store.getters.authUser
      },
      isDirector () {
        return this.$store.getters.isDirector
      },
      schoolsTreeselect () {
        let data = this.$store.getters.schools

        if (undefined === this.authUser || this.authUser === null) {
          return []
        }

        let existedSchoolsUsers = this.authUser.schoolsUsers
        console.log(existedSchoolsUsers)
        let preparedSchools = []

        for (let schoolIndex in data) {
          if (existedSchoolsUsers.length > 0) {
            let schoolExist = existedSchoolsUsers.find(x => {
              return x.school.id === data[schoolIndex].id
            })

            console.log(schoolExist)

            if (undefined === schoolExist) {
              preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
            }
          } else {
            preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
          }
        }
        return preparedSchools
      }
    },
    methods: {
      submitReplacement (id) {
        this.$store.dispatch('putLeader', {
          id: this.authUser.id,
          replacementId: id,
          actionType: 'acceptReplacement'
        }).then(res => {
          this.$store.dispatch('getCurrentUser')
        })
      },
      sendInvite () {
        this.$store.dispatch('putLeader', {
          id: this.authUser.id,
          schools: this.selectedSchools,
          actionType: 'sendSchoolInvitation'
        }).catch(error => {
          this.showToast(error.data.error, 'Wystąpil błąd')
        })
        this.selectedSchools = []
        this.$refs.schoolInviteModal.hide()
      },
      submit () {
        this.$validator.validateScopes()
          .then((result) => {
            if (result === false) return

            if (this.confirmPassword.length > 0 || this.password.length > 0 || this.newPassword.length > 0) {
              if (!this.checkPassword()) return
              this.user.password = this.password
              this.user.newPassword = this.newPassword
            }

            this.$store.dispatch('putUser', this.user)
              .then((response) => {
                this.showToast('Dane zostały zapisane', 'Uwaga', 'success')
                delete this.user.password
                delete this.user.newPassword
                this.password = ''
                this.newPassword = ''
                this.confirmPassword = ''
              })
              // eslint-disable-next-line handle-callback-err
              .catch((error) => {
                delete this.user.password
                delete this.user.newPassword
                this.password = ''
                this.newPassword = ''
                this.confirmPassword = ''
                this.showToast((error && error.data && error.data.error)
                ? error.data.error : 'Wystąpil błąd', 'Uwaga', 'danger')
              })
          })
      },
      checkPassword () {
        if (this.confirmPassword !== this.newPassword) {
          this.showToast('Hasła nie są identyczne', 'Uwaga', 'danger')
          return false
        }
        if (this.newPassword.length < 6) {
          this.showToast('Hasło nie może być mniej niż 6 znaków', 'Uwaga', 'danger')
          return false
        }
        return true
      },
      openSchoolsInviteModal () {
        if (this.$refs.schoolInviteModal) this.$refs.schoolInviteModal.show()
      }
    },
    mounted () {
      if (this.authUser && this.authUser.role === 1 &&
      (this.authUser.schoolsUsers.length < 1 || this.authUser.schoolsUsers[0].role === 0)) {
        /** @buttonLink route name || false if button must be hidden */
        this.changeAdminNavbarButton({
          eventBusMethod: 'OPEN_SCHOOLS_INVITE_MODAL',
          eventBusButtonName: 'Dodaj szkołę / klub'
        })
      }
    },
    created () {
      EventBus.$on('OPEN_SCHOOLS_INVITE_MODAL', (params) => {
        this.openSchoolsInviteModal()
      })

      this.$store.dispatch('getSchools', {getAll: true})

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      this.changeAdminNavbarBreadcrumbs([{text: 'Mój profil', active: true}])

      this.$store.dispatch('getCurrentUser')
        .then((response) => {
          this.user = response
        })
    }
  }
</script>

<style scoped>

</style>
