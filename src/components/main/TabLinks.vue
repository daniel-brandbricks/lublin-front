<template>
  <div class="tab-link-list mb-4">
    <b-link :to="{name:'www'}"
            active-class="active"
            class="tab-link-item">
      Lorem
    </b-link>
    <b-link :to="{name:'my'}"
            active-class="active"
            class="tab-link-item">
      Lorem
    </b-link>
    <b-link :to="{name:'dev'}"
            active-class="active"
            class="tab-link-item">
      Lorem
    </b-link>

  </div>

</template>

<script>
  export default {
    name: 'TabLinks'
  }
</script>

<style scoped>

</style>
