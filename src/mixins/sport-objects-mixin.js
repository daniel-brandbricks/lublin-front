export default {
  name: 'SportObjectsMixin',
  data () {
    return {}
  },
  methods: {
    getSportObjectTypeNameById (id) {
      if (undefined === this.sportObjectTypes || this.sportObjectTypes === null) return ''
      return this.sportObjectTypes.find((obj) => {
        return obj.id === id
      }).title
    }
  },
  computed: {
    sportObjectsListFiltered () {
      let sportObjects = this.sportObjectsConfirmed || this.sportObjectsToConfirm || []
      let filteredSportObjects = []
      let search = this.filters.search || ''
      let districtValue = this.filters.districtValue || []
      console.log(sportObjects)
      for (let sportObjectIndex in sportObjects) {
        console.log(sportObjects[sportObjectIndex])
        if (search.length > 0 && sportObjects[sportObjectIndex].title.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
        if (districtValue.length > 0 && !districtValue.includes(parseInt(sportObjects[sportObjectIndex].district))) continue
        filteredSportObjects.push(sportObjects[sportObjectIndex])
      }

      return filteredSportObjects
    }
  }
}
