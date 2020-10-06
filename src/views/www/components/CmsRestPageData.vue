<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="10">
<!--      <h2 class="mb-4">Aktywuj</h2>-->
<!--      <b-form-group>-->
<!--        <b-form-radio v-model="restPage.active" :value="element.value" class="d-inline-block mr-3"-->
<!--                      :class="{'error-input-custom': veeErrors.has('restPage.active'+index)}"-->
<!--                      :name="'restPage.active'+index" :key="'restPage.active'+index"-->
<!--                      v-validate="{'required':true}"-->
<!--                      v-for="(element,index) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">-->
<!--          {{ element.title }}-->
<!--        </b-form-radio>-->
<!--      </b-form-group>-->

      <vue-editor :editorToolbar="customToolbar" v-model="restPage.description"/>
<!--      <div v-html="restPage.description"></div>-->

      <b-form-group class="custom checkbox-big-span my-2">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="showFullCode"
          :options="[{text: 'Pokaż kod', value: true}]"
          :unchecked-value="false"
          value="false"
          name="flavour-1"
        />
      </b-form-group>

      <b-form-group v-show="showFullCode && showFullCode.length > 0" class="custom mt-2 mb-2">
        <b-form-textarea id="name-1" class="custom m-0"
                      v-model="restPage.description"/>
      </b-form-group>

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

  // Advanced Use - Hook into Quill's API for Custom Functionality
  import { VueEditor, Quill } from 'vue2-editor'
  import 'vue2-editor/dist/vue2-editor.css'

  export default {
    name: 'CmsRestPageData',
    components: {ImageInputAdvanced, VueEditor, Quill},
    mixins: [EventBusEmit, FormMixin],
    data () {
      return {
        showFullCode: false,
        customToolbar: [[{
                          header: [false, 1, 2, 3, 4, 5, 6]
                        }], ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                        [{
                          align: ''
                        }, {
                          align: 'center'
                        }, {
                          align: 'right'
                        }, {
                          align: 'justify'
                        }], ['blockquote', 'code-block'], [{
                          list: 'ordered'
                        }, {
                          list: 'bullet'
                        }, {
                          list: 'check'
                        }], [{
                          indent: '-1'
                        }, {
                          indent: '+1'
                        }], // outdent/indent
                        [{
                          color: []
                        }, {
                          background: []
                        }], // dropdown with defaults from theme
                        ['link'] // remove formatting button
                        // ['link', 'image', 'video'], ['clean'] // remove formatting button
        ],
        restPage: {
          id: this.id,
          active: false,
          adminTitle: '',
          description: ''
        }
      }
    },
    methods: {
      prepareCms (restPage) {
        this.restPage = restPage
      },
      submit () {
        let restPage = {...this.restPage}
        const method = 'putRestPage'
        this.$store.dispatch(method, restPage)
          .then(() => {
            this.postSubmitRedirect('www')
          })
          .catch((error) => {
            this.postSubmitRedirect(error)
          })
      }
    },
    computed: {},
    created () {
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
        this.$store.dispatch('getRestPage', {id: this.id})
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
