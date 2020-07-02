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
                  v-if="$store.getters.isDirector || $store.getters.isAdmin"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            dashboard
          </b-link>

          <b-link :to="{name:'profile'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Mój profil ({{(isDirector && !isAdmin) ? 'Szkoła / Klub' : (isAdmin ? 'Admin' : 'Prowadzący')}})<span class="pl-4"></span>
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
            Kluby i szkoły ({{sidebarData.schools}})
            <span v-if="sidebarData.schoolsToConfirm">
              > <span class="to-confirm">{{sidebarData.schoolsToConfirm}}</span>
            </span>
          </b-link>
          <b-link :to="{name:'sport.objects', params: {'tab': 'confirmed'} }"
                  active-class="active"
                  :class="{'active': 'sport.object' === $route.name}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Obiekty sportowe ({{sidebarData.places}})
            <span v-if="sidebarData.placesToConfirm">
              > <span class="to-confirm">{{sidebarData.placesToConfirm}}</span>
            </span>
          </b-link>

          <b-link :to="{name:'admin.sport.objects', params: {'tab': 'confirmed'} }"
                  v-if="$store.getters.isDirector"
                  active-class="active"
                  :class="{'active': 'admin.sport.object' === $route.name}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Obiekty sportowe (wszystkie)
<!--            <span v-if="sidebarData.placesToConfirm">-->
<!--              > <span class="to-confirm">{{sidebarData.placesToConfirm}}</span>-->
<!--            </span>-->
          </b-link>

          <b-link :to="{name:'leaders', params: {'tab': 'confirmed'} }"
                  v-if="$store.getters.isAdmin"
                  :class="{'active': 'leader' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Prowadzący ({{sidebarData.leaders}})
            <span v-if="sidebarData.leadersToConfirm">
              > <span class="to-confirm">{{sidebarData.leadersToConfirm}}</span>
            </span>
          </b-link>

          <b-link :to="{name:'participant.groups'}"
                  :class="{'active': 'participant.group' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Lista zawodników ({{sidebarData.participantGroups}})
          </b-link>

          <b-link :to="{name:'participants'}"
                  :class="{'active': 'participant' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Zawodnicy ({{sidebarData.participants}})
          </b-link>

          <b-link :to="{name:'lessons'}"
                  :class="{'active': 'lesson' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista zajęć ({{sidebarData.lessons}})
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

          <b-link :to="{name:'mtsf', params: {'tab': 'participants'}}"
                  :class="{'active': 'mtsf' === $route.name}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista MTSF
          </b-link>

          <b-link :to="{name:'events', params: {'tab': 'confirmed'}}"
                  active-class="active"
                  v-if="$store.getters.isDirector"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Lista imprez sportowych ({{sidebarData.events}})
            <span v-if="sidebarData.eventsToConfirm">
              > <span class="to-confirm">{{sidebarData.eventsToConfirm}}</span>
            </span>
          </b-link>

          <b-link :to="{name:'reports', params: {'tab': 'reporting'}}"
                  v-if="$store.getters.isAdmin"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            Raporty / Wizytacja
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
                  v-if="$store.getters.isAdmin || $store.getters.isDirector"
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
      },
      sidebarData () {
        return this.$store.getters.sidebarData
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
.to-confirm {
  color: #ff9e97;
}
</style>
