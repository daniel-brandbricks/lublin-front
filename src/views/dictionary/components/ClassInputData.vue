<template>
  <div class="w-100">
    <!--    {{classId}}-->
<!--        {{ classItem }}-->
    <form @submit.prevent="submit">
      <div class="row">
        <div class="col-2">
          <!--            @click="deleteClass(item)"-->
          <!--            v-if="profileClasses[profile.id].length > 0"-->
          <p @click="deleteClass(classItem)">usuń
                          <span>{{index + 1}}</span>
          </p>
        </div>
        <div class="pl-2" :class="isFocused ? 'col-7' : 'col-10'">
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom m-0"
                          @focus="isFocused = true" @blur="focusOut"
                          :class="{'error-input-custom': veeErrors.has('profile.classes.title')}"
                          :name="'profile.classes.title'"
                          :key="'profile.classes.title'"
                          v-validate="'required'"
                          v-model="classItem.title"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-3 p-0" v-if="isFocused">
          <!--            @click="submitClass({...profileClasses[profile.id][itemIndex], type: 1, profile: {id: profile.id}})"-->
          <b-btn type="submit" class="m-0" block variant="primary">Zapisz
          </b-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {empty} from '@/config/methods'
import FormMixin from '@/mixins/form-mixin'

export default {
  name: 'ClassInputData',
  props: [
    'classId', 'index', 'profileId'
  ],
  mixins: [FormMixin],
  data () {
    return {
      isFocused: false
    }
  },
  computed: {
    ...mapGetters(['classItemPerId']),
    classItem () {
      let id = this.classId
      if (empty(id)) {
        return {}
      }

      let item = this.classItemPerId(id)
      if (empty(item)) {
        return {}
      }

      return Object.assign({}, item)
    }
  },
  methods: {
    deleteClass (item) {
      console.log(item)
      if (item.id < 0) {
        this.$store.dispatch('deleteClass', {profileId: this.profileId, id: item.id})
      } else {
        this.deleteFromForm('deleteClass', item.id, 'klasę', false, null, {profileId: this.profileId})
      }
    },
    focusOut () {
      let self = this
      setTimeout(function () {
        self.isFocused = false
      }, 300)
    },
    submit () {
      let method = 'postClass'
      if (this.classItem.id > 0) {
        method = 'putClass'
      }
      this.isFocused = false
      this.$store.dispatch(method, this.classItem)
    }
  }

}
</script>

<style scoped>

</style>
