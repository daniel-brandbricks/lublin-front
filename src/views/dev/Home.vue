<template>
  <div class="wrap">
    <section class="header-slider">
      <b-container>
        <b-carousel
          class="custom"
          id="carousel-fade"
          :interval="400000000"
          fade
          indicators>
          <b-carousel-slide>
            <template v-slot:img>
              <div class="slider-content pb-3">
                <div class="slider-wrap-card">
                  <div class="slider-card">
                    <h2>Donec mattis nisi felis</h2>
                    <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean nec
                      urna ultricies, blandit dui sed, posuere massa.</p>
                    <p>Vestibulum tincidunt lacinia nunc, et dignissim risus. In arcu diam, ornare vitae est vel,
                      vulputate efficitur diam. Etiam sed sollicitudin felis.</p>
                  </div>
                </div>
                <div class="slider-wrap-img text-right">
                  <img src="https://picsum.photos/805/424/?image=32" alt="Slide 1">
                </div>
              </div>
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template v-slot:img>
              <div class="slider-content pb-3">
                <div class="slider-wrap-card">
                  <div class="slider-card">
                    <h2>Donec mattis nisi felis</h2>
                    <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean nec
                      urna ultricies, blandit dui sed, posuere massa.</p>
                    <p>Vestibulum tincidunt lacinia nunc, et dignissim risus. In arcu diam, ornare vitae est vel,
                      vulputate efficitur diam. Etiam sed sollicitudin felis.</p>
                  </div>
                </div>
                <div class="slider-wrap-img text-right">
                  <img src="https://picsum.photos/805/424/?image=34" alt="Slide 1">
                </div>
              </div>

            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template v-slot:img>
              <div class="slider-content pb-3">
                <div class="slider-wrap-card">
                  <div class="slider-card">
                    <h2>Donec mattis nisi felis</h2>
                    <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean nec
                      urna ultricies, blandit dui sed, posuere massa.</p>
                    <p>Vestibulum tincidunt lacinia nunc, et dignissim risus. In arcu diam, ornare vitae est vel,
                      vulputate efficitur diam. Etiam sed sollicitudin felis.</p>
                  </div>
                </div>
                <div class="slider-wrap-img text-right">
                  <img src="https://picsum.photos/805/424/?image=35" alt="Slide 1">
                </div>
              </div>

            </template>
          </b-carousel-slide>
        </b-carousel>
      </b-container>
    </section>

    <section>
      <b-container>
        <div class="box-header -one text-center">
          <h2 class="main c-green mb-0">Imprezy sportowe</h2>
          <b-btn variant="icon" class="custom" :to="{name:'sportEvents'}">
            zobacz wszystkie<span class="pl-2 icon-icon_arrow_24"></span>
          </b-btn>
        </div>
      </b-container>
    </section>

    <section class="mb-3">
      <b-container>
        <b-row>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=122"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">Quisque finibus sagittis</h2>
                <p
                  class="">Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat,
                  elementum velit et, elementum libero.
                  Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas, mollis libero in, ullamcorper
                  est. Sed bibendum
                  Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum
                  velit et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas,
                  mollis libero in, ullamcorper est. Sed bibendum</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow p-0 mb-n1" :to="{name:'sportEventsInner'}">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=123"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">
                  Vestibulum dignissim
                  venenatis nibh
                </h2>
                <p
                  class="">Ut egestas, augue ut vulputate porta, ante dolor vehicula eros, ut faucibus quam elit in
                  enim. Fusce nec odio et lacus tincidunt ultricies. Aliquam est nisi, faucibus vitae fringilla nec,
                  posuere eu erat.</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=124"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">
                  Ut laoreet velit vitae q
                  uam consequat, sit
                  amet finibus odio
                </h2>
                <p class="">
                  Suspendisse nec est eu ante ornare dapibus. Pellentesque ac diam eget sapien eleifend pretium
                  ut et lorem. In hac habitasse platea dictumst.</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=126"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">
                  Quisque finibus sagittis
                </h2>
                <p
                  class="">Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat,
                  elementum velit et, elementum libero.
                  Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas, mollis libero in, ullamcorper
                  est. Sed bibendum
                  Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum
                  velit et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas,
                  mollis libero in, ullamcorper est. Sed bibendum</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12">
            <div class="wrap-box-btn">
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

    <section>
      <b-container>
        <div class="box-header -two text-center">
          <h2 class="main c-green mb-0">Zajęcia sportowe</h2>
          <b-btn variant="icon" class="custom" :to="{name:'sports'}">
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
            <b-btn variant="primary" class="custom" block :to="{name:'sports'}">
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
              <b-btn variant="link" :to="{name:'sportsInner'}" class=" p-0 card-arrow" >
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
              <template slot="footer">
                <div class="d-inline-block type-card float-right">KLUB</div>
              </template>
            </b-card>
          </b-col>


          <b-col cols="12">
            <div class="wrap-box-btn">
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

    <section>
      <b-container>
        <div class="box-header -three text-center">
          <h2 class="main c-green mb-0">Projekty sportowe</h2>
          <b-btn variant="icon" class="custom" :to="{name:'sportProjects'}">
            zobacz wszystkie<span class="pl-2 icon-icon_arrow_24"></span>
          </b-btn>
        </div>
      </b-container>
    </section>

    <section class="mb-3">
      <b-container>
        <b-row>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=122"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">Quisque finibus sagittis</h2>
                <p
                  class="">Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat,
                  elementum velit et, elementum libero.
                  Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas, mollis libero in, ullamcorper
                  est. Sed bibendum
                  Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum
                  velit et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas,
                  mollis libero in, ullamcorper est. Sed bibendum</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=123"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">
                  Vestibulum dignissim
                  venenatis nibh
                </h2>
                <p
                  class="">Ut egestas, augue ut vulputate porta, ante dolor vehicula eros, ut faucibus quam elit in
                  enim. Fusce nec odio et lacus tincidunt ultricies. Aliquam est nisi, faucibus vitae fringilla nec,
                  posuere eu erat.</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=124"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">
                  Ut laoreet velit vitae q
                  uam consequat, sit
                  amet finibus odio
                </h2>
                <p class="">
                  Suspendisse nec est eu ante ornare dapibus. Pellentesque ac diam eget sapien eleifend pretium
                  ut et lorem. In hac habitasse platea dictumst.</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0"
              img-src="https://picsum.photos/300/300/?image=126"
              img-alt="Image"
              img-top>
              <b-card-text text-tag="div" class="height-hidden">
                <h2 class="card-title " title="lorem8">
                  Quisque finibus sagittis
                </h2>
                <p
                  class="">Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat,
                  elementum velit et, elementum libero.
                  Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas, mollis libero in, ullamcorper
                  est. Sed bibendum
                  Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum
                  velit et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas,
                  mollis libero in, ullamcorper est. Sed bibendum</p>
              </b-card-text>
              <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>
              <b-btn variant="icon" class="custom card-arrow">
                <span class=" icon-icon_arrow_24"></span>
              </b-btn>
            </b-card>
          </b-col>
          <b-col cols="12">
            <div class="wrap-box-btn">
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
