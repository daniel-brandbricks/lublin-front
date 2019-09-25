// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// Bootstrap-vue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

// PerfectScrollbar
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'

// Treeselect
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Treeselect from '@riophae/vue-treeselect'

// Cropper
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

// DatePicker
import DatePicker from 'vue2-datepicker';

import './assets/scss/style.scss'

// todo
// Vee validate
// import locale from '@/config/ValidatorConfig';
// import VeeValidate from 'vee-validate';
// const rulesPlugin = ({ Validator }) => {
//   Validator.localize('pl', locale);
// };
// VeeValidate.use(rulesPlugin);
// Vue.use(VeeValidate, {
//   inject: true,
//   fieldsBagName: 'veeFields',
//   errorBagName: 'veeErrors'
// });

Vue.use(PerfectScrollbar)
Vue.use(BootstrapVue)
Vue.use(Treeselect)
Vue.component(DatePicker)
Vue.component(VueCropper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>',
  created () {
  }
})
