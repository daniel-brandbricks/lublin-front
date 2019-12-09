<template>
  <b-row class="justify-content-center">
    <b-col cols="6" v-if="leader">
      <h5>Aktywuj</h5>
      <b-form-group>
        <b-form-radio v-model="leader.active" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('leader.active')}"
                      name="leader.active" :key="'leader.active'+index" v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h5 class="mb-3">Dane ogólne</h5>
      <b-form-group class="custom mb-2">
        <b-form-input id="name-1" class="custom m-0"
                      placeholder="Imię"
                      :class="{'error-input-custom': veeErrors.has('leader.firstName')}"
                      name="leader.firstName" key="leader.firstName" v-validate="{'required':true}"
                      v-model="leader.firstName"></b-form-input>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="surname-1" class="custom m-0"
                      placeholder="Nazwisko"
                      :class="{'error-input-custom': veeErrors.has('leader.lastName')}"
                      name="leader.lastName" key="leader.lastName" v-validate="{'required':true}"
                      v-model="leader.lastName"></b-form-input>
      </b-form-group>

      <h5 class="my-3">Dyscipliny</h5>
      <div class="row" v-if="leader.disciplines"
           v-for="(discipline,index) in leader.disciplines" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="removeDiscipline(index)" v-if="leader.disciplines.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <treeselect class="custom" v-if="leader.disciplines[index]"
                      v-model="leader.disciplines[index].id"
                      :multiple="false"
                      :class="{'error-input-custom': veeErrors.has('leader.discipline'+index)}"
                      :name="'leader.discipline'+index" :key="'leader.discipline'+index" v-validate="{'required':true}"
                      placeholder="Dyscyplina"
                      :options="disciplinesTreeselect"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{leader.disciplines.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addDiscipline" variant="primary" block class="w-50">+ Dodaj</b-btn>
        </div>
      </div>

      <b-form-group class="custom mb-2">
        <b-form-input id="email-1" class="custom m-0"
                      placeholder="E-mail"
                      :class="{'error-input-custom': veeErrors.has('leader.email')}"
                      name="leader.email" key="leader.email" v-validate="{'required':true, 'email': true}"
                      v-model="leader.email"></b-form-input>
      </b-form-group>
      <b-form-group class="custom mb-2">
        <b-form-input id="password-1" class="custom m-0"
                      placeholder="Hasło" type="password"
                      :class="{'error-input-custom': veeErrors.has('leader.password')}"
                      name="leader.password" key="leader.password" v-validate="{'required': leader.id === undefined}"
                      v-model="leader.password"></b-form-input>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="phone-1" class="custom m-0"
                      placeholder="Telefon" type="number"
                      :class="{'error-input-custom': veeErrors.has('leader.phone')}"
                      name="leader.phone" key="leader.phone" v-validate="{'required':true}"
                      v-model="leader.phone"></b-form-input>
      </b-form-group>

      <!--buttons-->
      <b-row class="mt-4">
        <b-col>
          <b-btn variant="delete" class="custom" :disabled="leader.id === undefined"
                 @click="deleteFromForm('deleteLeader', leader.id, undefined, 'sport.objects', {tab: 'confirmed'})"> <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col>
          <b-link block class="custom btn" :to="{ name: 'leaders', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </b-col>
        <b-col>
          <b-btn block class="custom" @click="submit(leader.confirmed, true)">
            Zapisz
          </b-btn>
        </b-col>
        <b-col>
          <b-btn v-if="leader.confirmed" block variant="primary" class="custom" @click="submit(0)">
            Odtwierdz
          </b-btn>
          <b-btn block v-else variant="primary" class="custom" @click="submit(1, true)">
            Zatwierdź
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
    props: [ 'leader' ],
    components: { Treeselect },
    mixins: [ FormMixin ],
    data () {
      return {
        selectedDisciplinesIds: []
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
      disciplines () {
        return this.$store.getters.disciplines
      },
      disciplinesTreeselect () {
        let disciplines = this.disciplines
        let prepared = []

        for (let disciplineIndex in disciplines) {
          // need for making disciplines in select unique
          if (this.selectedDisciplinesIds.indexOf(disciplines[disciplineIndex].id) === -1) {
            prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
          } else {
            prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title, isDisabled: true})
          }
        }

        return prepared
      }
    },
    methods: {
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
      // need for making disciplines in select unique
      for (let index in this.leader.disciplines) {
        if (this.leader.disciplines[index] && this.leader.disciplines[index].id &&
          this.selectedDisciplinesIds.indexOf(this.leader.disciplines[index].id) === -1) {
            this.selectedDisciplinesIds.push(this.leader.disciplines[index].id)
          }
      }
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
</style>
