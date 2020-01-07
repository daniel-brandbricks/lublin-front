<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="align-items-center mb-3">
          <!--          <b-col>-->
          <!--            <b-form-group class="custom">-->
          <!--              <b-form-checkbox-group-->
          <!--                id="checkbox-group-1"-->
          <!--                v-model="selectedType"-->
          <!--                :options="typeOptions"-->
          <!--                name="flavour-1"-->
          <!--              ></b-form-checkbox-group>-->
          <!--            </b-form-group>-->
          <!--          </b-col>-->
          <b-col cols="6">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="districts"/>
          </b-col>
          <b-col cols="6">
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

    <SportObjectTable :filters="{districtValue: districtValue, search: search}" :sportObjectTypes="sportObjectTypes"
                      :is-confirmed="true" :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"
                      :fieldsParams="[
                        { key: 'lessons', label: 'Zajęcia', toInsert: true },
                        { key: 'status', label: 'Status w systemie', sortable: true, toInsert: true },
                        { key: 'edit', label: '', toInsert: true }
                        ]"/>
    <SportObjectTable :filters="{districtValue: districtValue, search: search}" :sportObjectTypes="sportObjectTypes"
                      :is-confirmed="false" :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"
                      :fieldsParams="[
                        { key: 'data', label: 'Data dodania', toInsert: true },
                        { key: 'btnTable', label: '', toInsert: true }
                        ]"/>
    <!--    <list-confirmed :filters="{districtValue: districtValue, search: search}"-->
    <!--                    :sportObjectTypes="sportObjectTypes"-->
    <!--                    :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"/>-->
    <!--    <list-to-confirm :filters="{districtValue: districtValue, search: search}"-->
    <!--                     :sportObjectTypes="sportObjectTypes"-->
    <!--                     :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"/>-->

  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import {DISTRICTS} from '@/config/AppConfig'

  import ListMixin from '@/mixins/list-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import TabLinks from '../../components/TabLinks'
  // import EventBus from '@/event-bus'
  import SportObjectTable from '@/views/sport-objects/components/SportObjectTable'

  export default {
    components: {TabLinks, Treeselect, SportObjectTable},
    mixins: [EventBusEmit, ListMixin],
    data () {
      return {
        tabLinks: [
          {
            title: 'Zatwierdzone',
            link: 'sport.objects',
            tab: 'confirmed'
          },
          {
            title: 'Do zatwierdzenia',
            link: 'sport.objects',
            tab: 'to-confirm'
          }
        ],

        // checkboxes
        // selectedType: [],
        // typeOptions: [
        //   { text: 'klub', value: 0 },
        //   { text: 'szkola', value: 1 }
        // ],

        // search
        search: '',

        // treeselect
        districtValue: null,
        districts: DISTRICTS
      }
    },
    computed: {
      sportObjectTypes () {
        return this.$store.getters.sportObjectTypes
      }
    },
    methods: {
      rowRedirect (id, isConfirmed) {
        this.$router.push({
          name: 'sport.object',
          params: {'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed}
        })
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({name: 'sport.objects', params: {'tab': 'confirmed'}})
      }

      this.$store.dispatch('getSportObjectTypes')

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: 'sport.object', params: {tab: 'main-data'}})
      this.changeAdminNavbarBreadcrumbs([{text: 'Obiekty sportowe', active: true}])
    }
  }
</script>

<style scoped>

</style>
