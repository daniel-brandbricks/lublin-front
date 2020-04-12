<template>
  <div class="wrap">
    <b-container>
      <b-row>
        <b-col cols="12" class="mb-3">
          <h1 class="c-green">
            Projekty sportowe
          </h1>
        </b-col>
      </b-row>
    </b-container>
    <section class="mb-3"
             v-if="frontSportProjects && frontSportProjects.length > 0"
    >
      <b-container>
        <b-row class="justify-content-around">
          <b-col cols="12" md="6" lg="3" class="mb-3" :key="index"
                   v-for="(sportProject,index) in frontSportProjects">
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
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'SportProjects',
    data () {
      return {
      }
    },
    computed: {
      frontSportProjects () {
        return this.$store.getters.frontSportProjects
      }
    },
    methods: {},
    created () {
      this.$store.dispatch('getSportProjects')
      this.$store.dispatch('getMenuAndFooter')
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
