<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="3" class="">
      <h2>Logo</h2>
      <ImageInputAdvanced :imgPath="sportProject.image" @afterCropImage="afterCropImage"
                          v-if="loaded"
                          :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                          :min-width="100" :max-height="5000" :max-width="5000"/>
    </b-col>
    <b-col cols="12" lg="5" v-if="sportProject">
      <h2 class="mb-4">Aktywuj</h2>
      <b-form-group>
        <b-form-radio v-model="sportProject.active" :value="element.value" class="d-inline-block mr-3"
                      :class="{'error-input-custom': veeErrors.has('sportProject.active'+index)}"
                      :name="'sportProject.active'+index" :key="'sportProject.active'+index"
                      v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <h2>Projekt</h2>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Tytuł"
                      :class="{'error-input-custom': veeErrors.has('sportProject.title')}"
                      name="sportProject.title" key="sportProject.title" v-validate="{'required':true}"
                      v-model="sportProject.title"/>
      </b-form-group>
      <textarea class="custom w-100 mb-3" v-model="sportProject.description" placeholder="Opis"
                :class="{'error-input-custom': veeErrors.has('sportProject.description')}"
                name="event.description" :key="'sportProject.description'" :v-validate="'required'"/>
      <!--      <b-form-group class="custom">-->
      <!--        <b-form-input id="input-2" class="custom"-->
      <!--                      placeholder="Opis"-->
      <!--                      :class="{'error-input-custom': veeErrors.has('sportProject.description')}"-->
      <!--                      name="sportProject.description" key="sportProject.description" v-validate="{'required':true}"-->
      <!--                      v-model="sportProject.description"/>-->
      <!--      </b-form-group>-->
      <b-form-group class="custom">
        <b-form-input id="input-3" class="custom"
                      placeholder="Link"
                      :class="{'error-input-custom': veeErrors.has('sportProject.link')}"
                      name="sportProject.link" key="sportProject.link" v-validate="{'required':true}"
                      v-model="sportProject.link"/>
      </b-form-group>

      <b-row class="mt-4">
        <b-col>
<!--          <b-btn variant="delete" class="custom"-->
<!--                 @click="deleteFromForm('deleteSportProject', sportProject.id, undefined, 'www', {})">-->
<!--            Usuń-->
<!--          </b-btn>-->
        </b-col>
        <b-col>
          <b-link block class="custom btn" :to="{ name: 'www' }">
            Anuluj
          </b-link>
        </b-col>
        <b-col>
          <b-btn block class="custom" @click="submit">
            Zapisz
          </b-btn>
        </b-col>
      </b-row>

    </b-col>

    <p class="invisible">{{footerComputed}}</p>
  </b-row>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'
  import EventBusEmit from "@/mixins/event-bus-emit";
  import FormMixin from "@/mixins/form-mixin";

  export default {
    name: 'SportProjectForm',
    components: {ImageInputAdvanced},
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        id: this.$route.params.id,
        sportProject: {
          id: this.id,
          title: '',
          active: false,
          link: '',
          description: '',
          image: null,
          section: {
            id: 4
          }
        },
        loaded: false
      }
    },
    computed: {
      footerComputed() {
        if (null !== this.$store.getters.footer) {
          this.loaded = true
          this.footer = this.$store.getters.footer
        }
        return this.$store.getters.footer
      }
    },
    methods: {
      ...mapActions(['getFooters']),
      afterCropImage(base64) {
        this.sportProject.image = base64
      },
      submit() {
        let sportProject = this.sportProject

        const method = this.id === undefined ? 'postSportProject' : 'putSportProject'
        this.$store.dispatch(method, sportProject)
          .then(() => {
            this.postSubmitRedirect('www')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      }
    },
    created() {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      let breadcrumbs = [
        {text: 'Strona www', to: {name: 'www', params: {'tab': 'menu'}}},
        {text: 'Home', to: {name: 'www', params: {'tab': 'cms'}}},
        {text: 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.$route.params.id) {
        console.log(this.$route)
        this.$store.dispatch('getSportProject', {id: this.$route.params.id})
          .then(response => {
            this.sportProject = response
            this.loaded = true
            let breadcrumbs = [
              {text: 'Strona www', to: {name: 'www', params: {'tab': 'menu'}}},
              {text: 'Home', to: {name: 'www', params: {'tab': 'cms'}}},
              {text: response.title, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      } else {
        this.loaded = true
      }
    }
  }
</script>

<style scoped>

</style>
