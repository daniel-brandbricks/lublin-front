<template>
  <div class="container">
    <b-row class="justify-content-between">
      <b-col cols="6">
        <h4 v-b-toggle.collapse-1><span class="mr-3">^</span>Kłuby i szkoły</h4>
        <b-collapse id="collapse-1" class="mt-2">
          <b-table
            :items="schoolListFiltered"
            :fields="fieldsSchools"
            striped
            sort-icon-left
            responsive="md"
            class="custom table-responsive"
          >
<!--            @row-clicked="rowRedirect"-->
            <template slot="type" slot-scope="scope">
              <div class="d-flex align-items-center justify-content-between">
                <div class="wrap-img-type-table mr-3">
                  <img :src="scope.item.image || 'https://placeimg.com/50/50/any'" alt="">
                </div>
                <span>{{scope.item.type == 0 ? 'Klub' : 'Szkoła'}}</span>
              </div>

            </template>

            <template slot="object" slot-scope="scope">
              <span>{{scope.item.places.length}}</span>
            </template>

            <template slot="data" slot-scope="scope">
              <span>{{scope.item.created}}</span>
            </template>

            <template slot="btnTable" slot-scope="scope">
              <b-btn variant="primary" class="custom mb-0" @click="confirmItem(scope.item.id)">
                Zatwierdź
              </b-btn>
            </template>
            <template slot="edit" slot-scope="scope">
              <b-link class="icon-link">
                <span class="icon icon-iconm_search"></span>
              </b-link>
            </template>

          </b-table>
        </b-collapse>
      </b-col>
      <b-col cols="6">
        <p class="p-3">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore VHS.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore VHS.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore VHS.</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import SchoolsAndClubsMixin from '@/mixins/schools-and-clubs-mixin'

export default {
  components: {},
  mixins: [SchoolsAndClubsMixin],
  data () {
    return {
      fieldsSchools: [
        {key: 'type', label: 'Typ', sortable: true},
        {key: 'name', label: 'Nazwa', sortable: true},
        {key: 'object', label: 'Obiekty sportowe', sortable: true},
        {key: 'data', label: 'Data dodania', sortable: true},
        {key: 'btnTable', label: '', sortable: true},
        {key: 'edit', label: ''}
      ]
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
