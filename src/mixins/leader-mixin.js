export default {
  name: 'LeaderMixin',
  data () {
    return {}
  },
  methods: {
    prepareLeaderPermissions (permissions) {
    },

    // getSportObjectTypeNameById (id) {
    //   if (undefined === this.sportObjectTypes || this.sportObjectTypes === null) return ''
    //   return this.sportObjectTypes.find((obj) => {
    //     return obj.id === id
    //   }).title
    // }
    checkDisciplineExists (leader, selectedDisciplines) {
      let result = leader.disciplines.find(x => {
        return selectedDisciplines.includes(parseInt(x.id))
      })
      return undefined !== result
    },
    checkSportObjectExists (leader, selectedSportObjects) {
      let result = leader.places.find(x => {
        return selectedSportObjects.includes(parseInt(x.id))
      })
      return undefined !== result
    },
    getDisciplineTitleById (id, index = null, arrayLength = null) {
      if (undefined === this.disciplines || this.disciplines === null) return ''
      // todo error title of undefined
      let discipline = this.disciplines.find((obj) => {
        return obj.id === id
      })

      return undefined === discipline ? '' : discipline.title + ((index + 1) < arrayLength ? ',' : '')
    },
    getPlaceTitleById (id, index = null, arrayLength = null) {
      if (undefined === this.sportObjects || this.sportObjects === null) return ''
      // todo error title of undefined
      let sportObject = this.sportObjects.find((obj) => {
        return obj.id === id
      })

      return undefined === sportObject ? '' : sportObject.title + ((index + 1) < arrayLength ? ',' : '')
    }
  },
  computed: {
    leadersFiltered () {
      let leaders = this.leaders || []
      let filteredLeaders = []
      let search = this.filters.search || ''
      let selectedDisciplines = this.filters.selectedDisciplines || []
      let selectedSportObjects = this.filters.selectedSportObjects || []

      for (let leaderIndex in leaders) {
        // console.log(leaders[leaderIndex])
        if (undefined === leaders[leaderIndex] || leaders[leaderIndex] === null) {
          continue
        }

        let firstName = leaders[leaderIndex].firstName || ''
        let lastName = leaders[leaderIndex].lastName || ''

        let fullName = firstName.toLowerCase() + lastName.toLowerCase()
        if (search.length > 0 && fullName.indexOf(search.toLowerCase()) === -1) continue
        if (selectedDisciplines.length > 0 && !this.checkDisciplineExists(leaders[leaderIndex], selectedDisciplines)) continue
        if (selectedSportObjects.length > 0 && !this.checkSportObjectExists(leaders[leaderIndex], selectedSportObjects)) continue

        // todo after back complete
        // if (selectedSportObjects.length > 0 && !this.checkSportObjectExists(leaders[leaderIndex], selectedSportObjects)) continue
        // if (selectedDiscipline.length > 0 && !selectedDiscipline.includes(parseInt(leaders[leaderIndex].district))) continue
        filteredLeaders.push(leaders[leaderIndex])
      }

      return filteredLeaders
    }
  }
}
