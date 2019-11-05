export default {
  name: 'SchoolsAndClubsMixin',
  data () {
    return {}
  },
  methods: {
  },
  computed: {
    schoolListFiltered () {
      // eslint-disable-next-line one-var
      let schools = this.schoolsConfirmed || this.schoolsToConfirm || [],
        filteredSchools = []

      if (this.filters) {
        let search = this.filters.search || '',
          selectedType = this.filters.selectedType || [],
          districtValue = this.filters.districtValue || []
      }

      for (let schoolIndex in schools) {
        if (search.length > 0 && schools[schoolIndex].name.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
        if (selectedType.length > 0 && !selectedType.includes(schools[schoolIndex].type)) continue
        if (districtValue.length > 0 && !districtValue.includes(parseInt(schools[schoolIndex].district))) continue
        filteredSchools.push(schools[schoolIndex])
      }

      return filteredSchools
    }
  }
}
