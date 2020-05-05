import * as apiService from '@/services/apiService'

export default {
  state: {
    mainPageData: {},
    frontLessons: {
      data: [],
      totalCount: 1
    },
    frontEvents: [],
    frontSportProjects: [],
    frontSportClasses: {},
    frontDisciplines: [],
    menuAndFooter: []
  },
  getters: {
    frontSportProjects (state) {
      return state.frontSportProjects
    },
    frontSportClasses (state) {
      return state.frontSportClasses
    },
    mainPageData (state) {
      return state.mainPageData
    },
    frontLessons (state) {
      return state.frontLessons
    },
    frontLesson: (state) => (id) => {
      if (state.frontLessons.data === undefined || state.frontLessons.data === null) return
      for (let i = 0; i < state.frontLessons.data.length; i++) {
        const frontLesson = state.frontLessons.data[i]
        if (undefined === frontLesson || frontLesson === null || frontLesson.length < 1) {
          continue
        }
        if (parseInt(frontLesson.id) === parseInt(id)) {
          return frontLesson
        }
      }
    },
    frontEvent: (state) => (id) => {
      if (state.frontEvents === undefined || state.frontEvents === null) return
      for (let i = 0; i < state.frontEvents.length; i++) {
        const frontEvent = state.frontEvents[i]
        if (undefined === frontEvent || frontEvent === null || frontEvent.length < 1) {
          continue
        }
        if (parseInt(frontEvent.id) === parseInt(id)) {
          return frontEvent
        }
      }
    },
    frontEvents (state) {
      return state.frontEvents
    },
    frontDisciplines (state) {
      return state.frontDisciplines
    },
    menuAndFooter (state) {
      return state.menuAndFooter
    }
  },
  mutations: {
    setSportProjects (state, data) {
      state.frontSportProjects = data
    },
    setSportClasses (state, data) {
      state.frontSportClasses = data
    },
    setMainPageData (state, data) {
      state.mainPageData = data
    },
    setFrontLessons (state, data) {
      state.frontLessons = data
    },
    setFrontLesson (state, data) {
      const id = data.id
      let frontLessons = state.frontLessons || []

      if (undefined === id || id === null) {
        return
      }

      if (frontLessons.data === undefined || frontLessons.data === null) frontLessons.data = []

      for (let i = 0; i < frontLessons.data.length; i++) {
        const storeLesson = frontLessons.data[i]
        if (storeLesson.id !== id) {
          continue
        }
        frontLessons.data.splice(i, 1, data)

        state.frontLessons.data = frontLessons.data
        return
      }

      frontLessons.data.push(data)
    },
    setFrontEvent (state, data) {
      const id = data.id
      let frontEvents = state.frontEvents || []

      if (undefined === id || id === null) {
        return
      }

      for (let i = 0; i < frontEvents.length; i++) {
        const storeEvent = frontEvents[i]
        if (storeEvent.id !== id) {
          continue
        }
        frontEvents.splice(i, 1, data)

        state.frontEvents = frontEvents
        return
      }

      frontEvents.push(data)
    },
    setFrontEvents (state, data) {
      state.frontEvents = data
    },
    setFrontDisciplines (state, data) {
      state.frontDisciplines = data
    },
    setMenuAndFooter (state, data) {
      state.menuAndFooter = data
    }
  },
  actions: {
    getMainPageData (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('main-mage/', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMainPageData', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getFilteredLessons (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('main-mage/filtered-lessons', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFrontLessons', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getFrontLesson (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('main-mage/front-lesson/' + id, 'get', true, null, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFrontLesson', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    getFrontEvent (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('main-mage/front-event/' + id, 'get', true, null, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFrontEvent', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error.response)
          })
      })
    },
    getFilteredEvents (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('main-mage/filtered-events', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFrontEvents', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getMenuAndFooter (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('main-mage/menu-footer', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setMenuAndFooter', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getFrontDisciplines (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('front/disciplines', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setFrontDisciplines', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSportProjects (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('front/sport-projects', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportProjects', response)
            resolve()
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSportClasses (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('front/sport-classes', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSportClasses', response)
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getSKS (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('front/sks', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    getNavbarItems (context, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('front/navbar-items', 'get', true, data, data, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    }
  }
}
