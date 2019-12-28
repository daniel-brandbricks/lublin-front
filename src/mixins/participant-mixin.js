export default {
  name: 'ParticipantMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    participantList () {
      let participants = this.participants || []
      let filteredParticipants = []
      let search = this.search || ''
      let classes = this.selectedClasses || []
      let yearValue = this.yearValue || []
      let selectedGender = this.selectedGender || []

      for (let participantIndex in participants) {
        if (undefined === participants[participantIndex] || participants[participantIndex] === null) {
          continue
        }

        let firstName = participants[participantIndex].firstName || ''
        let lastName = participants[participantIndex].lastName || ''

        let fullName = firstName.toLowerCase() + lastName.toLowerCase()
        if (search.length > 0 && fullName.indexOf(search.toLowerCase()) === -1) continue
        // if (classes.length > 0 && !classes.includes(parseInt(participants[participantIndex].class.id))) continue
        if (yearValue.length > 0 && !yearValue.includes(parseInt(participants[participantIndex].year))) continue
        if (selectedGender.length > 0 && !selectedGender.includes(parseInt(participants[participantIndex].sex))) continue

        filteredParticipants.push(participants[participantIndex])
      }

      return filteredParticipants
    },
    classesTreeselect () {
      let data = this.$store.getters.classes
      let preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({ id: data[classIndex].id, label: data[classIndex].title })
      }

      return preparedClasses
    },
    disciplinesTreeselect () {
      let disciplines = this.disciplines
      let prepared = []

      for (let disciplineIndex in disciplines) {
        // need for making disciplines in select unique
        if (this.selectedDisciplinesIds.indexOf(disciplines[disciplineIndex].id) === -1) {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title})
        } else {
          prepared.push({id: disciplines[disciplineIndex].id, label: disciplines[disciplineIndex].title, isDisabled: true})
        }
      }

      return prepared
    },
    participantCategory () {
      let data = this.$store.getters.lessonCategories
      let preparedCategories = []

      for (let categoryIndex in data) {
        preparedCategories.push({ id: data[categoryIndex].id, label: data[categoryIndex].title })
      }

      return preparedCategories
    },
    participantClass () {
      let data = this.$store.getters.classes
      let preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({ id: data[classIndex].id, label: data[classIndex].title })
      }

      return preparedClasses
    }
  }
}
