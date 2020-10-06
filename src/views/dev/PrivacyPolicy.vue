<template>
  <div class="wrap">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="10" sm="12">
          <div class="quillWrapper w-100" v-if="restPage.description">
            <div id="quill-container" class="ql-container ql-snow">
              <div class="ql-editor" data-gramm="false" contenteditable="false">
                <div v-html="restPage.description"/>
              </div>
            </div>
          </div>
        </b-col>
        <vue-editor v-if="restPage.description" class="d-none"/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import 'vue2-editor/dist/vue2-editor.css'
  import {VueEditor, Quill} from 'vue2-editor'

  export default {
    name: 'PrivacyPolicy',
    components: {VueEditor, Quill},
    data() {
      return {
        restPage: {
          id: this.id,
          active: false,
          adminTitle: '',
          description: false
        }
      }
    },
    computed: {},
    methods: {
      prepareCms(restPage) {
        this.restPage = restPage
      }
    },
    created() {
      this.$store.dispatch('getMenuAndFooter')
      this.$store.dispatch('getRestPageFront', {id: 3})
        .then((response) => {
          this.prepareCms(response)
        })
    }
  }
</script>

<style scoped>
</style>
