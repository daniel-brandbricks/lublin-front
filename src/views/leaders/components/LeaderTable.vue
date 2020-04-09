<template>
  <b-row class="justify-content-center">
    {{fieldsParams}}
    <b-col cols="8">
      <b-table
        ref="leader-table"
        :items="leadersFiltered"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect"
      >
        <template slot="fullName" slot-scope="scope">
          <span>{{scope.item.firstName + ' ' + scope.item.lastName}}</span>
        </template>

        <template slot="disciplines" slot-scope="scope">
          <span/>
          <span class="d-inline" v-for="(discipline,index) in scope.item.disciplines" :key="index">
            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}
          </span>
        </template>

        <!--        <template slot="sportObject" slot-scope="scope">-->
        <!--          <span/>-->
        <!--          <span class="d-inline" v-for="(place,index) in scope.item.places" :key="index">-->
        <!--            {{getPlaceTitleById(place.id, index, scope.item.places.length)}}-->
        <!--          </span>-->
        <!--        </template>-->

        <template slot="lessons" slot-scope="scope">
          <span>{{scope.item.lessons.length}}</span>
        </template>

        <template slot="status" slot-scope="scope">
          <template v-if="$store.getters.isAdmin || $store.getters.isDirector">
            <b-dropdown class="status-dropdown">
              <template v-if="undefined === statusSlot" v-slot:button-content>
              <span class="status c-pointer"
                    :class="{'active': scope.item.active}">
                  {{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}
                </span>
              </template>
              <template v-else v-slot:button-content>
              <span class="status c-pointer"
                    :class="{'active': scope.item.schoolStatus}">
                  {{scope.item.schoolStatus === true ? 'aktywny' : 'nieaktywny'}}
                </span>
              </template>
              <b-dropdown-item :disabled="undefined === statusSlot ? scope.item.active : scope.item.schoolStatus"
                               @click="changeLeaderStatus(scope.item.id, 1)">
                Aktywuj
              </b-dropdown-item>
              <b-dropdown-item :disabled="undefined === statusSlot ? !scope.item.active : !scope.item.schoolStatus"
                               @click="changeLeaderStatus(scope.item.id, 0)">
                Dezaktywuj
              </b-dropdown-item>
            </b-dropdown>

            <div v-if="undefined !== statusSlot" class="mt-1">
              <span>Status w systemie: </span>
              <br>
              <span class="status mb-2" :class="{'active': scope.item.active}">
            {{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}
          </span>
            </div>
          </template>
          <template v-else>
          <span class="status c-pointer"
                :class="{'active': scope.item.active}">
                  {{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}
                </span>
          </template>
        </template>

        <template slot="btnTable" v-if="!isConfirmed" slot-scope="scope">
          <b-btn variant="primary" size="sm" class="custom mb-0" @click="confirmItem(scope.item.id)">
            Zatwierdź
          </b-btn>
        </template>
        <!--        <template slot="status" slot-scope="scope">-->
        <!--            <span class="status"-->
        <!--                  :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>-->
        <!--        </template>-->

        <!--        <template slot="lessons" slot-scope="scope">-->
        <!--          <span/>-->
        <!--          <span class="d-inline" v-for="(lesson,index) in scope.item.lessons" :key="index">-->
        <!--&lt;!&ndash;            {{getDisciplineTitleById(discipline.id, index, scope.item.disciplines.length)}}&ndash;&gt;-->
        <!--          </span>-->
        <!--        </template>-->

        <template slot="edit" slot-scope="scope">
          <b-link class="icon-link">
            <span class="icon icon-iconm_search"/>
          </b-link>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import LeaderMixin from '@/mixins/leader-mixin'
  import TableMixin from '@/mixins/table-mixin'

  import {mapGetters} from 'vuex'

  export default {
    name: 'ListToConfirm',
    props: ['filters', 'isConfirmed', 'idsToPass', 'fieldsParams', 'parentType', 'statusSlot'],
    mixins: [LeaderMixin, TableMixin],
    data () {
      return {
        fields: [
          {key: 'fullName', label: 'Imię i Nazwisko', sortable: true},
          {key: 'disciplines', label: 'Dyscyplina', sortable: true},
          // {key: 'sportObject', label: 'Obiekt', sortable: true},
          {key: 'lessons', label: 'Zajęcia', sortable: true},
          {key: 'status', label: this.statusSlot ? this.statusSlot.columnWord : 'Status w systemie', sortable: true},
          { key: 'btnTable', label: '', sortable: true },
          {key: 'edit', label: ''}
        ]
      }
    },
    computed: {
      ...mapGetters(['disciplines', 'sportObjects', 'lessons']),
      leadersConfirmed () {
        return this.$store.getters.leadersConfirmed
      },
      leaders () {
        let leadersPassedByIds = []
        let storeLeaders = this.isConfirmed === 'all' ? this.$store.getters.leaders
        : this.isConfirmed ? this.$store.getters.leadersConfirmed : this.$store.getters.leadersToConfirm

        let filteredLeaders = []
        for (let leaderIndex in storeLeaders) {
          if (this.statusSlot) {
            let ids = Object.keys(this.statusSlot.ids)
            let preparedLeader = storeLeaders[leaderIndex]
            if (ids.includes(storeLeaders[leaderIndex].id.toString())) {
              preparedLeader.schoolStatus = this.statusSlot.ids[storeLeaders[leaderIndex].id]
              filteredLeaders.push(preparedLeader)
            }
          } else {
            filteredLeaders.push(storeLeaders[leaderIndex])
          }
        }

        // this block for filtering by passed ids through parent-related entities
        if (undefined === this.idsToPass) {
          leadersPassedByIds = filteredLeaders
        } else {
          for (let index in filteredLeaders) {
            if (this.idsToPass.includes(parseInt(filteredLeaders[index].id))) {
              leadersPassedByIds.push(filteredLeaders[index])
            }
          }
        }

        return leadersPassedByIds
      },
      isDirector () {
        return this.$store.getters.isDirector
      }
    },
    methods: {
      changeLeaderStatus (id, status) {
        if (undefined === this.statusSlot) {
          this.$store.dispatch('putLeader', {
            id: id,
            active: status,
            actionType: 'changeStatus'
          })
          return
        }

        this.$emit(this.statusSlot.event, ({id: id, status: status}))
      },
      rowRedirect (row) {
        if (!this.isDirector) return

        this.$router.push({
          name: 'leader',
          params: {'tab': 'main-data',
                   'id': row.id,
                   'isConfirmed': false,
                   'schoolName': undefined === this.statusSlot ? null : this.statusSlot.schoolName,
                   'schoolId': undefined === this.statusSlot ? null : this.statusSlot.schoolId}
        })
        // this.$parent.rowRedirect(row.id, false)
      },
      confirmItem (id) {
        this.$store.dispatch('putLeader', { id: id, confirmed: 1 })
          .then((response) => {
            this.$store.dispatch('getLeaders', { confirmed: 0 })
          })
      }
    },
    created () {
      if (this.isConfirmed === 'all') {
        this.$store.dispatch('getLeaders', {confirmed: 0})
        this.$store.dispatch('getLeaders', {confirmed: 1})
      } else {
        this.$store.dispatch('getLeaders', {confirmed: this.isConfirmed ? 1 : 0})
      }
      // this.$store.dispatch('getDisciplines')
    }
  }
</script>

<style scoped>

</style>
