import * as apiService from '@/services/apiService'

export default {
  state: {
    leaders: {
      confirmed: [],
      toConfirm: []
    }
  },
  getters: {
    leadersConfirmed (state) {
      return state.leaders.confirmed
    },
    leadersToConfirm (state) {
      return state.leaders.toConfirm
    },
    leaders (state) {
      return state.leaders.confirmed.concat(state.leaders.toConfirm)
    },
    leader: (state) => (id, isConfirmed) => {
      let leaders = []

      // merge two arrays
      if (undefined === isConfirmed) {
        leaders = state.leaders.confirmed.concat(state.leaders.toConfirm)
      } else {
        leaders = isConfirmed ? state.leaders.confirmed : state.leaders.toConfirm
      }

      for (let i = 0; i < leaders.length; i++) {
        const leader = leaders[i]
        if (undefined === leader || leader === null || leader.length < 1) {
          continue
        }
        if (parseInt(leader.id) === parseInt(id)) {
          return leader
        }
      }
    }
  },
  mutations: {
    setConfirmedLeaders (state, data) {
      state.leaders.confirmed = data
    },
    setLeadersToConfirm (state, data) {
      state.leaders.toConfirm = data
    },
    setLeader (state, data) {
      const id = data.id
      const confirmed = data.confirmed
      let leaders = []

      if (undefined === id || id === null) {
        return
      }

      leaders = confirmed ? state.leaders.confirmed : state.leaders.toConfirm

      for (let i = 0; i < leaders.length; i++) {
        const storeLeader = leaders[i]
        if (storeLeader.id !== id) {
          continue
        }
        leaders.splice(i, 1, data)
        confirmed ? state.leaders.confirmed = leaders : state.leaders.toConfirm = leaders

        return
      }

      confirmed ? state.leaders.confirmed.push(data) : state.leaders.toConfirm.push(data)
    },
    deleteLeader (state, id) {
      // todo
    }
  },
  actions: {
    getLeader (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/leader/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLeader', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getLeaders (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/leader', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            data.confirmed === 1
              ? context.commit('setConfirmedLeaders', response)
              : context.commit('setLeadersToConfirm', response)
            resolve()
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    postLeader (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/leader', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLeader', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putLeader (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/leader/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLeader', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteLeader (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/leader/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteLeader', id)
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
