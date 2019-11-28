<template>
  <section>

    <!-- Sidebar -->
    <div class="border-right sidebar" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <img src="/static/img/logo.svg" alt="">
      </div>
      <div class="list-group list-group-flush">
        <perfect-scrollbar id="scrollbar" class="custom ps-sidebar">

          <b-link :to="{name:'dashboard'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            dashboard
          </b-link>
          <b-link :to="{name:'www', params: {'tab': 'menu'}}"
                  class="list-group-item">
            <span class="icon icon-iconm_search"></span>
            Strona www
          </b-link>
          <b-link :to="{name:'schools.and.clubs', params: {'tab': 'confirmed'} }"
                  class="list-group-item">
            <span class="icon icon-iconm_search"></span>
            kłuby i szkoły (1,024)
          </b-link>
          <b-link :to="{name:'sport.objects', params: {'tab': 'confirmed'} }"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Obiekty sportowe (2,048)
          </b-link>

          <b-link :to="{name:'leaders', params: {'tab': 'confirmed'} }"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Prowadzący (568)
          </b-link>

          <b-link :to="{name:'participant.groups'}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Lista zawodników (200)
          </b-link>

          <b-link :to="{name:'participants'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Zawodnicy (12,000)
          </b-link>

          <b-link :to="{name:'lessons'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista zajęć (4,000)
          </b-link>

          <b-link :to="{name:'calendar', params: {'tab': 'calendar'}}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Kalendarz <br><span class="pl-4">Zajęć i wydarzeń</span>
          </b-link>

          <b-link :to="{name:'frequency'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Frekwencja
          </b-link>

          <b-link :to="{name:'mtsf'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista MTSF
          </b-link>

          <b-link :to="{name:'events', params: {'tab': 'confirmed'}}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista imprez
          </b-link>

          <b-link :to="{name:'reports', params: {'tab': 'reporting'}}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Raporty
          </b-link>

          <b-link :to="{name:'dictionary', params: {'tab': 'sport-object-type'}}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Słownik
          </b-link>

          <b-link :to="{name:'history'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Historia
          </b-link>

          <b-link :to="{name:'co.administrators'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Współadministratorzy<span class="pl-4"></span>
          </b-link>

          <b-link :to="{name:'messages'}"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Komunikaty<span class="pl-4"></span>
          </b-link>
        </perfect-scrollbar>

      </div>
      <footer class="sidebar-footer">
        <a href="#" class="list-group-item text-center"
           @click.prevent="logout">
          <span class="icon icon-icon_discipline"></span>
          Wylogui
        </a>
      </footer>
    </div>

  </section>
</template>

<script>

  export default {
    name: 'Sidebar',
    data () {
      return {}
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
          .then((response) => {
            this.$router.push({ name: 'login' })
          })
          .catch((error) => {
            console.log(error)
            // todo error handle
          })
      }
    },
    watch: {},
    created () {
    }
  }
</script>

<style>

</style>
