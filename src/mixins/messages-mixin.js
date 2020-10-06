export default {
  name: 'MessagesMixin',
  data() {
    return {}
  },
  methods: {},
  computed: {
    schoolsTreeselect() {
      let data = this.$store.getters.schoolsConfirmed
      let preparedSchools = []

      for (let schoolIndex in data) {
        if (this.selectedType.length > 0) {
          if (this.selectedType.includes(data[schoolIndex].type)) {
            preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].email})
          }
        } else {
          preparedSchools.push({id: data[schoolIndex].id, label: data[schoolIndex].email})
        }
      }

      return preparedSchools
    },
    leadersTreeselect() {
      let data = this.$store.getters.leaders
      let preparedLeaders = []

      for (let leaderIndex in data) {
        if (data[leaderIndex].active) {
          preparedLeaders.push({id: data[leaderIndex].id, label: data[leaderIndex].email})
        }
      }

      return preparedLeaders
    }
  }
}
