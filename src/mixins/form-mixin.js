import EventBus from '@/event-bus'

export default {
  name: 'FormMixin',
  data () {
    return {
      id: this.$route.params.id,
      loading: false,
      mixinImage: null,
      allowedImageTypes: [
        'image/jpeg', 'image/jpg', 'image/png'
      ]
    }
  },
  methods: {
    preSubmit () {
      this.loading = true
      console.log(this.$validator)
      return this.$validator.validateScopes()
    },
    checkValidForm () {
      return this.$validator.validateScopes()
    },
    // afterCropImage (base64) {
    //   console.log(base64)
    //   this.mixinImage = base64
    // },
    postSubmitRedirect (routeName, toastText = 'Dane zostały zapisane', toastVariant = 'success') {
      this.loading = false
      this.$router.push({
        name: routeName,
        params: {
          initToastText: toastText,
          initToastVariant: toastVariant
        }
      })
    },
    postSubmitError (error) {
      this.loading = false

      // todo change
      if (!error.hasOwnProperty('data') || !error.data.hasOwnProperty('validationErrors')) {
        this.showToast('Wystąpil błąd', 'Uwaga', 'danger')
      } else {
        let key = Object.keys(error.data.validationErrors)[0]
        this.showToast(error.data.validationErrors[key], 'Uwaga', 'danger')
      }
    },
    deleteFromForm (method, id, toDeleteWord = 'daną pozycję', routeToPush = false, routeParams = null, urlParams = {}) {
      EventBus.$emit(`SHOW_CONFIRM_DELETE_MODAL`, method, id, toDeleteWord, routeToPush, routeParams, urlParams)
    }
  }
}
