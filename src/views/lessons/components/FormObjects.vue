<template>
  <!--    <div class="wrap">OBJECTS</div>-->
  <b-row class="justify-content-center">
    <b-col cols="6">
<!--      {{lesson.places}}-->
      <h5 class="mb-3">Obiekty Sportowe</h5>
      <div class="row" v-if="lesson.places"
           v-for="(place, index) in lesson.places" :key="index">
        <div class="col-1">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="removePlace(index)" v-if="lesson.places.length > 0">usuń</p>
        </div>
        <div class="col-11 pl-4">
          <b-form-group>
            <b-form-radio v-model="lesson.type" :value="element.value"
                          class="d-inline-block mr-3"
                          :class="{'error-input-custom': veeErrors.has('lesson.type'+radioIndex)}"
                          :name="'lesson.type'+radioIndex" :key="'lesson.type'+radioIndex"
                          v-validate="{'required':true}"
                          v-for="(element,radioIndex) in [{title: 'Klub', value: true}, {title: 'Szkoła', value: false}]">
              {{ element.title }}
            </b-form-radio>
          </b-form-group>
          <treeselect v-model="lesson.schools.title"
                      :multiple="true"
                      :searchable="false"
                      placeholder="Nazwa klubu / szkoły"
                      :options="schoolsAndClubsPrepared"
                      class="custom mb-3"/>
          <treeselect v-model="lesson.places.title"
                      :multiple="true"
                      :searchable="false"
                      placeholder="Nazwa Obiektu"
                      :options="placesPrepared"
                      class="custom mb-3"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{lesson.places.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addPlace" variant="primary" block-class="w-50">+ Dodaj</b-btn>
        </div>
      </div>

      <b-row class="mt-4">
        <b-col>
          <b-btn block-class="custom btn" :to="{ name: 'lessons' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col>
          <b-btn variant="primary" block class="custom" @click="goToFormTab('participant-group-list')">
            Dalej
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import LessonMixin from '@/mixins/lesson-mixin'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    // todo props
    name: 'FormObjects',
    props: [ 'lesson', 'isValidForm' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin, LessonMixin ],
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'schools',
        'sportObjects'
      ])
    },
    methods: {
      ...mapActions([
        'getSportObjects',
        'getSchools'
      ]),
      removePlace (index) {
        this.lesson.places.splice(index, 1)
      },
      addPlace () {
        this.lesson.places.push({ id: null })
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      }
    },
    created () {
      // this.getSportObjects()
      this.getSchools()
      this.$store.dispatch('getSportObjects')
    }
  }
</script>

<style scoped>

</style>
