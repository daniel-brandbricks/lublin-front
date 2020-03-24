<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="3" class="">
      <h2>Logo</h2>
      <ImageInputAdvanced :imgPath="menu.logo" @afterCropImage="afterCropImage"
                          :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                          :min-width="100" :max-height="1000" :max-width="1000"/>
    </b-col>
    <b-col cols="12" lg="5">
      <h2>Footer</h2>

      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Adres"
                      :class="{'error-input-custom': veeErrors.has('footer.address')}"
                      name="footer.address" key="footer.address" v-validate="{'required':true}"
                      v-model="footer.address"/>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-2" class="custom"
                      placeholder="E-mail"
                      :class="{'error-input-custom': veeErrors.has('footer.email')}"
                      name="footer.email" key="footer.email" v-validate="{'required':true}"
                      v-model="footer.email"/>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-3" class="custom"
                      placeholder="Telefon"
                      :class="{'error-input-custom': veeErrors.has('footer.phone')}"
                      name="footer.phone" key="footer.phone" v-validate="{'required':true}"
                      v-model="footer.phone"/>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-4" class="custom"
                      placeholder="Facebook"
                      :class="{'error-input-custom': veeErrors.has('footer.facebook')}"
                      name="footer.facebook" key="footer.facebook" v-validate="{'required':true}"
                      v-model="footer.facebook"/>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-5" class="custom"
                      placeholder="Youtube"
                      :class="{'error-input-custom': veeErrors.has('footer.youtube')}"
                      name="footer.youtube" key="footer.youtube" v-validate="{'required':true}"
                      v-model="footer.youtube"/>
      </b-form-group>

    </b-col>
  </b-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'

  export default {
    name: 'Footer',
    components: { ImageInputAdvanced },
    data () {
      return {
        footer: {
          address: '',
          email: '',
          phone: '',
          facebook: '',
          youtube: ''
        },
        menu: {
          logo: null
        }
      }
    },
    computed: {
      ...mapGetters(['footers'])
    },
    methods: {
      ...mapActions(['getFooters']),
      afterCropImage (base64) {
        this.menu.logo = base64
      }
    },
    created () {
      this.footer = Object.assign(this.footer, this.$store.getters.footer(1))
      if (this.$route.params.tab === 'footer') {
        this.$store.dispatch('getFooter', {id: 1})
      }
    }
  }
</script>

<style scoped>

</style>
