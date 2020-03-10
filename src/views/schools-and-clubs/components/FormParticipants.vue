<template>
  <div class="wrap">
    <ParticipantList :school="school"/>
  </div>
</template>

<script>
  import ParticipantList from '@/views/participants/ParticipantList'

  export default {
    name: 'FormParticipants',
    components: { ParticipantList },
    props: ['school']
  }
</script>

<style scoped>

</style>
