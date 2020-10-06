<template>
  <b-row class="justify-content-center">
    <classes-profile/>
    <classes-all/>
  </b-row>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import ClassesAll from '@/views/dictionary/components/ClassesAll'
  import ClassesProfile from '@/views/dictionary/components/ClassesProfile'

  export default {
    name: 'Classes',
    components: { ClassesAll, ClassesProfile },
    mixins: [ EventBusEmit ],
    data () {
      return {}
    },
    created () {
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })

      this.$store.dispatch('getClassProfiles')
      this.$store.dispatch('getClasses')
    }
  }
</script>

<style scoped>

</style>
