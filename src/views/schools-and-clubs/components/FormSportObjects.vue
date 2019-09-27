<template>
  <div>
    {{isValidForm}}

    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <div class="row" v-if="school.sportObjects" v-for="(sportObject,index) in school.sportObjects" :key="index">
          <div class="col-1">
            <!--   todo Веталь, перепиши в класс как будет время   -->
            <div class="text-center"
                 style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
              <p class="m-auto">{{index + 1}}</p>
            </div>
            <p @click="removeSportObject(index)" v-if="school.sportObjects.length > 0">usuń</p>
          </div>
          <div class="col-11 pl-4">
            <h2 class="mb-4">Dane ogólne</h2>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="Nazwa"
                            :class="{'error-input-custom': veeErrors.has('sportObject.name'+index)}"
                            :name="'sportObject.name'+index" :key="'sportObject.name'+index" v-validate="'required'"
                            v-model="sportObject.name"></b-form-input>
            </b-form-group>

            <!--    treeselect    -->
            <treeselect v-model="sportObject.district"
                        :multiple="false"
                        placeholder="Dzielnica"
                        :options="optionsTS"
                        :class="{'error-input-custom': veeErrors.has('sportObject.district'+index.toString())}"
                        :name="'sportObject.district'+index.toString()" :key="'sportObject.district'+index.toString()" v-validate="'required'"
                        class="custom mb-3"/>

            <h2 class="my-4">Lokalizacja</h2>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="Adres"
                            :class="{'error-input-custom': veeErrors.has('sportObject.address'+index)}"
                            :name="'sportObject.address'+index" :key="'sportObject.address'+index" v-validate="'required'"
                            v-model="sportObject.address"></b-form-input>
            </b-form-group>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="Kod pocztowy"
                            :class="{'error-input-custom': veeErrors.has('sportObject.postcode'+index)}"
                            :name="'sportObject.postcode'+index" :key="'sportObject.postcode'+index" v-validate="'required'"
                            v-model="sportObject.postcode"></b-form-input>
            </b-form-group>
            <h1>MAP</h1>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <div class="row">
          <div class="col-1">
            <!--   todo Веталь, перепиши в класс как будет время   -->
            <div class="text-center"
                 style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
              <p class="m-auto" v-if="school.sportObjects">{{school.sportObjects.length + 1}}</p>
            </div>
          </div>

          <div class="col-11 pl-4">
            <b-btn variant="primary" class="w-50" @click="addSportObject">Dodaj</b-btn>
          </div>
        </div>
      </b-col>

    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <!--buttons-->
        <b-row class="mt-4">
          <b-col>
            <b-btn variant="outline-primary" class="custom"> <!-- todo Vetal' -->
              Usuń
            </b-btn>
          </b-col>
          <b-col>
            <b-link block class="custom btn" :to="{ name: 'schools.and.clubs', params: { 'tab': 'confirmed' } }">
              Anuluj
            </b-link>
          </b-col>
          <b-col>
            <b-btn block class="custom" @click="submitSetConfirm(false, false)">
              Zapisz
            </b-btn>
          </b-col>
          <b-col>
            <b-btn block variant="primary" class="custom" @click="submitSetConfirm(true)">
              Zatwierdź
            </b-btn>
          </b-col>
        </b-row>
      </b-col>

    </b-row>
  </div>

</template>

<script>
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import ImageInputAdvanced from '@/components/ImageInputAdvanced'

export default {
  name: 'FormSportObjects',
  props: ['school', 'isValidForm'],
  components: {Treeselect, ImageInputAdvanced},
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {
      optionsTS: [{
        id: 'a',
        label: 'first',
        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }]
      }, {
        id: 'b',
        label: 'second'
      }, {
        id: 'c',
        label: 'third'
      }]
    }
  },
  methods: {
    addSportObject () {
      this.$parent.addSportObject()
    },
    removeSportObject (index) {
      this.$parent.removeSportObject(index)
    },

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
    submitSetConfirm (isConfirmed, validRequired = true) {
      this.school.confirmed = isConfirmed
      this.submit(true)
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
