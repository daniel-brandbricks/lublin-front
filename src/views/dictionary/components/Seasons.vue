<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-start" v-if="computedList"
           v-for="(season,index) in computedList" :key="index">
        <div class="col-2">
          <p @click="deleteData(season)"
             v-if="computedList.length > 0">usuń <span class="pl-1">{{index + 1}}</span></p>
        </div>
        <div class="col-10 pl-2">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          placeholder="Nazwa sezonu"
                          v-model="computedList[index].title"></b-form-input>
          </b-form-group>
          <b-row class="my-3">
            <b-col cols="5">
              <!--              <treeselect class="custom"-->
              <!--                          v-model="computedList[index].selectedYearFrom"-->
              <!--                          :multiple="true"-->
              <!--                          placeholder="Od"-->
              <!--                          :options="years"/>-->
              <date-picker v-model="computedList[index].selectedYearFrom" :lang="lang"
                           name="owner.subscriptionStart" key="owner.subscriptionStart" v-validate="'required'"
                           id="inputDatapicFrom" placeholder="" class="w-100 custom mb-3">
              </date-picker>
            </b-col>
            <b-col cols="2">
              <hr>
            </b-col>
            <b-col cols="5">
              <!--              <treeselect class="custom"-->
              <!--                          v-model="computedList[index].selectedYearTo"-->
              <!--                          :multiple="true"-->
              <!--                          placeholder="Do"-->
              <!--                          :options="years"/>-->
              <date-picker v-model="computedList[index].selectedYearTo" :lang="lang"
                           name="owner.subscriptionStart" key="owner.subscriptionStart" v-validate="'required'"
                           id="inputDatapicTo" placeholder="" class="w-100 custom mb-3">
              </date-picker>
            </b-col>
          </b-row>

        </div>
      </div>
      <b-row class=" mt-3">
        <b-col cols="10" class="offset-2 pl-2">
          <b-btn variant="primary" block>+ Dodaj Kolejne</b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import DictionaryMixin from '@/mixins/dictionary-mixin'
  import DatePicker from 'vue2-datepicker'

  export default {
    name: 'Seasons',
    components: { Treeselect, DatePicker },
    mixins: [ EventBusEmit, FormMixin, DictionaryMixin ],
    data () {
      return {
        getter: 'seasons',
        dispatchDelete: 'deleteSeason',
        dispatchPost: 'postSeason',
        dispatchPut: 'putSeason',

        lang: {
          days: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
          months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
          pickers: [ 'next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days' ],
          placeholder: {
            date: 'Select Date',
            dateRange: 'Select Date Range'
          }
        },

        // temp
        years: [
          { id: 1, label: '2000' },
          { id: 2, label: '2001' },
          { id: 3, label: '2002' }
        ]
      }
    },
    created () {
      this.$store.dispatch('getSeasons')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'dashboard' })
    }
  }
</script>

<style scoped>

</style>
