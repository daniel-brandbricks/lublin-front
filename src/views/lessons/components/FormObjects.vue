<template>
  <b-row class="justify-content-center" v-if="sportObjects">
    <b-col cols="6">
      <h5 class="mb-3">Obiekty Sportowe</h5>
      <div class="row" v-if="sportObjects"
           v-for="(sportObject, index) in sportObjects" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
            <p @click="removeSportObject(index)" v-if="sportObjects.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <b-form-radio v-model="sportObjects[index].status" :value="element.value"
                        class="d-inline-block mr-3"
                        :class="{'error-input-custom': veeErrors.has('lesson.active'+radioIndex+'_'+index)}"
                        :name="'lesson.active'+radioIndex+'_'+index"
                        :key="'lesson.active'+radioIndex+'_'+index"
                        v-validate="{'required':true}"
                        v-for="(element,radioIndex) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
            {{ element.title }}
          </b-form-radio>
          <treeselect class="custom mb-3" v-if="sportObjects[index].school"
                      v-model="sportObjects[index].school.id"
                      :multiple="false"
                      :class="{'error-input-custom': veeErrors.has('lesson.schoolPermissions.school'+index)}"
                      :name="'leader.schoolPermissions.school'+index" :key="'leader.schoolPermissions.school'+index"
                      v-validate="{'required':true}" placeholder="Kłub / szkoła"
                      @input="permissions[index].places = []"
                      :options="schoolsTreeselect"/>
        </div>
      </div>
      <div class="row mb-3">
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
    props: [ 'lesson', 'isValidForm', 'titleObjectsSelected' ],
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
      removeSportObject (index) {
        this.lesson.sportObjects.splice(index, 1)
      },
      addPlace () {
        this.lesson.sportObjects.push({ id: null })
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
