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
    // participantGroup (state) {
    //   return state.participantGroup
    // },
    participantGroup: (state) => (id) => {
      let participantGroups = []

      if (undefined === id) {
        participantGroups = state.participantGroups.concat(state.participantGroups)
      }

      for (let i = 0; i < participantGroups.length; i++) {
        const participantGroup = participantGroups[i]
        if (undefined === participantGroup || participantGroup === null || participantGroup.length < 1) {
          continue
        }
        if (parseInt(participantGroup.id) === parseInt(id)) {
          return participantGroup
        }
      }
    }
  },
  mutations: {
    setParticipantGroups (state, data) {
      state.participantGroups = data
    },
    // todo
    // setParticipantGroup (state, data) {
    //   state.participantGroup = data
    // },
    // setParticipantGroups (state, data) {
    //   let participantGroups = []
    //
    //   for (let participantGroupIndex in data) {
    //     if (data[participantGroupIndex]) {
    //       participantGroups.push(data[participantGroupIndex])
    //     }
    //   }
    //
    //   state.participantGroups = participantGroups
    // },
    // setParticipantGroup (state, data) {
    //   const id = data.id
    //   let participantGroups = [...state.participantGroups]
    //
    //   if (undefined === id || id === null) {
    //     return
    //   }
    //
    //   for (let i = 0; i < participantGroups.length; i++) {
    //     const storeParticipantGroup = participantGroups[i]
    //     if (storeParticipantGroup.id !== id) {
    //       continue
    //     }
    //     participantGroups.splice(i, 1, data)
    //
    //     state.participantGroups = participantGroups
    //     return
    //   }
    //
    //   state.participantGroups.push(data)
    // },
    setParticipantGroup (state, data) {
      const id = data.id
      let participantGroups = state.participantGroups

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < participantGroups.length; i++) {
        const storeParticipantGroup = participantGroups[i]
        if (storeParticipantGroup.id !== id) {
          continue
        }
        participantGroups.splice(i, 1, data)

        state.participantGroups = participantGroups
        return
      }

      state.participantGroups.push(data)
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
            resolve(response)
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

            context.commit('setParticipantGroups', (response && response.data) ? response.data : response)
            resolve(response)
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
            resolve(response)
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
    },

    // tab links actions
    changeParticipantStatusInList (context, data) {
      const id = data.listId
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipantGroup', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },

    cloneParticipantGroup (context, data) {
      const id = data.id
      data.actionType = 'cloneGroupWithParticipants'

      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/participant-group/' + id, 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setParticipantGroup', response)
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
