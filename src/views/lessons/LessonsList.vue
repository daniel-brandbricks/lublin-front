<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="6">
            <b-form-group class="custom" v-if="undefined === sportObject">
<!--              todo checkbox filter  -->
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="8" class="mt-4">
        <b-row class="justify-content-between align-items-center">
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedDisciplines"
                        :multiple="true"
                        placeholder="Dyscyplina"
                        :options="lessonDiscipline"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedLessonCategories"
                        :multiple="true"
                        placeholder="Kategoria"
                        :options="lessonCategory"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="selectedClasses"
                        :multiple="true"
                        placeholder="Klasa"
                        :options="lessonClass"/>
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

          <template slot="disciplines" slot-scope="scope">
            <span v-if="scope.item && scope.item.discipline">
              {{getDisciplineTitleById(scope.item.discipline.id)}}
            </span>
          </template>
          <template slot="lessonCategories" slot-scope="scope">
            <span v-if="scope.item && scope.item.lessonCategory">
              {{getLessonCategoryTitleById(scope.item.lessonCategory.id)}}
            </span>
          </template>
          <template slot="classes" slot-scope="scope">
            <span v-if="scope.item && scope.item.class">
              {{getClassTitleById(scope.item.class.id)}}
            </span>
          </template>

          <!--          <template slot="leaders" slot-scope="scope">-->
          <!--            <span>{{scope.item.leaders}}</span>-->
          <!--          </template>-->

          <template slot="leaders" slot-scope="scope">
            <span v-if="scope.item && scope.item.leader">
              {{ buildUserNames(leaderById(scope.item.leader.id)) }}
            </span>
          </template>

          <template slot="status" slot-scope="scope">
            <span class="status"
                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
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
    name: 'LessonList',
    components: { Treeselect },
    props: [ 'lesson', 'isConfirmed', 'school', 'sportObject' ],
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

        selectedType: [],
        typeOptions: [
          { text: 'klub', value: 0 },
          { text: 'szkola', value: 1 }
        ],
        search: '',
        selectedDisciplines: [],
        selectedLessonCategories: [],
        selectedClasses: []
      }
    },
    computed: {
      ...mapGetters([ 'leaderById', 'classes', 'lessonCategories', 'disciplines' ]),
      leadersConfirmed () {
        return this.$store.getters.leadersConfirmed
      },
      buildUserNames: () => (user) => {
        if (undefined === user || user === null) {
          return null
        }
        return user.firstName + ' ' + user.lastName
      }
      // getLeadersFullNamesByIds: () => (ids) => {
      //   let leadersConfirmed = this.leadersConfirmed
      //   console.log(leadersConfirmed)
      //   if (undefined === leadersConfirmed || leadersConfirmed === null || leadersConfirmed.length < 1) {
      //     return null
      //   }
      //
      //   let names = ''
      //   for (let leaderId in ids) {
      //     let user = this.leaderById(leaderId)
      //     console.log(user)
      //     names += user.firstName + ' ' + user.lastName
      //   }
      //   return names.substring(0, names.length - 2)
      // }
    },
    methods: {
      getDisciplineTitleById (id) {
        if (undefined === this.disciplines || this.disciplines === null || this.disciplines.length < 1) return ''
        return this.disciplines.find((obj) => {
          return obj.id === id
        }).title
      },
      getLessonCategoryTitleById (id) {
        if (undefined === this.lessonCategories || this.lessonCategories === null || this.lessonCategories.length < 1) return ''
        return this.lessonCategories.find((obj) => {
          return obj.id === id
        }).title
      },
      getClassTitleById (id) {
        if (undefined === this.classes || this.classes === null || this.classes.length < 1) return ''
        return this.classes.find((obj) => {
          return obj.id === id
        }).title
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
      // this.$store.dispatch('getLeaders', {confirmed: 0})
      this.$store.dispatch('getLeaders', {confirmed: 1})

      if (this.fieldsParams) {
        for (let key in this.fieldsParams) {
          let field = this.fieldsParams[key]
          console.log(field)
          this.replaceTableField(field)
        }
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'lesson', params: { tab: 'main-data' } })
      if (undefined === this.school && this.sportObject === undefined) {
        this.changeAdminNavbarBreadcrumbs([ { text: 'Lista zajęć', active: true } ])
      }
    }
  }
</script>

<style scoped>

</style>
