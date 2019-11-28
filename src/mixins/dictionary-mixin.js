import EventBus from '@/event-bus'

export default {
  name: 'DictionaryMixin',
  data () {
    return {
      dataAsArray: [],
      dataDefault: {
        title: ''
      },
      editedInput: {
        index: null
      }
    }
  },
  computed: {
    computedList () {
      return [...this.$store.getters[this.getter], ...this.dataAsArray]
    },
    checkDataToAddNew () {
      return this.computedList.length < 1 || undefined === this.computedList.find(item => {
        return item.id === undefined
      })
    }
  },
  methods: {
    submitObject (obj) {
      this.preSubmit()
        .then((result) => {
          if (!result) {
            this.loading = false
            return
          }
          this.loading = false
          if (obj.id) {
            this.$store.dispatch(this.dispatchPut, obj)
          } else {
            this.$store.dispatch(this.dispatchPost, obj)
              .then((result) => {
                this.dataAsArray.splice(this.dataAsArray
                  .findIndex(item => {
                    return item.id === undefined && item.title === result.title
                  }), 1)
              })
          }
          this.editedInput.index = null
        })
    },
    checkSelected (index) {
      return !!(this.editedInput && this.editedInput.index === index)
    },
    editInput (index) {
      this.editedInput.index = index
    },
    deleteData (data) {
      if (data.id) {
        this.deleteFromForm(this.dispatchDelete, data.id, data.title)
      } else {
        this.dataAsArray = []
      }
    },
    addDefaultData () {
      this.dataAsArray.push({...this.dataDefault})
    }
  }
}
