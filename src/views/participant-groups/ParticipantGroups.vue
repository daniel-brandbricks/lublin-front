<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="justify-content-between align-items-center">
          <b-col cols="6">
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedGender"
                :options="genderOptions"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
            <b-form-group class="custom d-inline-block">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-2"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="8" class="mt-4">
        <b-row class="justify-content-between align-items-center">
          <b-col cols="4">
            <treeselect v-model="disciplines.id" v-if="disciplines"
                        :multiple="false" class="custom"
                        placeholder="Dyscyplina" :options="participantGroupDiscipline"
                        :class="{'error-input-custom': veeErrors.has('disciplines.title')}"
                        name="disciplines.title" key="disciplines.title" v-validate="{'required':true}"
                        />
          </b-col>
          <b-col cols="4">
            <treeselect v-model="categories.id" v-if="categories"
                        :multiple="false" class="custom"
                        placeholder="Kategoria" :options="participantGroupLessonCategory"
                        :class="{'error-input-custom': veeErrors.has('categories.title')}"
                        name="categories.title" key="categories.title" v-validate="{'required':true}"
            />
          </b-col>
          <b-col cols="4">
            <treeselect v-model="classes.id" v-if="classes"
                        :multiple="false" class="custom"
                        placeholder="Klasa" :options="participantGroupClass"
                        :class="{'error-input-custom': veeErrors.has('classes.title')}"
                        name="classes.title" key="classes.title" v-validate="{'required':true}"
            />
          </b-col>
        </b-row>
      </b-col>

      <!--   Table   -->
      <b-col cols="8" class="mt-4">
        <b-table
          :items="participantList"
          :fields="fields"
          striped
          sort-icon-left
          responsive="md"
          class="custom table-responsive"
          @row-clicked="rowRedirect"
        >

          <template slot="discipline" slot-scope="scope">
            <span>{{scope.item.discipline.title}}</span>
          </template>
          <template slot="lessonCategory" slot-scope="scope">
            <span>{{scope.item.lessonCategory.title}}</span>
          </template>
          <template slot="class" slot-scope="scope">
            <span>{{scope.item.class.title}}</span>
          </template>

          <template slot="status" slot-scope="scope">
            <span class="status" :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
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
import ParticipantGroupMixin from '@/mixins/participant-group-mixin'

export default {
  components: {Treeselect},
  props: ['participantGroup', 'filters'],
  mixins: [EventBusEmit, ParticipantGroupMixin],
  data () {
    return {
      fields: [
        {key: 'title', label: 'Nazwa listy', sortable: true},
        {key: 'discipline', label: 'Dyscyplina', sortable: true},
        {key: 'sex', label: 'Płeć', sortable: true},
        {key: 'lessonCategory', label: 'Kategoria', sortable: true},
        {key: 'class', label: 'Klasa', sortable: true},
        {key: 'status', label: 'Status w systemie', sortable: true},
        {key: 'edit', label: ''}
      ],

      search: '',

      selectedType: [],
      typeOptions: [
        {text: 'klub', value: 0},
        {text: 'szkola', value: 1}
      ],

      selectedGender: [],
      genderOptions: [
        {text: 'kobieta', value: 0},
        {text: 'mężczyzna', value: 1}
      ],

      selectedDiscipline: null,
      selectedCategory: null,
      selectedClass: null,
      // temp

      // todo maybe like in ParticipantGroupsForm
      disciplines: [],
      categories: [],
      classes: []
    }
  },
  computed: {
    participantList () {
      return this.$store.getters.participantGroups
    }
  },
  methods: {
    rowRedirect (id) {
      this.$router.push({
        name: 'participant.group',
        params: {'tab': 'main-data', 'id': id}
      })
    }
  },
  created () {
    this.$store.dispatch('getParticipantGroups')
    this.$store.dispatch('getDisciplines')
    this.$store.dispatch('getLessonCategories')
    this.$store.dispatch('getClasses')

    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: 'participant.group', params: {tab: 'main-data'}})
    this.changeAdminNavbarBreadcrumbs([{text: 'Lista zawodników', active: true}])
  }
}
</script>

<style scoped>

</style>
