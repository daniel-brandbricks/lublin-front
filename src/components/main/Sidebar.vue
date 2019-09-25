<template>
  <section>

    <!-- Sidebar -->
    <div class="border-right sidebar" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <img src="/static/img/logo.svg" alt="">
      </div>
      <div class="list-group list-group-flush">
        <perfect-scrollbar id="scrollbar" class="custom ps-sidebar">

          <b-link :to="{name:'dev'}"
                  active-class="active"
                  class="list-group-item">
            <span class="icon icon-icon_discipline"></span>
            dashboard
          </b-link>
          <b-link :to="{name:'www'}"
                  class="list-group-item">
            <span class="icon icon-iconm_search"></span>
            Strona www
          </b-link>
          <b-link :to="{name:'schools.and.clubs'}"
                  class="list-group-item">
            <span class="icon icon-iconm_search"></span>
            kłuby i szkoły (1,024)
          </b-link>
          <b-link :to="{name:'sport.objects'}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            obiekty sportowe (2,048)
          </b-link>
          
          <b-link :to="{name:'sport.objects'}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Prowadzący (568)
          </b-link>

          <b-link :to="{name:'participant.groups'}"
                  class="list-group-item">
            <span class="icon icon-icon_www"></span>
            Grupy zawodników (200)

          </b-link>



          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            Zawodnicy (12,000)
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            Zajęcia (4,000)
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            Kalendarz
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            Frekwencja
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            MTSF
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            Wydarzenia
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-iconm_search"></span>
            Raporty
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_arrow_24"></span>
            Słownik
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_www"></span>
            Historia
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_play"></span>
            współadministratorzy
          </a>

          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            MTSF
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_discipline"></span>
            Wydarzenia
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-iconm_search"></span>
            Raporty
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_arrow_24"></span>
            Słownik
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_www"></span>
            Historia
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <span class="icon icon-icon_play"></span>
            współadministratorzy
          </a>
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
          this.$router.push({name: 'login'})
        })
        .catch((error) => {
          console.log(error)
          // todo error handle
        })
    }
  },
  watch: {},
  created () {
    console.log('sidebar created')
  }
}
</script>

<style>

</style>
