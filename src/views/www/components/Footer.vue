<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="3" class="">
      <h2>Logo</h2>
      <ImageInputAdvanced :imgPath="footer.image" @afterCropImage="afterCropImage" v-if="loaded"
                          :max-height="1000" :max-width="1000"/>
    </b-col>
    <b-col cols="12" lg="5" v-if="footer">
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

      <b-btn variant="primary" @click="putFooter" class="w-25 float-right">Zapisz</b-btn>
    </b-col>

    <p class="invisible">{{footerComputed}}</p>
  </b-row>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'

  export default {
    name: 'Footer',
    components: {ImageInputAdvanced},
    data() {
      return {
        footer: {
          address: '',
          email: '',
          phone: '',
          facebook: '',
          youtube: '',
          image: null
        },
        loaded: false,
      }
    },
    computed: {
      footerComputed () {
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
        this.footer.image = base64
      },
      putFooter () {
        this.$store.dispatch('putFooter', this.footer)
      }
    },
    created() {
      // this.footer = Object.assign(this.footer, this.$store.getters.footer(1))
      // if (this.$route.params.tab === 'footer') {
      this.$store.dispatch('getFooter', {id: 1})
        // .then(res => {
        //   console.log(res)
        //   this.footer = res
        // })
      // }
    }
  }
</script>

<style scoped>

</style>
