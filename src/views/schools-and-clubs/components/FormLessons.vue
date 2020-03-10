<template>
  <div class="wrap">
    <lessonList :school="school"/>
  </div>
</template>

<script>
  import lessonList from '@/views/lessons/LessonsList'

  export default {
    name: 'FormLessons',
    components: { lessonList },
    props: ['school']
  }
</script>

<style scoped>

</style>
