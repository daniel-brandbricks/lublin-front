<template>
  <div class="wrap">
    <section class="mb-3">
      <b-container>
        <b-row class="align-items-center mb-4">
          <b-col cols="12" lg="3" class="text-center">
            <img src="/static/img/logo.svg" alt="Logo">
          </b-col>
          <b-col cols="12" lg="9">
            <h1 class="mb-4">Akademia Piłkarska Bronowice Lublin</h1>
            <b-row class="mb-4">
              <b-col cols="12" lg="4" class="mb-3 mb-lg-0">
                <div class="info-box border-lg-r">
                  <h2><span class="icon icon-pin c-black-05 pr-2 ml-n1"></span> ul. Montażowa 16</h2>
                  <p><span class="icon icon-discipline c-black-05 pr-3"></span>Piłka nożna</p>
                  <p><span class="icon icon-mail c-black-05 pr-3"></span>testing@test.com</p>
                  <p><span class="icon icon-phone c-black-05 pr-3"></span>+11 111 111 111</p>
                </div>
              </b-col>
              <b-col cols="12" lg="4">
                <div class="info-box">
                  <p class="signature mb-0">Organizatorem jest</p>
                  <p class="">ORLIK</p>
                  <p><span class="icon icon-pin c-black-05 pr-3"></span>ul. Montażowa 16</p>
                  <p><span class="icon icon-phone c-black-05 pr-3"></span>+11 111 111 111</p>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12">
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="6" lg="6" class="mb-3">
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
              footer-class="p-0">
              <div class="info-box -card">
                <p class="signature mb-0">Prowadzący</p>
                <p class="">Piotr Wójcik</p>

                <p class="signature mb-0">Czas trwania</p>
                <p class="">17:00 - 18:30</p>

                <p class="signature mb-0">Obiekt sportowy</p>
                <p class="">Gimnazjum nr 14 - Orlik (ul. Pogodna 19)</p>
                <p class="signature mb-0">Typ</p>
                <p class="">Sport dzieci i młodzieży</p>
                <p class="signature mb-0">Finansowane ze środków Gminy Lublin</p>
                <p class="">Tak</p>
              </div>
            </b-card>
          </b-col>
          <b-col cols="12" md="6" lg="3" class="mb-3">
            <b-card
              class="custom"
              footer-class="p-0">
              <div class="info-box -card">
                <p class="signature mb-0">Prowadzący</p>
                <p class="">Piotr Wójcik</p>

                <p class="signature mb-0">Czas trwania</p>
                <p class="">17:00 - 18:30</p>

                <p class="signature mb-0">Obiekt sportowy</p>
                <p class="">Gimnazjum nr 14 - Orlik (ul. Pogodna 19)</p>
                <p class="signature mb-0">Typ</p>
                <p class="">Sport dzieci i młodzieży</p>
                <p class="signature mb-0">Finansowane ze środków Gminy Lublin</p>
                <p class="">Tak</p>
              </div>
            </b-card>
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
