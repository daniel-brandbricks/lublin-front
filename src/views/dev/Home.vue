<template>
  <div class="wrap">
    <b-container>
      <h2 class="c-green main">Imprezy sportowe</h2>
    </b-container>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data () {
      return {
        msg: 'TEST'
      }
    },
    methods: {
      getUser () {
        this.$store.dispatch('getAllUsers')
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      },
      logout () {
        this.$store.dispatch('logout')
          .then((response) => {
            console.log(response)
          })
      }
    },
    created () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
