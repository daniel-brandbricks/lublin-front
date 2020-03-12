import * as apiService from '@/services/apiService'

export default {
  state: {
    menuItems: [],
    menuItem: null
  },
  getters: {
    menuItems (state) {
      return state.menuItems
    },
    menuItem: (state) => (id) => {
      let menuItems = state.menuItems

      if (undefined === id) {
        return
      }

      for (let i = 0; i < menuItems.length; i++) {
        const menuItem = state.menuItems[i]
        if (undefined === menuItem || menuItem === null || menuItem.length < 1) {
          continue
        }
        if (parseInt(menuItem.id) === parseInt(id)) {
          return menuItem
        }
      }
    }
  },
  mutations: {
    setMenuItems (state, data) {
      state.menuItems = data
    },
    setMenuItem (state, data) {
      const id = data.id
      let menuItems = state.menuItems

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < menuItems.length; i++) {
        const storeMenuItem = menuItems[i]
        if (storeMenuItem.id !== id) {
          continue
        }
        menuItems.splice(i, 1, data)

        state.menuItems = menuItems
        return
      }

      state.menuItems.push(data)
    },
    deleteMenuItem (state, id) {
      let menuItems = [ ...state.menuItems ]
      for (let i = 0; i < menuItems.length; i++) {
        const storeMenuItem = menuItems[i]
        if (storeMenuItem.id !== id) {
          continue
        }
        menuItems.splice(i, 1)
        state.menuItems = menuItems
        return
      }
    }
  },
  actions: {
    getMenuItem (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu-item/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenuItem', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getMenuItems (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu-item', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenuItems', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postMenuItem (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu-item', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenuItem', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putMenuItem (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu-item/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenuItem', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteMenuItem (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu-item/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteMenuItem', id)
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
