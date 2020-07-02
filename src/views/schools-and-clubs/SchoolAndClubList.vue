<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <b-row class="justify-content-center" v-if="isAdmin">
      <b-col class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
        <b-row class="align-items-center mb-3">
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              />
            </b-form-group>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="districts"/>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-form-group
              class="custom">
              <b-form-input id="input-1" class="custom m-0"
                            placeholder="Szukaj"
                            v-model="search"/>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <list-confirmed :filters="{selectedType: selectedType, districtValue: districtValue, search: search}"
                    :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"/>
    <list-to-confirm :filters="{selectedType: selectedType, districtValue: districtValue, search: search}"
                     :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"/>

  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import { DISTRICTS } from '@/config/AppConfig'

  import ListMixin from '@/mixins/list-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'

  import ListConfirmed from '@/views/schools-and-clubs/components/ListConfirmed'
  import ListToConfirm from '@/views/schools-and-clubs/components/ListToConfirm'

  export default {
    components: { TabLinks, Treeselect, ListConfirmed, ListToConfirm },
    mixins: [ EventBusEmit, ListMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Zatwierdzone',
            link: 'schools.and.clubs',
            tab: 'confirmed'
          },
          {
            title: 'Do zatwierdzenia (' + this.$store.getters.schoolsToConfirm.length + ')',
            link: 'schools.and.clubs',
            tab: 'to-confirm'
          }
        ],

        // checkboxes
        selectedType: [],
        typeOptions: [
          { text: 'klub', value: 0 },
          { text: 'szkola', value: 1 }
        ],

        // search
        search: '',

        // treeselect
        districtValue: null,
        districts: DISTRICTS
      }
    },
    computed: {
      isDirector () {
        return this.$store.getters.isDirector
      },
      isAdmin () {
        return this.$store.getters.isAdmin
      }
    },
    watch: {
      '$store.getters.schoolsToConfirm': function (val) {
        if (this.isAdmin) {
          this.tabLinks = [
            {
              title: 'Zatwierdzone',
              link: 'schools.and.clubs',
              tab: 'confirmed'
            },
            {
              title: 'Do zatwierdzenia (' + val.length + ')',
              link: 'schools.and.clubs',
              tab: 'to-confirm'
            }
          ]
        } else {
          this.tabLinks = [
            {
              title: 'Zatwierdzone',
              link: 'schools.and.clubs',
              tab: 'confirmed'
            }
          ]
        }
      },
      isAdmin: function (val) {
        this.checkNavButton(val)
      },
      isDirector: function (val) {
        console.log(val)
        this.checkNavButton(val)

        if (this.isAdmin === false) {
          this.tabLinks = [
            {
              title: 'Zatwierdzone',
              link: 'schools.and.clubs',
              tab: 'confirmed'
            }
          ]
        }
      }
    },
    methods: {
      rowRedirect (id, isConfirmed) {
        if (!this.isDirector) return

        this.$router.push({
          name: 'school.or.club',
          params: { 'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed }
        })
      },
      checkNavButton (val) {
        if (val) {
          /** @buttonLink route name || false if button must be hidden */
          this.changeAdminNavbarButton({ buttonLink: 'school.or.club', params: { tab: 'main-data' } })
        } else {
          this.tabLinks = [
            {
              title: 'Zatwierdzone',
              link: 'schools.and.clubs',
              tab: 'confirmed'
            }
          ]
          this.changeAdminNavbarButton({buttonLink: false})
        }
      }
    },
    created () {
      this.$store.dispatch('getSchools', {})
        .then(response => {
          if (this.$store.getters.isDirector && !this.$store.getters.isAdmin) this.$router.push({name: 'school.or.club', params: {'tab': 'main-data', 'id': response[0].id}})
        })

      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'schools.and.clubs', params: { 'tab': 'confirmed' } })
      }

      this.checkNavButton(this.isAdmin)
      this.changeAdminNavbarBreadcrumbs([ { text: 'Kluby i szkoły', active: true } ])
    }
  }
</script>

<style scoped>

</style>
