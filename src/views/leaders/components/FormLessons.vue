<template>
  <div class="wrap">
    <lessonList :leader="leader"/>
  </div>
</template>

<script>
  import lessonList from '@/views/lessons/LessonsList'

  export default {
    name: 'FormParticipants',
    components: { lessonList },
    props: ['leader', 'schoolIds'],
    created () {
      console.log(this.leader)
      console.log(this.schoolIds)
    }
  }
</script>

<style scoped>

</style>
