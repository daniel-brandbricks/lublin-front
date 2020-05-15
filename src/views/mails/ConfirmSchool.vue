<template>
  <div>
    <b-row class="justify-content-center">
      <b-col class="mt-5 d-flex justify-content-center">
        <b-link :to="{name:'home'}">
          <div class="sidebar-heading">
            <img src="/static/img/logo.svg" alt="">
          </div>
        </b-link>
      </b-col>
    </b-row>
    <div v-if="id && hash && !passwordExists">

      <b-row class="justify-content-center px-2 mt-5">
        <!--   image   -->
<!--        <b-col cols="12" lg="4" md="5" sm="10" class="">-->
<!--          <h2>Zdjęcie</h2>-->
<!--          &lt;!&ndash;      <img src="http://lublin.local/assets/images/schools/14/odnP7-school_4%20tets.png" alt="">&ndash;&gt;-->
<!--          <ImageInputAdvanced :imgPath="school.image" @afterCropImage="afterCropImage"-->
<!--                              :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"-->
<!--                              :min-width="100" :max-height="1000" :max-width="1000"/>-->
<!--        </b-col>-->

        <b-col cols="12" lg="4" md="5" sm="10" class="">

          <!--    radios    -->
          <h2 class="mb-4">Aktywuj</h2>
          <b-form-group>
            <b-form-radio v-model="school.active" :value="element.value" class="d-inline-block mr-3"
                          :class="{'error-input-custom': veeErrors.has('school.active')}"
                          name="school.active" :key="'school.active'+index" v-validate="{'required':true}"
                          v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
              {{ element.title }}
            </b-form-radio>
          </b-form-group>

          <h2 class="my-4">Dane ogólne</h2>
          <b-form-group>
            <b-form-radio v-model="school.type" :value="element.value" class="d-inline-block mr-3"
                          :class="{'error-input-custom': veeErrors.has('school.type')}"
                          name="school.type" :key="'school.type'+index" v-validate="{'required':true}"
                          v-for="(element,index) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}]">
              {{ element.title }}
            </b-form-radio>
          </b-form-group>

          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Nazwa"
                          :class="{'error-input-custom': veeErrors.has('school.name')}"
                          name="school.name" key="school.name" v-validate="{'required':true}"
                          v-model="school.name"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="E-mail" disabled
                          :class="{'error-input-custom': veeErrors.has('school.email')}"
                          name="school.email" key="school.email" v-validate="{'required':true, 'email':true}"
                          v-model="school.email"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Hasło"
                          :class="{'error-input-custom': veeErrors.has('school.password')}"
                          name="school.password" key="school.password"
                          v-validate="{'required': true}"
                          v-model="school.password"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Powtrórz hasło"
                          :class="{'error-input-custom': veeErrors.has('passwordConfirm')}"
                          name="passwordConfirm" key="passwordConfirm"
                          v-validate="{'required': true}"
                          v-model="passwordConfirm"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Telefon"
                          :class="{'error-input-custom': veeErrors.has('school.phone')}"
                          name="school.phone" key="school.phone" v-validate="{'required':true}"
                          v-model="school.phone"/>
          </b-form-group>

          <h2 class="my-4">Lokalizacja</h2>
          <DistrictSearch/>

          <!--    treeselect    -->
          <treeselect v-model="school.district"
                      :multiple="false"
                      placeholder="Dzielnica"
                      :options="districts"
                      :class="{'error-input-custom': veeErrors.has('school.district')}"
                      name="school.district" key="school.district" v-validate="{'required':true}"
                      class="custom mb-3"/>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Adres"
                          :class="{'error-input-custom': veeErrors.has('school.address')}"
                          name="school.address" key="school.address" v-validate="{'required':true}"
                          v-model="school.address"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Kod pocztowy"
                          :class="{'error-input-custom': veeErrors.has('school.postcode')}"
                          name="school.postcode" key="school.postcode" v-validate="{'required':true}"
                          v-model="school.postcode"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Godziny otwarcia"
                          :class="{'error-input-custom': veeErrors.has('school.openHours')}"
                          name="school.openHours" key="school.openHours" v-validate="{'required':true}"
                          v-model="school.openHours"/>
          </b-form-group>
          <!--      todo or not todo v-validate="{'required':true}" -->
          <textarea class="custom w-100" v-model="school.comments" placeholder="Uwagi"
                    :class="{'error-input-custom': veeErrors.has('school.comments')}"
                    name="school.comments" :key="'school.comments'" :v-validate="'required'"/>

          <h2 class="my-4">Osoba do kontaktu</h2>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Imię i Nazwisko"
                          :class="{'error-input-custom': veeErrors.has('school.personToContactFullName')}"
                          name="school.personToContactFullName" key="school.personToContactFullName"
                          v-validate="{'required':true}"
                          v-model="school.personToContactFullName"/>
          </b-form-group>
          <b-form-group
            class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Telefon"
                          :class="{'error-input-custom': veeErrors.has('school.personToContactPhone')}"
                          name="school.personToContactPhone" key="school.personToContactPhone"
                          v-validate="{'required':true}"
                          v-model="school.personToContactPhone"/>
          </b-form-group>

          <!--      <h1>{{this.loading}}</h1>-->

          <!--buttons-->
          <b-row class="justify-content-end my-4">
            <b-col class="d-flex justify-content-end col-lg-4 col-md-6 col-sm-10">
              <b-btn @click="submit" variant="primary">Zapisz</b-btn>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

