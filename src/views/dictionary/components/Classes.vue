<template>
  <b-row class="justify-content-center">
    <b-col cols="6">
      <h5>Profilowe</h5>
      <div class="row" v-if="profiles"
           v-for="(profile,index) in profiles" :key="index">
        <div class="col-2">
          <div class="text-center"
               style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="" v-if="profiles.length > 0">usuń</p>
        </div>
        <div class="col-10 pl-4">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0 mb-3"
                          placeholder="Kategorie"
                          v-model="profiles[index].name"></b-form-input>
          </b-form-group>

          <div class="row" v-if="profiles[index].items"
               v-for="(item,itemIndex) in profiles[index].items" :key="itemIndex">
            <div class="col-2">
              <p @click="" v-if="profiles[index].items.length > 0">usuń <span>{{itemIndex + 1}}</span></p>
            </div>
            <div class="col-10 pl-2">
              <b-form-group class="custom">
                <b-form-input id="input-1" class="custom m-0"
                              placeholder="Kategorie"
                              v-model="profiles[index].items[itemIndex]"></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="d-flex flex-row align-items-center mt-3">
            <span class="pl-4">2</span>
            <b-btn variant="primary" class="w-50 m-0 ml-3">+ Dodaj Kolejny</b-btn>
          </div>
        </div>

        <div class="col-2 mt-4">
          <div class="text-center"
               style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
            <p class="m-auto">{{index + 2}}</p>
          </div>
        </div>
        <b-col cols="10" class="pl-2 mt-4">
          <b-btn variant="primary" block>+ Dodaj Grupę</b-btn>
        </b-col>
      </div>
    </b-col>

    <b-col cols="6">
      <h5>Wszystkie</h5>
      <div class="row" v-if="allItems"
           v-for="(item,index) in allItems" :key="index">
        <div class="col-2">
          <p @click="" v-if="allItems.length > 0">usuń <span>{{index + 1}}</span></p>
        </div>
        <div class="col-10 pl-2">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          placeholder="Kategorie"
                          v-model="allItems[index]"></b-form-input>
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
  name: 'Classes',
  mixins: [EventBusEmit],
  data () {
    return {
      profiles: [
        {
          name: 'Szkoły podstawowe',
          items: [
            'Klasa 1',
            'Klasa 2',
            'Klasa 3',
            'Klasa 4'
          ]
        }
      ],
      allItems: [
        'Mistrzowska Międzynarodowa (MM)',
        'Mistrzowska (M)',
        'Pierwsza (I)',
        'Druga (II)',
        'Trzecia (III)',
        'Czwarta (IV)',
        'Piąta (V)'
      ]
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
  }
}
</script>

<style scoped>

</style>
