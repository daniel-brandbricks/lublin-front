<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <h5 class="mb-3">Data</h5>
      <b-table
        :items="tableItems"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
      >
        <!--        @row-clicked="rowRedirect"-->
        <template slot="name" slot-scope="scope">
          <div class="d-flex align-items-center justify-content-between">
            <div class="wrap-img-type-table mr-3">
              <img :src="'https://placeimg.com/50/50/any'" alt="">
            </div>
            <span>{{scope.item.name}}</span>
          </div>
        </template>
        <template slot="edit" slot-scope="scope">
          <b-link class="icon-link">
            <span class="icon icon-iconm_search"></span>
          </b-link>
        </template>

      </b-table>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'ListToConfirm',
  data () {
    return {
      fields: [
        {key: 'name', label: 'Nazwa', sortable: true},
        {key: 'organizer', label: 'Organizator', sortable: true},
        {key: 'location', label: 'Lokalizacja', sortable: true},
        {key: 'duration', label: 'Czas trwania', sortable: true},
        {key: 'edit', label: ''}
      ],
      tableItems: [
        {id: 1, name: 'Project X', organizer: 'Szkoła nr.4', location: 'Al. Jana Pawła II', duration: '6g.'},
        {id: 2, name: 'AP', organizer: 'Kłub Piłek', location: 'Park LK', duration: '5g.'}
      ]
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
  }
}
</script>

<style scoped>

</style>
