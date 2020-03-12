<template>
    <div class="wrap">
      <ParticipantList :lesson="lesson"/>
    </div>
</template>

<script>
  import ParticipantList from '@/views/participants/ParticipantList'

  export default {
    name: 'FormParticipants',
    components: { ParticipantList },
    props: ['lesson'],
    created () {
      console.log(1111)
    }
  }
</script>

<style scoped>

</style>
