<template>
  <div class="wrap">
    <lessonList :sportObject="sportObject"/>
  </div>
</template>

<script>
  import lessonList from '@/views/lessons/LessonsList'

  export default {
    name: 'FormLessons',
    components: { lessonList },
    props: ['sportObject']
  }
</script>

<style scoped>

</style>
