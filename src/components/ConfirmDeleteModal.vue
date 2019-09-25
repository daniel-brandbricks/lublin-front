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

      <template slot="modal-title" >
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

export default {
  name: 'ConfirmDeleteModal',
  mixins: [],
  data () {
    return {
      toDeleteWord: '',
      returnParam: '',
      elementToDelete: null
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
      EventBus.$emit(this.returnParam, this.element)
      this.hideModal()
    }
  },
  created () {
    EventBus.$on('SHOW_CONFIRM_DELETE_MODAL', (returnParam = '', element = null, toDeleteWord = 'daną pozycję') => {
      this.reset()

      this.toDeleteWord = toDeleteWord
      this.returnParam = returnParam
      this.element = element

      this.showModal()
    })
  }
}
</script>
