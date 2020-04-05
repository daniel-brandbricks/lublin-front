<template>
  <div class="wrap">
    <Calendar :split-components="participantGroup" :lessons="storeLessons"
              :showLessons="[1]" ref="mainCalendar"/>
  </div>
</template>

<script>
  import Calendar from '@/components/common-views/Calendar'

  export default {
    name: 'FormCalendar',
    props: ['participantGroup'],
    components: {Calendar},
    computed: {
      storeLessons () {
        return this.$store.getters.lessons
      }
    },
    created() {
      this.$store.dispatch('getLessons',
        {filters: {participantGroups: [this.participantGroup]}})
    }
  }
</script>

<style scoped>

</style>
