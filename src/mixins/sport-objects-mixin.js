export default {
  name: 'SportObjectsMixin',
  data () {
    return {}
  },
  methods: {
  },
  computed: {
    sportObjectsListFiltered () {
      // eslint-disable-next-line one-var
      let sportObjects = this.sportObjectsConfirmed || this.sportObjectsToConfirm || [],
        //   search = this.filters.search || '',
        //   selectedType = this.filters.selectedType || [],
        //   districtValue = this.filters.districtValue || [],
        filteredSportObjects = []

      for (let sportObjectIndex in sportObjects) {
      //   if (search.length > 0 && schools[schoolIndex].name.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
      //   if (selectedType.length > 0 && !selectedType.includes(schools[schoolIndex].type)) continue
      //   if (districtValue.length > 0 && !districtValue.includes(parseInt(schools[schoolIndex].district))) continue
        filteredSportObjects.push(sportObjects[sportObjectIndex])
      }

      return filteredSportObjects
    }
  }
}
