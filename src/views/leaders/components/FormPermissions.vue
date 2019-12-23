<template>
  <b-row class="justify-content-center">
    <b-col cols="6">
      <div class="row mt-2" v-if="leader.schoolPermissions"
           v-for="(schoolPermission,index) in leader.schoolPermissions" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="removeDiscipline(index)" v-if="leader.schoolPermissions.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <h5 class="mb-3">Dane ogólne</h5>
          <treeselect class="custom mb-3" v-if="leader.schoolPermissions[index].school"
                      v-model="leader.schoolPermissions[index].school.id"
                      :multiple="false"
                      :class="{'error-input-custom': veeErrors.has('leader.schoolPermissions.school'+index)}"
                      :name="'leader.schoolPermissions.school'+index" :key="'leader.schoolPermissions.school'+index"
                      v-validate="{'required':true}" placeholder="Kłub / szkoła"
                      :options="schoolsTreeselect"/>

          <treeselect class="custom" v-if="showPlacesSelect(leader.schoolPermissions[index])"
                      v-model="leader.schoolPermissions[index].places"
                      :multiple="true"
                      :class="{'error-input-custom': veeErrors.has('leader.schoolPermissions.places'+index)}"
                      :name="'leader.schoolPermissions.places'+index" :key="'leader.schoolPermissions.places'+index"
                      v-validate="{'required':true}" placeholder="Obiekt"
                      :options="sportObjectsTreeselect"/>

          <h5 class="my-4">Status</h5>
          <b-form-group>
            <b-form-radio v-model="leader.schoolPermissions[index].status" :value="element.value"
                          class="d-inline-block mr-3"
                          :class="{'error-input-custom': veeErrors.has('participant.active'+radioIndex+'_'+index)}"
                          :name="'participant.active'+radioIndex+'_'+index"
                          :key="'participant.active'+radioIndex+'_'+index"
                          v-validate="{'required':true}"
                          v-for="(element,radioIndex) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
              {{ element.title }}
            </b-form-radio>
          </b-form-group>

          <h5 class="my-4">Uprawnienia</h5>
          <div class="row" v-if="leader.disciplines"
               v-for="(discipline,index) in leader.disciplines" :key="index">
            <div class="col-2">
              <div class="text-center">
                <p class="m-auto">{{index + 1}}</p>
              </div>
              <p class="_text-delete-left" @click="removeDiscipline(index)" v-if="leader.disciplines.length > 0">
                usuń</p>
            </div>
            <div class="col-10">
              <treeselect class="custom mb-3" v-if="leader.disciplines[index]"
                          v-model="leader.disciplines[index].id"
                          :multiple="false"
                          :class="{'error-input-custom': veeErrors.has('leader.discipline'+index)}"
                          :name="'leader.discipline'+index" :key="'leader.discipline'+index"
                          v-validate="{'required':true}"
                          placeholder="Dyscyplina"
                          :options="schoolsTreeselect"/>
              <b-form-group class="custom my-3">
                <b-form-checkbox-group
                  id="checkbox-group-type"
                  v-model="permissionTypesSelected"
                  :options="permissionType"
                  name="checkbox-group-type"/>
              </b-form-group>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-2">
              <div class="text-center">
                <p class="m-auto">{{leader.disciplines.length + 1}}</p>
              </div>
            </div>
            <div class="col-10">
              <b-btn @click="addDiscipline" variant="primary" block class="">+ Dodaj uprawnienie</b-btn>
            </div>
          </div>

        </div>
      </div>
      <div class="row mt-4">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{leader.disciplines.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addDiscipline" variant="primary" block class="w-50">+ Dodaj obiekt</b-btn>
        </div>
      </div>

      <!--buttons-->
      <b-row class="mt-5 col-10 offset-2 p-0">
        <b-col>
          <b-btn variant="delete" class="custom" :disabled="leader.id === undefined"
                 @click="deleteFromForm('deleteLeader', leader.id, undefined, 'sport.objects', {tab: 'confirmed'})">
            <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col>
          <b-link block class="custom btn" :to="{ name: 'leaders', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </b-col>
        <b-col class="p-0">
          <b-btn block class="custom" @click="submit(leader.confirmed, true)">
            Zapisz
          </b-btn>
        </b-col>
      </b-row>

    </b-col>
  </b-row>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import FormMixin from '@/mixins/form-mixin'

  export default {
    name: 'FormMainData',
    props: ['leader'],
    components: {Treeselect},
    mixins: [FormMixin],
    data () {
      return {
        isPlacesAreAnArray: false,

        selectedDisciplinesIds: [],

        permissionTypesSelected: [],
        permissionType: [
          {text: 'czyta', value: '1'},
          {text: 'tworzy', value: '2'},
          {text: 'zmienia', value: '3'},
          {text: 'usuwa', value: '4'}
        ]
        // disciplinesTreeselect: [
        //   { id: 0, label: 'Bieg 50m' },
        //   { id: 1, label: 'Bieg 150m' },
        //   { id: 2, label: 'Bieg 250m' }
        // ]
      }
    },
    watch: {
      // need for making disciplines in select unique
      'leader.disciplines': {
        handler: function (newValue) {
          this.selectedDisciplinesIds = []
          for (let index in newValue) {
            if (newValue[index] && newValue[index].id &&
              this.selectedDisciplinesIds.indexOf(newValue[index].id) === -1) {
                this.selectedDisciplinesIds.push(newValue[index].id)
              }
          }
        },
        deep: true
      }
    },
    computed: {
      schools () {
        return this.$store.getters.schools
      },
      sportObjects () {
        return this.$store.getters.sportObjects
      },
      schoolsTreeselect () {
        let schools = this.schools
        let prepared = []

        for (let index in schools) {
          prepared.push({id: schools[index].id, label: schools[index].name})
        }
        return prepared
      },
      sportObjectsTreeselect () {
        let sportObjects = this.sportObjects
        let prepared = []

        for (let index in sportObjects) {
          prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
        }
        return prepared
      }
    },
    methods: {
      // v-model for places treeselect require array of ids only, but backend returns array of objects
      showPlacesSelect (schoolPermissions) {
        if (schoolPermissions.places && schoolPermissions.places.length < 1) return true
        for (let index in schoolPermissions.places) {
          if (schoolPermissions.places[index].hasOwnProperty('id')) return false
        }
        return true
      },
      addDiscipline () {
        this.$parent.addDiscipline()
      },
      removeDiscipline (index) {
        this.$parent.removeDiscipline(index)
      },
      submit (isConfirmed, validRequired = true) {
        if (validRequired) {
          this.preSubmit()
            .then((result) => {
              if (!result) {
                this.loading = false
                return
              }

              this.loading = false
              this.leader.confirmed = isConfirmed
              this.$parent.submit()
            })
        } else {
          this.leader.confirmed = isConfirmed
          this.$parent.submit()
        }
      }
    },
    created () {
      this.$store.dispatch('getSchools', {confirmed: 0})
      this.$store.dispatch('getSchools', {confirmed: 1})
      this.$store.dispatch('getSportObjects', {confirmed: 0})
      this.$store.dispatch('getSportObjects', {confirmed: 1})
    }
  }
</script>

<style scoped>
  ._custom-css {
    border-radius: 50%;
    box-sizing: border-box;
    height: 36px;
    width: 36px;
    border: 2px solid #D8D8D8;
  }

  ._text-delete-left {
    position: absolute;
    left: -25px;
    top: 0;
  }
</style>
