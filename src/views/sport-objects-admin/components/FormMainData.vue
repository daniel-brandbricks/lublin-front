<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="8" class="">
      <!--    radios    -->
      <h2 class="my-4">Aktywuj</h2>
      <b-form-group>
        <b-form-radio v-model="sportObject.active" :value="element.value" class="d-inline-block mr-3"
                      :class="{'error-input-custom': veeErrors.has('sportObject.active'+index)}"
                      :name="'sportObject.active'+index" :key="'sportObject.active'+index"
                      v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: 1}, {title: 'Nie', value: 0}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h2 class="my-4">Dane ogólne</h2>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Nazwa"
                      :class="{'error-input-custom': veeErrors.has('sportObject.title')}"
                      name="sportObject.title" key="sportObject.title" v-validate="{'required':true}"
                      v-model="sportObject.title"/>
      </b-form-group>
      <!--    treeselect    -->
      <treeselect v-model="sportObject.type.id" v-if="sportObject.type"
                  :multiple="false" class="custom mb-3"
                  placeholder="Typ" :options="sportObjectTypesPrepared"
                  :class="{'error-input-custom': veeErrors.has('sportObject.type')}"
                  name="sportObject.type" key="sportObject.type" v-validate="{'required':true}"/>

      <b-row>
        <b-col>
          <h2 class="my-4">Lokalizacja</h2>
        </b-col>
      </b-row>

      <DistrictSearch/>
      <!--    treeselect    -->
      <treeselect v-model="sportObject.district"
                  :multiple="false" class="custom mb-3"
                  placeholder="Dzielnica" :options="districts"
                  :class="{'error-input-custom': veeErrors.has('sportObject.district')}"
                  name="sportObject.district" key="sportObject.district" v-validate="{'required':true}"/>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Adres"
                      :class="{'error-input-custom': veeErrors.has('sportObject.address')}"
                      name="sportObject.address" key="sportObject.address" v-validate="{'required':true}"
                      v-model="sportObject.address"/>
      </b-form-group>
      <b-form-group
        class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Kod pocztowy"
                      :class="{'error-input-custom': veeErrors.has('sportObject.postcode')}"
                      name="sportObject.postcode" key="sportObject.postcode" v-validate="{'required':true}"
                      v-model="sportObject.postcode"/>
      </b-form-group>

      <!--buttons-->
      <b-row class="mt-4">
        <b-col lg="3" md="6" sm="12" class="mt-3">
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteAdminSportObject', sportObject.id, undefined, 'admin.sport.objects', {tab: 'confirmed'})">
            <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col lg="3" md="6" sm="12" class="mt-3">
          <b-link block class="custom btn" :to="{ name: 'admin.sport.objects', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </b-col>
        <b-col lg="3" md="6" sm="12" class="mt-3">
          <b-btn block class="custom" @click="submit(true)">
            Zapisz
          </b-btn>
        </b-col>
        <b-col lg="3" md="6" sm="12" class="mt-3" v-if="$store.getters.isAdmin">
          <b-btn v-if="sportObject.confirmed" block variant="primary" class="custom" @click="submitSetConfirm(0)">
            Odtwierdz
          </b-btn>
          <b-btn block v-else variant="primary" class="custom mt-sm-2 mt-lg-0" @click="submitSetConfirm(1, true)">
            Zatwierdź
          </b-btn>
        </b-col>
      </b-row>
      <b-row class="mt-4 justify-content-center" v-if="sportObject && sportObject.id && sportObject.id !== null">
        <b-col lg="3" md="6" sm="12" class="mt-3">
          <b-btn block variant="primary" class="custom mt-sm-2 mt-lg-0" @click="$refs['copySObjToSchool'].show()">
            Kopiuj do szkoły/klubu
          </b-btn>
        </b-col>
      </b-row>
    </b-col>

    <b-modal ref="copySObjToSchool" centered title="" hide-footer size="md">
      <treeselect class="custom"
                  v-model="selectedSchools"
                  :multiple="true"
                  placeholder="Szkoła/Klub"
                  :options="schoolsAndClubsPrepared"/>
      <b-row class="mt-2">
        <b-col>
          <b-btn variant="primary" @click="copyToSchool()" class="w-25 float-right">Kopiuj</b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </b-row>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'
  import DistrictSearch from "@/components/DistrictSearch";

  export default {
    name: 'FormMainData',
    props: ['sportObject', 'districts'],
    components: {DistrictSearch, Treeselect, ImageInputAdvanced},
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        name: 'map',
        selectedSchools: []
      }
    },
    computed: {
      schoolsAndClubsPrepared () {
        let data = this.$store.getters.schools
        let preparedSchools = []

        for (let schoolIndex in data) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
        }

        return preparedSchools
      },
      sportObjectTypesPrepared() {
        let data = this.$store.getters.sportObjectTypes
        let preparedSchools = []

        for (let schoolIndex in data) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].title})
        }

        return preparedSchools
      }
    },
    methods: {
      copyToSchool () {
        let data = {
          method: 'copyToSchool',
          selectedSchools: this.selectedSchools,
          id: this.sportObject.id
        }

        this.$store.dispatch('putAdminSportObject', data)
          .then(() => {
            this.postSubmitRedirect('admin.sport.objects')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      submit(validRequired) {
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
      submitSetConfirm(isConfirmed, validRequired = true) {
        console.log(this.isValidForm)
        if (validRequired) {
          if (this.checkValidForm()) {
            this.sportObject.confirmed = isConfirmed
            this.submit(validRequired)
          } else {
            // validate form in next tab (component)
          }
        } else {
          this.sportObject.confirmed = isConfirmed
          this.submit(validRequired)
        }
      }
    },
    created() {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      this.$store.dispatch('getSchools', {confirmed: 1})

      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>
  .error-input-custom {
    border: 1px solid red !important;
  }
</style>
