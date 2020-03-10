<template>
  <div class="wrap">
    <ParticipantList :schoolIds="schoolIds"/>
  </div>
</template>

<script>
  import ParticipantList from '@/views/participants/ParticipantList'

  export default {
    name: 'FormParticipants',
    components: { ParticipantList },
    props: ['leader', 'schoolIds'],
    created () {
      console.log(this.leader)
      console.log(this.schoolIds)
    }
  }
</script>

<style scoped>

</style>
