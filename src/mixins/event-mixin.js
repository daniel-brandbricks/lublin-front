export default {
  name: 'EventsMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
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
        if (this.event.id !== null && this.event.id !== undefined) {
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
    }
  }
}
