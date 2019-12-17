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
    // participant (state) {
    //   return state.participant
    // },
    participant: (state) => (id) => {
      let participants = state.participants

      if (undefined === id) {
        return
      }

      for (let i = 0; i < participants.length; i++) {
        const participant = participants[i]
        if (undefined === participant || participant === null || participant.length < 1) {
          continue
        }
        if (parseInt(participant.id) === parseInt(id)) {
          return participant
        }
      }
    }
  },
  mutations: {
    setParticipants (state, data) {
      state.participants = data
    },
    setParticipant (state, data) {
      state.participant = data
    },
    // setParticipant (state, data) {
    //   const id = data.id
    //   let participants = []
    //
    //   if (undefined === id || id === null) {
    //     return
    //   }
    //
    //   for (let i = 0; i < participants.length; i++) {
    //     const storeParticipant = participants[i]
    //     if (storeParticipant.id !== id) {
    //       continue
    //     }
    //     participants.splice(i, 1, data)
    //
    //     state.participants = participants
    //     return
    //   }
    // },
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
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getParticipants (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant', 'get', true, data, data, 200)
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
