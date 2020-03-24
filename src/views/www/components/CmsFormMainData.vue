<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <h1>CMS</h1>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Tytuł dla administratora"
                      :class="{'error-input-custom': veeErrors.has('section.adminTitle')}"
                      name="section.adminTitle" key="section.adminTitle" v-validate="{'required':true}"
                      v-model="section.adminTitle"/>
        <hr>
      </b-form-group>
<!--      todo maybe v-for on sectionDescription-->
<!--      todo check Daniel-->
      <b-form-group class="custom">
        <b-form-input id="input-2" class="custom"
                      placeholder="Tytuł"
                      :class="{'error-input-custom': veeErrors.has('section.sectionDescriptions.title')}"
                      name="section.sectionDescriptions.title" key="section.sectionDescriptions.title" v-validate="{'required':true}"
                      v-model="section.sectionDescriptions.title"/>
      </b-form-group>
      <textarea class="custom w-100" v-model="section.sectionDescriptions.description" placeholder="Opis"
                :class="{'error-input-custom': veeErrors.has('index.description')}"
                name="section.sectionDescriptions.description" :key="'section.sectionDescriptions.description'" :v-validate="'required'"/>
      <b-form-group>
        <ImageInputAdvanced :imgPath="section.sectionDescriptions.imgPath" @afterCropImage="afterCropImage"
                            :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                            :min-width="100" :max-height="1000" :max-width="1000"/>
      </b-form-group>
      <b-form-group>
        <ImageInputAdvanced :imgPath="section.sectionDescriptions.bgPath" @afterCropBackground="afterCropBackground"
                            :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                            :min-width="100" :max-height="1000" :max-width="1000"/>
      </b-form-group>
      <b-row class="justify-content-center justify-content-sm-end">
        <b-col cols="12" sm="4">
          <b-btn block variant="primary" class="custom" @click="submit(1, true)">
            Zapisz
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CmsFormMainData',
    components: { ImageInputAdvanced },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        section: {
          id: this.id,
          adminTitle: '',
          sectionDescriptions: {
            title: '',
            description: '',
            imgPath: null,
            bgPath: null
          }
        }
      }
    },
    methods: {
      getSectionDescriptionBySection (id, index = null, arrayLength = null) {
        if (undefined === this.section.sectionDescriptions || this.section.sectionDescriptions === null) return ''
        let sectionDescription = this.section.sectionDescriptions.find((obj) => {
          return obj.id === id
        })

        return undefined === sectionDescription ? '' : sectionDescription.title + ((index + 1) < arrayLength ? ',' : '')
      },
      afterCropImage (base64) {
        this.index.imgPath = base64
      },
      afterCropBackground (base64) {
        this.index.bgPath = base64
      },
      prepareCms (section) {
        this.section = section
      },
      submit () {
        let section = {...this.section}
        if (undefined === this.id) {
          const method = 'postSection'
          this.$store.dispatch(method, section)
            .then(() => {
              this.postSubmitRedirect('wwww')
            })
            .catch((error) => {
              this.postSubmitRedirect(error)
            })
        }
        const method = 'putSection'
        this.$store.dispatch(method, section)
          .then(() => {
            this.postSubmitRedirect('www')
          })
          .catch((error) => {
            this.postSubmitRedirect(error)
          })
      }
    },
    computed: {
      ...mapGetters(['sectionDescription'])
    },
    created () {
      if (this.$route.params === undefined) {
        this.$router.push({ name: 'www', params: {'tab': 'menu'} })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      let breadcrumbs = [
        {text: 'Strona www', to: {name: 'www', params: {'tab': 'cms'}}},
        {text: 'Nowa', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getSection', {id: this.id})
          .then((response) => {
            this.prepareCms(response)

            let breadcrumbs = [
              {text: 'Strona www', to: {name: 'www', params: {'tab': 'cms'}}},
              {text: response.adminTitle, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
