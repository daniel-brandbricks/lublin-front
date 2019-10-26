import ToastMixin from '@/mixins/toast-mixin'

export default {
  name: 'ListMixin',
  mixins: [ToastMixin],
  data () {
    return {
      toastText: this.$route.params.toastText || null,
      toastVariant: this.$route.params.toastVariant || null,
    }
  },
  methods: {},
  created () {
    if (this.toastText && this.toastVariant) {
      this.showToast(this.toastText, 'Uwaga!', this.toastVariant);
    }
  }
}
