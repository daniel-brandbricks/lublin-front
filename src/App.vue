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
    components: {ConfirmDeleteModal},
    data() {
      return {}
    },
    computed: {
      authUser() {
        return this.$store.getters.authUser
      }
    },
    watch: {
      authUser: function (val) {
        // for directors
        if (val.schoolsUsers.length > 0 && val.schoolsUsers[0].role === 1) {
          this.$store.dispatch('getSchool', {id: val.schoolsUsers[0].school.id})
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

        // for leaders
        if (val.replacements && val.replacements.length > 0) {
          for (let index in val.replacements) {
            if (val.replacements[index].checked === false) {
              this.$bvToast.toast('Masz nowe zastępstwa. Sprawdż w zakładce "Moj profil"', {
                title: 'Uwaga!',
                toaster: 'b-toaster-bottom-right',
                solid: true,
                variant: 'info',
                appendToast: false,
                autoHideDelay: 5000000
              })
              return
              // let lessonId = val.replacements[index].lesson.id
              // let link = this.$router.resolve({name: 'lesson',
              //   params: {'tab': 'main-data', 'id': lessonId, 'check-replace': val.id}})
              // console.log(link)
              // this.$bvToast.toast('Masz nowe zastępstwa (zajęcie ' + val.replacements[index].lesson.title + '). '
              //   + 'Sprawdż', {
              //   href: link.href,
              //   title: 'Uwaga!',
              //   toaster: 'b-toaster-bottom-right',
              //   solid: true,
              //   variant: 'info',
              //   appendToast: false,
              //   autoHideDelay: 5000000
              // })
            }
          }

          this.showedForLeaders = true
          console.log(val.replacements)
        }
      }
    },
    created() {
      this.$store.dispatch('getCurrentUser')
    }
  }
</script>

<style lang="scss">
  .mx-time-header {
    display: none;
  }
</style>
