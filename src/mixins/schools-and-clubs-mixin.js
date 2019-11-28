export default {
  name: 'SchoolsAndClubsMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    schoolListFiltered () {
      if (!this.filters) this.filters = {}

      let schools = this.schoolsConfirmed || this.schoolsToConfirm || []
      let filteredSchools = []
      let search = this.filters.search || ''
      let selectedType = this.filters.selectedType || []
      let districtValue = this.filters.districtValue || []

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
