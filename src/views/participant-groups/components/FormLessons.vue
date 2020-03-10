<template>
  <div class="wrap">
    <lessonList :participantGroup="participantGroup"/>
  </div>
</template>

<script>
  import lessonList from '@/views/lessons/LessonsList'

  export default {
    name: 'FormParticipants',
    components: { lessonList },
    props: ['participantGroup']
  }
</script>

<style scoped>

</style>
