import axios from 'axios'

export default {
  state: {
    isLoading: false
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
  },
  mutations: {
    isLoading (state, data) {
      state.isLoading = data
    },
  },
  actions: {
    getPDF (context, data) {
      const fileName = data.type
      const dataJSON = JSON.stringify(data)

      context.commit('isLoading', true)

      function download (url, filename) {
        fetch(url).then(function (t) {
          console.log(t)
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

      axios.get('http://lublin.local/api/xlsx-generate/?filters=' + dataJSON, {
        responseType: 'blob'
      }).then(response => {
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
    }
  }
}
