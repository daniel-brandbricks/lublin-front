<template>
  <Frequency :schoolId="schoolId"/>
</template>

<script>
  import Frequency from '@/views/fregucncy/Frequency'

  export default {
    name: 'FormFrequency',
    props: ['schoolId'],
    components: { Frequency }
  }
</script>

<style scoped>

</style>
