import * as apiService from '@/services/apiService'

export default {
  state: {
    lessons: [],
    lesson: null,
    lessonSportObjects: [],
    lessonParticipantLists: []
  },
  getters: {
    lessonSportObjects (state) {
      return state.lessonSportObjects
    },
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
    addEmptyLessonSportObject (state) {
      let newId = -1
      for (const item of state.lessonSportObjects) {
        if (parseInt(item.id) <= newId) {
          newId = item.id - 1
        }
      }

      state.lessonSportObjects.push({
        id: newId,
        school: { id: null },
        place: { id: null }
      })
    },
    deleteLessonSportObject (state, data) {
      let lessonSportObjects = [...state.lessonSportObjects]
      for (let i = 0; i < lessonSportObjects.length; i++) {
        const storeLessonSportObject = lessonSportObjects[i]
        if (storeLessonSportObject.id !== data.id) {
          continue
        }
        lessonSportObjects.splice(i, 1)
        state.lessonSportObjects = lessonSportObjects
        return
      }
    },

    setLessonSportObjects (state, data) {
      state.lessonSportObjects = data
    },
    setLessons (state, data) {
      state.lessons = data
    },
    setLesson (state, data) {
      const id = data.id
      let lessons = state.lessons || []

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
        state.lessonSportObjects = JSON.parse(JSON.stringify(lessons[i].lessonSchools))
        // todo back first
        // state.lessonParticipantLists = lessons[i].lessonSchools
        return
      }

      lessons.push(data)
      state.lessonSportObjects = JSON.parse(JSON.stringify(data.lessonSchools))
      // todo back first
      // state.lessonParticipantLists = lessons[i].lessonSchools
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
    addEmptyLessonSportObject (context) {
      context.commit('addEmptyLessonSportObject')
    },
    deleteLessonSportObject (context, data) {
      const id = data.id
      if (id < 0) {
        context.commit('deleteLessonSportObject', data)
        return
      }

      console.log('remove from db')
    },

    getLesson (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson/' + id, 'get', true, data, null, 200)
          .then(response => {
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLesson', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
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
            resolve(response)
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
            console.log(response)
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setLesson', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
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
