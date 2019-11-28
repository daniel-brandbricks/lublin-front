export default {
  name: 'ParticipantMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    participantClass () {
      let data = this.$store.getters.classes
      let preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({ id: data[classIndex].id, label: data[classIndex].title })
      }

      return preparedClasses
    },
    participantYears () {
      let data = this.$store.getters.participants
      let preparedParticipants = []

      for (let participantIndex in data) {
        preparedParticipants.push({ id: data[participantIndex].id, label: data[participantIndex].year })
      }

      return preparedParticipants
    },
    participantDiscipline () {
      let data = this.$store.getters.disciplines
      let preparedDisciplines = []

      for (let disciplineIndex in data) {
        preparedDisciplines.push({ id: data[disciplineIndex].id, label: data[disciplineIndex].title })
      }

      return preparedDisciplines
    }
  }
}
