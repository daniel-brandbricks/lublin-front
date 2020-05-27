<template>
  <div class="wrap">
    <section class="mb-4" v-if="frontSportProject">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" lg="5" class="mb-4 mb-lg-0 text-center text-lg-left"
                 v-if="frontSportProject.image">
            <img width="350" :src="frontSportProject.image" alt="">
          </b-col>
          <b-col cols="12" lg="7">
            <h2 class="main mb-2">{{frontSportProject.title}}</h2>
            <p class="font-sm" v-if="frontSportProject.organizer">
              Organizatorem jest: {{frontSportProject.organizer}}
            </p>

            <p class="font-sm" v-if="frontSportProject.phone">
              <span class="icon icon-phone pr-1 c-black-05"></span>
              {{frontSportProject.phone}}
            </p>
            <h5 class="sup mb-0" v-if="frontSportProject.description">
              Opis
            </h5>
            <p class="mb-3 font-sm" v-if="frontSportProject.description">
              {{frontSportProject.description}}
            </p>
            <p class="font-sm" v-if="frontSportProject.facebook">
              <span class="icon icon-facebook pr-1 c-black-05"></span>
              {{frontSportProject.facebook}}
            </p>
            <p class="font-sm" v-if="frontSportProject.link">
            <span class="icon icon-www pr-1 c-black-05"></span>
            <a target="_blank" :href="frontSportProject.link">{{frontSportProject.link}}</a>
            </p>
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
        id: this.$route.params.id
      }
    },
    computed: {
      frontSportProject() {
        return this.$store.getters.frontSportProject(this.id)
      }
    },
    methods: {},
    created() {
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getFrontDisciplines')
      this.$store.dispatch('getFrontSportProject', {id: this.id})
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
