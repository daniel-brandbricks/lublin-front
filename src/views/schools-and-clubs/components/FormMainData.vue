<template>
  <b-row class="justify-content-center">
    <!--   image   -->
    <b-col cols="12" lg="3" class="">
      <h2>Zdjęcie</h2>
<!--      <img src="http://lublin.local/assets/images/schools/14/odnP7-school_4%20tets.png" alt="">-->
      <ImageInputAdvanced :imgPath="school.image" @afterCropImage="afterCropImage"
                          :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                          :min-width="100" :max-height="1000" :max-width="1000"></ImageInputAdvanced>
    </b-col>

    <b-col cols="12" lg="5" class="">

      <!--    radios    -->
      <h2 class="mb-4">Aktywuj</h2>
      <b-form-group>
        <b-form-radio v-model="school.active" :value="element.value" class="d-inline-block mr-3"
                      :class="{'error-input-custom': veeErrors.has('school.active')}"
                      name="school.active" :key="'school.active'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
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
                      v-model="school.name"></b-form-input>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="E-mail"
                      :class="{'error-input-custom': veeErrors.has('school.email')}"
                      name="school.email" key="school.email" v-validate="{'required':true, 'email':true}"
                      v-model="school.email"></b-form-input>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Hasło"
                      :class="{'error-input-custom': veeErrors.has('school.password')}"
                      name="school.password" key="school.password" v-validate="{'required':true}"
                      v-model="school.password"></b-form-input>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Telefon"
                      :class="{'error-input-custom': veeErrors.has('school.phone')}"
                      name="school.phone" key="school.phone" v-validate="{'required':true}"
                      v-model="school.phone"></b-form-input>
      </b-form-group>

      <h2 class="my-4">Lokalizacja</h2>

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
                      v-model="school.address"></b-form-input>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Kod pocztowy"
                      :class="{'error-input-custom': veeErrors.has('school.postcode')}"
                      name="school.postcode" key="school.postcode" v-validate="{'required':true}"
                      v-model="school.postcode"></b-form-input>
      </b-form-group>
      <h1>MAP</h1>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Godziny otwarcia"
                      :class="{'error-input-custom': veeErrors.has('school.openHours')}"
                      name="school.openHours" key="school.openHours" v-validate="{'required':true}"
                      v-model="school.openHours"></b-form-input>
      </b-form-group>
<!--      todo or not todo v-validate="{'required':true}" -->
      <textarea class="custom w-100" v-model="school.comments" placeholder="Uwagi"
                :class="{'error-input-custom': veeErrors.has('school.comments')}"
                name="school.comments" :key="'school.comments'" :v-validate="'required'"></textarea>

      <h2 class="my-4">Osoba do kontaktu</h2>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Imię i Nazwisko"
                      :class="{'error-input-custom': veeErrors.has('school.personToContactFullName')}"
                      name="school.personToContactFullName" key="school.personToContactFullName"
                      v-validate="{'required':true}"
                      v-model="school.personToContactFullName"></b-form-input>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Telefon"
                      :class="{'error-input-custom': veeErrors.has('school.personToContactPhone')}"
                      name="school.personToContactPhone" key="school.personToContactPhone" v-validate="{'required':true}"
                      v-model="school.personToContactPhone"></b-form-input>
      </b-form-group>

<!--      <h1>{{this.loading}}</h1>-->

      <!--buttons-->
      <b-row class="mt-4">
        <div class="col">
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteSchool', school.id, undefined, 'schools.and.clubs', {tab: 'confirmed'})"> <!-- todo Vetal' -->
            Usuń
          </b-btn>
          <b-link block class="custom btn" :to="{ name: 'schools.and.clubs', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </div>

        <b-col>
          <b-btn block class="custom" @click="submit(true)">
            Zapisz
          </b-btn>
        </b-col>
        <b-col>
          <b-btn block variant="primary" class="custom" @click="goToFormTab('places')">
            Dalej
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import ImageInputAdvanced from '@/components/ImageInputAdvanced'

export default {
  name: 'FormMainData',
  props: ['school', 'districts'],
  components: {Treeselect, ImageInputAdvanced},
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {
    }
  },
  methods: {
    submit (validRequired) {
      if (validRequired) {
        this.preSubmit()
          .then((result) => {
            if (!result) {
              this.loading = false
              return
            }

            this.loading = false
            this.$parent.submit()
          })
      } else {
        this.$parent.submit()
      }
    },
    // todo this method in form mixin
    afterCropImage (base64) {
      console.log(base64)
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

  }
}
</script>

<style scoped>
  .error-input-custom {
    border: 1px solid red !important;
  }
</style>
