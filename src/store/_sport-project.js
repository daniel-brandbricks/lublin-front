import * as apiService from '@/services/apiService'

export default {
  state: {
    sportProjects: [],
    sportProject: null
  },
  getters: {
    sportProjects (state) {
      return state.sportProjects
    },
    sportProject: (state) => (id) => {
      for (let i = 0; i < state.sportProjects.length; i++) {
        const sportProject = state.sportProjects[i]
        if (undefined === sportProject || sportProject === null || sportProject.length < 1) {
          continue
        }
        if (parseInt(sportProject.id) === parseInt(id)) {
          return sportProject
        }
      }
    }
  },
  mutations: {
    setSportProjects (state, data) {
      state.sportProjects = data
    },
    setSportProject (state, data) {
      const id = data.id
      let sportProjects = [ ...state.sportProjects ]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < sportProjects.length; i++) {
        const storeSportProject = sportProjects[i]
        if (storeSportProject.id !== id) {
          continue
        }
        sportProjects.splice(i, 1, data)

        state.sportProjects = sportProjects
        return
      }

      state.sportProjects.push(data)
    },
    deleteSportProject (state, id) {
      let sportProjects = [ ...state.sportProjects ]
      for (let i = 0; i < sportProjects.length; i++) {
        const storeSportProject = sportProjects[i]
        if (storeSportProject.id !== id) {
          continue
        }
        sportProjects.splice(i, 1)
        state.sportProjects = sportProjects
        return
      }
    }
  },
  actions: {
    getSportProject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sport-project/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportProjects', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSportProjects (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sport-project', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportProject', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSportProject (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sport-project', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportProject', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSportProject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sport-project/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportProject', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSportProject (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sport-project/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSportProject', id)
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
