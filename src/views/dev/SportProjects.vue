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

              <div class="box-sub d-flex justify-content-between">
                <p class="card-signature mb-0"><span class="icon icon-calendar pr-1"></span>11.07.19</p>

                <b-btn variant="icon" class="custom card-arrow p-0 mb-n1" :to="{name:'sportEventsInner'}">
                  <span class="icon icon-arrow_right c-red"></span>
                </b-btn>
              </div>
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
                <h2 class="card-title" title="lorem8">
                  Vestibulum dignissim
                  venenatis nibh
                </h2>
                <p
                  class="">Ut egestas, augue ut vulputate porta, ante dolor vehicula eros, ut faucibus quam elit in
                  enim. Fusce nec odio et lacus tincidunt ultricies. Aliquam est nisi, faucibus vitae fringilla nec,
                  posuere eu erat.</p>
              </b-card-text>
              <div class="box-sub d-flex justify-content-between">
                <p class="card-signature mb-0"><span class="icon icon-calendar pr-1"></span>11.07.19</p>
                <b-btn variant="icon" class="custom card-arrow p-0 mb-n1" :to="{name:'sportEventsInner'}">
                  <span class="icon icon-arrow_right c-red"></span>
                </b-btn>
              </div>
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
              <div class="box-sub d-flex justify-content-between">
                <p class="card-signature mb-0"><span class="icon icon-calendar pr-1"></span>11.07.19</p>
                <b-btn variant="icon" class="custom card-arrow p-0 mb-n1" :to="{name:'sportEventsInner'}">
                  <span class="icon icon-arrow_right c-red"></span>
                </b-btn>
              </div>
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
              <div class="box-sub d-flex justify-content-between">
                <p class="card-signature mb-0"><span class="icon icon-calendar pr-1"></span>11.07.19</p>
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
