// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Dev from '@/views/Dev'
import My from '@/views/My'

import ConfirmMail from '@/views/mails/ConfirmMail'
import ChangeMail from '@/views/mails/ChangeMail'
import ResetPassword from '@/views/mails/ResetPassword'

const login = {
  path: '/login',
  name: 'login',
  // todo change
  component: HelloWorld
}
const dev = {
  path: '/dev',
  name: 'dev',
  component: Dev
}
const my = {
  path: '/my',
  name: 'my',
  component: My
}

const confirmMail = {
  path: '/mail/confirm/:id/:hash',
  name: 'confirm.mail',
  component: ConfirmMail
}
const changeMail = {
  path: '/mail/change/:id/:hash',
  name: 'change.mail',
  component: ChangeMail
}
const resetPassword = {
  path: '/password/reset/:id/:hash',
  name: 'password.reset',
  component: ResetPassword
}

export {
  login,
  dev,
  my,
  confirmMail,
  changeMail,
  resetPassword
}
