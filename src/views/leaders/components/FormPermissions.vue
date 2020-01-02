<template>
  <b-row class="justify-content-center">
<!--    <pre>-->
<!--    schoolIds: {{schoolIds}}-->
<!--    permissionIds: {{selectedPermissions}}-->
<!--    </pre>-->
    <b-col cols="6">
      <div class="row mt-2" v-if="permissions"
           v-for="(schoolPermission,index) in permissions" :key="index">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{index + 1}}</p>
          </div>
          <template v-if="permissions.length > 0">
<!--            {{permissions[index].id}}-->
            <p @click="$store.dispatch('deletePermission', {id: permissions[index].id})"
               v-if="permissions[index].id < 0">usuń</p>
            <p @click="deleteFromForm('deletePermission', permissions[index].id)"
               v-else>usuń</p>
          </template>
        </div>
        <div class="col-10">
          <h5 class="mb-3">Dane ogólne</h5>
<!--          {{permissions[index].school.id}}-->
          <treeselect class="custom mb-3" v-if="permissions[index].school"
                      v-model="permissions[index].school.id"
                      :multiple="false"
                      :class="{'error-input-custom': veeErrors.has('leader.schoolPermissions.school'+index)}"
                      :name="'leader.schoolPermissions.school'+index" :key="'leader.schoolPermissions.school'+index"
                      v-validate="{'required':true}" placeholder="Kłub / szkoła"
                      :options="schoolsTreeselect"/>

<!--          {{permissions[index].places}}-->
          <treeselect class="custom"
                      v-model="permissions[index].places"
                      :multiple="true"
                      :class="{'error-input-custom': veeErrors.has('leader.schoolPermissions.places'+index)}"
                      :name="'leader.schoolPermissions.places'+index" :key="'leader.schoolPermissions.places'+index"
                      v-validate="{'required':true}" placeholder="Obiekt"
                      :options="sportObjectsTreeselect"/>

          <h5 class="my-4">Status</h5>
          <b-form-group>
            <b-form-radio v-model="permissions[index].status" :value="element.value"
                          class="d-inline-block mr-3"
                          :class="{'error-input-custom': veeErrors.has('participant.active'+radioIndex+'_'+index)}"
                          :name="'participant.active'+radioIndex+'_'+index"
                          :key="'participant.active'+radioIndex+'_'+index"
                          v-validate="{'required':true}"
                          v-for="(element,radioIndex) in [{title: 'Tak', value: true}, {title: 'Nie', value: false}]">
              {{ element.title }}
            </b-form-radio>
          </b-form-group>

          <h5 class="my-4">Uprawnienia</h5>
          <div class="row" v-if="permissions[index].permissions"
               v-for="(permission,permissionIndex) in permissions[index].permissions" :key="index+'_'+permissionIndex">
            <div class="col-2">
              <div class="text-center">
                <p class="m-auto">{{permissionIndex + 1}}</p>
              </div>
              <p class="_text-delete-left" v-if="permissions[index].permissions.length > 0"
                 @click="$store.dispatch('deletePermissionRow', {parentId: permissions[index].id, index: permissionIndex})">
                usuń</p>
            </div>
            <div class="col-10">
