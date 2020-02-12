import * as apiService from '@/services/apiService'
// import { BASE_API_URL } from '@/config/AppConfig'

// import router from '@/router'

// let generateToken = function () {
//   let authToken = localStorage.getItem('authToken')
//   if (authToken !== null && authToken !== '') {
//     return authToken
//   }
//   return null
// }
//
// let prefix = BASE_API_URL

export default {
  state: {
    users: [],
    user: null
  },
  getters: {
    users (state) {
      return state.users
    },
    getUserById: (state) => (id) => {
      for (let user in state.users) {
        if (parseInt(user.id) === parseInt(id)) {
          return user
        }
      }
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUsers (state, data) {
      state.users = data
    },
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    getUser (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/user/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setUser', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getUsers (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/user', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setUsers', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getAllUsers (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/user/1', 'get', true, null, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },

    // Mailings
    sendMailConfirmed (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mail', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    getMailConfirmed (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mail', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },

    getPasswordReset (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mail', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    sendResetPassword (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mail', 'post', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    passwordReset (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mail', 'post', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    }
  }
}
