<template>
  <section>

    <!-- Sidebar -->
    <div class="border-right sidebar" id="sidebar-wrapper">
      <b-link :to="{name:'home'}">
      <div class="sidebar-heading">
        <img src="/static/img/logo.svg" alt="">
      </div>
      </b-link>
      <div class="list-group list-group-flush">
        <perfect-scrollbar id="scrollbar" class="custom ps-sidebar">

          <b-link :to="{name:'dashboard'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            dashboard
          </b-link>

          <b-link :to="{name:'profile'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Mój profil ({{(isDirector && !isAdmin) ? 'Dyrektor' : (isAdmin ? 'Admin' : 'Prowadzący')}})<span class="pl-4"></span>
          </b-link>
          <b-link :to="{name:'www', params: {'tab': 'menu'}}"
                  v-if="$store.getters.isAdmin"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-iconm_search"></span>
            Strona www
          </b-link>
          <b-link :to="{name:'schools.and.clubs', params: {'tab': 'confirmed'} }"
                  :class="{'active': 'school.or.club' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-iconm_search"></span>
            kłuby i szkoły (1,024)
          </b-link>
          <b-link :to="{name:'sport.objects', params: {'tab': 'confirmed'} }"
                  active-class="active"
                  :class="{'active': 'sport.object' === $route.name}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Obiekty sportowe (2,048)
          </b-link>

          <b-link :to="{name:'leaders', params: {'tab': 'confirmed'} }"
                  v-if="$store.getters.isAdmin"
                  :class="{'active': 'leader' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Prowadzący (568)
          </b-link>

          <b-link :to="{name:'participant.groups'}"
                  :class="{'active': 'participant.group' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Lista zawodników (200)
          </b-link>

          <b-link :to="{name:'participants'}"
                  :class="{'active': 'participant' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Zawodnicy (12,000)
          </b-link>

          <b-link :to="{name:'lessons'}"
                  :class="{'active': 'lesson' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista zajęć (4,000)
          </b-link>

          <b-link :to="{name:'calendar', params: {'tab': 'calendar'}}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Kalendarz <br><span class="pl-4">Zajęć i wydarzeń</span>
          </b-link>

          <b-link :to="{name:'frequency'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Frekwencja
          </b-link>

          <b-link :to="{name:'mtsf'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista MTSF
          </b-link>

          <b-link :to="{name:'events', params: {'tab': 'confirmed'}}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista imprez
          </b-link>

          <b-link :to="{name:'reports', params: {'tab': 'reporting'}}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Raporty
          </b-link>

          <b-link :to="{name:'dictionary', params: {'tab': 'lesson-category'}}"
                  :class="{'active': 'dictionary' === $route.name}"
                  active-class="active"
                  v-if="$store.getters.isAdmin"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Słownik
          </b-link>

          <b-link :to="{name:'history'}"
                  v-if="$store.getters.isAdmin"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Logi
          </b-link>

          <b-link :to="{name:'co.administrators'}"
                  :class="{'active': 'co.administrator' === $route.name}"
                  v-if="$store.getters.isSU"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Współadministratorzy<span class="pl-4"></span>
          </b-link>

          <b-link :to="{name:'messages'}"
                  active-class="active"
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
    computed: {
      isDirector () {
        return this.$store.getters.isDirector
      },
      isAdmin () {
        return this.$store.getters.isAdmin
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
          .then((response) => {
            this.$router.push({name: 'home'})
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
