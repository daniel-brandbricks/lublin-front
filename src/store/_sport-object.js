import * as apiService from '@/services/apiService'

export default {
  state: {
    sportObjects: {
      confirmed: [],
      toConfirm: []
    },
    sportObject: null
  },
  getters: {
    sportObjectsConfirmed (state) {
      return state.sportObjects.confirmed
    },
    sportObjectsToConfirm (state) {
      return state.sportObjects.toConfirm
    },
    sportObjects (state) {
      return state.sportObjects.confirmed.concat(state.sportObjects.toConfirm)
    },
    sportObject: (state) => (isConfirmed, id) => {
      let sportObjects = []

      // merge two arrays
      if (undefined === isConfirmed) {
        sportObjects = state.sportObjects.confirmed.concat(state.sportObjects.toConfirm)
      } else {
        sportObjects = isConfirmed ? state.sportObjects.confirmed : state.sportObjects.toConfirm
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
    setConfirmedSportObjects (state, data) {
      state.sportObjects.confirmed = data
    },
    setSportObjectsToConfirm (state, data) {
      state.sportObjects.toConfirm = data
    },
    setSportObjects (state, data) {
      let confirmed = []
      let toConfirm = []

      for (let index in data) {
        if (parseInt(data[index].confirmed) === 1) {
          confirmed.push(data[index])
        } else {
          toConfirm.push(data[index])
        }
      }

      state.sportObjects.confirmed = confirmed
      state.sportObjects.toConfirm = toConfirm
    },
    setSportObject (state, data) {
      const id = data.id
      const confirmed = data.confirmed
      let sportObjects = []

      if (undefined === id || id === null) {
        return
      }

      sportObjects = confirmed ? state.sportObjects.confirmed : state.sportObjects.toConfirm

      for (let i = 0; i < sportObjects.length; i++) {
        const storeSportObject = sportObjects[i]
        if (storeSportObject.id !== id) {
          continue
        }
        sportObjects.splice(i, 1, data)
        confirmed ? state.sportObjects.confirmed = sportObjects : state.sportObjects.toConfirm = sportObjects

        return
      }

      confirmed ? state.sportObjects.confirmed.push(data) : state.sportObjects.toConfirm.push(data)
    },
    deleteSportObject (state, data) {
      // todo
    }
  },
  actions: {
    getSportObject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/place/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObject', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSportObjects (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/place', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            if (data) {
              data.confirmed === 1
                ? context.commit('setConfirmedSportObjects', response)
                : context.commit('setSportObjectsToConfirm', response)
            } else {
              context.commit('setSportObjects', response)
            }

            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSportObject (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/place', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObject', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSportObject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/place/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObject', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSportObject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/place/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSportObject', response)
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
