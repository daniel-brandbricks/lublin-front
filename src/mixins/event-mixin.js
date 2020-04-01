export default {
  name: 'EventsMixin',
  data () {
    return {}
  },
  methods: {
    getDisciplineTitleById (id) {
      if (undefined === this.disciplines || this.disciplines === null || this.disciplines.length < 1) return ''
      return this.disciplines.find((obj) => {
        return obj.id === id
      }).title
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
    disciplines () {
      return this.$store.getters.disciplines
    },
    schoolsAndClubs () {
      return this.$store.getters.schools
    },
    eventListFiltered () {
      let events = this.eventsConfirmed || this.eventsToConfirm || []
      let filteredEvents = []

      for (let eventIndex in events) {
        filteredEvents.push(events[eventIndex])
      }

      return filteredEvents
    },
    schoolsAndClubsPrepared () {
      let data = this.$store.getters.schools
      let preparedSchools = []

      for (let schoolIndex in data) {
        if (undefined !== this.event && this.event.id !== null && this.event.id !== undefined) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
        } else if (parseInt(data[schoolIndex].type) === parseInt(this.orgType)) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
        }
      }
      // for (let schoolIndex in data) {
      //   if (parseInt(data[schoolIndex].type) === parseInt(this.orgType)) {
      //     preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
      //   }
      // }

      return preparedSchools
    },
    schoolsAndClubsTreeselect () {
      let data = this.$store.getters.schools
      let preparedSchools = []

      for (let schoolIndex in data) {
        preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
      }
      return preparedSchools
    },
    disciplinesPrepared () {
      let data = this.$store.getters.disciplines
      let preparedDisciplines = []

      for (let disciplineIndex in data) {
        preparedDisciplines.push({id: data[disciplineIndex].id, label: data[disciplineIndex].title})
      }

      return preparedDisciplines
    }
  }
}
