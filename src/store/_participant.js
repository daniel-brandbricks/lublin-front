import * as apiService from '@/services/apiService'

export default {
  state: {
    participants: [],
    participant: null
  },
  getters: {
    participants (state) {
      return state.participants
    },
    participant (state) {
      return state.participant
    }
  },
  mutations: {
    setParticipants (state, data) {
      state.participants = data.participants
    },
    setParticipant (state, data) {
      state.participant = data
    },
    deleteParticipant (state, data) {
      // todo
    }
  },
  actions: {
    getParticipant (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipant', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getParticipants (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipants', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postParticipant (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipant', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putParticipant (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipant', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteParticipant (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteParticipant', response)
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
