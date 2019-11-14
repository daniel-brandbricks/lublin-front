import * as apiService from '@/services/apiService'

export default {
  state: {
    classes: []
  },
  getters: {
    classes (state) {
      return state.classes
    },
    classObj: (state) => (id) => {
      for (let i = 0; i < state.classes.length; i++) {
        const classObj = state.classes[i]
        if (undefined === classObj || classObj === null || classObj.length < 1) {
          continue
        }
        if (classObj.id == id) {
          return classObj
        }
      }
    }
  },
  mutations: {
    setClasses (state, data) {
      state.classes = data
    },
    setClass (state, data) {
      const id = data.id
      let classes = [...state.classes]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < classes.length; i++) {
        const storeClass = classes[i]
        if (storeClass.id !== id) {
          continue
        }
        classes.splice(i, 1, data)

        state.classes = classes
        return
      }

      state.classes.push(data)
    },
    deleteClass (state, id) {
      let classes = [...state.classes]
      for (let i = 0; i < classes.length; i++) {
        const storeClass = classes[i]
        if (storeClass.id !== id) {
          continue
        }
        classes.splice(i, 1)
        state.classes = classes
        return
      }
    }
  },
  actions: {
    getClass (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClass', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getClasses (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClasses', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postClass (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClass', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putClass (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClass', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteClass (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/lesson-category/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteClass', id)
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
