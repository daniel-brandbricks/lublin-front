<template>
  <div>
    <TabLinks></TabLinks>
    <h1>Content</h1>
  </div>
</template>

<script>
import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'

export default {
  name: 'SchoolAndClubForm',
  components: { TabLinks },
  mixins: [ EventBusEmit ],
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {
    this.changeTabs({ keks: 'keks' })
  }
}
</script>

<style scoped>

</style>
