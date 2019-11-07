import * as apiService from '@/services/apiService'

export default {
  state: {
    sportObjectTypes: [],
    sportObjectType: null
  },
  getters: {
    sportObjectTypes (state) {
      return state.sportObjectTypes
    },
    sportObjectType: (state) => (id) => {
      for (let i = 0; i < state.sportObjectTypes.length; i++) {
        const sportObjectType = state.sportObjectTypes[i]
        if (undefined === sportObjectType || sportObjectType === null || sportObjectType.length < 1) {
          continue
        }
        if (sportObjectType.id == id) {
          return sportObjectType
        }
      }
    }
  },
  mutations: {
    setSportObjectTypes (state, data) {
      state.sportObjectTypes = data
    },
    setSportObjectType (state, data) {
      const id = data.id
      let sportObjectTypes = [...state.sportObjectTypes]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < sportObjectTypes.length; i++) {
        const storeSportObjectType = sportObjectTypes[i]
        if (storeSportObjectType.id !== id) {
          continue
        }
        sportObjectTypes.splice(i, 1, data)

        state.sportObjectTypes = sportObjectTypes
        return
      }

      state.sportObjectTypes.push(data)
    },
    deleteSportObject (state, data) {
      // todo
    }
  },
  actions: {
    getSportObjectType (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/placeType/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObjectType', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSportObjectTypes (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/placeType', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObjectTypes', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSportObjectType (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/placeType', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObjectType', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSportObjectType (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/placeType/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportObjectType', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSportObjectType (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/placeType/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSportObjectType', response)
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
