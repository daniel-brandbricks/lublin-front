<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <div class="row align-items-center mt-2" v-if="sportObjectTypes"
           v-for="(type,index) in sportObjectTypes" :key="index">
        <div class="col-2">
          <p @click="deleteSportObject(type)"
             v-if="sportObjectTypes.length > 0">usuń <span class="pl-1">{{index + 1}}</span></p>
        </div>
        <div class="pl-2" :class="checkSelected(index) ? 'col-8' : 'col-10'">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0" v-model="type.title"
                          :class="{'error-input-custom': veeErrors.has('type.title'+index)}"
                          :name="'type.title'+index" :key="'type.title'+index" v-validate="'required'"
                          @focus="editInput(index)" :placeholder="type.title"/>
          </b-form-group>
        </div>
        <div class="col-2 p-0" v-show="checkSelected(index)">
          <b-btn @click="submitSportObject(type)" class="m-0" block variant="primary">Zapisz</b-btn>
        </div>
      </div>
      <b-row class=" mt-3">
        <b-col cols="10" class="offset-2 pl-2">
          <b-btn @click="addSportObject" v-if="checkDataToAddNew" variant="primary" block>+ Dodaj Kolejne</b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'

export default {
  name: 'SportObjectType',
  mixins: [EventBusEmit, FormMixin],
  data () {
    return {
      sportObjectTypesDefault: [],
      sportObjectTypeDefault: {
        title: ''
      },

      editedInput: {
        index: null
      }
    }
  },
  computed: {
    sportObjectTypes () {
      return [...this.$store.getters.sportObjectTypes, ...this.sportObjectTypesDefault]
    },
    checkDataToAddNew () {
      return this.sportObjectTypes.length < 1 || undefined === this.sportObjectTypes.find(item => {
        return item.id === undefined
      })
    }
  },
  methods: {
    submitSportObject (type) {
      this.preSubmit()
        .then((result) => {
          if (!result) {
            this.loading = false
            return
          }
          this.loading = false
          if (type.id) {
            this.$store.dispatch('putSportObjectType', type)
          } else {
            this.$store.dispatch('postSportObjectType', type)
              .then((result) => {
                this.sportObjectTypesDefault.splice(this.sportObjectTypesDefault
                  .findIndex(item => {
                    return item.id === undefined && item.title === result.title
                  }), 1)
              })
          }
          this.editedInput.index = null
        })
    },
    checkSelected (index) {
      return !!(this.editedInput && this.editedInput.index === index)
    },
    editInput (index) {
      this.editedInput.index = index
    },
    deleteSportObject (type) {
      if (type.id) {
        this.deleteFromForm('deleteSportObjectType', type.id, type.title)
      }
    },
    addSportObject () {
      this.sportObjectTypesDefault.push({...this.sportObjectTypeDefault})
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
