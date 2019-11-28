<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-center mt-2" v-if="computedList"
           v-for="(type,index) in computedList" :key="index">
        <div class="col-2">
          <p @click="deleteData(type, index)"
             v-if="computedList.length > 0">usuń <span class="pl-1">{{index + 1}}</span></p>
        </div>
        <div class="pl-2" :class="checkSelected(index) ? 'col-8' : 'col-10'">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0" v-model="type.title"
                          :class="{'error-input-custom': veeErrors.has('type.title'+index)}"
                          :name="'type.title'+index" :key="'type.title'+index" v-validate="{'required':true}"
                          @focus="editInput(index)" :placeholder="type.title"/>
          </b-form-group>
        </div>
        <div class="col-2 p-0" v-show="checkSelected(index)">
          <b-btn @click="submitObject(type)" class="m-0" block variant="primary">Zapisz</b-btn>
        </div>
      </div>
      <b-row class=" mt-3">
        <b-col cols="10" class="offset-2 pl-2">
          <b-btn @click="addDefaultData" v-if="checkDataToAddNew" variant="primary" block>+ Dodaj Kolejne</b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import DictionaryMixin from '@/mixins/dictionary-mixin'

export default {
  name: 'SportObjectType',
  mixins: [EventBusEmit, FormMixin, DictionaryMixin],
  data () {
    return {
      getter: 'sportObjectTypes',
      dispatchDelete: 'deleteSportObjectType',
      dispatchPost: 'postSportObjectType',
      dispatchPut: 'putSportObjectType'
    }
  },
  created () {
    this.$store.dispatch('getSportObjectTypes')

    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
  }
}
</script>

<style scoped>

</style>
