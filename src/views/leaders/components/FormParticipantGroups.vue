<template>
  <div class="wrap">
    <ParticipantGroups :schoolIds="schoolIds"/>
  </div>
</template>

<script>
  import ParticipantGroups from '@/views/participant-groups/ParticipantGroups'

  export default {
    name: 'FormParticipantGroups',
    components: { ParticipantGroups },
    props: ['leader', 'schoolIds'],
    created () {
      console.log(this.leader)
      console.log(this.schoolIds)
    }
  }
</script>

<style scoped>

</style>
