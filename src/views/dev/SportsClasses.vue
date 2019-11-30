<template>
  <div class="wrap">
    <section class="classes-sports-box">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="12" sm="10" md="8" lg="6">
            <h2 class="main c-green mb-2">Klasy sportowe i profilowane</h2>
            <h5 class="sup mb-0">
              Opis
            </h5>
            <p class="mb-3">
              Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat, elementum velit
              et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas, mollis libero
              in, ullamcorper est.
            </p>
            <p class="mb-3">
              Sed bibendum. Nulla massa leo, semper lacinia elit vel, semper molestie justo. Donec sed libero placerat,
              elementum velit et, elementum libero. Nunc auctor risus et dolor ultricies convallis. Mauris vel nisi egestas,
              mollis libero in, ullamcorper est. Sed bibendum
            </p>
            <h2 class="mb-3">Do ściągnięcia</h2>
            <div class="file-box">
              <b-row>
                <b-col cols="12" sm="6" md="4" class="mb-3">
                  <div>
                    <span class="icon icon-icon_file c-red-dark"></span>
                    plik1.psd
                  </div>
                </b-col>
                <b-col cols="12" sm="6" md="4" class="mb-3">
                  <div>
                    <span class="icon icon-icon_file c-red-dark"></span>
                    plik1.psd
                  </div>
                </b-col>
                <b-col cols="12" sm="6" md="4" class="mb-3">
                  <div>
                    <span class="icon icon-icon_file c-red-dark"></span>
                    plik1.psd
                  </div>
                </b-col>
                <b-col cols="12" sm="6" md="4" class="mb-3">
                  <div>
                    <span class="icon icon-icon_file c-red-dark"></span>
                    plik1.psd
                  </div>
                </b-col>
                <b-col cols="12" sm="6" md="4" class="mb-3">
                  <div>
                    <span class="icon icon-icon_file c-red-dark"></span>
                    plik1.psd
                  </div>
                </b-col>

              </b-row>
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
