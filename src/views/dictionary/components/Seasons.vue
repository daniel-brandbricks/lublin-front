<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-start" v-if="computedList"
           v-for="(season,index) in computedList" :key="index">
        <div class="col-2">
<!--          @click="deleteSeason(season.id)"    -->
          <p class="d-none"
             v-if="computedList.length > 0">usuń <span class="pl-1">{{index + 1}}</span></p>
        </div>
        <div class="col-10 pl-2">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          placeholder="Nazwa sezonu"
                          @focus="editInput(index)"
                          :class="{'error-input-custom': veeErrors.has('season.title'+index)}"
                          :name="'season.title'+index" :key="'season.title'+index"
                          v-validate="{'required': true}"
                          v-model="computedList[index].title"/>
          </b-form-group>
          <b-row class="mt-3">
            <b-col cols="5">
              <date-picker v-model="computedList[index].from" :lang="datepickerParams.lang"
                           @focus="editInput(index)"
                           :class="{'error-input-custom': veeErrors.has('season.from'+index)}"
                           :name="'season.from'+index" :key="'season.from'+index"
                           v-validate="{'required': true}"
                           id="inputDatapicFrom" placeholder="" class="w-100 custom mb-3">
              </date-picker>
            </b-col>
            <b-col cols="2">
              <hr>
            </b-col>
            <b-col cols="5">
              <date-picker v-model="computedList[index].to" :lang="datepickerParams.lang"
                           @focus="editInput(index)"
                           :class="{'error-input-custom': veeErrors.has('season.to'+index)}"
                           :name="'season.to'+index" :key="'season.to'+index"
                           v-validate="{'required': true}"
                           id="inputDatapicTo" placeholder="" class="w-100 custom mb-3">
              </date-picker>
            </b-col>
          </b-row>
          <b-row class="justify-content-end mb-3" v-show="checkSelected(index)">
            <b-col cols="4">
              <b-btn @click="submitObject(season)" variant="primary" block>Zapisz</b-btn>
            </b-col>
          </b-row>

        </div>
      </div>
      <b-row class=" mt-3">
        <b-col cols="10" class="offset-2 pl-2">
          <b-btn variant="primary" @click="addEmptySeason()" block>+ Dodaj Kolejne</b-btn>
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
  import {mapActions} from 'vuex'
  import {DATEPICKER_PARAMS} from '@/config/AppConfig';

  export default {
    name: 'Seasons',
    components: {Treeselect, DatePicker},
    mixins: [EventBusEmit, FormMixin, DictionaryMixin],
    data () {
      return {
        datepickerParams: DATEPICKER_PARAMS,

        getter: 'seasons',
        dispatchDelete: 'deleteSeason',
        dispatchPost: 'postSeason',
        dispatchPut: 'putSeason',

        // temp
        years: [
          {id: 1, label: '2000'},
          {id: 2, label: '2001'},
          {id: 3, label: '2002'}
        ]
      }
    },
    methods: {
      ...mapActions(['addEmptySeason']),
      deleteSeason (id) {
        if (id && id > 0) {
          this.deleteFromForm('deleteSeason', null, 'sezon', false, null, {urlParams: id})
        } else {
          this.$store.dispatch('deleteSeason', {urlParams: id})
        }
      }
    },
    created () {
      this.$store.dispatch('getSeasons')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
    }
  }
</script>

<style scoped>

</style>
