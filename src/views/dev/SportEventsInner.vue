<template>
  <div class="wrap">
    <section class="mb-4" v-if="frontEvent">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" lg="5" class="mb-4 mb-lg-0 text-center text-lg-left"
                 v-if="frontEvent.images && frontEvent.images.length > 0">
            <section class="header-slider mini-">
              <b-carousel
                class="custom"
                id="carousel-fade"
                :interval="400000000"
                fade
                indicators>
                <b-carousel-slide :key="index" v-for="(image,index) in frontEvent.images">
                  <template v-slot:img>
                    <img :src="image.path" alt="" class="max-h-300">
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </section>
          </b-col>
          <b-col cols="12" lg="7">
            <h2 class="main mb-2">{{frontEvent.title}}</h2>
            <b-row>
              <b-col>
                <h2 class="sup mb-2">
                  <span class="icon icon-pin lg ml-n1 c-black-05"></span>
                  {{frontEvent.addressDesc.length > 0 ? frontEvent.addressDesc : frontEvent.address}}
                </h2>
                <p class="mb-2 font-sm">
                  <span class="icon icon-calendar pr-1 c-black-05"></span>
                  <strong>Start:</strong> {{frontEvent.dateStart.split(' ')[0]}}
                  <strong>Koniec:</strong> {{frontEvent.dateEnd.split(' ')[0]}}
                  <br>
                  <template v-for="(date,index) in frontEvent.dates">
                    <span class="pl-4">{{date.date.split(' ')[0]}} <strong>{{date.timeRange[0] + ' - ' + date.timeRange[1]}}</strong></span>
                    <br>
                  </template>
                </p>
              </b-col>
              <b-col>
                <div class="info-box">
                  <p class="signature mb-0">Organizatorem jest</p>
                  <p class="font-sm">{{frontEvent.school !== null ? frontEvent.school.name : frontEvent.organization}}</p>
                  <p class="font-sm" v-if="frontEvent.email">
                    <span class="icon icon-discipline pr-1 c-black-05"></span>
                    {{frontEvent.discipline.title}}
                  </p>
                </div>
              </b-col>
            </b-row>

            <hr>
            <p class="font-sm" v-if="frontEvent.phone || frontEvent.email || frontEvent.personToContact">
              Kontakt:
            </p>
            <p class="font-sm" v-if="frontEvent.personToContact">{{frontEvent.personToContact}}</p>
            <p class="font-sm" v-if="frontEvent.phone">
              <span class="icon icon-phone pr-1 c-black-05"></span>
              {{frontEvent.phone}}
            </p>
            <p class="font-sm" v-if="frontEvent.email">
              <span class="icon icon-mail pr-1 c-black-05"></span>
              {{frontEvent.email}}
            </p>
            <hr v-if="frontEvent.phone || frontEvent.email || frontEvent.personToContact">
            <p class="font-sm" v-if="frontEvent.facebook">
              <span class="icon icon-facebook pr-1 c-black-05"></span>
              {{frontEvent.facebook}}
            </p>
            <p class="font-sm" v-if="frontEvent.youtube">
              <span class="icon icon-youtube pr-1 c-black-05"></span>
              {{frontEvent.youtube}}
            </p>
            <p class="mb-3 font-sm" v-if="frontEvent.www">
              <span class="icon icon-www pr-1 c-black-05"></span>
              {{frontEvent.www}}
            </p>
            <h5 class="sup mb-0" v-if="frontEvent.description">
              Opis
            </h5>
            <p class="mb-3 font-sm" v-if="frontEvent.description">
              {{frontEvent.description}}
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="map">
      <b-container>
        <b-row>
          <b-col cols="12">
            <div id="map"></div>
            <div id="infowindow-content">
              <img src="" width="16" height="16" id="place-icon">
              <span id="place-name" class="title"></span><br>
              <span id="place-address"></span>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import gmapsInit from "@/services/gmaps";

  export default {
    name: 'Test',
    components: {Treeselect},
    data() {
      return {
        id: this.$route.params.id,
        google: null
      }
    },
    computed: {
      frontEvent() {
        return this.$store.getters.frontEvent(this.id)
      }
    },
    methods: {
      setLocation(event) {
        let events = [event]
        let places = []
        for (let index in events) {
          places.push({
            query: 'Lublin, ' + events[index].address,
            fields: ['name', 'geometry']
          })
        }

        // eslint-disable-next-line no-inner-declarations
        function createMarker(place, dataToShow) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          })

          let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng())
          bounds.extend(loc)
        }

        const google = this.google
        // used to show markers
        let infowindow = new google.maps.InfoWindow()
        // map container
        let el = document.getElementById('map')
        // our city
        var lublin = new google.maps.LatLng(51.246, 22.568)

        const map = new google.maps.Map(el, {
          center: lublin,
          zoom: 15,
          gestureHandling: 'cooperative'
        })

        let bounds = new google.maps.LatLngBounds()

        const service = new google.maps.places.PlacesService(map)
        for (let index in places) {
          let dataToShow = places[index].dataToShow
          delete places[index].dataToShow
          service.findPlaceFromQuery(places[index], function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i], dataToShow)
              }

              map.setCenter(results[0].geometry.location)
            }
          })
        }

        map.fitBounds(bounds)
        map.panToBounds(bounds)
      }
    },
    async mounted () {
      try {
        // get connect with google API
        this.google = await gmapsInit()
        const google = this.google
        // map container
        let el = document.getElementById('map')
        // our city
        var lublin = new google.maps.LatLng(51.246, 22.568)

        // eslint-disable-next-line no-unused-vars
        const map = new google.maps.Map(el, {
          center: lublin,
          zoom: 8,
          gestureHandling: 'cooperative'
        })
      } catch (error) {
        console.error(error)
      }
    },
    created() {
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getFrontDisciplines')
      this.$store.dispatch('getFrontEvent', {id: this.id})
        .then(response => {
          this.setLocation(response)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .max-h-300 {
    max-height: 300px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
  #map {
    height: 100%;
    min-height: 350px;
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
