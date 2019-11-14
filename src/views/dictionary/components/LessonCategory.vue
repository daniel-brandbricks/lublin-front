<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-center" v-if="categories"
           v-for="(type,index) in categories" :key="index">
        <div class="col-2">
          <p @click="" v-if="categories.length > 0">usuń <span>{{index + 1}}</span></p>
        </div>
        <div class="col-10 pl-2">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          placeholder="Kategorie"
                          v-model="categories[index]"></b-form-input>
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

export default {
  name: 'LessonCategory',
  mixins: [EventBusEmit],
  data () {
    return {
      categories: [
        'Klasy profilowe',
        'SKSy',
        'Dzieci i młodzież',
        'Sport seniorów',
        'Sport osób niepełnosprawnych',
        'Inne'
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
