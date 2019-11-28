<template>
  <b-col cols="6">
    <h5>Profilowe</h5>
    <div class="row" v-if="computedList"
         v-for="(profile,index) in computedList" :key="index">
      <div class="col-2">
        <div class="text-center _custom-css">
          <p class="m-auto">{{index + 1}}</p>
        </div>
        <p @click="deleteClassProfile(profile.id)" v-if="undefined !== computedList && computedList.length > 0">
          usuń
        </p>
      </div>
      <div class="col-10 pl-4">
        <b-form-group class="custom">
          <b-form-input id="input-1" class="custom m-0 mb-3"
                        :class="{'error-input-custom': veeErrors.has('profile.profileName'+index)}"
                        :name="'profile.profileName'+index" :key="'profile.profileName'+index"
                        v-validate="{'required':true}" @blur="submitProfName(profile.title, profile.id)"
                        @focus="selectedProfileName = profile.title"
                        v-model="profile.title"></b-form-input>
        </b-form-group>

        <!--    SUB    -->
        <div v-if="profile.classes"
             v-for="(item,itemIndex) in profile.classes" :key="index+'_'+itemIndex">
          <ClassInputData :classId="item.id" :index="itemIndex" :profileId="profile.id"></ClassInputData>
<!--     todo test this component     -->
<!--        {{classes.length}}-->
<!--        <div :key="classes.length">-->
<!--        <div class="row" v-if="getClassesByProfileId(profile.id)"-->
<!--             v-for="(item,itemIndex) in getClassesByProfileId(profile.id)" :key="index+'_'+itemIndex">-->
<!--          <div class="col-2">-->
<!--            <p @click="deleteClass(item)" v-if="getClassesByProfileId(profile.id).length > 0">usuń <span>{{itemIndex + 1}}</span></p>-->
<!--          </div>-->
<!--          <div class="pl-2" :class="checkSelected(index+'_'+itemIndex) ? 'col-8' : 'col-10'">-->
<!--            <b-form-group class="custom">-->
<!--              <b-form-input id="input-1" class="custom m-0"-->
<!--                            @focus="editInput(index+'_'+itemIndex)"-->
<!--                            :class="{'error-input-custom': veeErrors.has('profile.classes.title'+index+'_'+itemIndex)}"-->
<!--                            :name="'profile.classes.title'+index+'_'+itemIndex"-->
<!--                            :key="'profile.classes.title'+index+'_'+itemIndex"-->
<!--                            v-validate="{'required':true}"-->
<!--                            v-model="getClassesByProfileId(profile.id)[itemIndex].title"></b-form-input>-->
<!--            </b-form-group>-->
<!--          </div>-->
<!--          <div class="col-2 p-0" v-show="checkSelected(index+'_'+itemIndex)">-->
<!--            <b-btn @click="submitClass({...getClassesByProfileId(profile.id)[itemIndex], type: 1, profile: {id: profile.id}})"-->
<!--                   class="m-0" block variant="primary">Zapisz-->
<!--            </b-btn>-->
<!--          </div>-->
        </div>
        <div class="d-flex flex-row align-items-center mt-3" v-if="profile.id && profile.id > 0">
          <span class="pl-4">{{profile.classes.length + 1}}</span>
          <b-btn @click="addDefaultDataClass(profile.id)" variant="primary"
                 class="w-50 m-0 ml-3 mb-3">+ Dodaj Kolejny
          </b-btn>
        </div>
        <!--    SUB    -->

      </div>
    </div>

    <div class="row" v-if="checkEmptyProfName()">
      <div class="col-2 mt-4">
        <div class="text-center"
             style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
          <p class="m-auto">{{computedList.length + 1}}</p>
        </div>
      </div>
      <b-col cols="10" class="pl-2 mt-4">
        <b-btn @click="addDefaultProfile" variant="primary" block>+ Dodaj Grupę</b-btn>
      </b-col>
    </div>
  </b-col>
</template>

<script>
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import DictionaryMixin from '@/mixins/dictionary-mixin'
import {mapActions, mapGetters} from 'vuex'
import ClassInputData from '@/views/dictionary/components/ClassInputData'

export default {
  name: 'ClassesProfile',
  mixins: [EventBusEmit, FormMixin, DictionaryMixin],
  components: {ClassInputData},
  data () {
    return {
      getter: 'classProfiles',
      dispatchDelete: 'deleteClass',
      dispatchPost: 'postClass',
      dispatchPut: 'putClass',

      selectedProfileName: '',
      addedClasses: [],
      profileClasses: {}
    }
  },
  computed: {
    ...mapGetters(['classes'])
  },
  methods: {
    ...mapActions(['addEmptyClassToProfile', 'addEmptyProfile']),
    submitProfName (profileName, id) {
      if (this.selectedProfileName.length < 1 && profileName.length < 1) return
      if (id && id > 0) {
        this.$store.dispatch('putClassProfile', {
          title: profileName,
          id: id
        })
      } else {
        this.$store.dispatch('postClassProfile', {title: profileName, id: id})
          .then((response) => {
            this.dataAsArray.splice((this.dataAsArray
              .findIndex(arrayItem => {
                return arrayItem.title !== undefined && arrayItem.title === response.title
              })), 1)
          })
      }

      this.selectedProfileName = ''
    },
    addDefaultDataClass (parentId) {
      this.addEmptyClassToProfile(parentId)
    },
    addDefaultProfile () {
      this.addEmptyProfile()
    },
    deleteClassProfile (id) {
      if (id && id > 0) {
        this.deleteFromForm('deleteClassProfName', null, 'profil', false, null, {urlParams: id})
      } else {
        this.$store.dispatch('deleteClassProfName', {urlParams: id})
      }
    },
    checkEmptyProfName () {
      for (let index in this.profileClassesPrepared) {
        if (this.profileClassesPrepared[index].profileName === '') {
          return false
        }
      }
      return true
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
  }
}
</script>

<style scoped>
  ._custom-css {
    border-radius: 50%;
    box-sizing: border-box;
    height: 36px;
    width: 36px;
    border: 2px solid #D8D8D8;
  }
</style>
