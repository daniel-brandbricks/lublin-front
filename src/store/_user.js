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
    users: [],
    user: null
  },
  getters: {
    users (state) {
      return state.users
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    setUsers (state, data) {
      state.users = data.users
    },
    setUser (state, data) {
      state.user = data
    }
  },
  actions: {
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
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  }
}
