<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-center" v-if="disciplines"
           v-for="(type,index) in disciplines" :key="index">
        <div class="col-2">
          <p @click="" v-if="disciplines.length > 0">usuń <span>{{index + 1}}</span></p>
        </div>
        <div class="col-10 pl-2">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          placeholder="Dysciplina"
                          v-model="disciplines[index]"></b-form-input>
          </b-form-group>
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
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'

export default {
  name: 'Disciplines',
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {
      disciplines: [
        'Bieg 50m',
        'Bieg 100m',
        'Bieg 500m',
        'Bieg 1000m',
        'Bieg 2000m'
      ],

      disciplineDefault: {
        title: ''
      },

      editedInput: {
        index: null
      }
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
