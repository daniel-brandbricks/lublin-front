<template>
  <b-form>
    <b-modal ref="confirmDeleteModal"
             modal-class="custom"
             centered :size="remove ? 'md' : 'sm'"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0"
             no-close-on-backdrop>

      <template slot="modal-title">
        Czy napewno chcesz usunąć {{toDeleteWord}}?
      </template>

      <div slot="default" class="my-3 d-flex justify-content-between">
        <b-btn class="custom mx-2" variant="secondary"
               @click.prevent="hideModal">
          anuluj
        </b-btn>
        <b-btn v-if="remove" style="color: white" class="custom px-4 mx-2" variant="danger"
               @click.prevent="submitForm(true)">
          dezaktywuj
        </b-btn>
        <b-btn class="custom px-4" style="color: white" :class="remove ? 'mx-2' : ''" variant="danger"
               @click.prevent="submitForm(false)">
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
        urlParams: {},
        remove: false
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
      submitForm (deActive = false) {
        this.$store.dispatch(this.method, { id: this.id, ...this.urlParams, deActive })
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
            console.log(this.routeToPush)
            // console.log(this.routeParams)
            if (this.routeToPush) {
              // this.routeParams['toastText'] = 'Dane zostały usunięte'
              // this.routeParams['toastVariant'] = 'success'
              // console.log(this.routeParams)
              // this.$router.push({
                // name: this.routeToPush,
                // params: this.routeParams
              // })
            }
            this.showToast((error && error.data) ? error.data.error : 'Wystąpil błąd', 'Uwaga!', 'danger')
          })
      }
    },
    created () {
      EventBus.$on('SHOW_CONFIRM_DELETE_MODAL', (method = '', id = null, toDeleteWord, routeToPush, routeParams, urlParams, remove = false) => {
        this.reset()

        this.urlParams = urlParams
        this.routeToPush = routeToPush
        this.routeParams = routeParams
        this.toDeleteWord = toDeleteWord
        this.method = method
        this.id = id
        console.log(remove)
        this.remove = remove

        this.showModal()
      })
    }
  }
</script>
