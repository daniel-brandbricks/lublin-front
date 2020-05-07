<template>
  <b-row class="justify-content-center">
    <b-col cols="14" lg="5">
      <h2 class="center">Nazwa i link (w nawbarze)</h2>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Tytuł"
                      :class="{'error-input-custom': veeErrors.has('menuItem.title')}"
                      name="menuItem.title" key="menuItem.title" v-validate="{'required':true}"
                      v-model="menuItem.title"/>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Link"
                      :class="{'error-input-custom': veeErrors.has('menuItem.link')}"
                      name="menuItem.link" key="menuItem.link" v-validate="{'required':true}"
                      v-model="menuItem.link"/>
      </b-form-group>
      <hr>

      <div v-if="menuItem.id === 4">
        <b-form-group class="custom">
          <b-form-input id="input-1" class="custom"
                        placeholder="WWW link"
                        :class="{'error-input-custom': veeErrors.has('menuItem.www')}"
                        name="menuItem.www" key="menuItem.www"
                        v-model="menuItem.www"/>
        </b-form-group>
      </div>

      <div v-if="menuItem.id === 5 || menuItem.id === 4">
        <b-form-group class="custom">
          <b-form-input id="input-1" class="custom"
                        placeholder="Tytuł na stronie"
                        :class="{'error-input-custom': veeErrors.has('menuItem.mainTitle')}"
                        name="menuItem.mainTitle" key="menuItem.mainTitle" v-validate="{'required':true}"
                        v-model="menuItem.mainTitle"/>
        </b-form-group>
        <b-form-group class="custom">
          <b-form-textarea id="input-1" class="custom"
                           placeholder="Opis na stronie"
                           :class="{'error-input-custom': veeErrors.has('menuItem.description')}"
                           name="menuItem.description" key="menuItem.description" v-validate="{'required':true}"
                           v-model="menuItem.description"/>
        </b-form-group>
      </div>

      <div v-if="menuItem.id === 5">
        <h2>Pliki PDF</h2>
        <div :key="pdf.id" class="mb-3" v-for="(pdf,index) in menuItem.pdfFiles">
          <img src="/static/img/icon_file.svg" alt="">
          {{pdf.title}}
          <p class="c-red-dark c-pointer d-inline-block" @click="removePdf(pdf.id)">(usuń)</p>
        </div>
        <label for="pdf-file" class="pt-2 w-100 text-center custom btn btn-primary c-pointer">Dodaj PDF</label>
        <input type="file" id="pdf-file" @change="convertPdf" accept="application/pdf" class="d-none"/>
      </div>

      <div class="my-3" v-if="menuItem.id === 5 || menuItem.id === 4">
        <h2>Wiedo (link z youtube)</h2>
        <div :key="index" class="mb-3" v-for="(link,index) in menuItem.youtubeLinks"
             v-if="menuItem.youtubeLinks && 'object' ===  typeof menuItem.youtubeLinks">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom"
                          placeholder="Link"
                          :class="{'error-input-custom': veeErrors.has('menuItem.mainTitle')}"
                          name="menuItem.mainTitle" key="menuItem.mainTitle" v-validate="{'required':true}"
                          v-model="menuItem.youtubeLinks[index]"/>
          </b-form-group>
          <p class="c-red-dark c-pointer d-inline-block" @click="removeVideo(index)">(usuń)</p>
        </div>
        <b-btn variant="primary" class="custom mt-4" @click="addVideo" block>Dodaj kolejne</b-btn>
      </div>

      <!--   FOR Slider ONLY   -->
      <div v-if="menuItem.id === 5 || menuItem.id === 4">
        <h2>Zdjęcie</h2>
        <div :key="image.id" v-for="(image,index) in menuItem.sliderImages">
          <!--          <b-form-group class="custom">-->
          <!--            <b-form-input id="input-1" class="custom mt-3"-->
          <!--                          placeholder="Tytuł"-->
          <!--                          v-model="menuItem.sliderImages[index].title"/>-->
          <!--          </b-form-group>-->
          <!--          <b-form-group class="custom">-->
          <!--            <textarea id="input-1" class="custom mt-1 mb-0 w-100"-->
          <!--                      placeholder="Opis"-->
          <!--                      v-model="menuItem.sliderImages[index].description"/>-->
          <!--          </b-form-group>-->
          <ImageInputAdvanced :imgPath="menuItem.sliderImages[index].path" @afterCropImage="afterCropImage"
                              :image-multiple="true" :imageId="image.id"
                              :min-aspect-ratio="21/11" :max-aspect-ratio="21/11" :min-height="420"
                              :min-width="790" :max-height="10000" :max-width="10000"/>
          <hr>
        </div>
        <b-btn variant="primary" class="custom mt-4" @click="addImage" block>Dodaj kolejne</b-btn>
      </div>
      <!--   FOR Slider ONLY   -->

      <b-row class="justify-content-center justify-content-sm-end mt-3">
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

  export default {
    name: 'MenuItemData',
    components: {ImageInputAdvanced},
    mixins: [EventBusEmit, FormMixin],
    data() {
      return {
        menuItem: {
          id: this.id,
          title: '',
          www: '',
          mainTitle: '',
          description: '',
          youtubeLinks: '',
          link: '',
          sliderImages: [],
          pdfFiles: []
        }
      }
    },
    methods: {
      // FOR VIDEOS ONLY
      addVideo() {
        console.log(this.menuItem.youtubeLinks)
        this.menuItem.youtubeLinks.push('')
      },
      removeVideo(index) {
        this.menuItem.youtubeLinks.splice(index, 1)
      },
      // FOR VIDEOS ONLY
      // FOR SLIDER ONLY
      addImage() {
        let imageId = -1
        for (let index in this.menuItem.sliderImages) {
          if (this.menuItem.sliderImages[index].id && this.menuItem.sliderImages[index].id <= imageId) {
            imageId = this.menuItem.sliderImages[index].id - 1
          }
        }
        this.menuItem.sliderImages.push({path: null, id: imageId})
      },
      removeImage(imageId) {
        let index = this.menuItem.sliderImages.findIndex(x => x.id === imageId)
        this.menuItem.sliderImages.splice(index, 1)
      },
      afterCropImage(data) {
        console.log(data)
        for (let index in this.menuItem.sliderImages) {
          if (this.menuItem.sliderImages[index].id === data.id) {
            this.menuItem.sliderImages[index].path = data.image
          }
        }
      },
      // FOR SLIDER ONLY

      // FOR PDF ONLY
      addPdf() {
        let pdfId = -1
        for (let index in this.menuItem.pdfFiles) {
          if (this.menuItem.pdfFiles[index].id && this.menuItem.pdfFiles[index].id <= pdfId) {
            pdfId = this.menuItem.pdfFiles[index].id - 1
          }
        }
        this.menuItem.pdfFiles.push({path: null, id: pdfId, title: ''})
        return pdfId
      },
      removePdf(pdfId) {
        let index = this.menuItem.pdfFiles.findIndex(x => x.id === pdfId)
        this.menuItem.pdfFiles.splice(index, 1)
      },
      convertPdf(e) {
        const reader = new FileReader()
        const files = e.target.files || e.dataTransfer.files
        let pdfId = this.addPdf()
        console.log(files)
        let index = this.menuItem.pdfFiles.findIndex(x => x.id === pdfId)
        reader.addEventListener('load', () => {
          this.menuItem.pdfFiles[index].title = files[0].name
          this.menuItem.pdfFiles[index].path = reader.result
        }, false)

        if (files[0]) {
          reader.readAsDataURL(files[0])
        }
      },
      // FOR PDF ONLY

      prepareMenuItem(menuItem) {
        console.log(menuItem)
        if (menuItem.youtubeLinks === null || menuItem.youtubeLinks.length < 1) {
          menuItem.youtubeLinks = []
        } else {
          menuItem.youtubeLinks = menuItem.youtubeLinks.split('|||')
        }
        this.menuItem = menuItem
      },
      submit() {
        let menuItem = {...this.menuItem}
        if (menuItem.youtubeLinks.length > 0) {
          menuItem.youtubeLinks = menuItem.youtubeLinks.join('|||')
        } else {
          menuItem.youtubeLinks = ''
        }

        console.log(menuItem)
        const method = 'putMenuItem'
        this.$store.dispatch(method, menuItem)
          .then(() => {
            this.postSubmitRedirect('www')
          })
          .catch((error) => {
            this.postSubmitRedirect(error)
          })
      }
    },
    created() {
      if (this.$route.params === undefined) {
        this.$router.push({name: 'www', params: {'tab': 'menu'}})
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      let breadcrumbs = [
        {text: 'Strona www', to: {name: 'www'}},
        {text: 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
      if (this.id) {
        this.$store.dispatch('getMenuItem', {id: this.id})
          .then((response) => {
            this.prepareMenuItem(response)
            /** @buttonLink route name || false if button must be hidden */
            this.changeAdminNavbarButton({buttonLink: false})

            let breadcrumbs = [
              {text: 'Strona www', to: {name: 'www'}},
              {text: response.title, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
