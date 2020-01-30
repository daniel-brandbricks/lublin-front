import * as apiService from '@/services/apiService'
import {prepareLeaderPermissions} from '@/services/userService'

export default {
  state: {
    permissions: []
  },
  getters: {
    permissions (state) {
      return state.permissions
    },
    permissionPerId: (state) => (id) => {
      return state.permissions.find(element => parseFloat(element.id) === parseFloat(id))
    }
  },
  mutations: {
    clearPermissions (state, data) {
      state.permissions = []
    },
    setPermissions (state, data) {
      state.permissions = data
    },
    setPermission (state, data) {
      const id = data.id
      const oldId = data.oldId

      let permissions = [...state.permissions]
      if (undefined === id || id === null) {
        return
      }

      for (const permissionIndex in permissions) {
        let profile = permissions[permissionIndex]
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

      for (let i = 0; i < permissions.length; i++) {
        const storePermission = permissions[i]
        if (storePermission.id !== oldId) {
          continue
        }
        delete data.oldId
        permissions.splice(i, 1, data)

        state.permissions = permissions
        return
      }

      state.seasons.push(data)
    },
    deletePermission (state, data) {
      let permissions = [...state.permissions]
      for (let i = 0; i < permissions.length; i++) {
        const storePermission = permissions[i]
        if (storePermission.id !== data.id) {
          continue
        }
        permissions.splice(i, 1)
        state.permissions = permissions
        return
      }
    },
    deletePermissionRow (state, data) {
      let permissions = [...state.permissions]
      for (let i = 0; i < permissions.length; i++) {
        const storePermission = permissions[i]
        if (storePermission.id !== data.parentId) {
          continue
        }
        for (let permissionIndex in storePermission.permissions) {
          if (parseInt(data.index) === parseInt(permissionIndex)) {
            storePermission.permissions.splice(data.index, 1)
          }

          permissions[i] = storePermission
        }
      }
      state.permissions = permissions
    },
    addEmptyPermissionRow (state, data) {
      for (const item of state.permissions) {
        if (parseFloat(item.id) === parseFloat(data.parentId)) {
          item.permissions.push({id: null, 'selected': []})
        }
      }
    },
    addEmptyPermission (state) {
      let newId = -1
      for (const item of state.permissions) {
        if (parseFloat(item.id) <= newId) {
          newId = item.id - 1
        }
      }

      state.permissions.push({
        id: newId,
        permissions: [{id: null, 'selected': []}], // '[{"id": "null"}]',
        status: true,
        school: {
          id: null
        },
        places: []
      })
    }
  },
  actions: {
    setPermissions (context, value) {
      console.log(value)
    },
    addEmptyPermission (context) {
      context.commit('addEmptyPermission')
    },
    addEmptyPermissionRow (context, data) {
      context.commit('addEmptyPermissionRow', data)
    },
    getPermissionsByIds (context, data) {
      const ids = data.filter(Boolean)
      if (undefined === ids || ids === null || ids.length < 1) {
        return false
      }

      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/permission', 'get', true, ids, {ids: ids}, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            let permissions = prepareLeaderPermissions(response)
            context.commit('setPermissions', permissions)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deletePermission (context, data) {
      const id = data.id
      if (id < 0) {
        context.commit('deletePermission', data)
        return
      }

      console.log('remove from db')
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/permission/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deletePermission', data)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deletePermissionRow (context, data) {
      context.commit('deletePermissionRow', data)
    },
    putPermissions (context, data) {
      const id = data.id
      const permissions = data.permissions
      return new Promise((resolve, reject) => {
        console.log(permissions)
        apiService.makeApiCall('resource/permission/' + id, 'put', true, permissions, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            let preparedPermissions = prepareLeaderPermissions(response)
            console.log(preparedPermissions)
            context.commit('setPermissions', preparedPermissions)
            resolve(data)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    clearPermissions (context) {
      context.commit('clearPermissions')
    }
  }
}
