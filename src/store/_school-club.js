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
    schools: (state) => (isConfirmed) => {
      console.log(isConfirmed)
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
        if (school.id == id) {
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
        if (storeSchool.id !== id) {
          continue
        }
        schools.splice(i, 1, data)
        confirmed ? state.schools.confirmed = schools : state.schools.toConfirm = schools

        return
      }

      confirmed ? state.schools.confirmed.push(data) : state.schools.toConfirm.push(data)
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

            data.confirmed === 1 ? context.commit('setConfirmedSchools', response) : context.commit('setSchoolsToConfirm', response)
            resolve()
          })
          .catch(error => {
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
