<template>
  <div>
    <b-row class="justify-content-center align-items-center">
      <b-col cols="8">
        <b-row class="justify-content-center align-items-center">
          <b-col cols="3">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              />
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
            <treeselect v-model="disciplines.id" v-if="disciplines"
                        :multiple="false" class="custom"
                        placeholder="Dyscyplina" :options="lessonDiscipline"
                        :class="{'error-input-custom': veeErrors.has('disciplines.title')}"
                        name="disciplines.title" key="disciplines.title" v-validate="{'required':true}"
            />
          </b-col>
          <b-col cols="4">
            <treeselect v-model="lessonCategories.id" v-if="lessonCategories"
                        :multiple="false" class="custom"
                        placeholder="Kategoria" :options="lessonOfLessonCategory"
                        :class="{'error-input-custom': veeErrors.has('categories.title')}"
                        name="categories.title" key="categories.title" v-validate="{'required':true}"
            />
          </b-col>
          <b-col cols="4">
            <treeselect v-model="classes.id" v-if="classes"
                        :multiple="false" class="custom"
                        placeholder="Klasa" :options="lessonClass"
                        :class="{'error-input-custom': veeErrors.has('classes.title')}"
                        name="classes.title" key="classes.title" v-validate="{'required':true}"
            />
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col cols="8" class="mt-4">
        <b-table
          :items="lessons"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
        >
          <!--          @row-clicked="rowRedirect"-->

          <template slot="discipline" slot-scope="scope">
            <span>{{scope.item.discipline.title}}</span>
          </template>
          <template slot="lessonCategory" slot-scope="scope">
            <span>{{scope.item.lessonCategory.title}}</span>
          </template>
          <template slot="class" slot-scope="scope">
            <span>{{scope.item.class.title}}</span>
          </template>

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

  export default {
    components: { Treeselect },
    props: [ 'lesson' ],
    mixins: [ EventBusEmit, LessonMixin ],
    data () {
      return {
        fields: [
          { key: 'title', label: 'Nazwa zajęcia', sortable: true },
          { key: 'discipline', label: 'Dyscyplina', sortable: true },
          { key: 'lessonCategory', label: 'Kategoria', sortable: true },
          { key: 'class', label: 'Klasa', sortable: true },
          { key: 'leader', label: 'Prowadzący', sortable: true },
          { key: 'status', label: 'Status w systemie', sortable: true },
          { key: 'edit', label: '' }
        ],

        search: '',

        selectedType: [],
        typeOptions: [
          { text: 'klub', value: 0 },
          { text: 'szkola', value: 1 }
        ],

        disciplines: [],
        lessonCategories: [],
        classes: []
        // temp
      }
    },
    computed: {
      lessons () {
        return this.$store.getters.lessons
      }
    },
    methods: {
      // rowRedirect (row) {
      //   this.$router.push({
      //     name: 'lesson',
      //     params: { 'tab': 'main-data', 'id': row.id }
      //   })
      // }
    },
    created () {
      this.$store.dispatch('getLessons')
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
      this.$store.dispatch('getLeaders')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: 'lesson', params: { tab: 'main-data' } })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Lista zajęć', active: true } ])
    }
  }
</script>

<style scoped>

</style>
