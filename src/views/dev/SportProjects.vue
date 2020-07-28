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
             v-if="frontSportProjects && frontSportProjects.data && frontSportProjects.data.length > 0"
    >
      <b-container>
        <b-row class="justify-content-around">
          <b-col cols="12" md="6" lg="3" class="mb-3" :key="index" v-if="sportProject && sportProject.active"
                   v-for="(sportProject,index) in frontSportProjects.data">
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
              <b-btn variant="arrow" :to="{name:'sportProjectsInner', params: {id: sportProject.id} }" class="p-0" >
                <span class="icon icon-arrow_right c-red"></span>
              </b-btn>
<!--              <b-btn variant="icon" class="custom card-arrow p-0 mb-n1">-->
<!--                <a target="_blank" :href="sportProject.link">-->
<!--                <span class="icon icon-arrow_right c-red"></span>-->
<!--                </a>-->
<!--              </b-btn>-->
            </div>
          </b-card>
        </b-col>
          <b-col cols="12">
            <div class="wrap-box-btn">
              <div class="pagination-box">
                <div class="pagination-items active">{{currentPage}}</div>
                <div class="pagination-items">z {{Math.ceil(frontSportProjects.totalCount / perPage)}}</div>
              </div>
              <b-btn variant="arrow" @click="changePage(false)">
                <span class="icon icon-bracket_left sm"></span>
              </b-btn>
              <b-btn variant="arrow" @click="changePage(true)">
                <span class="icon icon-bracket_right sm"></span>
              </b-btn>
            </div>
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
        currentPage: 1,
        perPage: 4,
        totalRows: 0,
      }
    },
    computed: {
      frontSportProjects () {
        return this.$store.getters.frontSportProjects
      }
    },
    methods: {
      changePage (nextPage) {
        let pages = Math.ceil(this.frontSportProjects.totalCount / this.perPage)
        let newPage = nextPage ? this.currentPage + 1 : this.currentPage - 1
        if (newPage > pages || newPage <= 0) return
        this.currentPage = newPage
        this.filterSportProjects()
      },
      filterSportProjects (refreshCurrentPage) {
        if (refreshCurrentPage) this.currentPage = 1

        let filters = {
          currentPage: this.currentPage,
          perPage: this.perPage
        }
        this.$store.dispatch('getFrontSportProjects', filters).then(res => {
        })
      }
    },
    created () {
      this.filterSportProjects()
      // this.$store.dispatch('getSportProjects')
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
