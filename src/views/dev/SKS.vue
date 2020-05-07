<template>
  <div class="wrap">
    <section class="classes-sports-box" v-if="frontSks">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" sm="10" md="8" lg="6">
            <h2 class="main c-green mb-2">{{frontSks.mainTitle}}</h2>
            <h5 class="sup mb-0">
              Opis
            </h5>
            <p class="mb-3">{{frontSks.description}}</p>
            <div>
              <span class="icon icon-www pr-1 c-black-05"></span>
              <a target="_blank" :href="frontSks.www">{{frontSks.www}}</a>
            </div>

            <section class="header-slider mini- my-5 pb-3"
                     v-if="frontSks && frontSks.sliderImages && frontSks.sliderImages.length > 0">
                <b-carousel
                  class="custom"
                  id="carousel-fade"
                  :interval="400000000"
                  fade
                  indicators>
                  <b-carousel-slide :key="index" v-for="(slide,index) in frontSks.sliderImages">
                    <template v-slot:img>
                      <div class="slider-content pb-3">
                        <div class="slider-wrap-img text-right">
                          <img :src="slide.path" alt="Slide 1">
                        </div>
                      </div>
                    </template>
                  </b-carousel-slide>
                </b-carousel>
            </section>

            <section class="header-slider mini- my-5 pb-3"
                     v-if="frontSks && frontSks.youtubeLinks
                     && frontSks.youtubeLinks.length > 0 && 'object' ===  typeof frontSks.youtubeLinks">
              <b-container class="">
                <b-carousel
                  class="custom"
                  id="carousel-fade"
                  :interval="400000000"
                  fade
                  indicators>
                  <b-carousel-slide :key="index" v-for="(link,index) in frontSks.youtubeLinks">
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
    components: { Treeselect },
    data () {
      return {
        frontSks: false
      }
    },
    methods: {
      prepareMenuItem(menuItem) {
        if (menuItem.youtubeLinks === null || menuItem.youtubeLinks.length < 1) {
          menuItem.youtubeLinks = []
        } else {
          menuItem.youtubeLinks = menuItem.youtubeLinks.split('|||')
        }
        this.frontSks = menuItem
      }
    },
    created () {
      this.$store.dispatch('getSKS')
        .then(response => {
          this.prepareMenuItem(response)
        })
      this.$store.dispatch('getMenuAndFooter')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