<!--              {{permissions[index].permissions[permissionIndex]}}-->
              <treeselect class="custom mb-3" v-if="permissions[index].permissions[permissionIndex]"
                          v-model="permissions[index].permissions[permissionIndex].id"
                          :multiple="false"
                          :class="{'error-input-custom': veeErrors.has('permissions.permissions'+index+'_'+permissionIndex)}"
                          :name="'permissions.permissions'+index+'_'+permissionIndex"
                          :key="'permissions.permissions'+index+'_'+permissionIndex"
                          v-validate="{'required':true}"
                          placeholder="Dyscyplina"
                          :options="permissionsDataTreeselect(index)"/>

              <b-form-group class="custom my-3" v-if="permissionOptions(permissions[index].permissions[permissionIndex].id)">
                <b-form-checkbox-group
                  :id="'checkbox-group-type'+index+'_'+permissionIndex"
                  v-model="permissions[index].permissions[permissionIndex].selected"
                  :options="permissionOptions(permissions[index].permissions[permissionIndex].id)"
                  name="checkbox-group-type"/>
              </b-form-group>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-2">
              <div class="text-center">
                <p class="m-auto">{{permissions[index].permissions.length + 1}}</p>
              </div>
            </div>
            <div class="col-10">
              <b-btn @click="$store.dispatch('addEmptyPermissionRow', {parentId: permissions[index].id})"
                     variant="primary" block class="">+ Dodaj uprawnienie
              </b-btn>
            </div>
          </div>

        </div>
      </div>
      <div class="row mt-4">
        <div class="col-2">
          <div class="text-center _custom-css">
            <p class="m-auto">{{permissions.length + 1}}</p>
          </div>
        </div>
        <div class="col-10">
          <b-btn @click="$store.dispatch('addEmptyPermission')" variant="primary" block class="w-50">+ Dodaj obiekt
          </b-btn>
        </div>
      </div>

      <!--buttons-->
      <b-row class="mt-5 col-10 offset-2 p-0">
        <b-col>
          <b-btn variant="delete" class="custom" :disabled="leader.id === undefined"
                 @click="deleteFromForm('deleteLeader', leader.id, undefined, 'sport.objects', {tab: 'confirmed'})">
            <!-- todo Vetal' -->
            Usuń
          </b-btn>
        </b-col>
        <b-col>
          <b-link block class="custom btn" :to="{ name: 'leaders', params: { 'tab': 'confirmed' } }">
            Anuluj
          </b-link>
        </b-col>
        <b-col class="p-0">
          <b-btn block class="custom" @click="submit">
            Zapisz
          </b-btn>
        </b-col>
      </b-row>

    </b-col>
  </b-row>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import FormMixin from '@/mixins/form-mixin'
  import {PERMISSIONS} from '@/config/AppConfig'

  export default {
    name: 'FormMainData',
    props: ['leader', 'schoolIds'],
    components: {Treeselect},
    mixins: [FormMixin],
    data () {
      return {
        isPlacesAreAnArray: false,

        selectedSchoolsIds: [],
        selectedPermissions: {},

        permissionsData: PERMISSIONS
      }
    },
    computed: {
      permissions: {
        get () {
          console.log('get computed permissions')
          this.checkUniqSchools(this.$store.getters.permissions)
          return this.$store.getters.permissions
        },
        set (value) {
          this.$store.dispatch('setPermissions', value)
        }
      },
      schools () {
        return this.$store.getters.schools
      },
      sportObjects () {
        return this.$store.getters.sportObjects
      },
      schoolsTreeselect () {
        let schools = this.schools
        let prepared = []

        for (let index in schools) {
          if (this.schoolIds.includes(schools[index].id)) {
            // need for making schools in select unique
            if (this.selectedSchoolsIds.indexOf(schools[index].id) === -1) {
              prepared.push({id: schools[index].id, label: schools[index].name})
            } else {
              prepared.push({id: schools[index].id, label: schools[index].name, isDisabled: true})
            }
          }
        }
        return prepared
      },
      sportObjectsTreeselect () {
        let sportObjects = this.sportObjects
        let prepared = []

        for (let index in sportObjects) {
          prepared.push({id: sportObjects[index].id, label: sportObjects[index].title})
        }
        return prepared
      }
    },
    methods: {
      clearPermissionsSelected (permission) {
        if (![2, 3, 4, 6, 8].includes(permission.id)) {
          permission.selected = []
        }
      },
      permissionOptions (permissionId) {
        if ([2, 3, 4, 8].includes(permissionId)) {
          return [
            {text: 'czyta', value: '1'},
            {text: 'tworzy', value: '2'},
            {text: 'zmienia', value: '3'}
          ]
        }
        if (parseInt(permissionId) === 6) {
          return [
            {text: 'tworzy', value: '2'},
            {text: 'zmienia', value: '3'}
          ]
        }
        return false
      },
      permissionsDataTreeselect (schoolIndex) {
        let permissions = this.permissionsData
        let prepared = []

        for (let index in permissions) {
          // need for making schools in select unique
          if (this.selectedPermissions[schoolIndex].indexOf(permissions[index].id) === -1) {
            prepared.push({id: permissions[index].id, label: permissions[index].label})
          } else {
            prepared.push({id: permissions[index].id, label: permissions[index].label, isDisabled: true})
          }
        }
        return prepared
      },
      checkUniqSchools (permissions) {
        console.log(permissions)

        this.selectedSchoolsIds = []
        for (let index in permissions) {
          // uniq schools
          if (this.selectedSchoolsIds.indexOf(permissions[index].school.id) === -1) {
            this.selectedSchoolsIds.push(permissions[index].school.id)
          }

          // uniq permissions
          this.selectedPermissions[index] = []
          for (let permissionIndex in permissions[index].permissions) {
            this.clearPermissionsSelected(permissions[index].permissions[permissionIndex])
            this.selectedPermissions[index].push(permissions[index].permissions[permissionIndex].id)
          }
        }
      },
      addDiscipline () {
        this.$parent.addDiscipline()
      },
      removeDiscipline (index) {
        this.$parent.removeDiscipline(index)
      },
      submit () {
        this.preSubmit()
          .then((result) => {
            if (!result) {
              this.loading = false
              return
            }

            let data = JSON.parse(JSON.stringify(this.permissions))

            for (let index in data) {
              let permissionsJSON = JSON.stringify(data[index].permissions)
              console.log(permissionsJSON)
              data[index].permissions = permissionsJSON
            }

            this.$store.dispatch('putPermissions', {
              id: this.leader.id,
              permissions: data
            })
            this.loading = false
          })
      }
    },
    created () {
      this.$store.dispatch('getSchools')
      this.$store.dispatch('getSportObjects', {confirmed: 0})
      this.$store.dispatch('getSportObjects', {confirmed: 1})
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

  ._text-delete-left {
    position: absolute;
    left: -25px;
    top: 0;
  }
</style>
