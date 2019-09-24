<template>
  <section>

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading text-center">LOGO</div>

<!--      <b-list-group class="custom sidebar-list">-->
<!--        <b-list-group-item>-->
<!--          <b-link :to="{name:'dashboard'}" active-class="active" class="d-flex align-items-center">-->
<!--            <span class="icon icon-home_off"></span>-->
<!--            <span>DASHBOARD</span>-->
<!--          </b-link>-->
<!--        </b-list-group-item>-->
<!--      </b-list-group>-->

      <div class="list-group list-group-flush">
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">dashboard</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Strona www</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">kłuby i szkoły (1,024)</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">obiekty sportowe (2,048)</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Prowadzący (568)</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Grupy zawodników (200)</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Zawodnicy (12,000)</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Zajęcia (4,000)</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Kalendarz</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Frekwencja</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">MTSF</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Wydarzenia</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Raporty</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Słownik</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">Historia</a>
        <a href="#" class="list-group-item list-group-item-action bg-light text-uppercase">współadministratorzy</a>

        <hr class="mt-5 px-2">
        <a href="#" class="list-group-item list-group-item-action bg-light text-center text-uppercase">wyloguj</a>
      </div>
    </div>

  </section>
</template>

<script>

export default {
  name: 'Sidebar',
  data () {
    return {

    }
  },
  methods: {
  },
  watch: {
  },
  created () {
    console.log('sidebar created')
  }
}
</script>

<style scoped>
</style>
