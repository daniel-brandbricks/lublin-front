<template>
  <div class="wrap">
    <section class="mb-4">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" lg="5">
            <section class="header-slider mini-">
              <b-carousel
                class="custom"
                id="carousel-fade"
                :interval="400000000"
                fade
                indicators>
                <b-carousel-slide>
                  <template v-slot:img>
                    <img src="https://picsum.photos/444/284/?image=72" alt="">
                  </template>
                </b-carousel-slide>
                <b-carousel-slide>
                  <template v-slot:img>
                    <img src="https://picsum.photos/444/284/?image=92" alt="">
                  </template>
                </b-carousel-slide>
                <b-carousel-slide>
                  <template v-slot:img>
                    <img src="https://picsum.photos/444/284/?image=34" alt="123">
                  </template>
                </b-carousel-slide>
              </b-carousel>
            </section>
          </b-col>
          <b-col cols="12" lg="7">
            <h2 class="main mb-2">Mistrzostwa Polski <br> w pływaniu 16 lat</h2>
            <h2 class="sup mb-1">
              <span class="icon icon-pin lg ml-n1 c-black-05"></span>
              al. Zygmuntowskie 4
            </h2>
            <p class="mb-1 font-sm">
              <span class="icon icon-calendar pr-1 c-black-05"></span>
              12.07.19 <strong> 08:00</strong> - 12.07.19 <strong> 08:00</strong>
            </p>
            <p class="mb-3 font-sm">
              <span class="icon icon-facebook pr-1 c-black-05"></span>
              Aktywny Studen
            </p>
            <h5 class="sup mb-0">
              Opis
            </h5>
            <p class="mb-3 font-sm">
              Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum
              velit et, elementum libero.
            </p>
            <p class="mb-3 font-sm">
              Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas, mollis libero in, ullamcorper
              est. Sed bibendum
            </p>
            <p class="mb-3 font-sm">
              Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum
              velit et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas,
              mollis libero in, ullamcorper est. Sed bibendum
            </p>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <section class="map">
      <b-container>
        <b-row>
          <b-col cols="12">
            <div class="wrapp-map">
              <img src="https://picsum.photos/1200/400/?image=123" alt="MAP">
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
