import * as apiService from '@/services/apiService'

export default {
  state: {
    breadCrumbs: {},
    event: null
  },
  getters: {
    events (state) {
      return state.events
    },
    event (state) {
      return state.event
    }
  },
  mutations: {
    setEvents (state, data) {
      state.events = data.events
    }
  },
  actions: {
    getEvent (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/event/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setEvent', response)
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
