<template>
  <div class="wrap" v-if="frontLesson && frontLesson.school && frontLesson.discipline && frontLesson.leader">
    <section class="mb-3">
      <b-container>
        <b-row class="align-items-center mb-4">
          <b-col cols="12" lg="3" class="text-center">
            <img class="school-logo" :src="frontLesson.school.image" alt="Logo">
          </b-col>
          <b-col cols="12" lg="9">
            <h1 class="mb-4">{{frontLesson.title}}</h1>
            <b-row class="mb-4">
              <b-col cols="12" lg="4" class="mb-3 mb-lg-0">
                <div class="info-box border-lg-r">
                  <h2><span class="icon icon-pin c-black-05 pr-2 ml-n1"></span>{{frontLesson.school.address}}</h2>
                  <p><span class="icon icon-discipline c-black-05 pr-3"></span>{{frontLesson.discipline.title}}</p>
                  <p><span class="icon icon-mail c-black-05 pr-3"></span>{{frontLesson.school.personToContactFullName}}</p>
                  <p><span class="icon icon-phone c-black-05 pr-3"></span>{{frontLesson.school.personToContactPhone}}</p>
                </div>
              </b-col>
              <b-col cols="12" lg="4">
                <div class="info-box">
                  <p class="signature mb-0">Organizatorem jest</p>
                  <p class="">{{frontLesson.school.name}}</p>
                  <p><span class="icon icon-pin c-black-05 pr-3"></span>{{frontLesson.school.address}}</p>
                  <p><span class="icon icon-phone c-black-05 pr-3"></span>{{frontLesson.school.personToContactPhone}}</p>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="6" class="mb-3">
            <template>
              <calendar :lessons="[frontLesson]" :parent-date="frontLesson.newDate ? frontLesson.newDate : frontLesson.date"
                        :calendarFrontLessons="true" ref="calendarFront"
                        :splitComponents="false" class="p-0"/>
            </template>
          </b-col>
          <b-col>
            <b-row>
              <b-col cols="12" md="6" lg="6" class="mb-3">
                <b-card
                  class="custom"
                  footer-class="p-0">
                  <div class="info-box -card">
                    <p class="signature mb-0">Prowadzący</p>
                    <p class="">{{frontLesson.leader.firstName+' '+frontLesson.leader.lastName}}</p>

                    <p class="signature mb-0">Czas trwania</p>
                    <p class="">{{frontLesson.newTimeRange ? frontLesson.newTimeRange : frontLesson.timeRange}}</p>

                    <p class="signature mb-0">Obiekt sportowy</p>
                    <p class="">{{frontLesson.place.title+' ('+frontLesson.place.address+')'}}</p>
                    <p class="signature mb-0">Typ</p>
                    <p class="">{{frontLesson.lessonCategory.title}}</p>
                    <!--                <p class="signature mb-0">Finansowane ze środków Gminy Lublin</p>-->
                    <!--                <p class="">Tak</p>-->
                  </div>
                </b-card>
              </b-col>
              <b-col cols="12" md="6" lg="6" class="mb-3" :key="index" v-if="leaderReplacement.active"
                     v-for="(leaderReplacement,index) in frontLesson.replacementLeaders">
                <b-card
                  class="custom"
                  footer-class="p-0">
                  <div class="info-box -card">
                    <p class="signature mb-0">Prowadzący (zastępstwo)</p>
                    <p class="">{{leaderReplacement.leader.firstName+' '+leaderReplacement.leader.lastName}}</p>

                    <p class="signature mb-0">Czas trwania</p>
                    <p class="">{{frontLesson.newTimeRange ? frontLesson.newTimeRange : frontLesson.timeRange}}</p>

                    <p class="signature mb-0">Obiekt sportowy</p>
                    <p class="">{{frontLesson.place.title+' ('+frontLesson.place.address+')'}}</p>
                    <p class="signature mb-0">Typ</p>
                    <p class="">{{frontLesson.lessonCategory.title}}</p>
                    <!--                <p class="signature mb-0">Finansowane ze środków Gminy Lublin</p>-->
                    <!--                <p class="">Tak</p>-->
                  </div>
                </b-card>
              </b-col>
            </b-row>
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
  import DatePick from 'vue-date-pick'
  import 'vue-date-pick/dist/vueDatePick.css'

  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Calendar from '@/components/common-views/Calendar'
  import gmapsInit from '@/services/gmaps'

  export default {
    name: 'SportEvents',
    components: { DatePick, Treeselect, Calendar },
    data () {
      return {
        id: this.$route.params.id,
        google: null
      }
    },
    computed: {
      frontLesson () {
        return this.$store.getters.frontLesson(this.id)
      }
    },
    methods: {
      setLocation (lesson) {
        let lessons = [lesson]
        let places = []
        for (let index in lessons) {
          console.log(lessons[index])
          places.push({
            query: 'Lublin, ' + lessons[index].place.address,
            dataToShow: {
              title: lessons[index].title,
              placeTitle: lessons[index].place.title,
              school: lessons[index].school.name,
              time: (lessons[index].newTimeRange === null) ? lessons[index].timeRange : lessons[index].newTimeRange
            },
            fields: ['name', 'geometry']
          })
        }

        // eslint-disable-next-line no-inner-declarations
        function createMarker (place, dataToShow) {
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
              console.log(results)
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
    created () {
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getFrontDisciplines')
      this.$store.dispatch('getFrontLesson', {id: this.id})
        .then(response => {
          this.setLocation(response)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.school-logo {
  max-height: 210px;
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
