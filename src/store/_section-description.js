import * as apiService from '@/services/apiService'

export default {
  state: {
    sectionDescriptions: [],
    sectionDescription: null
  },
  getters: {
    sectionDescriptions (state) {
      return state.sectionDescriptions
    },
    sectionDescription: (state) => (id) => {
      for (let i = 0; i < state.sectionDescriptions.length; i++) {
        const sectionDescription = state.sectionDescriptions[i]
        if (undefined === sectionDescription || sectionDescription === null || sectionDescription.length < 1) {
          continue
        }
        if (parseInt(sectionDescription.id) === parseInt(id)) {
          return sectionDescription
        }
      }
    }
  },
  mutations: {
    setSectionDescriptions (state, data) {
      state.sectionDescriptions = data
    },
    setSectionDescription (state, data) {
      const id = data.id
      let sectionDescriptions = [ ...state.sectionDescriptions ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < sectionDescriptions.length; i++) {
        const storeSectionDescription = sectionDescriptions[i]
        if (storeSectionDescription.id !== id) {
          continue
        }
        sectionDescriptions.splice(i, 1, data)

        state.sectionDescriptions = sectionDescriptions
        return
      }

      state.sectionDescriptions.push(data)
    },
    deleteSectionDescription (state, id) {
      let sectionDescriptions = [ ...state.sectionDescriptions ]
      for (let i = 0; i < sectionDescriptions.length; i++) {
        const storeSectionDescription = sectionDescriptions[i]
        if (storeSectionDescription.id !== id) {
          continue
        }
        sectionDescriptions.splice(i, 1)
        state.sectionDescriptions = sectionDescriptions
        return
      }
    }
  },
  actions: {
    getSectionDescription (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section-description/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSectionDescription', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSectionDescriptions (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section-description', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSectionDescriptions', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSectionDescription (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section-description', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSectionDescription', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSectionDescription (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section-description/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSectionDescription', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSectionDescription (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section-description/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSectionDescription', id)
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
