import * as apiService from '@/services/apiService'

export default {
  state: {
    senders: [],
    sender: null,
    mails: {
      //  status
      read: [],
      unread: []
    },
    mail: null
  },
  getters: {
    mailsRead (state) {
      return state.mails.read
    },
    mailsUnread (state) {
      return state.mails.unread
    },
    mails (state) {
      return state.mails.read.concat(state.mails.unread)
    },
    mail: (state) => (id, isRead) => {
      let mails = []

      if (undefined === isRead) {
        mails = state.mails.read.concat(state.mails.unread)
      } else {
        mails = isRead ? state.mails.read : state.mails.unread
      }

      for (let i = 0; i < mails.length; i++) {
        const mail = mails[i]
        if (undefined === mail || mail === null || mail.length < 1) {
          continue
        }
        if (parseInt(mail.id) === parseInt(id)) {
          return mail
        }
      }
    },
    sender (state) {
      console.log(state.sender)
      return state.sender
    },
    senders (state) {
      return state.senders
    },
    mailById: (state) => (id) => {
      for (let mail in state.mails) {
        if (parseInt(mail.id) === parseInt(id)) {
          return mail
        }
      }
    }
  },
  mutations: {
    //  MAILS
    setReadMails (state, data) {
      state.mails.read = data
    },
    setUnreadMails (state, data) {
      state.mails.unread = data
    },
    setMails (state, data) {
      let mailsRead = []
      let mailsUnread = []

      for (let mailIndex in data) {
        if (data[mailIndex].read) {
          mailsRead.push(data[mailIndex])
        } else {
          mailsUnread.push(data[mailIndex])
        }
      }

      state.mails.read = mailsRead
      state.mails.unread = mailsUnread
    },
    // setMail (state, data) {
    //   console.log(data)            todo maybe like this one
    //   state.mail = data
    setMail (state, data) {
      const id = data.id
      const read = data.read
      let mails = []

      if (undefined === id || id === null) {
        return
      }

      mails = read ? state.mails.read : state.mails.unread

      for (let i = 0; i < mails.length; i++) {
        const storeMail = mails[i]
        if (storeMail.id !== id) {
          continue
        }
        mails.splice(i, 1, data)
        read ? state.mails.read = mails : state.mails.unread = mails

        return
      }

      read ? state.mails.read.push(data) : state.mails.unread.push(data)
    },
    //  SENDER
    // OLD
    setSender (state, data) {
      console.log(data)
      state.sender = data
    },
    deleteSender (state, id) {
      let sender = [ ...state.sender ]
      for (let i = 0; i < sender.length; i++) {
        const storeSender = sender[i]
        if (storeSender.id !== id) {
          continue
        }
        sender.splice(i, 1)
        state.sender = sender
        return
      }
    }
  },
  //  OLD
  actions: {
    getSender (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sender/', 'get', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            console.log(response)
            context.commit('setSender', response['sender'])
            context.commit('setMails', response['mails'])
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    postSender (context, data) {
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sender', 'post', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('setSender', response['sender'])
            context.commit('setMails', response['mails'])
            resolve(response)
          })
          .catch(error => {
            console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteSender (context, data) {
      const id = data.id
      return new Promise((resolve, reject) => {
        apiService.makeApiCall('resource/sender/' + id, 'delete', true, data, null, 200)
          .then(response => {
            if (response === 'error') {
              resolve('error')
              return
            }

            context.commit('deleteSender', response)
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
