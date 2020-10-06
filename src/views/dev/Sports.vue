<template>
  <div class="wrap">
    <section>
      <b-container>
        <h2 class="main c-green mb-3">Zajęcia sportowe</h2>
      </b-container>
    </section>
    <section>
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
            <b-btn variant="primary" class="custom" block @click="filterLessons(true)">
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
                <p class="card-signature mb-0" v-if="frontDisciplines">
                  <span class="icon icon-discipline pr-1"></span>
                  {{frontDisciplines.find(x => {return x.id === lesson.discipline.id}).title}}
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

          <b-col cols="12">
            <div class="wrap-box-btn">
              <div class="pagination-box">
                <div class="pagination-items active">{{currentPage}}</div>
                <div class="pagination-items">z {{Math.ceil(frontLessons.totalCount / perPage)}}</div>
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
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {DISTRICTS} from "@/config/AppConfig";

  export default {
    name: 'Test',
    components: { Treeselect },
    data () {
      return {
        // pagination
        currentPage: 1,
        perPage: 16,
        totalRows: 0,

        selectedDistrict: null,
        selectedDiscipline: null,
        options: [
          { text: 'Klub', value: '0' },
          { text: 'Szkoła', value: '1' }
        ],
        selectedType: [],

        districts: DISTRICTS,
      }
    },
    computed: {
      mainPageData () {
        return this.$store.getters.mainPageData
      },
      frontLessons () {
        return this.$store.getters.frontLessons
      },
      frontDisciplines () {
        return this.$store.getters.frontDisciplines
      },
      disciplinesTreeselect () {
        let disciplines = this.frontDisciplines
        let prepared = []

        for (let disciplineIndex in disciplines) {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
        }

        return prepared
      }
    },
    methods: {
      changePage (nextPage) {
        let pages = Math.ceil(this.frontLessons.totalCount / this.perPage)
        let newPage = nextPage ? this.currentPage + 1 : this.currentPage - 1
        if (newPage > pages || newPage <= 0) return
        this.currentPage = newPage
        this.filterLessons()
      },
      filterLessons (refreshCurrentPage) {
        if (refreshCurrentPage) this.currentPage = 1

        let filters = {
          type: this.selectedType,
          discipline: this.selectedDiscipline,
          district: this.selectedDistrict,
          maxResult: this.perPage,
          currentPage: this.currentPage,
          perPage: this.perPage
        }
        this.$store.dispatch('getFilteredLessons', filters).then(res => {
        })
      }
    },
    created () {
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getFrontDisciplines')
      this.filterLessons()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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

  .pagination {
    /*display: none !important;*/
  }
  li {
    display: none !important;
  }
</style>
