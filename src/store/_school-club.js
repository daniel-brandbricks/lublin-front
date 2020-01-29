import * as apiService from '@/services/apiService'

export default {
  state: {
    schools: {
      confirmed: [],
      toConfirm: []
    },
    school: null
  },
  getters: {
    schoolsConfirmed (state) {
      return state.schools.confirmed
    },
    schoolsToConfirm (state) {
      return state.schools.toConfirm
    },
    schools (state) {
      return state.schools.confirmed.concat(state.schools.toConfirm)
    },
    school: (state) => (isConfirmed, id) => {
      let schools = []

      // merge two arrays
      if (undefined === isConfirmed) {
        schools = state.schools.confirmed.concat(state.schools.toConfirm)
      } else {
        schools = isConfirmed ? state.schools.confirmed : state.schools.toConfirm
      }
      for (let i = 0; i < schools.length; i++) {
        const school = schools[i]
        if (undefined === school || school === null || school.length < 1) {
          continue
        }
        if (parseInt(school.id) === parseInt(id)) {
          return school
        }
      }
    }
  },
  mutations: {
    setConfirmedSchools (state, data) {
      state.schools.confirmed = data
    },
    setSchoolsToConfirm (state, data) {
      state.schools.toConfirm = data
    },
    setSchools (state, data) {
      let schoolsConfirmed = []
      let schoolsToConfirm = []

      for (let schoolIndex in data) {
        if (data[schoolIndex].confirmed) {
          schoolsConfirmed.push(data[schoolIndex])
        } else {
          schoolsToConfirm.push(data[schoolIndex])
        }
      }

      state.schools.confirmed = schoolsConfirmed
      state.schools.toConfirm = schoolsToConfirm
    },
    setSchool (state, data) {
      const id = data.id
      const confirmed = data.confirmed
      let schools = []

      if (undefined === id || id === null) {
        return
      }

      schools = confirmed ? state.schools.confirmed : state.schools.toConfirm

      for (let i = 0; i < schools.length; i++) {
        const storeSchool = schools[i]
        if (parseInt(storeSchool.id) !== parseInt(id)) {
          continue
        }
        schools.splice(i, 1, data)
        confirmed ? state.schools.confirmed = schools : state.schools.toConfirm = schools

        console.log(state.schools)
        return
      }

      confirmed ? state.schools.confirmed.push(data) : state.schools.toConfirm.push(data)
      console.log(state.schools)
    },
    deleteSchool (state, data) {
      // todo
    }
  },
  actions: {
    getSchool (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/school/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSchool', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSchools (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/school', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            if (data && data.confirmed) {
              data.confirmed === 1 ? context.commit('setConfirmedSchools', response) : context.commit('setSchoolsToConfirm', response)
            } else {
              context.commit('setSchools', response)
            }
            resolve()
          })
          .catch(error => {
            console.log(error)
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSchool (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/school', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSchool', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSchool (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/school/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSchool', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSchool (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/school/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSchool', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  }
}
