<template>
  <div class="tab-link-list mb-4">
    <b-link v-for="(item,index) in links" :key="index"
            :to="{ name: item.link, params: { tab: item.tab } }"
            active-class="active"
            class="tab-link-item">
      {{ item.title }}
    </b-link>
  </div>
</template>

<script>
export default {
  name: 'TabLinks',
  props: ['links'],
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {
  }
}
</script>

<style scoped>

</style>
