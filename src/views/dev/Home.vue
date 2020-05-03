<template>
  <div class="wrap">
    <section class="header-slider"
             v-if="mainPageData && mainPageData.slider && mainPageData.slider.length > 0">
      <b-container class="">
        <b-carousel
          class="custom"
          id="carousel-fade"
          :interval="400000000"
          fade
          indicators>
          <b-carousel-slide :key="index" v-for="(slide,index) in mainPageData.slider">
            <template v-slot:img>
              <div class="slider-content pb-3">
                <div class="slider-wrap-card">
                  <div class="slider-card">
                    <h2>{{slide.title}}</h2>
                    <p>{{slide.description}}</p>
                  </div>
                </div>
                <div class="slider-wrap-img text-right">
                  <img :src="slide.path" alt="Slide 1">
                </div>
              </div>
            </template>
          </b-carousel-slide>
<!--          <b-carousel-slide>-->
<!--          <template v-slot:img>-->
<!--            <div class="slider-content pb-3">-->
<!--              <div class="slider-wrap-card">-->
<!--                <div class="slider-card">-->
<!--                  <h2>Donec mattis nisi felis</h2>-->
<!--                  <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean nec-->
<!--                    urna ultricies, blandit dui sed, posuere massa.</p>-->
<!--                  <p>Vestibulum tincidunt lacinia nunc, et dignissim risus. In arcu diam, ornare vitae est vel,-->
<!--                    vulputate efficitur diam. Etiam sed sollicitudin felis.</p>-->
<!--                </div>-->
<!--              </div>-->
<!--              <iframe width="794" height="416"-->
<!--                      src="https://www.youtube.com/embed/tgbNymZ7vqY">-->
<!--              </iframe>-->
<!--            </div>-->
<!--          </template>-->
<!--        </b-carousel-slide>-->
        </b-carousel>
      </b-container>
    </section>

    <section
      v-if="mainPageData && mainPageData.event && frontEvents && frontEvents.length > 0"
    >
      <b-container>
        <div class="box-header -one text-center">
          <h2 class="main c-green mb-0">Imprezy sportowe</h2>
          <b-btn variant="icon" class="custom" :to="{name:'sportEvents'}">
            zobacz wszystkie<span class="icon icon-arrow_right pl-2 sm"></span>
          </b-btn>
        </div>
      </b-container>
    </section>

    <section class="mb-3"
             v-if="mainPageData && mainPageData.event && frontEvents && frontEvents.length > 0"
    >
      <b-container>
        <b-row class="justify-content-around">
          <b-col cols="12" md="6" lg="3" class="mb-3" :key="index"
          v-for="(event,index) in frontEvents">
            <b-card
              class="custom min-h-457"
              footer-class="p-0"
              :img-src="event.images.length > 0 && event.images[0].path ? event.images[0].path : ''"
              body-class="d-flex flex-column justify-content-between"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden flex-grow-1">
                <h2 class="card-title " title="lorem8">{{event.title}}</h2>
                <p class="">{{event.description}}</p>
              </b-card-text>

              <div class="box-sub d-flex justify-content-between">
                <p class="card-signature mb-0"><span class="icon icon-calendar pr-1"></span>
                  {{event.dateStart.split(' ')[0]}}
                </p>

                <b-btn variant="icon" class="custom card-arrow p-0 mb-n1"
                       :to="{name:'sportEventsInner', params: {id: event.id}}">
                  <span class="icon icon-arrow_right c-red"></span>
                </b-btn>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <section
      v-if="mainPageData && mainPageData.lesson && frontLessons && frontLessons.data && frontLessons.data.length > 0"
    >
      <b-container>
        <div class="box-header -two text-center">
          <h2 class="main c-green mb-0">Zajęcia sportowe</h2>
          <b-btn variant="icon" class="custom" :to="{name:'sports'}">
            zobacz wszystkie<span class="pl-2 icon icon-arrow_right sm"></span>
          </b-btn>
        </div>
      </b-container>
    </section>

    <section
      v-if="mainPageData && mainPageData.lesson && frontLessons && frontLessons.data && frontLessons.data.length > 0"
    >
      <b-container>
        <b-row class="mb-4">
          <b-col cols="12" lg="2" class="mb-2 mb-lg-0 align-items-center pr-1 d-flex">
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="options"
                name="flavour-1"
                class="fix-checkbox-home-page  "
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" lg="4" class="mb-3 mb-lg-0">
            <treeselect v-model="selectedDiscipline"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="disciplinesTreeselect"
                        class="custom bg-transparent"/>
          </b-col>
          <b-col cols="12" sm="6" lg="4" class="mb-3 mb-lg-0">
            <treeselect v-model="selectedDistrict"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="districts"
                        class="custom"/>
          </b-col>
          <b-col cols="12" sm="6" lg="2" class="mb-3 mb-lg-0">
            <b-btn variant="primary" class="custom" block @click="filterLessons">
              <span class="icon icon-iconm_search"></span>szukaj
            </b-btn>
          </b-col>

        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="4" class="mb-3" :key="index"
                 v-for="(lesson,index) in frontLessons.data">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">{{lesson.title}}</h2>
              <p class="mb-0">{{lesson.place.address}}</p>
              <div class="d-flex justify-content-between align-items-center">
                <p class="card-signature mb-0" v-if="$store.getters.frontDisciplines">
                  <span class="icon icon-discipline pr-1"></span>
                  {{$store.getters.frontDisciplines.find(x => {return x.id === lesson.discipline.id}).title}}
                </p>
                <b-btn variant="arrow" :to="{name:'sportsInner', params: {id: lesson.id} }" class="p-0" >
                  <span class="icon icon-arrow_right c-red"></span>
                </b-btn>
              </div>

              <template slot="footer">
                <div class="d-inline-block type-card float-right">{{lesson.school.type === 0 ? 'KLUB' : 'SZKOŁA'}}</div>
              </template>
            </b-card>
          </b-col>

        </b-row>
      </b-container>
    </section>

    <section
      v-if="mainPageData && mainPageData.sportProjects && mainPageData.sportProjects.length > 0"
    >
      <b-container>
        <div class="box-header -three text-center">
          <h2 class="main c-green mb-0">Projekty sportowe</h2>
          <b-btn variant="icon" class="custom" :to="{name:'sportProjects'}">
            zobacz wszystkie<span class="pl-2 icon icon-arrow_right sm"></span>
          </b-btn>
        </div>
      </b-container>
    </section>

    <section class="mb-3"
             v-if="mainPageData && mainPageData.sportProjects && mainPageData.sportProjects.length > 0"
    >
      <b-container>
        <b-row class="justify-content-around">
          <b-col cols="12" md="6" lg="3" class="mb-3" :key="index"
                 v-for="(sportProject,index) in mainPageData.sportProjects">
            <b-card
              class="custom min-h-457"
              footer-class="p-0"
              :img-src="sportProject.image"
              body-class="d-flex flex-column justify-content-between"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden flex-grow-1">
                <h2 class="card-title " title="lorem8">{{sportProject.title}}</h2>
                <p
                  class="">{{sportProject.description}}</p>
              </b-card-text>

              <div class="box-sub d-flex justify-content-end">
                <b-btn variant="icon" class="custom card-arrow p-0 mb-n1" :to="{name:'sportEventsInner'}">
                  <span class="icon icon-arrow_right c-red"></span>
                </b-btn>
              </div>
            </b-card>
          </b-col>

