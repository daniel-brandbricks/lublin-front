import * as apiService from '@/services/apiService'

export default {
  state: {
    sections: [],
    section: null
  },
  getters: {
    sections (state) {
      return state.sections
    },
    section: (state) => (id) => {
      for (let i = 0; i < state.sections.length; i++) {
        const section = state.sections[i]
        if (undefined === section || section === null || section.length < 1) {
          continue
        }
        if (parseInt(section.id) === parseInt(id)) {
          return section
        }
      }
    }
  },
  mutations: {
    setSections (state, data) {
      state.sections = data
    },
    setSection (state, data) {
      const id = data.id
      let sections = [ ...state.sections ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < sections.length; i++) {
        const storeSection = sections[i]
        if (storeSection.id !== id) {
          continue
        }
        sections.splice(i, 1, data)

        state.sections = sections
        return
      }

      state.sections.push(data)
    },
    deleteSection (state, id) {
      let sections = [ ...state.sections ]
      for (let i = 0; i < sections.length; i++) {
        const storeSection = sections[i]
        if (storeSection.id !== id) {
          continue
        }
        sections.splice(i, 1)
        state.sections = sections
        return
      }
    }
  },
  actions: {
    getSection (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSection', response)
            context.commit('setSectionDescription', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSections (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSections', response)
            context.commit('setSectionDescriptions', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSection (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSection', response)
            context.commit('setSectionDescription', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSection (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSection', response)
            context.commit('setSectionDescription', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSection (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/section/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSection', id)
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
