import axios from 'axios'
import _auth from '@/store/_auth'
import {API_EXCEL_GEN_URL, API_PDF_GEN_URL} from '@/config/AppConfig'

export default {
  state: {
    isLoading: false,
    errorCached: false,
    errorCachedGenDoc: false
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    errorCached (state) {
      return state.errorCached
    },
    errorCachedGenDoc (state) {
      return state.errorCachedGenDoc
    }
  },
  mutations: {
    isLoading (state, data) {
      state.isLoading = data
    },
    errorCached (state, data) {
      state.errorCached = !state.errorCached
    },
    errorCachedGenDoc (state, data) {
      state.errorCachedGenDoc = !state.errorCachedGenDoc
    }
  },
  actions: {
    getPDF (context, data) {
      const fileName = data.type
      const dataJSON = JSON.stringify(data)

      context.commit('isLoading', true)

      function download (url, filename) {
        fetch(url, {
          credentials: 'include',
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
        }).catch(err => {
          context.commit('isLoading', false)
          context.commit('errorCachedGenDoc', false)
        })
      }
      // download('http://lublin.bbapp.pl/api/pdf-generate/?filters=' + dataJSON, `${fileName}.pdf`)
      let url = API_PDF_GEN_URL
      console.log(url)
      download(url + dataJSON, `${fileName}.pdf`)
    },
    getExcel (context, data) {
      const fileName = data.type
      const dataJSON = JSON.stringify(data)
      let url = API_EXCEL_GEN_URL
      context.commit('isLoading', true)
      // header with token set in apiService
      // axios.get('http://lublin.bbapp.pl/api/xlsx-generate/?filters=' + dataJSON, {
      axios.get(url + dataJSON, {
        withCredentials: true,
        responseType: 'blob'
      }).then(response => {
        if (undefined === response) {
          context.commit('isLoading', false)
          context.commit('errorCachedGenDoc', false)
        }

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
          }
        })
    }
  }
}
