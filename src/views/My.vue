<template>
  <div class="d-flex" id="wrapper" :class="{'toggled': showSidebar}">

    <!-- Sidebar -->
    <div class="border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Start Bootstrap</div>
      <div class="list-group list-group-flush">

        <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
      </div>
    </div>
    <!-- /#sidebar-wrapper -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <nav class="navbar">
        <AdminNavbar></AdminNavbar>
      </nav>

      <div class="container-fluid">
        <!--<button class="btn btn-primary" id="menu-toggle" @click="toggleSidebar">Toggle Menu</button>-->
        <button class="btn btn-primary btn-sidebar-toggle" id="menu-toggle" @click="toggleSidebar">
          <span class="icon-icon_arrow_24"></span>
        </button>
      </div>
    </div>
    <!-- /#page-content-wrapper -->

  </div>

</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import DatePick from 'vue-date-pick'
  import 'vue-date-pick/dist/vueDatePick.css'
  import EventBus from '../event-bus'
  import AdminNavbar from '@/components/main/AdminNavbar'

  export default {
    components: {
      Datepicker,
      Treeselect,
      DatePick,
      AdminNavbar
    },
    data () {
      return {
        showSidebar: false,

        date: '2019-09-01',
        selected: [],
        selectedRadio: 'A',
        options: [
          { text: 'first', value: '1' },
          { text: 'secondary', value: '2' },
          { text: 'third', value: '3' }
        ],
        // define the default value
        value: null,
        // define options
        optionsTS: [
          {
            id: 'a',
            label: 'first',
            children: [
              {
                id: 'aa',
                label: 'aa'
              },
              {
                id: 'ab',
                label: 'ab'
              }
            ]
          },
          {
            id: 'b',
            label: 'second'
          },
          {
            id: 'c',
            label: 'third'
          }
        ]
      }
    },
    methods: {
      toggleSidebar () {
        EventBus.$emit('TOGGLE_SIDEBAR')
      }
    },
    created () {
      EventBus.$on('TOGGLE_SIDEBAR', (payload) => {
        this.showSidebar = !this.showSidebar
      })
    }
  }
</script>

<style scoped>

</style>
