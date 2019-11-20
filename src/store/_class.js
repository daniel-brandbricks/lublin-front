import * as apiService from '@/services/apiService'

export default {
  state: {
    classes: [],
    classProfiles: []
  },
  getters: {
    classes (state) {
      return state.classes
    },
    classProfiles (state) {
      return state.classProfiles
    },
    classesProfile: (state) => (profileId) => {
      let classes = state.classes,
        prepared = []
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].profile && classes[i].profile.id == profileId) {
          prepared.push(classes[i])
        }
      }
      return prepared
    },
    // classesProfile (state) {
    //   let classes = state.classes,
    //     prepared = []
    //   for (let i = 0; i < classes.length; i++) {
    //     if (classes[i].type == 1) {
    //       prepared.push(classes[i])
    //     }
    //   }
    //   return prepared
    // },
    classesAll (state) {
      let classes = state.classes,
        prepared = []
      for (let i = 0; i < classes.length; i++) {
        if (classes[i].type == 2) {
          prepared.push(classes[i])
        }
      }
      return prepared
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
    setClassProfiles (state, data) {
      state.classProfiles = data
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
    setClassProfile (state, data) {
      const id = data.id
      let classProfiles = [...state.classProfiles]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < classProfiles.length; i++) {
        const storeClassProfile = classProfiles[i]
        if (storeClassProfile.id !== id) {
          continue
        }
        classProfiles.splice(i, 1, data)

        state.classProfiles = classProfiles
        return
      }

      state.classProfiles.push(data)
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
    },
    setClassNewProfName (state, data) {
      let classes = [...state.classes]
      for (let i = 0; i < classes.length; i++) {
        const storeClass = classes[i]
        if (storeClass.profileName !== data.profNameOld) {
          continue
        }
        storeClass.profileName = data.profNameNew
        classes.splice(i, 1, storeClass)
      }
      state.classes = classes
    },
    deleteClassesByProfName (state, data) {
      console.log(data)
      let classes = [...state.classes]
      for (let i = 0; i < classes.length; i++) {
        const storeClass = classes[i]
        if (storeClass.profileName !== data.profNameOld) {
          continue
        }
        classes.splice(i, 1)
        i--
      }
      state.classes = classes
    }
  },
  actions: {
    getClass (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class/' + id, 'get', true, data, null, 200)
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
        apiService.makeApiCall('resource/class', 'get', true, data, null, 200)
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
    getClassProfiles (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class', 'get', true, data, {profiles: true}, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClassProfiles', response)
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
        apiService.makeApiCall('resource/class', 'post', true, data, null, 200)
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
    postClassProfile (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class', 'post', true, data, {profiles: true}, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClassProfile', response)
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
        apiService.makeApiCall('resource/class/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClass', data)
            resolve(data)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putClassProfile (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class/' + id, 'put', true, data, {profiles: true}, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClassProfile', response)
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
        apiService.makeApiCall('resource/class/' + id, 'delete', true, data, null, 200)
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
    },
    deleteClassProfName (context, data) {
      const profNameOld = data.urlParams
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class/', 'delete', true, null,
          {profNameOld: profNameOld}, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteClassesByProfName', {profNameOld: profNameOld})
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
