import * as apiService from '@/services/apiService'

export default {
  state: {
    participantGroups: [],
    participantGroup: null
  },
  getters: {
    participantGroups (state) {
      return state.participantGroups
    },
    participantGroup (state) {
      return state.participantGroup
    }
  },
  mutations: {
    setParticipantGroups (state, data) {
      state.participantGroups = data
    },
    setParticipantGroup (state, data) {
      state.participantGroup = data
    },
    deleteParticipantGroup (state, data) {
      // todo
    }
  },
  actions: {
    getParticipantGroup (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipantGroup', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getParticipantGroups (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            context.commit('setParticipantGroups', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postParticipantGroup (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipantGroup', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putParticipantGroup (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipantGroup', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteParticipantGroup (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteParticipantGroup', response)
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
