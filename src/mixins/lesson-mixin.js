export default {
  name: 'LessonMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    lessonDiscipline () {
      let data = this.$store.getters.disciplines
      let preparedDisciplines = []
      for (let disciplineIndex in data) {
        preparedDisciplines.push({ id: data[disciplineIndex].id, label: data[disciplineIndex].title })
      }

      return preparedDisciplines
    },
    lessonOfLessonCategory () {
      let data = this.$store.getters.lessonCategories
      let preparedLessonCategories = []

      for (let lessonCategoryIndex in data) {
        preparedLessonCategories.push({ id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title })
      }

      return preparedLessonCategories
    },
    lessonClass () {
      let data = this.$store.getters.classes
      let preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({ id: data[classIndex].id, label: data[classIndex].title })
      }

      return preparedClasses
    }
    //  todo filters
  }
}
