export default {
  name: 'LessonMixin',
  data () {
    return {}
  },
  methods: {},
  computed: {
    schoolsAndClubsPrepared () {
      let data = this.$store.getters.schools
      let preparedSchools = []

      for (let schoolIndex in data) {
        if (this.lesson.id !== null && this.lesson.id !== undefined) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
        } else if (parseInt(data[schoolIndex].type) === parseInt(this.orgType)) {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
        }
      }

      return preparedSchools
    },

    //    todo Leaders treeselect
    lessonLeader () {
      let data = this.$store.getters.leadersConfirmed
      let preparedLeaders = []

      for (let leaderIndex in data) {
        let fullName = data[leaderIndex].firstName + ' ' + data[leaderIndex].lastName
        preparedLeaders.push({id: data[leaderIndex].id, label: fullName})
      }

      return preparedLeaders
    },
    lessonDiscipline () {
      let data = this.$store.getters.disciplines || []
      let preparedDisciplines = []
      for (let disciplineIndex in data) {
        preparedDisciplines.push({id: data[disciplineIndex].id, label: data[disciplineIndex].title})
      }

      return preparedDisciplines
    },
    lessonCategory () {
      let data = this.$store.getters.lessonCategories || []
      let preparedLessonCategories = []

      for (let lessonCategoryIndex in data) {
        preparedLessonCategories.push({id: data[lessonCategoryIndex].id, label: data[lessonCategoryIndex].title})
      }

      return preparedLessonCategories
    },
    lessonClass () {
      let data = this.$store.getters.classes || []
      let preparedClasses = []

      for (let classIndex in data) {
        preparedClasses.push({id: data[classIndex].id, label: data[classIndex].title})
      }

      return preparedClasses
    },
    lessonSchools () {
      let data = this.$store.getters.schools
      let preparedSchools = []

      for (let schoolIndex in data) {
        preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].name})
      }

      return preparedSchools
    },
    lessonSportObjects () {
      let data = this.$store.getters.sportObjects
      let preparedPlaces = []

      for (let placeIndex in data) {
        preparedPlaces.push({id: data[placeIndex].id, label: data[placeIndex].title})
      }

      return preparedPlaces
    },
    lessonsList () {
      let lessons = this.$store.getters.lessons
      let schools = this.$store.getters.schools

      let filteredLessons = []
      let search = this.search || ''
      let selectedType = this.selectedType || []
      let disciplines = this.selectedDisciplines || []
      let lessonCategories = this.selectedLessonCategories || []
      let classes = this.selectedClasses || []

      for (let index in lessons) {
        if (search.length > 0 && lessons[index].title && lessons[index].title.toLowerCase().indexOf(search.toLowerCase()) === -1) continue
        // if (selectedType.length > 0 && !selectedType.includes(lessons[index].school)) continue

        if (selectedType.length > 0) {
          let school = schools.find(x => { return x.id === lessons[index].school.id})
          if (!selectedType.includes(school.type)) continue
        }

        if (disciplines.length > 0 && !disciplines.includes(parseInt(lessons[index].discipline.id))) continue
        if (lessonCategories.length > 0 && !lessonCategories.includes(parseInt(lessons[index].lessonCategory.id))) continue
        if (classes.length > 0 && !classes.includes(parseInt(lessons[index].class.id))) continue

        // for school & leader && participant group && participant component
        if (this.participant && this.participant.id) {
          let participantGroupExists = this.participant.participantGroups.find(x => {
            return x.participantGroup.id === lessons[index].participantGroup.id
          })
          if (undefined === participantGroupExists) continue
        }
        if (this.participantGroup && this.participantGroup.id) {
          if (this.participantGroup.id !== lessons[index].participantGroup.id) continue
        }
        if (this.school && this.school.id) {
          if (this.school.id !== lessons[index].school.id) continue
        }
        if (this.leader && this.leader.id) {
          if (this.leader.id !== lessons[index].leader.id) continue
        }
        if ((this.schoolIds && this.schoolIds.length > 0)) {
          if (!this.schoolIds.includes(lessons[index].school.id)) continue
        }

        if ((this.sportObject && this.sportObject.id) && this.sportObject.id !== lessons[index].place.id) continue

        filteredLessons.push(lessons[index])
      }

      return filteredLessons
    }
    // todo firstName+lastName

    // todo like in leader-mixin
  }
}
