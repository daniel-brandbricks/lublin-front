import * as apiService from '@/services/apiService'

export default {
  state: {
    frequencies: []
  },
  getters: {
    frequencies (state) {
      return state.frequencies
    },
    frequency: (state) => (id) => {
      for (let i = 0; i < state.frequencies.length; i++) {
        const frequency = state.frequencies[i]
        if (undefined === frequency || frequency === null || frequency.length < 1) {
          continue
        }
        if (parseInt(frequency.id) === parseInt(id)) {
          return frequency
        }
      }
    }
  },
  mutations: {
    setFrequencies (state, data) {
      state.frequencies = data
    }
  },
  actions: {
    getFrequency (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/frequency/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getFrequencies (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/frequency', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            // context.commit('setFreuqncies', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putFrequency (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/frequency/' + id, 'put', true, data, null, 200)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            // context.commit('setFrequency', response)
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
