<template>
  <div class="tab-link-list mb-4">
    <b-link v-for="(link,index) in links" :key="index"
            :to="{name:'www'}"
            active-class="active"
            class="tab-link-item">
      {{ link.title }}
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
    console.log(this.links)
  }
}
</script>

<style scoped>

</style>
