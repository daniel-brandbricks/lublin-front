export default {
  name: 'ParticipantMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    participantClass () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.classes,
        preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({id: data[classIndex].id, label: data[classIndex].title})
      }

      return preparedClasses
    },
    participantYears () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.participants,
        preparedParticipants = []

      for (let participantIndex in data) {
        preparedParticipants.push({id: data[participantIndex].id, label: data[participantIndex].year})
      }

      return preparedParticipants
    },
    participantDiscipline () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.disciplines,
        preparedDisciplines = []

      for (let disciplineIndex in data) {
        preparedDisciplines.push({id: data[disciplineIndex].id, label: data[disciplineIndex].title})
      }

      return preparedDisciplines
    }
  }
}
