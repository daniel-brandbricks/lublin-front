import * as apiService from '@/services/apiService'

export default {
  state: {
    disciplines: []
  },
  getters: {
    disciplines (state) {
      return state.disciplines
    },
    discipline: (state) => (id) => {
      for (let i = 0; i < state.disciplines.length; i++) {
        const discipline = state.disciplines[i]
        if (undefined === discipline || discipline === null || discipline.length < 1) {
          continue
        }
        if (parseInt(discipline.id) === parseInt(id)) {
          return discipline
        }
      }
    }
  },
  mutations: {
    setDisciplines (state, data) {
      state.disciplines = data
    },
    setDiscipline (state, data) {
      const id = data.id
      let disciplines = [...state.disciplines]

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < disciplines.length; i++) {
        const storeDiscipline = disciplines[i]
        if (storeDiscipline.id !== id) {
          continue
        }
        disciplines.splice(i, 1, data)

        state.disciplines = disciplines
        return
      }

      state.disciplines.push(data)
    },
    deleteDiscipline (state, id) {
      let disciplines = [...state.disciplines]
      for (let i = 0; i < disciplines.length; i++) {
        const storeDiscipline = disciplines[i]
        if (storeDiscipline.id !== id) {
          continue
        }
        disciplines.splice(i, 1)
        state.disciplines = disciplines
        return
      }
    }
  },
  actions: {
    getDiscipline (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/discipline/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setDiscipline', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getDisciplines (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/discipline', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setDisciplines', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postDiscipline (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/discipline', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setDiscipline', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putDiscipline (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/discipline/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setDiscipline', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteDiscipline (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/discipline/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteDiscipline', id)
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
