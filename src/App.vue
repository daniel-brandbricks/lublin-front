<template>
  <div id="app">
    <router-view/>
    <ConfirmDeleteModal></ConfirmDeleteModal>
  </div>
</template>

<script>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'

  export default {
    name: 'App',
    components: { ConfirmDeleteModal },
    computed: {
      authUser () {
        return this.$store.getters.authUser
      }
    },
    watch: {
      authUser: function (val) {
        if (val.schoolsUsers.length > 0 && val.schoolsUsers[0].role === 1) {
          this.$store.dispatch('getSchool', { id: val.schoolsUsers[0].school.id})
            .then((res) => {
              let school = res
              if (school.invitations && school.invitations.length > 0) {
                for (let index in school.invitations) {
                  if (school.invitations[index].active === false) {
                    this.$bvToast.toast('Masz nową aplikację od prowadzącego. ' +
                      'Sprawdż to w swojej szkołe / klubu w zakładce "Prowadzący" ', {
                        title: 'Uwaga!',
                        toaster: 'b-toaster-bottom-right',
                        solid: true,
                        variant: 'info',
                        appendToast: false,
                        autoHideDelay: 5000000
                    })
                  }
                }
              }
            })
        }
      }
    },
    created () {
      this.$store.dispatch('getCurrentUser')
    }
  }
</script>

<style lang="scss">
  .mx-calendar-header {
    display: none;
  }
</style>
