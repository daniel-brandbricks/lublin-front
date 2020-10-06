import * as apiService from '@/services/apiService'

export default {
  state: {
    menus: [],
    menu: null
  },
  getters: {
    menus (state) {
      return state.menus
    },
    menu: (state) => (id) => {
      for (let i = 0; i < state.menus.length; i++) {
        const menu = state.menus[i]
        if (undefined === menu || menu === null || menu.length < 1) {
          continue
        }
        if (parseInt(menu.id) === parseInt(id)) {
          return menu
        }
      }
    }
  },
  mutations: {
    setMenus (state, data) {
      state.menus = data
    },
    setMenu (state, data) {
      const id = data.id
      let menus = [ ...state.menus ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < menus.length; i++) {
        const storeMenu = menus[i]
        if (storeMenu.id !== id) {
          continue
        }
        menus.splice(i, 1, data)

        state.menus = menus
        return
      }

      state.menus.push(data)
    },
    deleteMenu (state, id) {
      let menus = [ ...state.menus ]
      for (let i = 0; i < menus.length; i++) {
        const storeMenu = menus[i]
        if (storeMenu.id !== id) {
          continue
        }
        menus.splice(i, 1)
        state.menus = menus
        return
      }
    }
  },
  actions: {
    getMenu (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenu', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getMenus (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenus', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postMenu (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenu', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putMenu (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenu', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteMenu (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/menu/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteMenu', id)
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
