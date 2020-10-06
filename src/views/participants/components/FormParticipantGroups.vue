<template>
  <div class="wrap">
    <ParticipantGroups :participant="participant"/>
  </div>
</template>

<script>
  import ParticipantGroups from '@/views/participant-groups/ParticipantGroups'

  export default {
    name: 'FormParticipantGroups',
    components: { ParticipantGroups },
    props: ['participant'],
    created () {
    }
  }
</script>

<style scoped>

</style>
