<template>
  <div class="wrap">
    <section class="classes-sports-box" v-if="frontSportClasses">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" sm="10" md="8" lg="6">
            <h2 class="main c-green mb-2">{{frontSportClasses.mainTitle}}</h2>
            <h5 class="sup mb-0">
              Opis
            </h5>
            <p class="mb-3">
              {{frontSportClasses.description}}
            </p>

            <section class="header-slider mini- my-5 pb-3"
                     v-if="frontSportClasses && frontSportClasses.sliderImages && frontSportClasses.sliderImages.length > 0">
              <b-container class="">
                <b-carousel
                  class="custom"
                  id="carousel-fade"
                  :interval="400000000"
                  fade
                  indicators>
                  <b-carousel-slide :key="index" v-for="(slide,index) in frontSportClasses.sliderImages">
                    <template v-slot:img>
                      <div class="slider-content pb-3">
                        <div class="slider-wrap-img text-right">
                          <img :src="slide.path" alt="Slide 1">
                        </div>
                      </div>
                    </template>
                  </b-carousel-slide>
                </b-carousel>
              </b-container>
            </section>

            <section class="header-slider mini- my-5 pb-3"
                     v-if="frontSportClasses && frontSportClasses.youtubeLinks
                     && frontSportClasses.youtubeLinks.length > 0 && 'object' ===  typeof frontSportClasses.youtubeLinks">
              <b-container class="">
                <b-carousel
                  class="custom"
                  id="carousel-fade"
                  :interval="400000000"
                  fade
                  indicators>
                  <b-carousel-slide :key="index" v-for="(link,index) in frontSportClasses.youtubeLinks">
                    <template v-slot:img>
                      <div class="slider-content pb-3">
                        <div class="slider-wrap-img text-right">
                          <iframe :src="link">
                          </iframe>
                        </div>
                      </div>
                    </template>
                  </b-carousel-slide>
                </b-carousel>
              </b-container>
            </section>

            <section
              v-if="frontSportClasses && frontSportClasses.pdfFiles && frontSportClasses.pdfFiles.length > 0">
              <h2 class="mb-3">Do ściągnięcia</h2>
              <div class="file-box">
                <b-row>
                  <b-col cols="12" :key="index" sm="6" md="4" class="mb-3" v-for="(file,index) in frontSportClasses.pdfFiles">
                    <a :href="file.path" target="_blank">
                      <span class="icon icon-file c-red-dark pr-1"></span>
                      {{file.title}}
                    </a>
                  </b-col>
                </b-row>
              </div>
            </section>
          </b-col>
        </b-row>
      </b-container>
    </section>

  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'Test',
    components: {Treeselect},
    data() {
      return {
        frontSportClasses: false
      }
    },
    computed: {},
    methods: {
      prepareMenuItem(menuItem) {
        console.log(menuItem)
        if (menuItem.youtubeLinks === null || menuItem.youtubeLinks.length < 1) {
          menuItem.youtubeLinks = []
        } else {
          menuItem.youtubeLinks = menuItem.youtubeLinks.split('|||')
        }
        this.frontSportClasses = menuItem
      }
    },
    created() {
      this.$store.dispatch('getSportClasses')
        .then(response => {
          this.prepareMenuItem(response)
        })
      this.$store.dispatch('getMenuAndFooter')
    }
  }
</script>

<style scoped>
  .header-slider .slider-wrap-img iframe {
    height: 300px;
    width: 1000px;
    max-height: 50vw;
    max-width: 100%;
  }

  .header-slider .slider-wrap-img {
    margin-left: 0 !important;
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
