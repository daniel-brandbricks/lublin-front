import EventBus from '@/event-bus'
import ToastMixin from '@/mixins/toast-mixin'

export default {
  name: 'FormMixin',
  mixins: [ToastMixin],
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
      if (!error.hasOwnProperty('data') || !error.data.hasOwnProperty('error')) {
        this.showToast('Wystąpil błąd', 'Uwaga', 'danger')
      } else {
        this.showToast(error.data.error, 'Uwaga', 'danger')
      }
    },
    deleteFromForm (method, id, toDeleteWord = 'daną pozycję', routeToPush = false, routeParams = null, urlParams = {}) {
      EventBus.$emit(`SHOW_CONFIRM_DELETE_MODAL`, method, id, toDeleteWord, routeToPush, routeParams, urlParams)
    }
  }
}
