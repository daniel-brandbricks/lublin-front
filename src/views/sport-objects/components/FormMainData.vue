<template>
  <b-row class="justify-content-center">
    <!--   image   -->
    <b-col cols="12" lg="3" class="">
      <h2>Przypisany do</h2>
      <!--    treeselect    -->
      <template v-if="sportObject.school">
        <treeselect v-model="sportObject.school.id"
                    @input="checkSchoolAddressForObject"
                    :multiple="false"
                    :searchable="false"
                    placeholder="Klub / Szkoła"
                    :disabled="!!sportObject.id"
                    :options="schoolsAndClubsPrepared"
                    class="custom"/>

<!--        <ImageInputAdvanced :key="sportObject.school.id" :imgPath="getSchoolImageById(sportObject.school.id)"-->
<!--                            :hideImage="true"/>-->
      </template>
    </b-col>

    <b-col cols="12" lg="5" class="">
      <!--    radios    -->
      <h2 class="mb-4">Aktywuj</h2>
      <b-form-group>
        <b-form-radio v-model="sportObject.active" :value="element.value" class="d-inline-block mr-3"
                      :class="{'error-input-custom': veeErrors.has('sportObject.active'+index)}"
                      :name="'sportObject.active'+index" :key="'sportObject.active'+index"
                      v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h2 class="my-4">Dane ogólne</h2>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Nazwa"
                      :class="{'error-input-custom': veeErrors.has('sportObject.title')}"
                      name="sportObject.title" key="sportObject.title" v-validate="{'required':true}"
                      v-model="sportObject.title"/>
      </b-form-group>
      <!--    treeselect    -->
      <treeselect v-model="sportObject.type.id" v-if="sportObject.type"
                  :multiple="false" class="custom mb-3"
                  placeholder="Typ" :options="sportObjectTypesPrepared"
                  :class="{'error-input-custom': veeErrors.has('sportObject.type')}"
                  name="sportObject.type" key="sportObject.type" v-validate="{'required':true}"/>

      <b-row>
        <b-col>
          <h2 class="my-4">Lokalizacja</h2>
        </b-col>
        <b-col>
          <b-form-group class="custom mt-4 mb-3" v-if="sportObject.school.id">
            <b-form-checkbox-group
              @change="setSchoolAddressToObject"
              v-model="onSchoolTerritory"
              id="checkbox-group-type"
              :options="[ { text: 'Na terenie szkoły', value: 1 } ]"
              name="checkbox-group-type"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <!--    treeselect    -->
      <treeselect v-model="sportObject.district"
                  :multiple="false" class="custom mb-3"
                  placeholder="Dzielnica" :options="districts"
                  :class="{'error-input-custom': veeErrors.has('sportObject.district')}"
                  name="sportObject.district" key="sportObject.district" v-validate="{'required':true}"/>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Adres"
                      :class="{'error-input-custom': veeErrors.has('sportObject.address')}"
                      name="sportObject.address" key="sportObject.address" v-validate="{'required':true}"
                      v-model="sportObject.address"/>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Kod pocztowy"
                      :class="{'error-input-custom': veeErrors.has('sportObject.postcode')}"
                      name="sportObject.postcode" key="sportObject.postcode" v-validate="{'required':true}"
                      v-model="sportObject.postcode"/>
      </b-form-group>
      <h1>MAP</h1>
      <div class="pac-card" id="pac-card">
        <div>
          <div id="title">
            Autocomplete search
          </div>
          <div id="type-selector" class="pac-controls">
            <input type="radio" name="type" id="changetype-all" checked="checked">
            <label for="changetype-all">All</label>

            <input type="radio" name="type" id="changetype-establishment">
            <label for="changetype-establishment">Establishments</label>

            <input type="radio" name="type" id="changetype-address">
            <label for="changetype-address">Addresses</label>

            <input type="radio" name="type" id="changetype-geocode">
            <label for="changetype-geocode">Geocodes</label>
          </div>
          <div id="strict-bounds-selector" class="pac-controls">
            <input type="checkbox" id="use-strict-bounds" value="">
            <label for="use-strict-bounds">Strict Bounds</label>
          </div>
        </div>
        <div id="pac-container">
          <input id="pac-input" type="text"
                 placeholder="Enter a location">
        </div>
      </div>
      <div id="map"></div>
      <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon">
        <span id="place-name"  class="title"></span><br>
        <span id="place-address"></span>
      </div>

      <h1 id="googlemMMAAP">MAP</h1>

      <!--buttons-->
      <b-row class="mt-4">
        <b-col>
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteSportObject', sportObject.id, undefined, 'sport.objects', {tab: 'confirmed'})">
            <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col>
          <b-link block class="custom btn" :to="{ name: 'sport.objects', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </b-col>
        <b-col>
          <b-btn block class="custom" @click="submit(true)">
            Zapisz
          </b-btn>
        </b-col>
        <b-col>
          <b-btn v-if="sportObject.confirmed" block variant="primary" class="custom" @click="submitSetConfirm(0)">
            Odtwierdz
          </b-btn>
          <b-btn block v-else variant="primary" class="custom mt-2" @click="submitSetConfirm(1, true)">
            Zatwierdź
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

  import gmapsInit from '@/services/gmaps'

  export default {
    name: 'FormMainData',
    props: ['sportObject', 'districts'],
    components: {Treeselect, ImageInputAdvanced},
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        name: 'map',
        onSchoolTerritory: []
      }
    },
    computed: {
      // copied in Calendar.vue -> LessonsList.vue
      schoolsAndClubsPrepared() {
        let data = this.$store.getters.schools
        let preparedSchools = []
        console.log(data)
        for (let schoolIndex in data) {
          preparedSchools.push({
            id: data[schoolIndex].id,
            label: data[schoolIndex].name,
            image: data[schoolIndex].image
          })
        }
        console.log(preparedSchools)

        return preparedSchools
      },
      sportObjectTypesPrepared() {
        let data = this.$store.getters.sportObjectTypes
        let preparedSchools = []

        for (let schoolIndex in data) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].title})
        }

        return preparedSchools
      }
    },
    methods: {
      checkSchoolAddressForObject () {
        if (this.onSchoolTerritory.length < 1) return
        this.setSchoolAddressToObject(this.onSchoolTerritory)
      },
      setSchoolAddressToObject(val) {
        if (val.length < 1) return

        let schools = this.$store.getters.schools
        for (let index in schools) {
          if (schools[index].id === this.sportObject.school.id) {
            console.log(schools[index])
            this.sportObject.district = schools[index].district
            this.sportObject.address = schools[index].address
            this.sportObject.postcode = schools[index].postcode
          }
        }

        console.log(this.sportObject.school.id)
      },
      getSchoolImageById(id) {
        let schools = this.schoolsAndClubsPrepared
        let school = schools.find(obj => parseInt(obj.id) === parseInt(id))
        return undefined === school ? '' : (school.image && school.image.length > 0 ? school.image : '')
      },
      submit(validRequired) {
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
      submitSetConfirm(isConfirmed, validRequired = true) {
        console.log(this.isValidForm)
        if (validRequired) {
          if (this.checkValidForm()) {
            this.sportObject.confirmed = isConfirmed
            this.submit(validRequired)
          } else {
            // validate form in next tab (component)
          }
        } else {
          this.sportObject.confirmed = isConfirmed
          this.submit(validRequired)
        }
      }
    },
    async mounted() {
      try {
        const google = await gmapsInit();
        const geocoder = new google.maps.Geocoder();
        let el = document.getElementById('googlemMMAAP')
        console.log(el)
        const map = new google.maps.Map(el);

        geocoder.geocode({ address: 'Austria' }, (results, status) => {
          if (status !== 'OK' || !results[0]) {
            throw new Error(status);
          }

          map.setCenter(results[0].geometry.location);
          map.fitBounds(results[0].geometry.viewport);
        });
      } catch (error) {
        console.error(error);
      }
    },
    created() {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})

      this.$store.dispatch('getSchools', {})
      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>
  .error-input-custom {
    border: 1px solid red !important;
  }

  /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
  #map {
    height: 100%;
  }
  /* Optional: Makes the sample page fill the window. */
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #description {
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
  }

  #infowindow-content .title {
    font-weight: bold;
  }

  #infowindow-content {
    display: none;
  }

  #map #infowindow-content {
    display: inline;
  }

  .pac-card {
    margin: 10px 10px 0 0;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    font-family: Roboto;
  }

  #pac-container {
    padding-bottom: 12px;
    margin-right: 12px;
  }

  .pac-controls {
    display: inline-block;
    padding: 5px 11px;
  }

  .pac-controls label {
    font-family: Roboto;
    font-size: 13px;
    font-weight: 300;
  }

  #pac-input {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 400px;
  }

  #pac-input:focus {
    border-color: #4d90fe;
  }

  #title {
    color: #fff;
    background-color: #4d90fe;
    font-size: 25px;
    font-weight: 500;
    padding: 6px 12px;
  }
</style>
