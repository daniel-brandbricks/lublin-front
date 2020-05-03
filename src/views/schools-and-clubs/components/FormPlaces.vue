<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <DistrictSearch/>
        <div class="row" v-if="school.places"
             v-for="(place,index) in school.places" :key="index">
          <div class="col-1">
            <div class="text-center custom-class">
              <p class="m-auto">{{index + 1}}</p>
            </div>
            <p @click="removePlace(index)" v-if="school.places.length > 0">usuń</p>
          </div>
          <div class="col-11 pl-4">
            <h2 class="mb-4">Dane ogólne</h2>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="Nazwa"
                            :class="{'error-input-custom': veeErrors.has('place.title'+index)}"
                            :name="'place.title'+index" :key="'place.title'+index" v-validate="{'required':true}"
                            v-model="place.title"/>
            </b-form-group>

            <!--    treeselect    -->
            <treeselect v-model="school.places[index].type.id" v-if="school.places[index].type"
                        :multiple="false" class="custom mb-3"
                        placeholder="Typ" :options="sportObjectTypesPrepared"
                        :class="{'error-input-custom': veeErrors.has('sportObject.type')}"
                        name="sportObject.type" key="sportObject.type" v-validate="{'required':true}"/>

            <!--    treeselect    -->
            <treeselect v-model="place.district"
                        :multiple="false"
                        placeholder="Dzielnica"
                        :options="districts"
                        :class="{'error-input-custom': veeErrors.has('place.district'+index.toString())}"
                        :name="'place.district'+index.toString()" :key="'place.district'+index.toString()"
                        v-validate="{'required':true}"
                        class="custom mb-3"/>

            <h2 class="my-4">Lokalizacja</h2>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="Adres"
                            :class="{'error-input-custom': veeErrors.has('place.address'+index)}"
                            :name="'place.address'+index" :key="'place.address'+index"
                            v-validate="{'required':true}"
                            v-model="place.address"/>
            </b-form-group>
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom"
                            placeholder="Kod pocztowy"
                            :class="{'error-input-custom': veeErrors.has('place.postcode'+index)}"
                            :name="'place.postcode'+index" :key="'place.postcode'+index"
                            v-validate="{'required':true}"
                            v-model="place.postcode"/>
            </b-form-group>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="12" lg="6" class="">
        <div class="row">
          <div class="col-1">
            <!--   todo Веталь, перепиши в класс как будет время   -->
            <div class="text-center custom-class">
              <p class="m-auto" v-if="school.places">{{school.places.length + 1}}</p>
            </div>
          </div>

          <div class="col-11 pl-4">
            <b-btn variant="primary" class="w-50" @click="addPlace">Dodaj</b-btn>
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
            <b-btn block class="custom" @click="submit">
              Zapisz
            </b-btn>
          </b-col>
          <b-col>
            <b-btn v-if="school.confirmed" block variant="primary" class="custom" @click="submitSetConfirm(0)">
              Odtwierdz
            </b-btn>
            <b-btn block v-else variant="primary" class="custom" @click="submitSetConfirm(1, true)">
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
  import DistrictSearch from "@/components/DistrictSearch";

  export default {
    name: 'FormPlaces',
    props: [ 'school', 'isValidForm', 'districts' ],
    components: {DistrictSearch, Treeselect, ImageInputAdvanced },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        // for school
        places: [],
        placesToDelete: [], // ???
        placeDefault: {
          active: 1,
          confirmed: null,
          type: {
            id: null
          },
          name: '',
          // school: {
          //   id: null
          // },

          // location
          district: null,
          address: '',
          postcode: '',
          // todo
          mapImg: ''
        }
      }
    },
    computed: {
      sportObjectTypesPrepared () {
        let data = this.$store.getters.sportObjectTypes
        let preparedTypes = []

        for (let index in data) {
          preparedTypes.push({id: data[index].id, label: data[index].title})
        }

        console.log(preparedTypes)
        return preparedTypes
      }
    },
    methods: {
      addPlace () {
        this.$parent.addPlace(this.placeDefault)
      },
      removePlace (index) {
        //   id: this.school.places[index].id,
        //   collectionType: 'remove'
        // }
        // this.placesToDelete.push(oldItem)
        this.$parent.removePlace(index)
      },

      submit (validRequired = false) {
        if (validRequired) {
          this.preSubmit()
            .then((result) => {
              if (!result) {
                this.loading = false
                return
              }

              // this.$parent.concatPlaces(this.placesToDelete)
              this.loading = false
              this.$parent.submit()
            })
        } else {
          this.$parent.submit()
        }
      },
      submitSetConfirm (isConfirmed, validRequired = true) {
        if (validRequired) {
          if (this.isValidForm) {
            this.school.confirmed = isConfirmed
            this.submit(validRequired)
          } else {
            // validate form in next tab (component)
            this.$parent.goToFormTab('main-data', { 'validateForm': true })
          }
        } else {
          this.school.confirmed = isConfirmed
          this.submit(validRequired)
        }
      }
    },
    created () {
      this.$store.dispatch('getSportObjectTypes')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
    }
  }
</script>

<style scoped>
  .error-input-custom {
    border: 1px solid red !important;
  }

  .custom-class {
    border-radius: 50%;
    box-sizing: border-box;
    height: 36px;
    width: 36px;
    border: 2px solid #D8D8D8;
  }
</style>
