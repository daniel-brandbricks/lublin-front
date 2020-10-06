<template>
  <ListConfirmed :schoolId="schoolId"/>
</template>

<script>
  import ListConfirmed from '@/views/events/components/ListConfirmed'

  export default {
    name: 'FormEvents',
    props: ['schoolId'],
    components: { ListConfirmed },
    methods: {
      rowRedirect (id, isConfirmed) {
        this.$router.push({
          name: 'event',
          params: { 'tab': 'main-data', 'id': id, 'isConfirmed': isConfirmed }
        })
      }
    },
    created() {
      console.log(this.schoolId)
    }
  }
</script>

<style scoped>

</style>
