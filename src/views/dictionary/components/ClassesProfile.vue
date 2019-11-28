<template>
  <b-col cols="6">
    <h5>Profilowe</h5>
    {{selectedProfileName}}
    <div class="row" v-if="computedList"
         v-for="(profile,index) in computedList" :key="index">
      <div class="col-2">
        <div class="text-center"
             style="border-radius: 50%; box-sizing: border-box;	height: 36px;	width: 36px;	border: 2px solid #D8D8D8;">
          <p class="m-auto">{{index + 1}}</p>
        </div>
        <p @click="deleteByProfName(profile.title)" v-if="computedList.length > 0">usuń</p>
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
        {{classes.length}}
        <div :key="classes.length">
        <div class="row" v-if="getClassesByProfileId(profile.id)"
             v-for="(item,itemIndex) in getClassesByProfileId(profile.id)" :key="index+'_'+itemIndex">
          <div class="col-2">
            <p @click="deleteClass(item)" v-if="getClassesByProfileId(profile.id).length > 0">usuń <span>{{itemIndex + 1}}</span></p>
          </div>
          <div class="pl-2" :class="checkSelected(index+'_'+itemIndex) ? 'col-8' : 'col-10'">
            <b-form-group class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            @focus="editInput(index+'_'+itemIndex)"
                            :class="{'error-input-custom': veeErrors.has('profile.classes.title'+index+'_'+itemIndex)}"
                            :name="'profile.classes.title'+index+'_'+itemIndex"
                            :key="'profile.classes.title'+index+'_'+itemIndex"
                            v-validate="{'required':true}"
                            v-model="getClassesByProfileId(profile.id)[itemIndex].title"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-2 p-0" v-show="checkSelected(index+'_'+itemIndex)">
            <b-btn @click="submitClass({...getClassesByProfileId(profile.id)[itemIndex], type: 1, profile: {id: profile.id}})"
                   class="m-0" block variant="primary">Zapisz
            </b-btn>
          </div>
        </div>
        </div>

        <div class="d-flex flex-row align-items-center mt-3" v-if="profile.id">
          <span class="pl-4">{{getClassesByProfileId(profile.id).length + 1}}</span>
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
        <b-btn @click="addDefaultData" variant="primary" block>+ Dodaj Grupę</b-btn>
      </b-col>
    </div>
  </b-col>
</template>

<script>
import EventBusEmit from '@/mixins/event-bus-emit'
import FormMixin from '@/mixins/form-mixin'
import DictionaryMixin from '@/mixins/dictionary-mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'ClassesProfile',
  mixins: [EventBusEmit, FormMixin, DictionaryMixin],
  data () {
    return {
      getter: 'classProfiles',
      dispatchDelete: 'deleteClass',
      dispatchPost: 'postClass',
      dispatchPut: 'putClass',

      selectedProfileName: '',
      addedClasses: []
    }
  },
  computed: {
    ...mapGetters(['classes'])
  },
  methods: {
    getClassesByProfileId (profileId) {
      let classes = this.addedClasses.filter(obj => {
        return obj.profile.id === profileId
      })
      return [...this.$store.getters.classesProfile(profileId), ...classes]
    },
    submitProfName (profileName, id) {
      console.log(id)
      if (this.selectedProfileName.length < 1 && profileName.length < 1) return
      if (id) {
        this.$store.dispatch('putClassProfile', {
          title: profileName,
          id: id
        })
      } else {
        this.$store.dispatch('postClassProfile', {title: profileName})
          .then((response) => {
            this.dataAsArray.splice((this.dataAsArray
              .findIndex(arrayItem => {
                return arrayItem.title !== undefined && arrayItem.title === response.title
              })), 1)
          })
      }

      this.selectedProfileName = ''
    },
    submitClass (data) {
      if (data.id) {
        this.$store.dispatch('putClass', data)
      } else {
        this.$store.dispatch('postClass', data)
          .then((response) => {
            this.addedClasses.splice((this.addedClasses
              .findIndex(arrayItem => {
                return arrayItem.title === response.title
              })), 1)
          })
      }
    },
    addDefaultDataClass (parentId) {
      this.addedClasses.push({
        title: '',
        type: 1,
        profile: {
          id: parentId
        }
      })
    },
    deleteByProfName (profileName) {
      // todo for empty
      this.deleteFromForm('deleteClassProfName', null, 'profil', false, null, profileName)
      // this.$store.dispatch('deleteClassProfName', profileName)
    },
    deleteClass (item) {
      if (item.id) {
        this.deleteData(item)
      } else {
        this.dataAsArray.splice((this.dataAsArray
          .findIndex(arrayItem => {
            return arrayItem.selfIndex !== undefined && arrayItem.selfIndex === item.selfIndex
          })), 1)
      }
    },
    checkEmptyProfName () {
      for (let index in this.profileClassesPrepared) {
        if (this.profileClassesPrepared[index].profileName === '') {
          return false
        }
      }
      return true
    },
    submitEmptyClass (objToSubmit) {
      this.submitObject()
    }
  },
  created () {
    /** @buttonLink route name || false if button must be hidden */
    this.changeAdminNavbarButton({buttonLink: false})
  }
}
</script>

<style scoped>

</style>
