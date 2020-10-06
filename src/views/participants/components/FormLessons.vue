<template>
  <div class="wrap">
    <lessonList :participant="participant"/>
  </div>
</template>

<script>
  import lessonList from '@/views/lessons/LessonsList'

  export default {
    name: 'FormLessons',
    components: { lessonList },
    props: ['participant'],
    created () {
    }
  }
</script>

<style scoped>

</style>
