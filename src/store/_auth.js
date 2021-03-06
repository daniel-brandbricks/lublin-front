import * as apiService from '@/services/apiService'
// import { BASE_API_URL } from '@/config/AppConfig'

import router from '@/router'

// let generateToken = function () {
//   let authToken = localStorage.getItem('authToken')
//   if (authToken !== null && authToken !== '') {
//     return authToken
//   }
//   return null
// }

function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return false
}

// let prefix = BASE_API_URL

export default {
  state: {
    dispatchedCSRF: false,
    dispatchedLogin: false,
    dispatchedLoginCount: 0,
    // authToken: generateToken(),
    authUser: null,
    userRole: null,
    isDirector: false,
    isAdmin: false,
    isSU: false,

    sidebarData: {}
  },
  getters: {
    sidebarData (state) {
      return state.sidebarData
    },
    // authToken (state) {
    //   return state.authToken
    // },
    isLoggedIn: function (state) {
      var res = '1' // getCookie('authl')
      return (res === '1')
      // if (state.authToken && state.authToken.length > 0) {
      //   return true
      // }
      // return false
    },
    authUser (state) {
      console.log(state.authUser)
      return state.authUser
    },
    isAdmin (state) {
      console.log(state.isAdmin)
      return state.isAdmin
    },
    isSU (state) {
      console.log(state.isSU)
      return state.isSU
    },
    isDirector (state) {
      // return false
      if (state.isAdmin || state.isSU) return true
      console.log(state.isDirector)
      return state.isDirector
    }
  },
  mutations: {
    setSidebarData (state, data) {
      state.sidebarData = data
    },
    // setAuthToken (state, data) {
    // let isLoggend = getCookie('authl')
    // localStorage.setItem('authToken', data.authToken)// JSON.stringify(data))
    // state.authToken = data.authToken
    // },
    // destroyAuthToken (state) {
    // localStorage.setItem('authToken', '')
    // state.authToken = null
    // },
    setAuthUser (state, data) {
      console.log(data)
      if (data === null) {
        state.authUser = null
        state.userRole = null
        state.isDirector = false
        state.isAdmin = false
        state.isSU = false

        return
      }
      state.authUser = data.user
      state.userRole = data.user.role

      if (data.user.role === 2 || data.user.role === 3) {
        state.isAdmin = true
        state.isDirector = true
      }
      if (data.user.role === 3) {
        state.isSU = true
        state.isAdmin = true
        state.isDirector = true
      }
      if (data.user.schoolsUsers.length > 0 && data.user.schoolsUsers[0].role === 1) {
        state.isDirector = true
      }
      console.log(state.authUser)
    }
  },
  actions: {
    // we need it? todo check
    // autoSignIn (context, data) {
    //   context.commit('setAuthToken', {
    //     authToken: data.authToken
    //   })
    // },
    login (context, data) {
      console.log(context.state.dispatchedLogin)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('login/', 'post', false, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            // context.commit('setAuthToken', response)
            context.commit('setAuthUser', response)
            context.dispatch('getActualSidebarData')

            if (context.state.dispatchedLogin) {
              router.push({name: 'dashboard'})
            }
            context.state.dispatchedLogin = false
            resolve(response)
          })
          .catch(error => {
            console.log(error.response.data)
            if (error.response && error.response.data && error.response.data.error && error.response.data.error ===
              'Spróbuj wykonać akcje jeszcze raz.') {
              context.state.dispatchedLogin = true
              context.state.dispatchedLoginCount++
              if (context.state.dispatchedLoginCount < 3) {
                context.dispatch('logout', {login: data})
              }
            }
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    logout (context, data) {
      let loginData = false
      if (data && data.login) {
        loginData = JSON.parse(JSON.stringify(data.login))
        delete data.login
      }
      return new Promise((resolve, reject) => {
        let data = {
          // token: context.getters.authToken
        }
        apiService.makeApiCall('logout/', 'post', true, data, null, 200)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            localStorage.removeItem('x-csrf-token')
            // context.commit('destroyAuthToken')
            context.commit('setAuthUser', null)

            console.log(data)
            context.dispatch('getCsrfToken', loginData)
            resolve()
          })
          .catch(error => {
            console.log(error)
            console.log(error.response)
            context.dispatch('getCsrfToken', loginData)
            reject(error.response)
          })
      })
    },
    // clearAuthToken (context) {
    //   context.commit('destroyAuthToken')
    // },
    getCurrentUser (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('me/', 'get', true, null, null)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAuthUser', {user: response})
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    getActualSidebarData (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('me/', 'get', true, null, {sidebar: true})
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSidebarData', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    getCsrfToken (context, loginData) {
      console.log(loginData)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('csrf-token/', 'get', true, null, null)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            if (loginData) {
              context.dispatch('login', loginData)
            }

            context.state.dispatchedCSRF = false
            resolve(response)
          })
          .catch(error => {
            if (context.state.dispatchedCSRF === false) {
              context.dispatch('getCsrfToken')
              context.state.dispatchedCSRF = true
            }
            console.log(error)
            reject(error.response)
          })
      })
    }
  }
}
