<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="10" class="mt-4">
      <h2>Strona głowna</h2>
      <b-table
        :items="sections"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive">
        <template slot="status" slot-scope="scope">
          <span class="status inactive" v-if="scope.item"
                :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
        </template>

        <template slot="actions" slot-scope="data">
          <b-link :to="{name:'cms.section', params: {'id': data.item.id}}" class="btn custom btn-primary">
            Szczegóły
          </b-link>
        </template>
      </b-table>

      <h2>Strony pozostałe</h2>
      <b-table
        :items="restPages"
        :fields="fieldsRest"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive">
        <template slot="status" slot-scope="scope">
          <span class="status inactive" v-if="scope.item"
                :class="{'active': scope.item.active}">{{scope.item.active == 1 ? 'aktywny' : 'nieaktywny'}}</span>
        </template>

        <template slot="actions" slot-scope="data">
          <b-link :to="{name:'cms.rest.page', params: {'id': data.item.id}}" class="btn custom btn-primary">
            Szczegóły
          </b-link>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Cms',
    data () {
      return {
        fields: [
          { key: 'id', label: 'Id', sortable: false },
          { key: 'adminTitle', label: 'Tytuł dla administratora', sortable: false },
          { key: 'status', label: 'Status', sortable: false },
          { key: 'actions', label: 'Szczegóły', sortable: false }
        ],
        fieldsRest: [
          { key: 'id', label: 'Id', sortable: false },
          { key: 'adminTitle', label: 'Tytuł dla administratora', sortable: false },
          { key: 'actions', label: 'Szczegóły', sortable: false }
        ]
      }
    },
    computed: {
      ...mapGetters(['sections', 'restPages'])
    },
    methods: {
      ...mapActions(['getSections', 'getRestPages'])
    },
    created () {
      this.getSections()
      this.getRestPages()
    }
  }
</script>

<style scoped>

</style>
