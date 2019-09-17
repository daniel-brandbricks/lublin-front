import axios from 'axios'
import { BASE_API_URL } from '@/config/AppConfig'
import router from '@/router'
import store from '@/store'

console.log(BASE_API_URL)

const CancelToken = axios.CancelToken

let cancelTokens = {}

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

    if (isAuthorized === true) {
      configAuthorizedCall()
    }

    console.log(method)

    axios({
      url: BASE_API_URL + uri,
      method,
      data,
      params,
      // headers: headers,
      cancelToken: new CancelToken(function executor (c) {
        cancelTokens[cancelTokenKey] = c
      })
    })
      .then((response) => {
        if (undefined === response) {
          console.log('test')
          resolve('error')
          return
        }
        if (checkResponse(response, responseStatusToCheck) === false) {
          console.log('test')
          resolve('error')
        }

        let data = response.data
        if (responseKeysToCheck.length < 1 && checkEmptyObject(data, responseKeysToCheck) === false) {
          console.log('test')
          resolve('error')
        }
        resolve(data)
      })
      .catch(error => {
        if (error.response && error.response.data.message === 'TOKEN_EXPIRED') {
          firebase.auth()
            .signOut()

          console.log('api service TOKEN_EXPIRED')
          router.push({ name: 'login' })
        }

        if ((error.response && error.response.status === 401) || error.status === 401) {
          firebase.auth()
            .signOut()
          console.log('api service 401 [2]')
          router.push({ name: 'login' })
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
  return configAuthorizedCall()
}

let configAuthorizedCall = function () {
  axios.interceptors.request.use((config) => {
    if (store.getters.isLoggedIn) {
      config.headers['Authorization'] = 'Bearer ' + store.state.authToken
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
}


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
