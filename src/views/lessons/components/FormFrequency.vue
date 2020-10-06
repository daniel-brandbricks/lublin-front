<template>
  <Frequency :lessonId="lessonId"/>
</template>

<script>
  import Frequency from '@/views/fregucncy/Frequency'

  export default {
    name: 'FormFrequency',
    props: ['lessonId'],
    components: { Frequency }
  }
</script>

<style scoped>

</style>
