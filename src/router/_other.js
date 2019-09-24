// import store from '@/store';

// todo change
import HelloWorld from '@/components/HelloWorld'
import Dev from '@/views/Dev'
import My from '@/views/My'

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

export {
  login,
  dev,
  my
}
