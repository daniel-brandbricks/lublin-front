<template>
  <div class="tab-link-list mb-4">
    <b-link v-for="(item,index) in links" :key="index"
            :to="{ name: item.link, params: { tab: item.tab, id: id } }"
            active-class="active"
            event=""
            @click.prevent="callParentMethod(item, index)"
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
      return {
        // if we need to save id in different ulr tabs
        id: this.$route.params.id
      }
    },
    computed: {},
    methods: {
      // call method on click tab (needs param 'method' in 'links' prop)
      callParentMethod (item, index) {
        if (this.links[index].method) {
          let funcName = this.$parent[this.links[index].method]
          let result = true

          if (typeof funcName === 'function') {
            result = funcName({...this.links[index].methodParams})
          }

          console.log(result)
          if (this.$route.params.tab !== item.tab && result) {
            this.$router.push({
              name: item.link,
              params: {'tab': item.tab, id: this.id}
            })
          }
        } else {
          if (this.$route.params.tab !== item.tab) {
            this.$router.push({
              name: item.link,
              params: {'tab': item.tab, id: this.id}
            })
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
