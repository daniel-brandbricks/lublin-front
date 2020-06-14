import axios from 'axios'
import { BASE_API_URL } from '@/config/AppConfig'
import router from '@/router'
import store from '@/store'

const CancelToken = axios.CancelToken

let cancelTokens = {}
let csrfToken = false

export function makeApiCall (uri, method = 'GET', isAuthorized = false, data, params, responseStatusToCheck = null, responseKeysToCheck = []) {
  let cancelTokenKey = uri
  if (checkEmptyObject(data)) {
    cancelTokenKey = cancelTokenKey + JSON.stringify(data)
  }
  if (checkEmptyObject(params)) {
    cancelTokenKey = cancelTokenKey + JSON.stringify(params)
  }

  return new Promise((resolve, reject) => {
    if (cancelTokens[cancelTokenKey] !== undefined) {
      cancelTokens[cancelTokenKey]()
    }

    let headers = {
      'Content-Type': 'application/json'
    }
    headers['X-CSRF-Token'] = localStorage.getItem('x-csrf-token') || ''

    addAuthHeader = isAuthorized

    axios({
      url: BASE_API_URL + uri,
      method,
      data,
      params,
      withCredentials: true,
      crossdomain: true,
      headers: headers,
      cancelToken: new CancelToken(function executor (c) {
        cancelTokens[cancelTokenKey] = c
      })
    })
      .then((response) => {
        if (undefined === response) {
          resolve('error')
          return
        }
        if (response.headers && response.headers['x-csrf-token']) {
          localStorage.setItem('x-csrf-token', response.headers['x-csrf-token'])
          // csrfToken = response.headers['x-csrf-token']
        }

        if (checkResponse(response, responseStatusToCheck) === false) {
          resolve('error')
        }

        let data = response.data
        if (responseKeysToCheck.length < 1 && checkEmptyObject(data, responseKeysToCheck) === false) {
          resolve('error')
        }
        resolve(data)
      })
      .catch(error => {
        if (isAuthorized && error.response && error.response.data.error === 'empty user') {
          console.log(error.response.data.error)
          store.dispatch('logout')
            .then(resp => {
              console.log('home here')
              router.push({ name: 'home' })
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
              console.log('home here')
              router.push({ name: 'home' })
            })
        }

        if ((error.response && error.response.status === 401) || error.status === 401) {
          console.log(error.response)
          store.dispatch('logout')
            .then(resp => {
              console.log('home here')
              router.push({ name: 'home' })
            })
            // eslint-disable-next-line handle-callback-err
            .catch(err => {
              console.log('home here')
              router.push({ name: 'home' })
            })
        }

        if (axios.isCancel(error)) {
          resolve('error')
        }
        console.log(error)
        reject(error)
      })
  })
}

export function configAuthHeader () {
  // return configAuthorizedCall()
}

let addAuthHeader = false

axios.interceptors.request.use((config) => {
  if (addAuthHeader && store.getters.isLoggedIn) {
    // config.headers['X-AUTH-Token'] = store.state.authModule.authToken
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }
  return config
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (undefined === error || error.length < 1 || error === null || error === '') {
    return
  }
  if (undefined === error.response || error.response.length < 1 || error.response === null || error.response === '') {
    return
  }
  if (undefined === error.response.status || error.response.status.length < 1 || error.response.status === null || error.response.status === '') {
    return
  }

  if (error.response.status === 401) {
    console.log('response 401')
  }

  return Promise.reject(error)
})
// }

let checkResponse = function (response, successStatus = 200) {
  if (undefined === response || response === null) {
    return false
  }
  if (undefined === response.status || response.status === null) {
    return false
  }
  if (undefined !== successStatus && successStatus !== null && response.status !== successStatus) {
    return false
  }
  return true
}

let checkEmptyObject = function (currentObject, keysArray = null) {
  if (undefined === currentObject || currentObject === null) {
    return false
  }

  if (undefined === keysArray || keysArray === null || keysArray.length < 1) {
    return true
  }
  for (let i = 0; i < keysArray.length; i++) {
    let currentKey = keysArray[i]
    if (undefined === currentObject[currentKey] || currentObject[currentKey] === null) {
      return false
    }
  }
  return true
}
