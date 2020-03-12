<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="3" class="">
      <h2>Logo</h2>
      <div class="wrap-img-input mb-3">
        <img src="https://placeimg.com/200/200/any" alt="img">
      </div>
      <b-row class="justify-content-center justify-content-md-end">
        <b-col cols="12" sm="6" md="4" lg="12">
          <b-btn variant="primary" class="custom" block>Zmień</b-btn>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12" lg="5">
      <h2>Struktura menu</h2>

      <b-table
        :items="menuItems"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
        @row-clicked="rowRedirect">
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Menu',
    data () {
      return {
        fields: [
          { key: 'id', label: 'Id', sortable: true },
          { key: 'title', label: 'Tytuł', sortable: true },
          { key: 'link', label: 'Link', sortable: true }
        ]
      }
    },
    computed: {
      ...mapGetters(['menuItems'])
    },
    methods: {
      ...mapActions(['getMenuItems']),
      rowRedirect (row) {
        this.$router.push({
          name: 'menu.item.data',
          params: { 'id': row.id }
        })
      }
    },
    created () {
      this.getMenuItems()
    }
  }
</script>

<style scoped>

</style>
