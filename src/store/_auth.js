import * as apiService from '@/services/apiService'
import { BASE_API_URL } from '@/config/AppConfig'

import router from '@/router'

let generateToken = function () {
  let authToken = localStorage.getItem('authToken')
  if (authToken !== null && authToken !== '') {
    return authToken
  }
  return null
}

let prefix = BASE_API_URL

export default {
  state: {
    authToken: generateToken(),
    authUser: null
  },
  getters: {
    authToken (state) {
      return state.authToken
    },
    isLoggedIn: function (state) {
      if (state.authToken && state.authToken.length > 0) {
        return true
      }
      return false
    },
    authUser (state) {
      return state.authUser
    }
  },
  mutations: {
    setAuthToken (state, data) {
      localStorage.setItem('authToken', data.authToken)// JSON.stringify(data))
      state.authToken = data.authToken
    },
    destroyAuthToken (state) {
      localStorage.setItem('authToken', '')
      state.authToken = null
    },
    setAuthUser (state, data) {
      state.authUser = data
    }
  },
  actions: {
    // we need it? todo check
    autoSignIn (context, data) {
      context.commit('setAuthToken', {
        authToken: data.authToken
      })
    },
    login (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('login/', 'post', false, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)

            context.commit('setAuthToken', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        let data = {
          token: context.getters.authToken
        }
        apiService.makeApiCall('logout/', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('destroyAuthToken')
            context.commit('setAuthUser', null)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getCurrentUser (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('me/', 'get', true, null, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAuthUser', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    updateUserData (context, data) {
      return new Promise((resolve, reject) => {
        /* let authUser = data
         context.commit('setAuthUser', authUser)
         resolve(authUser) */
        apiService.makeApiCall(prefix + 'user/data', 'put', true, data, null, 200, ['user', 'token'])
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }
            context.commit('setAuthUser', data)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error)
          })
      })
    },
    deleteAccount (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall(prefix + 'user', 'delete', true)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.dispatch('logout')
              .then(response => {
                console.log('_auth logout')
                router.push({ name: 'auth.register' })
              })
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error)
          })
      })
    },
    updateUserPassword (context, data) {
      return new Promise((resolve, reject) => {
        // resolve(data)
        apiService.makeApiCall(prefix + 'user/password', 'put', true, data, null, 200, ['user', 'token'])
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }
            // context.commit('setAuthUser', response.user)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error)
          })
      })
    },

    // ADMIN / MANAGER POST
    sendMailConfirm (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('me/send-account-confirm-email', 'post', true, data, null, 201)
          .then(response => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    // register(context, data) {
    //   return new Promise((resolve, reject) => {
    //     apiService.makeApiCall(prefix + 'register', 'post', false, data, null, 201)
    //       .then(response => {
    //         if (response === 'error') {
    //           resolve('error');
    //           return;
    //         }
    //         resolve(response);
    //       })
    //       .catch(error => {
    //         reject(error);
    //     });
    //   });
    // },
    registerConfirm (context, data) {
      return new Promise((resolve, reject) => {
        console.log(data)
        apiService.makeApiCall('me/account-confirm', 'post', false, data, null, 201)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    resetPassSendMail (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('me/send-password-reset-email', 'post', false, data, null, 201)
          .then(response => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    resetPassConfirm (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('me/password-reset', 'post', false, data, null, 201)
          .then(response => {
            resolve(response)
          })
          .catch((error) => {
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  }
}
