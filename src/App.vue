<template>
  <div id="app">
    <router-view/>
    <ConfirmDeleteModal></ConfirmDeleteModal>
  </div>
</template>

<script>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

  export default {
    name: 'App',
    components: { ConfirmDeleteModal },
    created () {
      this.$store.dispatch('getCurrentUser')
    }
  }
</script>

<style lang="scss">
</style>
