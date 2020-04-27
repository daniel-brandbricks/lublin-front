import * as apiService from '@/services/apiService'

export default {
  state: {
    mtsfDataList: [],
    mtsfList: [],
    mtsf: null
  },
  getters: {
    mtsfDataList (state) {
      return state.mtsfDataList
    },
    mtsfList (state) {
      return state.mtsfList
    },
    mtsf: (state) => (id) => {
      let mtsfList = state.mtsfList

      if (undefined === id) {
        return
      }

      for (let i = 0; i < mtsfList.length; i++) {
        const mtsf = mtsfList[i]
        if (undefined === mtsf || mtsf === null || mtsf.length < 1) {
          continue
        }
        if (parseInt(mtsf.id) === parseInt(id)) {
          return mtsf
        }
      }
    },
    mtsfData: (state) => (id) => {
      let mtsfDataList = state.mtsfDataList

      if (undefined === id) {
        return
      }

      for (let i = 0; i < mtsfDataList.length; i++) {
        const mtsf = mtsfDataList[i]
        if (undefined === mtsf || mtsf === null || mtsf.length < 1) {
          continue
        }
        if (parseInt(mtsf.id) === parseInt(id)) {
          return mtsf
        }
      }
    }
  },
  mutations: {
    setMtsfDataList (state, data) {
      state.mtsfDataList = data
    },
    setMtsfList (state, data) {
      state.mtsfList = data
    },
    setMtsf (state, data) {
      const id = data.id
      let mtsfList = state.mtsfList

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < mtsfList.length; i++) {
        const mtsf = mtsfList[i]
        if (mtsf.id !== id) {
          continue
        }
        mtsfList.splice(i, 1, data)

        state.mtsfList = mtsfList
        return
      }

      state.mtsfList.push(data)
    },
    setMtsfData (state, data) {
      const id = data.id
      let mtsfDataList = state.mtsfDataList

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < mtsfDataList.length; i++) {
        const mtsf = mtsfDataList[i]
        if (mtsf.id !== id) {
          continue
        }
        mtsfDataList.splice(i, 1, data)

        state.mtsfDataList = mtsfDataList
        return
      }

      state.mtsfDataList.push(data)
    }
  },
  actions: {
    getMtsf (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mtsf/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMtsf', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getMtsfList (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mtsf', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMtsfList', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postMtsf (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mtsf/' + data.id, 'post', true, data.data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMtsf', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putMtsf (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mtsf/' + data.id, 'put', true, data.data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            context.commit('setMtsf', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getMtsfDataList (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mtsf-data', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMtsfDataList', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putMtsfData (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/mtsf-data/' + data.id, 'put', true, data.data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            context.commit('setMtsfData', response)
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
