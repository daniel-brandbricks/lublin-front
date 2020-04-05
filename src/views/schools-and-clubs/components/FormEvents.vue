<template>
  <ListConfirmed :schoolId="schoolId"/>
</template>

<script>
  import ListConfirmed from '@/views/events/components/ListConfirmed'

  export default {
    name: 'FormEvents',
    props: ['schoolId'],
    components: { ListConfirmed },
    created() {
      console.log(this.schoolId)
    }
  }
</script>

<style scoped>

</style>
