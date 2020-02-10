import Vue from 'vue'
import Vuex from 'vuex'
// import * as apiService from '@/services/apiService';
import authModule from './_auth'
import userModule from './_user'
import schoolClubModule from './_school-club'
import eventModule from './_event'
import groupModule from './_group'
import participantModule from './_participant'
import participantGroupModule from './_participant-group'
import sportObjectModule from './_sport-object'
import sportObjectTypeModule from './_sport-object-type'
import skillModule from './_skill'
import disciplineModule from './_disciplines'
import lessonCategoryModule from './_lesson-category'
import classModule from './_class'
import seasonModule from './_season'
import leaderModule from './_leader'
import lessonModule from './_lesson'
import permissionModule from './_permission'
import administratorModule from './_administrator'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authModule,
    userModule,
    schoolClubModule,
    eventModule,
    groupModule,
    participantModule,
    participantGroupModule,
    sportObjectModule,
    sportObjectTypeModule,
    disciplineModule,
    lessonCategoryModule,
    classModule,
    seasonModule,
    leaderModule,
    skillModule,
    permissionModule,
    administratorModule,
    lessonModule
  }
})
