import Vue from 'vue'
import Vuex from 'vuex'
// import * as apiService from '@/services/apiService';
import authModule from './_auth'
import userModule from './_user'
import schoolClubModule from './_school-club'
import eventModule from './_event'
import groupModule from './_group'
import participantModule from './_participant'
import placeModule from './_place'
import skillModule from './_skill'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    userModule,
    schoolClubModule,
    eventModule,
    groupModule,
    participantModule,
    placeModule,
    skillModule
  }
})
