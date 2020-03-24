import * as apiService from '@/services/apiService'

export default {
  state: {
    footers: [],
    footer: null
  },
  getters: {
    footers (state) {
      return state.footers
    },
    footer: (state) => (id) => {
      for (let i = 0; i < state.footers.length; i++) {
        const footer = state.footers[i]
        if (undefined === footer || footer === null || footer.length < 1) {
          continue
        }
        if (parseInt(footer.id) === parseInt(id)) {
          return footer
        }
      }
    }
  },
  mutations: {
    setFooters (state, data) {
      state.footers = data
    },
    setFooter (state, data) {
      const id = data.id
      let footers = [ ...state.footers ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < footers.length; i++) {
        const storeFooters = footers[i]
        if (storeFooters.id !== id) {
          continue
        }
        footers.splice(i, 1, data)

        state.footers = footers
        return
      }

      state.footers.push(data)
    },
    deleteFooter (state, id) {
      let footers = [ ...state.footers ]
      for (let i = 0; i < footers.length; i++) {
        const storeFooter = footers[i]
        if (storeFooter.id !== id) {
          continue
        }
        footers.splice(i, 1)
        state.footers = footers
        return
      }
    }
  },
  actions: {
    getFooter (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/footer/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFooter', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getFooters (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/footer', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFooters', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postFooter (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/footer', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFooter', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putFooter (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/footer/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFooter', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteFooter (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/footer/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteFooter', id)
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
