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
             <div class="slider-wrap-img">
               <img src="https://picsum.photos/1024/480/?image=10" alt="Slide 1">

             </div>
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template v-slot:img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur consequuntur culpa eos incidunt maiores molestiae placeat quaerat qui veritatis? Animi consequatur deserunt doloribus minus mollitia placeat porro sapiente sint!
              </p>
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template v-slot:img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aspernatur consequuntur culpa eos incidunt maiores molestiae placeat quaerat qui veritatis? Animi consequatur deserunt doloribus minus mollitia placeat porro sapiente sint!
              </p>
            </template>
          </b-carousel-slide>

        </b-carousel>
      </b-container>
    </section>
    <b-container>
      <h2 class="c-green main">Imprezy sportowe</h2>
      <b-row>
        <b-col cols="12" md="6" lg="3" class="mb-3">
          <b-card
            class="custom"
            footer-class="p-0"
            img-src="https://picsum.photos/300/300/?image=25"
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
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data () {
      return {
        msg: 'TEST'
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
