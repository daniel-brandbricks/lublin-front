import * as apiService from '@/services/apiService'

export default {
  state: {
    lessonCategories: []
  },
  getters: {
    lessonCategories (state) {
      return state.lessonCategories
    },
    lessonCategory: (state) => (id) => {
      for (let i = 0; i < state.lessonCategories.length; i++) {
        const lessonCategory = state.lessonCategories[i]
        if (undefined === lessonCategory || lessonCategory === null || lessonCategory.length < 1) {
          continue
        }
        if (parseInt(lessonCategory.id) === parseInt(id)) {
          return lessonCategory
        }
      }
    }
  },
  mutations: {
    setLessonCategories (state, data) {
      state.lessonCategories = data
    },
    setLessonCategory (state, data) {
      const id = data.id
      let lessonCategories = [ ...state.lessonCategories ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < lessonCategories.length; i++) {
        const storeLessonCategory = lessonCategories[i]
        if (storeLessonCategory.id !== id) {
          continue
        }
        lessonCategories.splice(i, 1, data)

        state.lessonCategories = lessonCategories
        return
      }

      state.lessonCategories.push(data)
    },
    deleteLessonCategory (state, id) {
      let lessonCategories = [ ...state.lessonCategories ]
      for (let i = 0; i < lessonCategories.length; i++) {
        const storeLessonCategory = lessonCategories[i]
        if (storeLessonCategory.id !== id) {
          continue
        }
        lessonCategories.splice(i, 1)
        state.lessonCategories = lessonCategories
        return
      }
    }
  },
  actions: {
    getLessonCategory (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLessonCategory', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getLessonCategories (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLessonCategories', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postLessonCategory (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLessonCategory', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putLessonCategory (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLessonCategory', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteLessonCategory (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteLessonCategory', id)
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
