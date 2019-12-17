export default {
  name: 'LessonMixin',
  data () {
    return {}
  },
  methods: {
    checkDisciplineExists (lesson, selectedDisciplines) {
      let result = lesson.discipline.find(x => {
        return selectedDisciplines.includes(parseInt(x.id))
      })
      return undefined !== result
    },
    checkLessonCategoryExists (lesson, selectedLessonCategory) {
      let result = lesson.lessonCategory.find(x => {
        return selectedLessonCategory.includes(parseInt(x.id))
      })
      return undefined !== result
    },
    checkClassExists (lesson, selectedClasses) {
      let result = lesson.class.find(x => {
        return selectedClasses.includes(parseInt(x.id))
      })
      return undefined !== result
    }
  },
  computed: {
    // lessonDiscipline () {
    //   let data = this.$store.getters.disciplines
    //   let preparedDisciplines = []
    //   for (let disciplineIndex in data) {
    //     preparedDisciplines.push({ id: data[disciplineIndex].id, label: data[disciplineIndex].title })
    //   }
    //
    //   return preparedDisciplines
    // },
    // lessonOfLessonCategory () {
    //   let data = this.$store.getters.lessonCategories
    //   let preparedLessonCategories = []
    //
    //   for (let lessonCategoryIndex in data) {
    //     preparedLessonCategories.push({ id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title })
    //   }
    //
    //   return preparedLessonCategories
    // },
    // lessonClass () {
    //   let data = this.$store.getters.classes
    //   let preparedClasses = []
    //
    //   for (let classIndex in data) {
    //     preparedClasses.push({ id: data[classIndex].id, label: data[classIndex].title })
    //   }
    //
    //   return preparedClasses
    // },
    // lessonSchoolOrClub () {
    //   let data = this.$store.getters.schools
    //   let preparedSchoolsOrClubs = []
    //
    //   for (let schoolOrClubIndex in data) {
    //     preparedSchoolsOrClubs.push({ id: data[schoolOrClubIndex].id, label: data[schoolOrClubIndex].title })
    //   }
    //
    //   return preparedSchoolsOrClubs
    // },
    // lessonLeader () {
    //   let data = this.$store.getters.leaders
    //   let preparedLeaders = []
    //
    //   for (let leaderIndex in data) {
    //     preparedLeaders.push({ id: data[leaderIndex].id, label: data[leaderIndex].firstName + ' ' + data[leaderIndex].lastName })
    //   }
    //
    //   return preparedLeaders
    // }

    // todo firstName+lastName

    // todo like in leader-mixin
    //  todo filters
  }
}
