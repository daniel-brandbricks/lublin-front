import * as apiService from '@/services/apiService'
import router from '@/router'

let generateToken = function () {
  let authToken = localStorage.getItem('authToken')
  if (authToken !== null && authToken !== '') {
    return authToken
  }
  return null
}

export default {
  state: {
    authToken: generateToken(),
    user: null
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
    user (state) {
      return state.user
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
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
    autoSignIn (context, data) {
      context.commit('setAuthToken', {
        authToken: data.authToken
      })
    },
    login (context, data) {
      return new Promise((resolve, reject) => {
console.log(data)
        apiService.makeApiCall('login/', 'post', true, data, null, 200)
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
    logout (context) {
      return new Promise((resolve, reject) => {
        let data = {
          token: context.getters.authToken
        }
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

            context.commit('setUser', response)
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
        /* let user = data
         context.commit('setUser', user)
         resolve(user) */
        apiService.makeApiCall(prefix + 'user/data', 'put', true, data, null, 200, ['user', 'token'])
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }
            context.commit('setUser', data)
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
            // context.commit('setUser', response.user)
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
