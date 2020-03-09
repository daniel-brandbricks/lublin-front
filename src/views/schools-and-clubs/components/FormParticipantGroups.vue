<template>
  <div class="wrap">
    <ParticipantGroups :school="school"/>
  </div>
</template>

<script>
  import ParticipantGroups from '@/views/participant-groups/ParticipantGroups'

  export default {
    name: 'FormParticipantGroups',
    components: { ParticipantGroups },
    props: ['school']
  }
</script>

<style scoped>

</style>
