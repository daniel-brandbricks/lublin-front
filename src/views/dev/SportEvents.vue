<template>
  <div class="wrap">
    <b-container>
      <b-row>
        <b-col cols="12" class="mb-3">
          <h1 class="c-green">
            Imprezy sportowe
          </h1>
        </b-col>
      </b-row>
    </b-container>
    <section class="mb-3">
      <b-container>
        <b-row>
          <b-col cols="12" md="6" lg="6" class="mb-3">
            <b-row>
              <b-col cols="12" class="mb-3">
                <treeselect v-model="value"
                            :multiple="false"
                            :options="optionsTS"
                            class="custom bg-transparent"/>
              </b-col>
            </b-row>
            <template>
              <date-pick
                v-model="date"
                :hasInputElement="false"
              ></date-pick>
              <!--todo добавить класс на ячейку с событием, и дописать ему стиля от .disablet-->
              <!--todo убрать с header select-->
            </template>
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
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
  import DatePick from 'vue-date-pick'
  import 'vue-date-pick/dist/vueDatePick.css'

  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: 'SportEvents',
    components: { DatePick, Treeselect },
    data () {
      return {
        date: '2019-09-01',
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
