<template>
  <div class="tab-link-list mb-4">
    <b-link v-for="(item,index) in links" :key="index"
            :to="{ name: item.link, params: { tab: item.tab } }"
            active-class="active"
            @click="callParentMethod(index)"
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
  methods: {
    // call method on click tab (needs param 'method' in 'links' prop)
    callParentMethod (index) {
      if (this.links[index].method) {
        let funcName = this.$parent[this.links[index].method]
        if (typeof funcName === 'function') {
          funcName()
        }
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>

</style>
