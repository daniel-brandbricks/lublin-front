<template>
  <b-row class="justify-content-center">
    <b-col cols="12" lg="3" class="">
      <h2>Logo</h2>
      <ImageInputAdvanced :imgPath="menu.logo" @afterCropImage="afterCropImage" v-if="menu"
                          :max-height="5000" :max-width="5000"/>
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
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'

  export default {
    name: 'Menu',
    components: { ImageInputAdvanced },
    data () {
      return {
        fields: [
          { key: 'id', label: 'Id', sortable: true },
          { key: 'title', label: 'Tytuł', sortable: true },
          { key: 'link', label: 'Link', sortable: true }
        ],
        menu: null
      }
    },
    computed: {
      ...mapGetters(['menuItems'])
    },
    watch: {
      'menu.logo': function (val) {
        if (val.substring(0, 4) !== 'data') return
        this.$store.dispatch('putMenu', {id: 1, image: this.menu.logo})
      }
    },
    methods: {
      ...mapActions(['getMenuItems']),
      rowRedirect (row) {
        this.$router.push({
          name: 'menu.item.data',
          params: { 'id': row.id }
        })
      },
      afterCropImage (base64) {
        this.menu.logo = base64
      }
    },
    created () {
      this.getMenuItems()
      this.$store.dispatch('getMenu', {id: 1})
        .then(res => {
          console.log(res.image)
          this.menu = {
            logo: res.image
          }
        })
    }
  }
</script>

<style scoped>

</style>
