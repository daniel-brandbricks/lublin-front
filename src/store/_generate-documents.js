import axios from 'axios'
import _auth from '@/store/_auth'

export default {
  state: {
    isLoading: false,
    errorCached: false
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    errorCached (state) {
      return state.errorCached
    }
  },
  mutations: {
    isLoading (state, data) {
      state.isLoading = data
    },
    errorCached (state, data) {
      state.errorCached = !state.errorCached
    }
  },
  actions: {
    getPDF (context, data) {
      const fileName = data.type
      const dataJSON = JSON.stringify(data)

      context.commit('isLoading', true)

      function download (url, filename) {
        fetch(url, {
          headers: {
            'X-AUTH-Token': _auth.state.authToken
          }
        }).then(function (t) {
          if (t.status === 400 || t.status === 401 || t.status === 402) {
            context.commit('isLoading', false)
            context.commit('errorCached', false)
            return
          }
          return t.blob().then((b) => {
            var a = document.createElement('a')
            a.href = URL.createObjectURL(b)
            a.setAttribute('download', filename)
            a.click()
            context.commit('isLoading', false)
          }
          )
        })
      }
      download('http://lublin.local/api/pdf-generate/?filters=' + dataJSON, `${fileName}.pdf`)
    },
    getExcel (context, data) {
      const fileName = data.type
      const dataJSON = JSON.stringify(data)

      context.commit('isLoading', true)

      // header with token set in apiService
      axios.get('http://lublin.local/api/xlsx-generate/?filters=' + dataJSON, {
        responseType: 'blob'
      }).then(response => {
        console.log(response)
        let blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel'
        })
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.setAttribute('download', `${fileName}.xlsx`)
        a.click()
        window.URL.revokeObjectURL(url)
        context.commit('isLoading', false)
      })
        .catch(error => {
          if (error.response.status === 400 || error.response.status === 401 || error.response.status === 402) {
            context.commit('isLoading', false)
            context.commit('errorCached', false)
            return
          }
        })
    }
  }
}
