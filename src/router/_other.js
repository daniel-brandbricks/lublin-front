// import store from '@/store';

import HelloWorld from '@/components/HelloWorld'
import Dev from '@/views/Dev'
import My from '@/views/My'

import ConfirmMail from '@/views/mails/ConfirmMail'
import ChangeMail from '@/views/mails/ChangeMail'
import ResetPassword from '@/views/mails/ResetPassword'
import ConfirmSchool from '@/views/mails/ConfirmSchool'

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

const confirmSchool = {
  path: '/school/confirm/:id/:hash',
  name: 'confirm.school',
  component: ConfirmSchool
}

export {
  login,
  dev,
  my,
  confirmSchool,
  confirmMail,
  changeMail,
  resetPassword
}
