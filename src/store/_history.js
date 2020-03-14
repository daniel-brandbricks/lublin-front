import * as apiService from '@/services/apiService'

export default {
  state: {
    logs: []
  },
  getters: {
    logs (state) {
      return state.logs
    },
    log: (state) => (id) => {
      for (let i = 0; i < state.logs.length; i++) {
        const log = state.logs[i]
        if (undefined === log || log === null || log.length < 1) {
          continue
        }
        if (parseInt(log.id) === parseInt(id)) {
          return log
        }
      }
    }
  },
  mutations: {
    setLogs (state, data) {
      state.seasons = data
    }
  },
  actions: {
    getLog (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/history/' + id, 'get', true, data, null, 200)
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
    getLogs (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/history', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLogs', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  }
}
