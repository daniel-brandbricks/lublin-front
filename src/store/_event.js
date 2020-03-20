import * as apiService from '@/services/apiService'

export default {
  state: {
    events: {
      confirmed: [],
      toConfirm: []
    },
    event: null
  },
  getters: {
    eventsConfirmed (state) {
      return state.events.confirmed
    },
    eventsToConfirm (state) {
      return state.events.toConfirm
    },
    events (state) {
      return state.events.confirmed.concat(state.events.toConfirm)
    },
    event: (state) => (isConfirmed, id) => {
      let events = []

      if (undefined === isConfirmed) {
        events = state.events.confirmed.concat(state.events.toConfirm)
      } else {
        events = isConfirmed ? state.events.confirmed : state.events.toConfirm
      }
      for (let i = 0; i < events.length; i++) {
        const event = events[i]
        if (undefined === event || event === null || event.length < 1) {
          continue
        }
        if (parseInt(event.id) === parseInt(id)) {
          return event
        }
      }
    }
  },
  mutations: {
    setConfirmedEvents (state, data) {
      state.events.confirmed = data
    },
    setEventsToConfirm (state, data) {
      state.events.toConfirm = data
    },
    setEvents (state, data) {
      let eventsConfirmed = []
      let eventsToConfirm = []

      for (let eventIndex in data) {
        if (data[eventIndex].confirmed) {
          eventsConfirmed.push(data[eventIndex])
        } else {
          eventsToConfirm.push(data[eventIndex])
        }
      }

      state.events.confirmed = eventsConfirmed
      state.events.toConfirm = eventsToConfirm
    },
    setEvent (state, data) {
      const id = data.id
      const confirmed = data.confirmed
      let events = []

      if (undefined === id || id === null) {
        return
      }

      events = confirmed ? state.events.confirmed : state.events.toConfirm

      for (let i = 0; i < events.length; i++) {
        const storeEvent = events[i]
        if (parseInt(storeEvent.id) !== parseInt(id)) {
          continue
        }
        events.splice(i, 1, data)
        confirmed ? state.events.confirmed = events : state.events.toConfirm = events

        return
      }

      confirmed ? state.events.confirmed.push(data) : state.events.toConfirm.push(data)
    },
    deleteEvent (state, data) {
      // todo
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
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getEvents (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/event', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            if (data && data.confirmed) {
              data.confirmed === 1 ? context.commit('setConfirmedEvents', response) : context.commit('setEventsToConfirm', response)
            } else {
              context.commit('setEvents', response)
            }
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postEvent (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/event', 'post', true, data, null, 200)
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
    },
    putEvent (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/event/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setEvent', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteEvent (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/event/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteEvent', response)
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
