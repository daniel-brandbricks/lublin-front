<template>
  <div class="container">
    <SportObjectTable :sportObjectTypes="sportObjectTypes"
                      :is-confirmed="true" :key="$route.params.tab" v-if="$route.params.tab === 'confirmed'"
                      :fieldsParams="[
                        { key: 'schoolOrClub', label: 'Nazwa Klubu/Szkoły', sortable: true, toInsert: true },
                        { key: 'status', label: 'Status w systemie', sortable: true, toInsert: true },
                        { key: 'edit', label: '', toInsert: true }
                        ]"/>
  </div>
</template>

<script>
  import SportObjectTable from '@/views/sport-objects/components/SportObjectTable'

  export default {
    components: { SportObjectTable },
    mixins: [],
    data () {
      return {}
    },
    computed: {
      sportObjectTypes () {
        return this.$store.getters.sportObjectTypes
      }
    },
    methods: {},
    created () {
      this.$store.dispatch('getSportObjectTypes')
    }
  }
</script>

<style scoped>

</style>
