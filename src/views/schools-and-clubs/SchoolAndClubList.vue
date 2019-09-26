<template>
  <div>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"></TabLinks>
      </b-col>
    </b-row>

    <b-row class="justify-content-center">
      <b-col cols="8">
        <b-row class="align-items-center mb-3">
          <b-col>
            <b-form-group class="custom">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="selectedType"
                :options="typeOptions"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Dzielnica"
                        :options="optionsTS"/>
          </b-col>
          <b-col cols="4">
            <treeselect class="custom"
                        v-model="districtValue"
                        :multiple="true"
                        placeholder="Szukaj"
                        :options="optionsTS"/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <list-confirmed :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"/>
    <list-to-confirm :key="$route.params.tab" v-if="$route.params.tab === 'to-confirm'"/>

  </div>
</template>

<script>
// node_modules
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import EventBusEmit from '@/mixins/event-bus-emit'
import TabLinks from '../../components/TabLinks'
import EventBus from '@/event-bus'
import ListConfirmed from '@/views/schools-and-clubs/components/ListConfirmed'
import ListToConfirm from '@/views/schools-and-clubs/components/ListToConfirm'

export default {
  components: {TabLinks, Treeselect, ListConfirmed, ListToConfirm},
  mixins: [EventBusEmit],
  data () {
    return {
      tabLinks: [
        {
          title: 'Zatwierdzone',
          link: 'schools.and.clubs',
          tab: 'confirmed'
        },
        {
          title: 'Do zatwierdzenia',
          link: 'schools.and.clubs',
          tab: 'to-confirm'
        }
      ],

      // checkboxes
      selectedType: [],
      typeOptions: [
        {text: 'klub', value: 'club'},
        {text: 'szkola', value: 'school'}
      ],

      // treeselect
      districtValue: null,
      optionsTS: [{
        id: 'a',
        label: 'first',
        children: [{
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        }]
      }, {
        id: 'b',
        label: 'second'
      }, {
        id: 'c',
        label: 'third'
      }]
    }
  },
  computed: {},
  methods: {},
  created () {
    /** @buttonLink route name */
    this.changeAdminNavbarButton({buttonLink: 'school.or.club'})
    this.changeAdminNavbarBreadcrumbs()
  }
}
</script>

<style scoped>

</style>
