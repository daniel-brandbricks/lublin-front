import * as apiService from '@/services/apiService'

export default {
  state: {
    adminSportObjects: {
      confirmed: [],
      toConfirm: []
    },
    sportObject: null
  },
  getters: {
    adminSportObjectsConfirmed (state) {
      return state.adminSportObjects.confirmed
    },
    adminSportObjectsToConfirm (state) {
      return state.adminSportObjects.toConfirm
    },
    adminSportObjects (state) {
      return state.adminSportObjects.confirmed.concat(state.adminSportObjects.toConfirm)
    },
    adminSportObject: (state) => (isConfirmed, id) => {
      let sportObjects = []

      // merge two arrays
      if (undefined === isConfirmed) {
        sportObjects = state.adminSportObjects.confirmed.concat(state.adminSportObjects.toConfirm)
      } else {
        sportObjects = isConfirmed ? state.adminSportObjects.confirmed : state.adminSportObjects.toConfirm
      }

      for (let i = 0; i < sportObjects.length; i++) {
        const sportObject = sportObjects[i]
        if (undefined === sportObject || sportObject === null || sportObject.length < 1) {
          continue
        }
        if (parseInt(sportObject.id) === parseInt(id)) {
          return sportObject
        }
      }
    }
  },
  mutations: {
    setConfirmedAdminSportObjects (state, data) {
      state.adminSportObjects.confirmed = data
    },
    setAdminSportObjectsToConfirm (state, data) {
      state.adminSportObjects.toConfirm = data
    },
    setAdminSportObjects (state, data) {
      let confirmed = []
      let toConfirm = []

      for (let index in data) {
        if (parseInt(data[index].confirmed) === 1) {
          confirmed.push(data[index])
        } else {
          toConfirm.push(data[index])
        }
      }

      state.adminSportObjects.confirmed = confirmed
      state.adminSportObjects.toConfirm = toConfirm
    },
    setAdminSportObject (state, data) {
      const id = data.id
      const confirmed = data.confirmed
      let sportObjects = []

      if (undefined === id || id === null) {
        return
      }

      sportObjects = confirmed ? state.adminSportObjects.confirmed : state.adminSportObjects.toConfirm

      for (let i = 0; i < sportObjects.length; i++) {
        const storeSportObject = sportObjects[i]
        if (storeSportObject.id !== id) {
          continue
        }
        sportObjects.splice(i, 1, data)
        confirmed ? state.adminSportObjects.confirmed = sportObjects : state.adminSportObjects.toConfirm = sportObjects

        return
      }

      confirmed ? state.adminSportObjects.confirmed.push(data) : state.adminSportObjects.toConfirm.push(data)
    },
    deleteSportObject (state, data) {
      // todo
    }
  },
  actions: {
    getAdminSportObject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/admin-place/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAdminSportObject', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getAdminSportObjects (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/admin-place', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            if (data) {
              data.confirmed === 1
                ? context.commit('setConfirmedAdminSportObjects', (response && response.data) ? response.data : response)
                : context.commit('setAdminSportObjectsToConfirm', (response && response.data) ? response.data : response)
            } else {
              context.commit('setAdminSportObjects', (response && response.data) ? response.data : response)
            }

            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postAdminSportObject (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/admin-place', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAdminSportObject', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putAdminSportObject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/admin-place/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setAdminSportObject', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteAdminSportObject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/admin-place/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteAdminSportObject', response)
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
