export default {
  name: 'TableMixin',
  // props: [ 'fieldsParams' ],
  mixins: [],
  data () {
    return {}
  },
  methods: {
    // used to replace definite field in this table from parent-relative component (entity)
    replaceTableField (newField) {
      for (let index in this.fields) {
        if (this.fields[index].key === newField.key) {
          this.fields[index].label = newField.label
        }
      }
      if (newField.toInsert === true) {
        delete newField.toInsert
        this.fields.push(newField)
      }
    }
  },
  created () {
    // check params from parent-relative component (entity)
    if (this.fieldsParams) {
      for (let key in this.fieldsParams) {
        let field = this.fieldsParams[key]
        console.log(field)
        this.replaceTableField(field)
      }
    }
  }
}
