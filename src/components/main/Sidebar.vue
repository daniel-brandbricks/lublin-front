<template>
  <section>

<!--    <b-list-group class="custom sidebar-list">-->
<!--      <b-list-group-item>-->
<!--        <b-link :to="{name:'dashboard'}" active-class="active" class="d-flex align-items-center">-->
<!--          <span class="icon icon-home_off"></span>-->
<!--          <span>DASHBOARD</span>-->
<!--        </b-link>-->
<!--      </b-list-group-item>-->
<!--    </b-list-group>-->
<!--Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, assumenda atque cum dolor doloremque esse in ipsum magni numquam officiis quis ratione, repudiandae, sunt! Ad aspernatur blanditiis culpa eius et, illum itaque iure, maxime non quidem recusandae, saepe sit vero. A deleniti dicta dignissimos, exercitationem, laborum molestiae obcaecati placeat qui quibusdam ratione similique sunt tempora tenetur vero voluptate! Ab adipisci aliquam amet atque aut autem beatae commodi consequuntur corporis cumque deserunt, dignissimos doloremque eius eum fuga illum laboriosam maiores minima modi nisi numquam odio pariatur perferendis perspiciatis quasi quidem, quos recusandae reiciendis repudiandae rerum sit suscipit veniam veritatis, voluptatem voluptates.-->
<!--    <footer class="sidebar-footer">-->
<!--    </footer>-->

    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Sidebar</div>
      <div class="list-group list-group-flush">
        <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
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

  #sidebar-wrapper {
    min-height: 100vh;
    margin-left: -15rem;
    -webkit-transition: margin .25s ease-out;
    -moz-transition: margin .25s ease-out;
    -o-transition: margin .25s ease-out;
    transition: margin .25s ease-out;
  }

  #sidebar-wrapper .sidebar-heading {
    padding: 0.875rem 1.25rem;
    font-size: 1.2rem;
  }

  #sidebar-wrapper .list-group {
    width: 15rem;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: 0;
  }

  @media (min-width: 768px) {
    #sidebar-wrapper {
      margin-left: 0;
    }

    #wrapper.toggled #sidebar-wrapper {
      margin-left: -15rem;
    }
  }
</style>
