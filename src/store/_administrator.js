import * as apiService from '@/services/apiService'

export default {
  state: {
    administrators: [],
    administrator: null
  },
  getters: {
    administrators (state) {
      return state.administrators
    },
    administrator: (state) => (id) => {
      let administrators = []

      if (undefined === id) {
        administrators = state.administrators.concat(state.administrators)
      }

      for (let i = 0; i < administrators.length; i++) {
        const administrator = administrators[i]
        if (undefined === administrator || administrator === null || administrator.length < 1) {
          continue
        }
        if (parseInt(administrator.id) === parseInt(id)) {
          return administrator
        }
      }
    }
  },
  mutations: {
    setAdministrators (state, data) {
      state.administrators = data
    },
    setAdministrator (state, data) {
      const id = data.id
      let administrators = state.administrators || []

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < administrators.length; i++) {
        const storeAdmin = administrators[i]
        if (storeAdmin.id !== id) {
          continue
        }
        administrators.splice(i, 1, data)

        state.administrators = administrators
        return
      }

      administrators.push(data)
    },
    deleteAdministrator (state, id) {
      let administrators = [...state.administrators]
      for (let i = 0; i < administrators.length; i++) {
        const storeAdmin = administrators[i]
        if (storeAdmin.id !== id) {
          continue
        }
        administrators.splice(i, 1)
        state.administrators = administrators
        return
      }
    }
  },
  actions: {
    getAdministrator (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/administrator/' + id, 'get', true, data, null, 200)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }
            context.commit('setLesson', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getAdministrators (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/administrator', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            context.commit('setAdministrators', response)
            // todo resolve(response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postAdministrator (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/administrator', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAdministrator', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putAdministrator (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/administrator/' + id, 'put', true, data, null, 200)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAdministrator', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteAdministrator (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/administrator/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteAdministrator', response)
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
