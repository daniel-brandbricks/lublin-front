// import store from '@/store';

// todo change
import HelloWorld from '@/components/HelloWorld'
import Dev from '@/views/Dev'

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

export {
  login,
  dev
}
