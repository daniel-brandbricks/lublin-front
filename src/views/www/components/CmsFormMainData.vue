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
      <b-form-group class="custom">
        <b-form-input id="input-2" class="custom"
                      placeholder="Tytuł"
                      :class="{'error-input-custom': veeErrors.has('sectionDescription.title')}"
                      name="sectionDescription.title" key="sectionDescription.title" v-validate="{'required':true}"
                      v-model="sectionDescription.title"/>
      </b-form-group>
      <textarea class="custom w-100" v-model="sectionDescription.description" placeholder="Opis"
                :class="{'error-input-custom': veeErrors.has('sectionDescription.description')}"
                name="sectionDescription.description" :key="'sectionDescription.description'" :v-validate="'required'"/>
      <b-form-group>
        <ImageInputAdvanced :imgPath="sectionDescription.imgPath" @afterCropImage="afterCropImage"
                            :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                            :min-width="100" :max-height="1000" :max-width="1000"/>
      </b-form-group>
      <b-form-group>
        <ImageInputAdvanced :imgPath="sectionDescription.bgPath" @afterCropImage="afterCropBackground"
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
          adminTitle: ''
        },
        sectionDescription: {
          title: '',
          description: '',
          imgPath: null,
          bgPath: null
        }
      }
    },
    methods: {
      afterCropImage (base64) {
        this.sectionDescription.imgPath = base64
      },
      afterCropBackground (base64) {
        this.sectionDescription.bgPath = base64
      },
      prepareCms (section, sectionDescription) {
        this.section = section
        this.sectionDescription = sectionDescription
      }
    },
    computed: {
      ...mapGetters(['sections', 'sectionDescriptions'])
    },
    created () {
      if (this.$route.params === undefined) {
        this.$router.push({ name: 'www', params: {'tab': 'menu'} })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      if (this.id) {
        this.$store.dispatch('getSection', {id: this.id})
          .then((response) => {
            this.prepareCms(response)

            let breadcrumbs = [
              {text: 'Strona www', to: {name: 'www'}},
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
