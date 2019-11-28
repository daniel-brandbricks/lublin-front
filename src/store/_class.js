import * as apiService from '@/services/apiService'
import { empty } from '@/config/methods'

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
    classItemPerId: (state) => (id) => {
      return state.classes.find(element => parseFloat(element.id) === parseFloat(id))
    },
    classesAll (state) {
      let classes = state.classes
      let prepared = []
      for (let i = 0; i < classes.length; i++) {
        if (parseInt(classes[i].type) === parseInt(2)) {
          prepared.push(classes[i])
        }
      }
      return prepared
    }
  },
  mutations: {
    setClasses (state, data) {
      state.classes = data
    },
    setClassProfiles (state, data) {
      state.classProfiles = data
    },
    setClassAll (state, data) {
      const id = data.id
      let classes = [ ...state.classes ]
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
    setClass (state, data) {
      const id = data.id
      const oldId = data.oldId
      const profileId = data.profile.id

      let classes = [ ...state.classes ]
      if (undefined === id || id === null) {
        return
      }

      let spliced = false
      for (let i = 0; i < classes.length; i++) {
        const storeClass = classes[i]
        if (storeClass.id !== id) {
          continue
        }
        classes.splice(i, 1, data)
        spliced = true
        state.classes = classes
        return
      }
      if (!spliced) {
        state.classes.push(data)
      }

      for (const profileIndex in state.classProfiles) {
        let profile = state.classProfiles[profileIndex]
        if (profile.id && parseFloat(profile.id) === parseFloat(profileId)) {
          for (let classIndex in profile.classes) {
            let classItem = profile.classes[classIndex]
            if (classItem.id && parseFloat(classItem.id) !== parseFloat(oldId)) {
              continue
            }
            profile.classes.splice(classIndex, 1, data)
            return
          }
          profile.classes.push(data)
        }
      }
    },
    setClassProfile (state, data) {
      const id = data.id
      const oldId = data.oldId

      let classProfiles = [ ...state.classProfiles ]
      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < classProfiles.length; i++) {
        const storeClassProfile = classProfiles[i]
        if (storeClassProfile.id !== oldId) {
          continue
        }
        delete data.oldId
        classProfiles.splice(i, 1, data)
        state.classProfiles = classProfiles
        return
      }

      state.classProfiles.push(data)
    },
    deleteClassProfile (state, data) {
      let classProfiles = [ ...state.classProfiles ]
      for (let i = 0; i < classProfiles.length; i++) {
        const storeClassProfile = classProfiles[i]
        if (storeClassProfile.id !== data.urlParams) {
          continue
        }
        classProfiles.splice(i, 1)
        state.classProfiles = classProfiles
      }
    },
    addEmptyProfile (state) {
      let newId = -1
      for (const item of state.classProfiles) {
        if (parseFloat(item.id) <= newId) {
          newId = item.id - 1
        }
      }

      state.classProfiles.push({
        title: '',
        id: newId,
        classes: []
      })
    },
    addEmptyClassToProfile (state, id) {
      if (empty(state.classProfiles)) {
        return
      }
      let profile = null
      let profileIndex = -1
      for (const index in state.classProfiles) {
        let stateProfile = state.classProfiles[index]
        if (parseFloat(stateProfile.id) === parseFloat(id)) {
          profileIndex = index
          profile = stateProfile
        }
      }

      if (empty(profile)) {
        return
      }

      if (empty(profile.classes)) {
        profile.classes = []
      }

      let newId = -1
      for (const item of state.classes) {
        if (parseFloat(item.id) <= newId) {
          newId = item.id - 1
        }
      }

      profile.classes.push({ id: newId })
      state.classes.push({
        id: newId,
        title: '',
        type: 1,
        profile: {
          id: id
        }
      })
      if (profileIndex < 0) {
        state.classProfiles.push(profile)
        return
      }

      state.classProfiles.splice(profileIndex, 1, profile)
    },
    deleteClass (state, data) {
      const id = data.id
      const profileId = data.profileId

      let classes = [ ...state.classes ]
      for (let i = 0; i < classes.length; i++) {
        const storeClass = classes[i]
        if (storeClass.id !== id) {
          continue
        }
        classes.splice(i, 1)
        state.classes = classes
      }

      for (const profileIndex in state.classProfiles) {
        let profile = state.classProfiles[profileIndex]
        if (profile.id && parseFloat(profile.id) === parseFloat(profileId)) {
          for (let classIndex in profile.classes) {
            let classItem = profile.classes[classIndex]
            if (classItem.id && parseFloat(classItem.id) === parseFloat(id)) {
              profile.classes.splice(classIndex, 1)
            }
          }
        }
      }
    }
  },
  actions: {
    addEmptyClassToProfile (context, profileId) {
      context.commit('addEmptyClassToProfile', profileId)
    },
    addEmptyProfile (context, profileId) {
      context.commit('addEmptyProfile', profileId)
    },
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
        apiService.makeApiCall('resource/class', 'get', true, data, { profiles: true }, 200)
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
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            if (data.type === 2) {
              context.commit('setClassAll', response)
            } else {
              context.commit('setClass', { ...response, oldId: data.id })
            }
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
        apiService.makeApiCall('resource/class', 'post', true, data, { profiles: true }, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setClassProfile', { ...response, oldId: data.id })
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

            if (data.type === 2) {
              context.commit('setClassAll', data)
            } else {
              context.commit('setClass', data)
            }
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
        apiService.makeApiCall('resource/class/' + id, 'put', true, data, { profiles: true }, 200)
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
      if (id < 0) {
        context.commit('deleteClass', data)
        return
      }

      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteClass', data)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteClassProfName (context, data) {
      const id = data.urlParams

      if (id < 0) {
        context.commit('deleteClassProfile', data)
        return
      }

      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/class/', 'delete', true, null, { profileId: id }, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteClassProfile', data)
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
