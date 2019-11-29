<template>
  <div class="wrap">
    <section>
      <b-container>
        <div class="box-header -two text-center">
          <h2 class="main c-green mb-0">Zajęcia sportowe</h2>
          <b-btn variant="icon" class="custom">
            zobacz wszystkie<span class="pl-2 icon-icon_arrow_24"></span>
          </b-btn>
        </div>
      </b-container>
    </section>

    <section>
      <b-container>
        <b-row class="mb-4">
          <b-col cols="12" lg="2" class="mb-2 mb-lg-0 align-items-center pr-1 d-flex">
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selected"
                :options="options"
                name="flavour-1"
                class="fix-checkbox-home-page  "
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" lg="4" class="mb-3 mb-lg-0">
            <treeselect v-model="value"
                        :multiple="false"
                        :options="optionsTS"
                        class="custom bg-transparent"/>
          </b-col>
          <b-col cols="12" sm="6" lg="4" class="mb-3 mb-lg-0">
            <treeselect v-model="value"
                        :multiple="false"
                        :options="optionsTS"
                        class="custom"/>
          </b-col>
          <b-col cols="12" sm="6" lg="2" class="mb-3 mb-lg-0">
            <b-btn variant="primary" class="custom" block>
              <span class="icon icon-iconm_search"></span>szukaj
            </b-btn>
          </b-col>

        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <b-btn variant="link" :to="{name:'sportsInner'}" class=" p-0 card-arrow" >
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>

          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>

          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="4" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">

              <h2 class="card-title nowrap" title="lorem8">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p class="">ul. Krochmalna 29</p>
              <p class="card-signature mb-0"><span class="icon icon-discipline"></span>Dyscyplina</p>
              <a href="#" class="card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </a>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>

          <b-col cols="12">
            <div class="wrap-box-btn">
              <div class="pagination-box">
                <div class="pagination-items active">1</div>
                <div class="pagination-items">z 2</div>
              </div>
              <b-btn variant="arrow">
                &lt;
              </b-btn>
              <b-btn variant="arrow">
                &gt;
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

  export default {
    name: 'Test',
    components: { Treeselect },
    data () {
      return {
        msg: 'TEST',
        selected: [],
        options: [
          { text: 'Klub', value: '1' },
          { text: 'Szkoła', value: '2' }
        ],
        value: null,
        optionsTS: [ {
          id: 'a',
          label: 'first',
          children: [ {
            id: 'aa',
            label: 'aa'
          }, {
            id: 'ab',
            label: 'ab'
          } ]
        }, {
          id: 'b',
          label: 'second'
        }, {
          id: 'c',
          label: 'third'
        } ]
      }
    },
    methods: {
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
</style>
