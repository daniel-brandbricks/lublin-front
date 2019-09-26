import * as apiService from '@/services/apiService'

export default {
  state: {
    schools: [],
    school: null
  },
  getters: {
    schools (state) {
      return state.schools
    },
    school (state) {
      return state.schools
    }
  },
  mutations: {
    setSchools (state, data) {
      state.schools = data.schools
    },
    setSchool (state, data) {
      state.school = data
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
        apiService.makeApiCall('resource/school', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSchools', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSchool (context, data) {
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
    }
  }
}
