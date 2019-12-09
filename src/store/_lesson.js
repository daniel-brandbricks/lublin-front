import * as apiService from '@/services/apiService'

export default {
  state: {
    lessons: [],
    lesson: null
  },
  getters: {
    lessons (state) {
      return state.lessons
    },
    lesson: (state) => (id) => {
      let lessons = []

      if (undefined === id) {
        lessons = state.lessons.concat(state.lessons)
      }

      for (let i = 0; i < lessons.length; i++) {
        const lesson = lessons[i]
        if (undefined === lesson || lesson === null || lesson.length < 1) {
          continue
        }
        if (parseInt(lesson.id) === parseInt(id)) {
          return lesson
        }
      }
    }
  },
  mutations: {
    setLessons (state, data) {
      state.lessons = data
    },
    setLesson (state, data) {
      const id = data.id
      let lessons = []

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < lessons.length; i++) {
        const storeLesson = lessons[i]
        if (storeLesson.id !== id) {
          continue
        }
        lessons.splice(i, 1, data)

        state.lessons = lessons
        return
      }
    },
    deleteLesson (state, id) {
      let lessons = [...state.lessons]
      for (let i = 0; i < lessons.length; i++) {
        const storeLesson = lessons[i]
        if (storeLesson.id !== id) {
          continue
        }
        lessons.splice(i, 1)
        state.lessons = lessons
        return
      }
    }
  },
  actions: {
    getLesson (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLesson', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getLessons (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            context.commit('setLessons', response)
            // todo resolve(response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postLesson (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLesson', response)
            // todo resolve(response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putLesson (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLesson', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteLesson (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteLesson', response)
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
