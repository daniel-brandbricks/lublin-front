<template>
  <b-row class="justify-content-center">
    <b-col cols="6">
      <h5>Aktywuj</h5>
      <b-form-group>
        <b-form-radio v-model="leader.active" :value="element.value" class="d-inline-block my-3 mr-3"
                      :class="{'error-input-custom': veeErrors.has('leader.active')}"
                      name="leader.active" :key="'leader.active'+index" v-validate="'required'"
                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h5 class="mb-3">Dane ogólne</h5>
      <b-form-group class="custom mb-2">
        <b-form-input id="input-1" class="custom m-0"
                      placeholder="Imię"
                      v-model="leader.name"></b-form-input>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom m-0"
                      placeholder="Nazwisko"
                      v-model="leader.surname"></b-form-input>
      </b-form-group>

      <h5 class="my-3">Dyscipliny</h5>
      <div class="row" v-if="leader.disciplines"
           v-for="(discipline,index) in leader.disciplines" :key="index">
        <div class="col-2">
          <div class="text-center"
               style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <p @click="removeDiscipline(index)" v-if="leader.disciplines.length > 0">usuń</p>
        </div>
        <div class="col-10">
          <treeselect class="custom" v-if="leader.disciplines[index]"
                      v-model="leader.disciplines[index].id"
                      :multiple="false"
                      placeholder="Dyscyplina"
                      :options="disciplinesTreeselect"/>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-2">
          <div class="text-center"
               style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
            <p class="m-auto">{{leader.disciplines.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="addDiscipline" variant="primary" block class="w-50">+ Dodaj</b-btn>
        </div>
      </div>

      <b-form-group class="custom mb-2">
        <b-form-input id="input-1" class="custom m-0"
                      placeholder="E-mail"
                      v-model="leader.email"></b-form-input>
      </b-form-group>
      <b-form-group class="custom mb-2">
        <b-form-input id="input-1" class="custom m-0"
                      placeholder="Hasło"
                      v-model="leader.password"></b-form-input>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom m-0"
                      placeholder="Telefon"
                      v-model="leader.phone"></b-form-input>
      </b-form-group>

      <!--buttons-->
      <b-row class="mt-4">
        <b-col>
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteSportObject', leader.id, undefined, 'sport.objects', {tab: 'confirmed'})"> <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col>
          <b-link block class="custom btn" :to="{ name: 'leaders', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </b-col>
        <b-col>
          <b-btn block class="custom" @click="submit(true)">
            Zapisz
          </b-btn>
        </b-col>
        <b-col>
          <b-btn v-if="leader.confirmed" block variant="primary" class="custom" @click="submitSetConfirm(0)">
            Odtwierdz
          </b-btn>
          <b-btn block v-else variant="primary" class="custom" @click="submitSetConfirm(1, true)">
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
  props: ['leader'],
  components: {Treeselect},
  mixins: [FormMixin],
  data () {
    return {
      disciplinesTreeselect: [
        { id: 0, label: 'Bieg 50m' },
        { id: 1, label: 'Bieg 150m' },
        { id: 2, label: 'Bieg 250m' }
      ]
    }
  },
  computed: {},
  methods: {
    addDiscipline () {
      this.$parent.addDiscipline()
    },
    removeDiscipline (index) {
      this.$parent.removeDiscipline(index)
    },
    submit () {},
    submitSetConfirm () {}
  }
}
</script>

<style scoped>

</style>
