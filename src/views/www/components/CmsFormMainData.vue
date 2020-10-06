<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="6">
      <h2 class="mb-4">Aktywuj</h2>
      <b-form-group>
        <b-form-radio v-model="section.active" :value="element.value" class="d-inline-block mr-3"
                      :class="{'error-input-custom': veeErrors.has('section.active'+index)}"
                      :name="'section.active'+index" :key="'section.active'+index"
                      v-validate="{'required':true}"
                      v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
          {{ element.title }}
        </b-form-radio>
      </b-form-group>

      <!--   FOR Slider ONLY   -->
      <div v-if="section.adminTitle === 'Slider'">
        <h2>Zdjęcie</h2>
        <div :key="image.id" v-for="(image,index) in section.sliderImages">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom mt-3"
                          placeholder="Tytuł"
                          v-model="section.sliderImages[index].title"/>
          </b-form-group>
          <b-form-group class="custom">
            <textarea id="input-1" class="custom mt-1 mb-0 w-100"
                      placeholder="Opis"
                      v-model="section.sliderImages[index].description"/>
          </b-form-group>
          <ImageInputAdvanced :imgPath="section.sliderImages[index].path" @afterCropImage="afterCropImage"
                              :image-multiple="true" :imageId="image.id"
                              :min-aspect-ratio="21/11" :max-aspect-ratio="21/11" :min-height="420"
                              :min-width="790" :max-height="10000" :max-width="10000"/>
          <hr>
        </div>
        <b-btn variant="primary" class="custom mt-4" @click="addImage" block>Dodaj kolejne</b-btn>
      </div>
      <!--   FOR Slider ONLY   -->

      <!--   FOR Sport Projects ONLY   -->
      <div v-if="section.adminTitle === 'Projekty sportowe'">
        <h2>Projekty</h2>

        <div :key="index" v-for="(project,index) in section.sportProjects">
          <b-row>
            <b-col>
              <p class="d-inline">{{project.id}}. </p><h6 class="d-inline">{{project.title}}</h6>
            </b-col>
            <b-col>
              <span class="d-inline status inactive py-1" v-if="project"
                    :class="{'active': project.active}">{{project.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
            </b-col>
            <b-col>
              <span class="d-inline c-pointer" v-if="project"
                    @click="$router.push({name: 'menu.section.sport.project', params: {id: project.id}})">Edytuj</span>
            </b-col>
          </b-row>
        </div>
        <b-btn variant="primary" class="custom mt-4" @click="goToProject(undefined)" block>Dodaj kolejny</b-btn>
      </div>
      <!--   FOR Sport Projects ONLY   -->

      <b-row class="mt-3 justify-content-center justify-content-sm-end">
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
  import {mapGetters} from 'vuex'

  export default {
    name: 'CmsFormMainData',
    components: {ImageInputAdvanced},
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        section: {
          id: this.id,
          active: false,
          adminTitle: '',
          sliderImages: [],
          sportProjects: [],
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
      // FOR SLIDER ONLY
      addImage() {
        let imageId = -1
        for (let index in this.section.sliderImages) {
          if (this.section.sliderImages[index].id && this.section.sliderImages[index].id <= imageId) {
            imageId = this.section.sliderImages[index].id - 1
          }
        }
        this.section.sliderImages.push({path: null, id: imageId})
      },
      removeImage(imageId) {
        let index = this.section.sliderImages.findIndex(x => x.id === imageId)
        this.section.sliderImages.splice(index, 1)
      },
      afterCropImage(data) {
        console.log(data)
        for (let index in this.section.sliderImages) {
          if (this.section.sliderImages[index].id === data.id) {
            this.section.sliderImages[index].path = data.image
          }
        }
      },
      // FOR SLIDER ONLY

      // FOR SPORT PROJECT ONLY
      goToProject(id = undefined) {
        console.log(id)
        if (id !== undefined) {
          this.$router.push({name: 'menu.section.sport.project', params: {'id': id}})
        } else {
          this.$router.push({name: 'menu.section.sport.project'})
        }
      },
      // FOR SPORT PROJECT ONLY

      prepareCms(section) {
        this.section = section
      },
      submit() {
        let section = {...this.section}
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
    created() {
      if (this.$route.params === undefined) {
        this.$router.push({name: 'www', params: {'tab': 'menu'}})
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
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
