import * as apiService from '@/services/apiService'

export default {
  state: {
    restPages: [],
    restPage: null
  },
  getters: {
    restPages (state) {
      return state.restPages
    },
    restPage: (state) => (id) => {
      for (let i = 0; i < state.restPages.length; i++) {
        const restPage = state.restPages[i]
        if (undefined === restPage || restPage === null || restPage.length < 1) {
          continue
        }
        if (parseInt(restPage.id) === parseInt(id)) {
          return restPage
        }
      }
    }
  },
  mutations: {
    setRestPages (state, data) {
      state.restPages = data
    },
    setRestPage (state, data) {
      const id = data.id
      let restPages = [ ...state.restPages ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < restPages.length; i++) {
        const storeRestPage = restPages[i]
        if (storeRestPage.id !== id) {
          continue
        }
        restPages.splice(i, 1, data)

        state.restPages = restPages
        return
      }

      state.restPages.push(data)
    },
    deleteRestPage (state, id) {
      let restPages = [ ...state.restPages ]
      for (let i = 0; i < restPages.length; i++) {
        const storeRestPage = restPages[i]
        if (storeRestPage.id !== id) {
          continue
        }
        restPages.splice(i, 1)
        state.restPages = restPages
        return
      }
    }
  },
  actions: {
    getRestPage (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/rest-page/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setRestPage', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getRestPages (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/rest-page', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setRestPages', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postRestPage (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/rest-page', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setRestPage', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putRestPage (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/rest-page/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setRestPage', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteRestPage (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/rest-page/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteRestPage', id)
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
