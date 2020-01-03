export default {
  name: 'SportObjectsMixin',
  data () {
    return {}
  },
  methods: {
    getSportObjectTypeNameById (type) {
      if (undefined === type || type === null || type.id === undefined) return 'Typ nie wybrany'
      if (undefined === this.sportObjectTypes || this.sportObjectTypes === null) return ''
      let sportObjType = this.sportObjectTypes.find((obj) => {
        return obj.id === type.id
      })
      if (sportObjType) return sportObjType.title
      return ''
    }
  },
  computed: {
    sportObjectsListFiltered () {
      let sportObjects = this.sportObjectsConfirmed || this.sportObjectsToConfirm || []
      let filteredSportObjects = []
      let search = this.filters.search || ''
      let districtValue = this.filters.districtValue || []
      for (let sportObjectIndex in sportObjects) {
        if (search.length > 0 && sportObjects[sportObjectIndex].title.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
        if (districtValue.length > 0 && !districtValue.includes(parseInt(sportObjects[sportObjectIndex].district))) continue
        filteredSportObjects.push(sportObjects[sportObjectIndex])
      }

      return filteredSportObjects
    }
  }
}
