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
    school (state) {
      return state.school
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
      state.school = data
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
            resolve()
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
