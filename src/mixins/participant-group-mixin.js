export default {
  name: 'ParticipantGroupMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    schools () {
      let data = this.$store.getters.schoolsConfirmed
      let preparedSchools = []
      for (let schoolIndex in data) {
        preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
      }

      return preparedSchools
    },
    participantGroupDiscipline () {
      let data = this.$store.getters.disciplines
      let preparedDisciplines = []
      for (let disciplineIndex in data) {
        preparedDisciplines.push({ id: data[disciplineIndex].id, label: data[disciplineIndex].title })
      }

      return preparedDisciplines
    },
    participantGroupLessonCategory () {
      let data = this.$store.getters.lessonCategories
      let preparedLessonCategories = []

      for (let lessonCategoryIndex in data) {
        preparedLessonCategories.push({ id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title })
      }

      return preparedLessonCategories
    },
    participantGroupSeason () {
      let data = this.$store.getters.seasons
      let preparedSeasons = []

      for (let seasonIndex in data) {
        if (this.selectedSeason && data[seasonIndex].id === this.selectedSeason) {
          preparedSeasons.push({ id: data[seasonIndex].id, label: data[seasonIndex].title, isDisabled: true })
        } else {
          preparedSeasons.push({ id: data[seasonIndex].id, label: data[seasonIndex].title })
        }
      }

      return preparedSeasons
    },
    participantGroupClass () {
      let data = this.$store.getters.classes
      let preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({ id: data[classIndex].id, label: data[classIndex].title })
      }

      return preparedClasses
    },
    //  todo
    participantGroupFiltered () {
      if (!this.filters) this.filters = {}

      let participantGroups = []
      let filteredParticipantGroups = []
      let search = this.filters.search || ''
      let selectedType = this.filters.selectedType || []
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