<!--      <b-row class="justify-content-center mt-5">-->
<!--        <b-col class="col-lg-4 col-md-6 col-sm-10">-->
<!--          <b-input v-model="password" placeholder="Wprowadż hasło" type="password" class="mb-3"/>-->
<!--          <b-input v-model="passwordConfirm" placeholder="Powtórz hasło" type="password"/>-->
<!--        </b-col>-->
<!--      </b-row>-->
<!--      <b-row class="justify-content-center mt-4">-->
<!--        <b-col class="d-flex justify-content-end col-lg-4 col-md-6 col-sm-10">-->
<!--          <b-btn @click="submit" variant="primary">Zapisz</b-btn>-->
<!--        </b-col>-->
<!--      </b-row>-->
    </div>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'
  import ToastMixin from '@/mixins/toast-mixin'
  import {DISTRICTS} from '@/config/AppConfig'
  import DistrictSearch from "@/components/DistrictSearch";

  export default {
    name: 'ConfirmSchool',
    components: {Treeselect, ImageInputAdvanced, DistrictSearch},
    mixins: [ToastMixin, EventBusEmit, FormMixin],
    data () {
      return {
        password: '',
        passwordConfirm: '',
        id: this.$route.params.id,
        hash: this.$route.params.hash,
        passwordExists: true,

        districts: DISTRICTS,

        school: {
          id: this.id,
          image: null,
          active: true,
          confirmed: false,
          type: 0,
          name: '',
          email: '',
          password: '',
          phone: '',

          // location
          district: null,
          address: '',
          postcode: '',
          // todo
          mapImg: '',
          openHours: '',
          comments: '',

          // contact person
          personToContactFullName: '',
          personToContactPhone: '',

          // foreign
          places: [],
          schoolsUsers: []
        }
      }
    },
    methods: {
      submit () {
        this.$validator.validateScopes()
          .then(result => {
            if (!result) return
            if (this.school.password.length < 6 || this.passwordConfirm.length < 6) {
              this.showToast('Hasło nie może być mniej niż 6 znaków', 'Uwaga', 'danger')
              return
            }
            if (this.school.password !== this.passwordConfirm) {
              this.showToast('Hasła nie są identyczne', 'Uwaga', 'danger')
              return
            }

            let school = this.school
            console.log(this.school)
            delete school.schoolsUsers
            // school.image = this.mixinImage

            this.$store.dispatch('putSchoolByEmail', {
              school: school,
              id: this.id,
              hash: this.hash,
              method: 'postSchool'
            })
              .then((response) => {
                if (response && response.status && response.status === 'OK') {
                  let routeParams = {}
                  routeParams['toastText'] = 'Konto zostało stworzone. Zachowaj teraz cierpliwość. Szkoła / Klub musi być zatwierdzona przez administratora.'
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
          })
      },
      // todo this method in form mixin
      afterCropImage (base64) {
        this.school.image = base64
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      }
    },
    mounted () {
      // validate form after redirect from another tab (component)
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }
    },
    created () {
      if (undefined === this.id || undefined === this.hash) {
        this.showToast('Nieprawidłowy URL', 'Uwaga', 'danger')
      } else {
        this.$store.dispatch('getCreateSchool', {
          id: this.id,
          hash: this.hash,
          method: 'checkConfirmedSchool'
        })
          .then((response) => {
            if (response && response.id) {
              this.passwordExists = false
              this.school = response
            }
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
  .error-input-custom {
    border: 1px solid red !important;
  }
</style>
