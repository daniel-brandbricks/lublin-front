<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="8">
      <h2>Struktura menu</h2>

      <b-table
        :items="items"
        :fields="fields"
        striped
        sort-icon-left
        responsive="md"
        class="custom table-responsive"
      ></b-table>
      <b-row class="justify-content-center justify-content-sm-end">
        <b-col cols="12" sm="4">
          <b-btn variant="secondary" class="custom" block>Anuluj</b-btn>
        </b-col>
        <b-col cols="12" sm="4">
          <b-btn variant="primary" class="custom" block>Zapisz</b-btn>
        </b-col>

      </b-row>

    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        fields: [
          { key: 'last_name', sortable: true },
          { key: 'first_name', sortable: true },
          { key: 'age', sortable: false },
          { key: 'isActive', sortable: false }
        ],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
