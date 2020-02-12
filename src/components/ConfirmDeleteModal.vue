<template>
  <b-form>
    <b-modal ref="confirmDeleteModal"
             modal-class="custom"
             centered size="sm"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0"
             no-close-on-backdrop>

      <template slot="modal-title">
        Czy napewno chcesz usunąć {{toDeleteWord}}?
      </template>

      <div slot="default" class="d-flex justify-content-between">
        <b-btn class="custom" variant="secondary"
               @click.prevent="hideModal">
          anuluj
        </b-btn>
        <b-btn class="custom px-4" variant="danger"
               @click.prevent="submitForm">
          usuń
        </b-btn>
      </div>
    </b-modal>
  </b-form>

</template>

<script>
  import EventBus from '@/event-bus'
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'ConfirmDeleteModal',
    mixins: [ ToastMixin ],
    data () {
      return {
        toDeleteWord: '',
        method: null,
        id: null,
        routeToPush: false,
        routeParams: {},
        urlParams: {}
      }
    },
    methods: {
      showModal () {
        if (this.checkModal() === false) {
          return
        }
        this.$refs.confirmDeleteModal.show()
      },
      hideModal () {
        if (this.checkModal() === false) {
          return
        }
        this.$refs.confirmDeleteModal.hide()
      },
      checkModal () {
        if (this.$refs == null || this.$refs.length < 1) {
          return false
        }
        if (undefined === this.$refs.confirmDeleteModal || this.$refs.confirmDeleteModal === null) {
          return false
        }
        return true
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      },
      submitForm () {
        this.$store.dispatch(this.method, { id: this.id, ...this.urlParams })
          .then((response) => {
            this.hideModal()
            console.log(response)
            if (this.routeToPush) {
              console.log(this.routeParams)
              this.routeParams['toastText'] = 'Dane zostały usunięte'
              this.routeParams['toastVariant'] = 'success'
              console.log(this.routeParams)
              this.$router.push({
                name: this.routeToPush,
                params: this.routeParams
              })
            } else {
              this.showToast('Dane zostały usunięte', 'Uwaga!', 'success')
            }
          })
          .catch((error) => {
            this.hideModal()
            console.log(error)
            console.log(this.routeParams)
            if (this.routeToPush) {
              this.routeParams['toastText'] = 'Dane zostały usunięte'
              this.routeParams['toastVariant'] = 'success'
              console.log(this.routeParams)
              this.$router.push({
                name: this.routeToPush,
                params: this.routeParams
              })
            } else {
              this.showToast('Wystąpil błąd', 'Uwaga!', 'danger')
            }
          })
      }
    },
    created () {
      EventBus.$on('SHOW_CONFIRM_DELETE_MODAL', (method = '', id = null, toDeleteWord, routeToPush, routeParams, urlParams) => {
        this.reset()

        this.urlParams = urlParams
        this.routeToPush = routeToPush
        this.routeParams = routeParams
        this.toDeleteWord = toDeleteWord
        this.method = method
        this.id = id

        this.showModal()
      })
    }
  }
</script>
