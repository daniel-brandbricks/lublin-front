<template>
  <div class="container">
    <div class="row">
      <div class="col-12 pt-5">
        <b-btn variant="primary" class="custom">Primary</b-btn>
        <b-btn class="custom">Primary</b-btn>
        <b-btn variant="outline-primary" class="custom">
          <span class="icon-icon_login"></span> Primary
        </b-btn>
        <p>
          <span class="icon-icon_login"></span>Primary
        </p>
        <h1>Lorem ipsum. </h1>
        <h1 class="c-green">Lorem ipsum. </h1>
        <h1 class="bgc-green">Lorem ipsum. </h1>

      </div>

      <div class="col-12 mt-5">
        <b-form-group
          class="custom"
          label="Enter your name"
          label-for="input-1">
          <b-form-input id="input-1" class="custom"
                        placeholder="E-mail"
                        v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group
          class="custom"
          label="Enter your name"
          label-for="input-2">
          <b-form-input id="input-2" class="custom" v-model="name"></b-form-input>
        </b-form-group>
      </div>
      <b-col cols="12">
        <b-form-group label="Using options array:" class="custom">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Individual radios">
          <b-form-radio v-model="selectedRadio" name="some-radios" value="A">Option A</b-form-radio>
          <b-form-radio v-model="selectedRadio" name="some-radios" value="B">Option B</b-form-radio>
        </b-form-group>
      </b-col>

      <b-col cols="4" class="mb-3">
        <b-card
          class="custom"
          footer-class="p-0"
        >

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

      <b-col cols="3" class="mb-3">
        <b-card
          class="custom"
          footer-class="p-0"
        >

          <p class="card-signature mb-0">Dyscyplina</p>
          <p class="">Piotr Wójcik</p>

          <p class="card-signature mb-0">Czas trwania</p>
          <p class="">17:00 - 18:30</p>

          <p class="card-signature mb-0">Obiekt sportowy</p>
          <p class="">Gimnazjum nr 14 - Orlik (ul. Pogodna 19)</p>

          <p class="card-signature mb-0">Typ</p>
          <p class="">Sport dzieci i młodzieży</p>

          <p class="card-signature mb-0">Finansowane ze środków Gminy Lublin</p>
          <p class="">Tak</p>

        </b-card>
      </b-col>

      <b-col cols="12" lg="6">
        <template>
          <date-pick
            v-model="date"
            :hasInputElement="false"
          ></date-pick>
          <!--todo добавить класс на ячейку с событием, и дописать ему стиля от .disablet-->
          <!--todo убрать с header select-->
        </template>
      </b-col>

      <b-col cols="12">
        <treeselect v-model="value"
                    :multiple="false"
                    :options="optionsTS"
                    class="custom" />
      </b-col>

      <b-col cols="12">
        <h1>Akademia Piłkarska Bronowice Lublin</h1>
      </b-col>
      <b-col cols="4">
        <div class="info-box border-r">
          <h2><span class="icon icon-icon_pin_2 pr-3"></span>ul. Montażowa 16</h2>
          <p><span class="icon icon-discipline pr-3"></span>Piłka nożna</p>
          <p><span class="icon icon-icon_mail pr-3"></span>testing@test.com</p>
          <p><span class="icon icon-icon_phone pr-3"></span>+11 111 111 111</p>
        </div>
      </b-col>
      <b-col cols="4">
        <div class="info-box">
          <p class="signature mb-0">Typ</p>
          <p class="">ORLIK</p>
          <p><span class="icon icon-icon_pin_2 pr-3"></span>ul. Montażowa 16</p>
          <p><span class="icon icon-icon_phone pr-3"></span>+11 111 111 111</p>
        </div>
      </b-col>
      <b-col cols="12">
        <span class="status active">aktywny</span>
        <span class="status inactive">nieaktywny</span>
      </b-col>

      <!--   admin navbar   -->
      <b-col cols="12">
        <b-row >
          <b-col>
            <h1 class="">Lorem ipsum.</h1>
          </b-col>
          <b-col cols="2" class="">
            <b-btn variant="primary" block>Primary</b-btn>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="4" class="mb-3">
        <b-card
          class="custom"
          footer-class="p-0"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
        >

          <!--Добавить проверку : Если текста больше 3 строк добавить класс height-hidden-->
          <b-card-text text-tag="div" class="height-hidden">
            <h2 class="card-title " title="lorem8">Lorem ipsum dolor sit amet,</h2>

            <p class="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, consequatur eligendi esse iusto minima non officia temporibus veniam! Beatae dolor in inventore minus pariatur, soluta suscipit! Ad aspernatur atque dignissimos eligendi, fugit inventore iure labore nesciunt non temporibus veniam veritatis!</p>
          </b-card-text>
          <p class="card-signature mb-0"><span class="icon icon-icon_date_16 pl-0"></span>11.07.19</p>

          <a href="#" class="card-arrow" >
            <span class=" icon-icon_arrow_24"></span>
          </a>

        </b-card>
      </b-col>
      <b-col cols="4">
        <div class="android-box pt-5 pl-5">
          <header class="header-android">
            <span class="circle"></span>
            <span class="circle right"></span>
          </header>
          <div class="body-android">

          </div>
          <footer class="footer-android"></footer>
        </div>

      </b-col>

      <b-col cols="4">
        <div class="android-box pt-5 pl-5">
         <div class="smile">
           <span class="circle"></span>
           <span class="circle two"></span>
           <span class="past"></span>
         </div>
        </div>

      </b-col>

    </div>

  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'

export default {
  components: { Datepicker, Treeselect, DatePick },
  data () {
    return {
      date: '2019-09-01',
      selected: [],
      selectedRadio: 'A',
      options: [
        {text: 'first', value: '1'},
        {text: 'secondary', value: '2'},
        {text: 'third', value: '3'}
      ],
      // define the default value
      value: null,
      // define options
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

<style scoped>

</style>
