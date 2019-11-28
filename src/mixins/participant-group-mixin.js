export default {
  name: 'ParticipantGroupMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    participantGroupDiscipline () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.disciplines,
        preparedDisciplines = []
      for (let disciplineIndex in data) {
        preparedDisciplines.push({id: data[disciplineIndex].id, label: data[disciplineIndex].title})
      }

      return preparedDisciplines
    },
    participantGroupLessonCategory () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.lessonCategories,
        preparedLessonCategories = []

      for (let lessonCategoryIndex in data) {
        preparedLessonCategories.push({id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title})
      }

      return preparedLessonCategories
    },
    participantGroupClass () {
      // eslint-disable-next-line one-var
      let data = this.$store.getters.classes,
        preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({id: data[classIndex].id, label: data[classIndex].title})
      }

      return preparedClasses
    },
    //  todo
    participantGroupFiltered () {
      if (!this.filters) this.filters = {}

      // eslint-disable-next-line one-var
      let participantGroups = [],
        filteredParticipantGroups = [],
        search = this.filters.search || '',
        selectedType = this.filters.selectedType || []
        // disciplines = this.filters.disciplines || [],
        // categories = this.filters.categories || [],
        // classes = this.filters.classes || []

      for (let participantGroupIndex in participantGroups) {
        if (search.length > 0 && participantGroups[participantGroupIndex].name.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
        if (selectedType.length > 0 && !selectedType.includes(participantGroups[participantGroupIndex].type)) continue
        // if (disciplines.length > 0 && !disciplines.includes())
        filteredParticipantGroups.push(participantGroups[participantGroupIndex])
      }

      return filteredParticipantGroups
    }
  }
}
