<template>
  <b-row class="justify-content-center" v-if="participantGroup">
    <b-col cols="12" xl="6" lg="6" md="12" sm="12" class="mb-2">
      <h5>Aktywuj</h5>
      <b-form-group>
        <b-form-radio v-model="participantGroup.active" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.active')}"
                      name="participantGroup.active" :key="'participantGroup.active'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h2 class="mb-4">Płeć</h2>
<!--      todo maybe checkbox like in invisionapp-->
      <b-form-checkbox-group
        id="checkbox-group-1" class="mr-3 mb-3"
        v-model="participantGroup.sex"
        name="participantGroup.sex" :key="'participantGroup.sex'" v-validate="{'required':true}"
        :options="[
            { text: 'kobieta', value: 0 },
            { text: 'mężczyzna', value: 1 }
          ]"
      />

      <h5 class="mb-3">Dane ogólne</h5>
      <b-form-group class="custom mb-2">
        <b-form-input id="title-1" class="custom m-0"
                      placeholder="Nazwa listy"
                      :class="{'error-input-custom': veeErrors.has('participantGroup.title')}"
                      name="participantGroup.title" key="participantGroup.title" v-validate="{'required':true}"
                      v-model="participantGroup.title"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-if="participantGroup.school"
                    v-model="participantGroup.school.id"
                    :multiple="false"
                    :disabled="participantGroup.id && participantGroup.school.id !== null"
                    placeholder="Szkoła / Klub" :options="schools"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.school')}"
                    name="participantGroup.school" key="participantGroup.school" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-if="participantGroup.leader"
                    v-model="participantGroup.leader.id"
                    :multiple="false"
                    :disabled="participantGroup.id && participantGroup.leader.id !== null"
                    placeholder="Prowadzący" :options="leadersTreeselectBySchool([participantGroup.school.id])"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.leader')}"
                    name="participantGroup.leader" key="participantGroup.leader" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-if="participantGroup.discipline"
                    v-model="participantGroup.discipline.id"
                    :multiple="false"
                    placeholder="Dyscyplina" :options="participantGroupDiscipline"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.discipline')}"
                    name="participantGroup.discipline" key="participantGroup.discipline" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-if="participantGroup.lessonCategory"
                    v-model="participantGroup.lessonCategory.id"
                    :multiple="false"
                    placeholder="Kategoria" :options="participantGroupLessonCategory"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.lessonCategory')}"
                    name="participantGroup.lessonCategory" key="participantGroup.lessonCategory" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-if="participantGroup.class"
                    v-model="participantGroup.class.id"
                    :multiple="false"
                    placeholder="Klasa" :options="participantGroupClass"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.class')}"
                    name="participantGroup.class" key="participantGroup.class" v-validate="{'required':true}"/>
      </b-form-group>
      <b-form-group  class="custom mb-2">
        <treeselect class="custom m-0"
                    v-if="participantGroup.season"
                    v-model="participantGroup.season.id"
                    :disabled="participantGroup.id && participantGroup.season.id !== null"
                    :multiple="false"
                    placeholder="Sezon" :options="participantGroupSeason"
                    :class="{'error-input-custom': veeErrors.has('participantGroup.season')}"
                    name="participantGroup.season" key="participantGroup.season" v-validate="{'required':true}"/>
      </b-form-group>

      <b-row class="mt-4 justify-content-end">
        <b-col xl="4" lg="4" md="12" sm="12" class="mb-2" v-if="this.id">
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteParticipantGroup', participantGroup.id, undefined, 'participant.groups', {})"> <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
          <b-btn block class="custom btn" :to="{ name: 'participant.groups' }">
            Anuluj
          </b-btn>
        </b-col>
        <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
          <b-btn v-if="participantGroup.id"
                 variant="primary" block class="custom" @click="submit(true)">
            Zapisz
          </b-btn>
          <b-btn v-else
                 variant="primary" block class="custom" @click="goToFormTab('participants')">
            Dalej
          </b-btn>
        </b-col>
        <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
          <b-btn v-if="participantGroup.id"
                 variant="primary" block class="custom" @click="$router.push({name: 'participant.group',
                 params: {'tab': 'clone', 'id': id}})">
            Duplikuj
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
  import ParticipantGroupMixin from '@/mixins/participant-group-mixin'
  import EventBus from '@/event-bus'

  export default {
    name: 'FormMainData',
    props: [ 'participantGroup' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin, ParticipantGroupMixin ],
    data () {
      return {
        participants: [],
        participantGroupDefault: {
          active: 1,
          sex: '',
          title: '',
          disciplines: [],
          categories: [],
          classes: [],
          school: {
            id: null
          },
          leader: {
            id: null
          }
        },

        isValidForm: false
      }
    },
    computed: {
      leadersTreeselectBySchool () {
        return schoolIds => {
          if (schoolIds === null || undefined === schoolIds) return []
          let leaders = this.$store.getters.leadersConfirmed
          console.log(leaders)
          let prepared = []
          for (let index in leaders) {
            let exist = false
            for (let schoolIndex in leaders[index].schoolsUsers) {
              if (schoolIds.includes(leaders[index].schoolsUsers[schoolIndex].school.id)) {
                exist = true
              }
            }

            if (exist) {
              prepared.push({id: leaders[index].id, label: leaders[index].firstName + ' ' + leaders[index].lastName})
            }
          }
          return prepared
        }
      },
      disciplines () {
        return this.$store.getters.disciplines
      },
      classes () {
        return this.$store.getters.classes
      },
      lessonCategories () {
        return this.$store.getters.lessonCategories
      },
      seasons () {
        return this.$store.getters.seasons
      }
    },
    watch: {
      'participantGroup.school.id': function (schoolId) {
        if (undefined === schoolId || schoolId === null) return
        this.$store.dispatch('getParticipants', {filters: {schoolId: schoolId}})
        this.$parent.clearParticipants(schoolId)
      }
    },
    methods: {
      submit (validRequired) {
        if (validRequired) {
          this.preSubmit()
            .then((result) => {
              if (!result) {
                this.loading = false
                return
              }

              this.loading = false
              this.$parent.submit()
            })
        } else {
          this.$parent.submit()
        }
      },
      goToFormTab (tabName) {
        this.$parent.goToFormTab(tabName)
      }
    },
    mounted () {
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }

      if (undefined !== this.id) {
        /** @buttonLink route name || false if button must be hidden */
        this.changeAdminNavbarButton({
          buttonLink: false,
          generateExcel: true,
          generatePdf: true,
          generationParams: {
            type: 'Lista zawodników',
            id: this.id,
            results: [0, 1, 2, 3, 4, 5, 6, 7]
          }
        })
      } else {
        this.changeAdminNavbarButton({buttonLink: false})
      }
    },
    created () {
      // /** @buttonLink route name || false if button must be hidden */
      // this.changeAdminNavbarButton({eventBusMethod: false})

      this.$store.dispatch('getLeaders', { confirmed: 1, returnType: 'short' })
      this.$store.dispatch('getSeasons')
      this.$store.dispatch('getSchools')
      this.$store.dispatch('getParticipantGroups')
      this.$store.dispatch('getDisciplines')
      this.$store.dispatch('getLessonCategories')
      this.$store.dispatch('getClasses')
    }
  }
</script>

<style scoped>

</style>
