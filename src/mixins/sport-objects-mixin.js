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
    },
    getSchoolNameById (id) {
      if (undefined === this.schoolsAndClubs || this.schoolsAndClubs === null || this.schoolsAndClubs.length < 1) return ''
      let school = this.schoolsAndClubs.find((obj) => {
        return obj.id === id
      })
      return undefined === school ? '' : school.name
    }
  },
  computed: {
    schoolsAndClubs () {
      return this.$store.getters.schools
    },
    sportObjectsListFiltered () {
      let sportObjects = this.sportObjects /* Confirmed || this.sportObjectsToConfirm */ || []
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
