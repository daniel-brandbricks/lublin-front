export default {
  data () {
    return {
    }
  },
  methods: {
    showToast (message, title, variant = 'danger') {
      this.toast('b-toaster-bottom-right', false, message, title, variant)
    },
    toast (toaster, appendToast, message, title, variant) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: toaster,
        solid: true,
        variant: variant,
        appendToast: appendToast
        // autoHideDelay: 50000,
      })
    }
  }
}
