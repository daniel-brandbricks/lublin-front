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
import historyModule from './_history'
import frequencyModule from './_frequency'
import mainPageModule from './_main-page'
import senderModule from './_sender'
import generateDocumentsModule from './_generate-documents'
import mtsfModule from './_mtsf'
import adminSportObject from './_admin-sport-object'

// cms
import sectionModule from './_section'
import restPageModule from './_rest-page'
import sectionDescriptionModule from './_section-description'
import menuModule from './_menu'
import menuItemModule from './_menu-item'
import footerModule from './_footer'
import sportProjectModule from './_sport-project'

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
    lessonModule,
    frequencyModule,
    historyModule,
    mainPageModule,
    senderModule,
    generateDocumentsModule,
    mtsfModule,
    adminSportObject,

    // cms
    restPageModule,
    sectionModule,
    sectionDescriptionModule,
    menuModule,
    menuItemModule,
    sportProjectModule,
    footerModule
  }
})
