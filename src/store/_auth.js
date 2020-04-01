import * as apiService from '@/services/apiService'
// import { BASE_API_URL } from '@/config/AppConfig'

// import router from '@/router'

let generateToken = function () {
  let authToken = localStorage.getItem('authToken')
  if (authToken !== null && authToken !== '') {
    return authToken
  }
  return null
}

// let prefix = BASE_API_URL

export default {
  state: {
    authToken: generateToken(),
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
      state.sidebarData = data.sidebarData
    },
    setAuthToken (state, data) {
      localStorage.setItem('authToken', data.authToken)// JSON.stringify(data))
      state.authToken = data.authToken
    },
    destroyAuthToken (state) {
      localStorage.setItem('authToken', '')
      state.authToken = null
    },
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
            context.commit('setAuthUser', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    logout (context) {
      console.log('LOGOUT')
      return new Promise((resolve, reject) => {
        let data = {
          token: context.getters.authToken
        }
        apiService.makeApiCall('logout/', 'post', true, data, null, 200)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('destroyAuthToken')
            context.commit('setAuthUser', null)
            resolve()
          })
          .catch(error => {
            console.log(error)
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    clearAuthToken (context) {
      context.commit('destroyAuthToken')
    },
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
            console.log(response)
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
    }
  }
}
