<template>
  <div class="wrap">
    <Calendar :split-components="participant" :lessons="storeLessons"
              :showLessons="[1]" ref="mainCalendar"/>
  </div>
</template>

<script>
  import Calendar from '@/components/common-views/Calendar'

  export default {
    name: 'FormCalendar',
    props: ['participant'],
    components: {Calendar},
    computed: {
      storeLessons () {
        return this.$store.getters.lessons
      }
    },
    created() {
      this.$store.dispatch('getLessons',
        {filters: {participants: [this.participant]}})
    }
  }
</script>

<style scoped>

</style>
