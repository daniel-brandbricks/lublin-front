<template>
  <b-row class="justify-content-center">
    <b-col cols="8">
      <b-table
        :items="schoolsToConfirm"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
      >
        <template slot="type" slot-scope="scope">
          <div class="d-flex align-items-center justify-content-between">
            <div class="wrap-img-type-table mr-3">
              <img src="https://placeimg.com/50/50/any" alt="">
            </div>
            <span>club/szkola</span>
          </div>

        </template>
        <template slot="btnTable" slot-scope="scope">
          <b-btn variant="primary" class="custom mb-0">
            Zatwierdź
          </b-btn>
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
        {key: 'type', label: 'Typ', sortable: true},
        {key: 'name', label: 'Nazwa', sortable: true},
        {key: 'object', label: 'Obiekty sportowe', sortable: true},
        {key: 'data', label: 'Data dodania', sortable: true},
        {key: 'btnTable', label: '', sortable: true},
        {key: 'edit', label: ''}
      ],
    }
  },
  computed: {
    schoolsToConfirm () {
      return this.$store.getters.schoolsToConfirm
    }
  },
  created () {
    this.$store.dispatch('getSchools', {confirmed: 0})
  }
}
</script>

<style scoped>

</style>
