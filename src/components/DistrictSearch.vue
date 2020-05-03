<template>
  <div class="border border-dark p-3 mb-3">
    <p>Jeśli nie wiesz jaka to dzielnica wykonaj następujące czynności:</p>
    <p><strong>1. Wejdż na <a target="_blank" href="https://geoportal.lublin.eu/sipl/app/index#">tą stronę</a></strong></p>
    <p><strong>2. Przejdż do zakładki ZNAJDŻ ADRES</strong></p>
    <p>-> wybierz ulicę -> punkt adresowy (numer budynku)</p>
    <p><strong>3. Przejdż do zakładki WARSTWY MAPY</strong></p>
    <p>-> warstwy podkładkowe: fotoplan 2014</p>
    <p>-> warstwy tematyczne: dane geodezyjne: granice dzielnic</p>
  </div>
</template>

<script>
  export default {
    name: 'DistrictSearch',
    data () {
      return {
        // if we need to save id in different ulr tabs
        id: this.$route.params.id
      }
    },
    computed: {},
    methods: {
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
