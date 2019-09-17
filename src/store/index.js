import Vue from 'vue';
import Vuex from 'vuex';
import * as apiService from '@/services/apiService';
import authModule from './_auth'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    authModule
  }
})
