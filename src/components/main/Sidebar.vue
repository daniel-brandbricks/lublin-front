<template>
  <section>

    <!-- Sidebar -->
    <div class="border-right sidebar" id="sidebar-wrapper">
      <div class="sidebar-heading">
        <img src="/static/img/logo.svg" alt="">
      </div>
      <div class="list-group list-group-flush">

        <a href="#" class="list-group-item list-group-item-action">
          <span class="icon icon-icon_discipline"></span>
          Dashboard
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <span class="icon icon-iconm_search"></span>
          Shortcuts
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <span class="icon icon-icon_arrow_24"></span>
          Overview
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <span class="icon icon-icon_www"></span>
          Events
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <span class="icon icon-icon_play"></span>
          Profile
        </a>
        <a href="#" class="list-group-item list-group-item-action">
          <span class="icon icon-icon_discipline"></span>
          Status
        </a>
      </div>
      <footer class="sidebar-footer">
        <a href="#" class="list-group-item text-center ">
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
    methods: {},
    watch: {},
    created () {
      console.log('sidebar created')
    }
  }
</script>

<style scoped>
</style>
