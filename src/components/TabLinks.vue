<template>
  <div class="tab-link-list mb-4">
    <b-link v-for="(item,index) in links" :key="index"
            :to="{ name: item.link, params: { tab: item.tab, id: id } }"
            active-class="active"
            event=""
            class="tab-link-item">
     <span @click="callParentMethod(item, index)">
       {{ item.title }}
     </span>
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
        if (!this.links[index].method || typeof this.$parent[this.links[index].method] !== 'function') {
          if (this.$route.params.tab !== item.tab) {
            this.$router.push({
              name: item.link,
              params: {'tab': item.tab, id: this.id}
            })
          }
          return
        }

        return new Promise((resolve, reject) => {
          this.$parent[this.links[index].method](this.links[index].methodParams)
            .then(response => {
              console.log(this.links)
              console.log(response)
              resolve()
            }).catch(error => {
              console.log(error.response)
              reject(error.response)
            })
        })

        // return
        // if (this.links[index].method) {
        //   let funcName = this.$parent[this.links[index].method]
        //
        //   if (typeof funcName === 'function') {
        //     console.log(11111)
        //     const result = funcName(this.links[index].methodParams)
        //     console.log(66666)
        //     console.log(result)
        //   }
        //
        //   // if (this.$route.params.tab !== item.tab && result) {
        //   //   this.$router.push({
        //   //     name: item.link,
        //   //     params: {'tab': item.tab, id: this.id}
        //   //   })
        //   // }
        // } else {
        //   if (this.$route.params.tab !== item.tab) {
        //     this.$router.push({
        //       name: item.link,
        //       params: {'tab': item.tab, id: this.id}
        //     })
        //   }
        // }
      }
    },
    created () {
    }
  }
</script>

<style scoped>

</style>
