<template>
  <b-row>
    <b-col>
      <lessons-visit :lessons="lessons"/>
    </b-col>
    <b-col cols="12">
      <h2 class="my-3">Mapa</h2>

      <!--      <h1>MAP</h1>-->
      <!--      <div class="App" id="pac-card">-->
      <!--        <div>-->
      <!--          <div id="title">-->
      <!--            Autocomplete search-->
      <!--          </div>-->
      <!--          <div id="type-selector" class="pac-controls">-->
      <!--            <input type="radio" name="type" id="changetype-all" checked="checked">-->
      <!--            <label for="changetype-all">All</label>-->

      <!--            <input type="radio" name="type" id="changetype-establishment">-->
      <!--            <label for="changetype-establishment">Establishments</label>-->

      <!--            <input type="radio" name="type" id="changetype-address">-->
      <!--            <label for="changetype-address">Addresses</label>-->

      <!--            <input type="radio" name="type" id="changetype-geocode">-->
      <!--            <label for="changetype-geocode">Geocodes</label>-->
      <!--          </div>-->
      <!--          <div id="strict-bounds-selector" class="pac-controls">-->
      <!--            <input type="checkbox" id="use-strict-bounds" value="">-->
      <!--            <label for="use-strict-bounds">Strict Bounds</label>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div id="pac-container">-->
      <!--          <input id="pac-input" type="text"-->
      <!--                 placeholder="Enter a location">-->
      <!--        </div>-->
      <!--      </div>-->
      <div id="map"></div>
      <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon">
        <span id="place-name" class="title"></span><br>
        <span id="place-address"></span>
      </div>

    </b-col>
  </b-row>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Events from '@/components/common-views/Events'
  import {DISTRICTS} from '@/config/AppConfig'
  import TabLinks from '@/components/TabLinks'
  import Calendar from '@/components/common-views/Calendar'
  import LessonsVisit from '@/views/reports/components/lessonsVisit'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import gmapsInit from '@/services/gmaps'

  export default {
    name: 'Reporting',
    components: {Treeselect, Events, TabLinks, Calendar, LessonsVisit},
    mixins: [EventBusEmit],
    data () {
      return {
        lessons: {
          districtValue: null,
          districts: DISTRICTS,

          selectedType: [],
          typeOptions: [
            {text: 'klub', value: 0},
            {text: 'szkola', value: 1}
          ],
          selectedGender: [],
          genderOptions: [
            {text: 'kobieta', value: 0},
            {text: 'mężczyzna', value: 1}
          ],

          schoolsAndClubs: null,
          selectedDiscipline: null,
          selectedCategory: null,
          selectedClass: null,
          selectedSportObject: null,
          selectedLeader: null,
          selectedParticipant: null,
          selectedLesson: null,

          // temp
          disciplines: [
            {id: 1, label: 'Basen'},
            {id: 2, label: 'Siłownia'},
            {id: 3, label: 'Bieg'}
          ],
          categories: [
            {id: 1, label: 'pierwsza'},
            {id: 2, label: 'druga'},
            {id: 3, label: 'cos cos'}
          ],
          classes: [
            {id: 1, label: '2b'},
            {id: 2, label: '6a'},
            {id: 3, label: '8c'}
          ],
          sportObjects: [
            {id: 1, label: 'Park'},
            {id: 2, label: 'Siłownia'},
            {id: 3, label: 'Basen'}
          ],
          leaders: [
            {id: 1, label: 'Mark White'},
            {id: 2, label: 'Ben Stiffler'},
            {id: 3, label: 'Thomas Shelby'}
          ]
        }
      }
    },
    computed: {},
    methods: {},
    async mounted () {
      try {
        // eslint-disable-next-line no-inner-declarations
        function createMarker (place) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          })

          let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng())
          bounds.extend(loc)

          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name)
            infowindow.open(map, this)
          })
        }

        // get connect with google API
        const google = await gmapsInit()
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

        // markers
        const requests = [
          {
            query: 'Lublin, karla lipinskego 15',
            fields: ['name', 'geometry']
          },
          {
            query: 'Lublin, Dożynkowa 42A',
            fields: ['name', 'geometry']
          },
          {
            query: 'Lublin, Jana Chęcińskiego 2',
            fields: ['name', 'geometry']
          }
        ]

        let bounds = new google.maps.LatLngBounds()


        const service = new google.maps.places.PlacesService(map)
        for (let index in requests) {
          service.findPlaceFromQuery(requests[index], function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i])
              }

              map.setCenter(results[0].geometry.location)
            }
          })
        }

        map.fitBounds(bounds)
        map.panToBounds(bounds)

        // const geocoder = new google.maps.Geocoder();
        // geocoder.geocode({address: 'Austria'}, (results, status) => {
        //   if (status !== 'OK' || !results[0]) {
        //     throw new Error(status);
        //   }
        //
        //   map.setCenter(results[0].geometry.location);
        //   map.fitBounds(results[0].geometry.viewport);
        // });

        // const markers = locations
        //   .map(x => {
        //     let marker = new google.maps.Marker({...x, map})
        //
        //     google.maps.event.addListener(marker, 'click', function () {
        //       console.log(x)
        //       infowindow.setContent(x.name);
        //       infowindow.open(map, this);
        //     });
        //   });
      } catch (error) {
        console.error(error)
      }
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false, generatePdf: true})
    }
  }
</script>

<style scoped>

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
