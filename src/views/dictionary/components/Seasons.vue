<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-start" v-if="seasons"
           v-for="(type,index) in seasons" :key="index">
        <div class="col-2">
          <p class="mt-2" v-if="seasons.length > 0">usuń <span>{{index + 1}}</span></p>
        </div>
        <div class="col-10 pl-2">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          placeholder="Nazwa sezonu"
                          v-model="seasons[index]"></b-form-input>
          </b-form-group>
          <b-row class="my-3">
            <b-col cols="5">
              <treeselect class="custom"
                          v-model="selectedYearFrom"
                          :multiple="true"
                          placeholder="Od"
                          :options="years"/>
            </b-col>
            <b-col cols="2">
              <hr class="mt-4">
            </b-col>
            <b-col cols="5">
              <treeselect class="custom"
                          v-model="selectedYearTo"
                          :multiple="true"
                          placeholder="Do"
                          :options="years"/>
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

export default {
  name: 'Seasons',
  components: {Treeselect},
  mixins: [EventBusEmit],
  data () {
    return {
      seasons: [
        'Nazwa sezonu 1',
        'Nazwa sezonu 2'
      ],
      selectedYearFrom: null,
      selectedYearTo: null,
      // temp
      years: [
        {id: 1, label: '2000'},
        {id: 2, label: '2001'},
        {id: 3, label: '2002'}
      ]
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: 'dashboard'})
  }
}
</script>

<style scoped>

</style>
