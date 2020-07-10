<template>
  <b-row>
    <b-col>
      <lessons-visit ref="lessonVisit" :lessons="lessons"/>
    </b-col>
    <b-col cols="12">
      <h2 class="my-3 d-inline-block">Mapa</h2>
      <b-btn variant="primary" size="sm" class="ml-3 text-align-right d-inline-block"
             @click="showList">Zobacz listę</b-btn>

      <div id="map"></div>
      <div id="infowindow-content">
        <img src="" width="16" height="16" id="place-icon">
        <span id="place-name" class="title"></span><br>
        <span id="place-address"></span>
      </div>

    </b-col>

    <b-modal title="Zajęcia" ref="visitList" hide-footer size="md">
      <div class="my-3" :key="index" v-for="(item,index) in placesPrepared">
        <p>Nazwa: {{item.dataToShow.title}}</p>
        <p>Szkoła / Klub: {{item.dataToShow.school}}</p>
        <p>Obiekt sportowy: {{item.dataToShow.placeTitle}}</p>
        <p>Czas: {{item.dataToShow.time.join('-')}}</p>
        <p>Adres: {{item.query}}</p>
        <p>Prowadzący: {{item.dataToShow.leader}}</p>
        <p>Zastępstwo: {{item.dataToShow.replacement}}</p>
        <hr>
      </div>
    </b-modal>
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
        generateExcel: false,
        generatePdf: true,
        checkboxFilterValues: [11, 2, 6, 13, 14, 15, 0, 1],

        google: null,
        placesPrepared: [],

        districts: DISTRICTS,
        lessons: {
          districtValue: null,
          selectedAccepted: [],
          schoolsAndClubs: null,
          selectedDiscipline: null,
          selectedCategory: null,
          selectedClass: null,
          selectedSportObject: null,
          selectedLeader: null,
          selectedParticipant: null,
          selectedLesson: null
        }
      }
    },
    computed: {},
    watch: {
      lessons: {
        handler: function (val) {
          this.changeAdminNavbarButtonWithParams()
        },
        deep: true
      }
    },
    methods: {
      changeAdminNavbarButtonWithParams () {
        this.changeAdminNavbarButton({
          buttonLink: false,
          generateExcel: this.generateExcel,
          generatePdf: this.generatePdf,
          generationParams: {
            type: 'Wizytacja',
            lesson: this.lessons,
            date: this.$refs.lessonVisit.selectedYear,
            results: this.checkboxFilterValues
          }
        })
      },
      showList () {
        this.$refs.visitList.show()
      },
      setLocations (lessons) {
        if (lessons.length < 1) {
          this.$bvToast.toast('Nie ma zajęć', {
            title: 'Uwaga!',
            toaster: 'b-toaster-bottom-right',
            solid: true,
            variant: 'info',
            appendToast: false,
            autoHideDelay: 5000
          })
          return
        }

        let leaders = this.$store.getters.leadersConfirmed || []
        let places = []
        for (let index in lessons) {
          console.log(lessons[index])
          let leader = (lessons[index] && lessons[index].leader && lessons[index].leader.id)
            ? leaders.find(x => x.id === lessons[index].leader.id) : false
          let replacement = ''
          if (lessons[index] && lessons[index].replacementLeaders) {
            for (let lepLead in lessons[index].replacementLeaders) {
              if (lessons[index].replacementLeaders[lepLead].active) {
                let repLeadObj = leaders.find(x => x.id === lessons[index].replacementLeaders[lepLead].leader.id)
                if (repLeadObj) replacement += repLeadObj.firstName + ' ' + repLeadObj.lastName + '. '
              }
            }
          }

          places.push({
            query: 'Lublin, ' + lessons[index].place.address,
            dataToShow: {
              title: lessons[index].title,
              placeTitle: lessons[index].place.title,
              school: lessons[index].school.name,
              time: (lessons[index].newTimeRange === null) ? lessons[index].timeRange : lessons[index].newTimeRange,
              leader: !leader ? '' : leader.firstName + ' ' + leader.lastName,
              replacement: replacement
            },
            fields: ['name', 'geometry']
          })
        }
        this.placesPrepared = JSON.parse(JSON.stringify(places))

        // return

        // eslint-disable-next-line no-inner-declarations
        function createMarker (place, dataToShow) {
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          })

          let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng())
          bounds.extend(loc)

          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(`
            Nazwa: ${dataToShow.title} <br>
            Szkoła / Klub: ${dataToShow.school} <br>
            Obiekt sportowy: ${dataToShow.placeTitle} <br>
            Czas: ${dataToShow.time.join('-')} <br>
            Adres: ${place.name} <br>
            Prowadzący: ${dataToShow.leader}
          `)
            infowindow.open(map, this)
          })
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

      this.$watch(
        '$refs.lessonVisit.selectedYear',
        (newValue, oldValue) => {
          this.changeAdminNavbarButtonWithParams()
        }
      )
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false, generatePdf: true})

      this.$store.dispatch('getSchools', { confirmed: 1, getAll: true })
      this.$store.dispatch('getSportObjects', { confirmed: 1 })
      this.$store.dispatch('getLeaders', { confirmed: 1 })
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
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
