<template>
  <div>
    <b-row class="justify-content-center align-items-center">
      <b-col cols="8">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="3">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox v-model="sex" :value="element.value"
                               :class="{'error-input-custom': veeErrors.has('sex')}"
                               name="sex" :key="'sex'+index" v-validate="{'required':true}"
                               v-for="(element, index) in [{title:'kobieta', value: true}, {title: 'mężczyzna', value: false}]">
                {{element.title}}
              </b-form-checkbox>
            </b-form-group>
          </b-col>
          <b-col cols="9">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="8" class="mt-3">
        <b-row class="align-items-center">
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedDisciplines"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="disciplinesTreeselect"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedLessonCategories"
                        :multiple="true"
                        placeholder="Kategoria"
                        :options="lessonCategoriesTreeselect"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedClasses"
                        :multiple="true"
                        placeholder="Klasa"
                        :options="classesTreeselect"/>
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col cols="8" class="mt-4">
        <b-table
          :items="lessonsList"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirect"
        >

<!--          <template slot="discipline" slot-scope="scope">-->
<!--            <span>{{scope.item.discipline.title}}</span>-->
<!--          </template>-->
          <template slot="disciplines" slot-scope="scope">
            <span></span>
            <span class="d-inline" v-for="(discipline,index) in scope.item.disciplines" :key="index">
            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}
          </span>
          </template>
          <template slot="lessonCategory" slot-scope="scope">
            <span>{{scope.item.lessonCategory.title}}</span>
          </template>
          <template slot="class" slot-scope="scope">
            <span>{{scope.item.class.title}}</span>
          </template>
<!--          <template slot="leader" slot-scope="scope">-->
<!--            <span>{{scope.item.leader.firstName}}</span>-->
<!--          </template>-->
<!--          <template slot="leader" slot-scope="scope">-->
<!--&lt;!&ndash;            <span></span>&ndash;&gt;-->
<!--            <span class="d-inline" v-for="(leader, index) in scope.item.leaders" :key="index">-->
<!--              {{getLeaderFullNameById(leader.id, index, scope.item.leaders.length)}}-->
<!--            </span>-->
<!--          </template>-->
<!--          <template slot="leader" slot-scope="scope">-->
<!--            <span>{{scope.item.leaders.length}}</span>-->
<!--          </template>-->

          <template slot="name" slot-scope="scope">
            <div class="d-flex align-items-center justify-content-between">
              <div class="wrap-img-type-table mr-3">
                <img :src="scope.item.image || 'https://placeimg.com/50/50/any'" alt="">
              </div>
              <span>{{scope.item.name}}</span>
            </div>

          </template>

          <template slot="status" slot-scope="scope">
            <span class="status"
                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
          </template>

          <template slot="btnTable" slot-scope="scope">
            <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
              Zatwierdź
            </b-btn>
          </template>
          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>

        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import LessonMixin from '@/mixins/lesson-mixin'

  import { mapGetters } from 'vuex'

  export default {
    components: { Treeselect },
    props: [ 'lesson' ],
    mixins: [ EventBusEmit, LessonMixin ],
    data () {
      return {
        fields: [
          { key: 'title', label: 'Nazwa zajęcia', sortable: true },
          { key: 'disciplines', label: 'Dyscyplina', sortable: true },
          { key: 'lessonCategories', label: 'Kategoria', sortable: true },
          { key: 'classes', label: 'Klasa', sortable: true },
          { key: 'leaders', label: 'Prowadzący', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ],

        sex: '',
        search: '',
        selectedDisciplines: [],
        selectedLessonCategories: [],
        selectedClasses: []
      }
    },
    computed: {
      lessonsList () {
        return this.$store.getters.lessons
      },
      ...mapGetters([ 'disciplines', 'lessonCategories', 'classes' ]),
      disciplinesTreeselect () {
        let disciplinesPrepared = []
        for (let index in this.disciplines) {
          disciplinesPrepared.push({
            id: this.disciplines[index].id,
            label: this.disciplines[index].title
          })
        }
        return disciplinesPrepared
      },
      lessonCategoriesTreeselect () {
        let lessonCategoriesPrepared = []
        for (let index in this.lessonCategories) {
          lessonCategoriesPrepared.push({
            id: this.lessonCategories[index].id,
            label: this.lessonCategories[index].title
          })
        }
        return lessonCategoriesPrepared
      },
      classesTreeselect () {
        let classesPrepared = []
        for (let index in this.classes) {
          classesPrepared.push({
            id: this.classes[index].id,
            label: this.classes[index].title
          })
        }
        return classesPrepared
      }
    },
    methods: {
      getLeaderFullNameById (id, index = null, arrayLength = null) {
        if (undefined === this.leaders || this.leaders === null || this.leaders.length < 1) return ''
        return this.leaders.find((obj) => {
          return obj.id === id
        }).firstName + ((index + 1) < arrayLength ? ',' : '')
      },
      rowRedirect (row) {
        this.$router.push({
          name: 'lesson',
          params: { 'tab': 'main-data', 'id': row.id }
        })
      }
    },
    created () {
      this.$store.dispatch('getLessons')
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      this.$store.dispatch('getLeaders', {confirmed: 0})
      this.$store.dispatch('getLeaders', {confirmed: 1})

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'lesson', params: { tab: 'main-data' } })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Lista zajęć', active: true } ])
    }
  }
</script>

<style scoped>

</style>
