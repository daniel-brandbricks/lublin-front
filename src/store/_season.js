import * as apiService from '@/services/apiService'

export default {
  state: {
    seasons: []
  },
  getters: {
    seasons (state) {
      return state.seasons
    },
    season: (state) => (id) => {
      for (let i = 0; i < state.seasons.length; i++) {
        const season = state.seasons[i]
        if (undefined === season || season === null || season.length < 1) {
          continue
        }
        if (season.id == id) {
          return season
        }
      }
    }
  },
  mutations: {
    setSeasons (state, data) {
      state.seasons = data
    },
    setSeason (state, data) {
      const id = data.id
      const oldId = data.oldId

      let seasons = [...state.seasons]
      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < seasons.length; i++) {
        const storeSeason = seasons[i]
        if (storeSeason.id !== oldId) {
          continue
        }
        delete data.oldId
        seasons.splice(i, 1, data)

        state.seasons = seasons
        return
      }

      state.seasons.push(data)
    },
    deleteSeason (state, data) {
      let seasons = [...state.seasons]
      for (let i = 0; i < seasons.length; i++) {
        const storeSeason = seasons[i]
        if (storeSeason.id !== data.urlParams) {
          continue
        }
        seasons.splice(i, 1)
        state.seasons = seasons
        return
      }
    },
    addEmptySeason (state) {
      let newId = -1
      for (const item of state.seasons) {
        if (parseFloat(item.id) <= newId) {
          newId = item.id - 1
        }
      }

      state.seasons.push({
        id: newId,
        title: '',
        from: null,
        to: null
      })
    },
  },
  actions: {
    addEmptySeason (context, seasonId) {
      context.commit('addEmptySeason', seasonId)
    },
    getSeason (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/season/' + id, 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSeason', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSeasons (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/season', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSeasons', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSeason (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/season', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSeason', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    putSeason (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/season/' + id, 'put', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSeason', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSeason (context, data) {
      const id = data.urlParams

      if (id < 0) {
        context.commit('deleteSeason', data)
        return
      }

      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/season/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSeason', data)
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
