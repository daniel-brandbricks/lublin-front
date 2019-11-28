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
    components: { ConfirmDeleteModal }
  }
</script>

<style lang="scss">
</style>