<!--          <b-col cols="12">-->
<!--            <div class="wrap-box-btn">-->
<!--              <b-btn variant="arrow">-->
<!--                <span class="icon icon-bracket_left sm"></span>-->
<!--              </b-btn>-->
<!--              <b-btn variant="arrow">-->
<!--                <span class="icon icon-bracket_right sm"></span>-->
<!--              </b-btn>-->
<!--            </div>-->
<!--          </b-col>-->

        </b-row>
      </b-container>
    </section>

  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {DISTRICTS} from '@/config/AppConfig'

  export default {
    name: 'Test',
    components: { Treeselect },
    data () {
      return {
        selectedDistrict: null,
        selectedDiscipline: null,
        options: [
          { text: 'Klub', value: '0' },
          { text: 'Szkoła', value: '1' }
        ],
        selectedType: [],

        districts: DISTRICTS
      }
    },
    computed: {
      mainPageData () {
        return this.$store.getters.mainPageData
      },
      frontEvents() {
        return this.$store.getters.frontEvents
      },
      frontLessons () {
        return this.$store.getters.frontLessons
      },
      disciplinesTreeselect () {
        let disciplines = this.$store.getters.frontDisciplines
        let prepared = []

        for (let disciplineIndex in disciplines) {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
        }

        return prepared
      }
    },
    methods: {
      filterLessons () {
        let filters = {
          type: this.selectedType,
          discipline: this.selectedDiscipline,
          district: this.selectedDistrict
        }
        this.$store.dispatch('getFilteredLessons', filters)
      },
      getUser () {
        this.$store.dispatch('getAllUsers')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      },
      logout () {
        this.$store.dispatch('logout')
          .then((response) => {
            console.log(response)
          })
      }
    },
    created () {
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getFrontDisciplines')
      this.$store.dispatch('getFilteredEvents', {maxResults: 4})
      this.filterLessons()

      this.$store.dispatch('getMainPageData')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .min-h-457 {
    min-height: 457px;
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
</style>
