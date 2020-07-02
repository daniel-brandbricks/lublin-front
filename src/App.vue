<template>
  <div id="app">
    <router-view/>
    <Cookies/>
    <ConfirmDeleteModal></ConfirmDeleteModal>
  </div>
</template>

<script>
  import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
  import Cookies from '@/components/Cookies'

  export default {
    name: 'App',
    components: {Cookies, ConfirmDeleteModal},
    data () {
      return {}
    },
    computed: {
      authUser () {
        return this.$store.getters.authUser
      }
    },
    watch: {
      authUser: function (val) {
        // for directors
        if (val && val.schoolsUsers && val.schoolsUsers.length > 0 && val.schoolsUsers[0].role === 1) {
          this.$store.dispatch('getSchool', {id: val.schoolsUsers[0].school.id})
            .then((res) => {
              let school = res
              console.log(res)
              if (school.invitations && school.invitations.length > 0) {
                for (let index in school.invitations) {
                  if (school.invitations[index].active === false) {
                    this.$bvToast.toast('Masz nowe zgłoszenie od prowadzącego, by je zaakceptować przejdź do zakładki „Kluby i Szkoły – Prowadzący.”', {
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
        if (val && val.replacements && val.replacements.length > 0) {
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
    mounted () {
      window.setInterval(() => {
        if (this.$store.getters.isLoggedIn) {
          this.$store.dispatch('getActualSidebarData')
        }
      }, 60000)
    },
    created () {
      if (this.$store.getters.isLoggedIn) {
        this.$store.dispatch('getActualSidebarData')
      }
      if (!['confirm.school'].includes(this.$route.name)) {
        this.$store.dispatch('getCurrentUser')
      }
      this.$store.dispatch('getCsrfToken')
    }
  }
</script>

<style lang="scss">
  .flex-break {
    width: 100%;
    flex-basis: 100%;
    height: 0;
  }

  .permission-treeselect .vue-treeselect__menu {
    min-width: 670px !important;
  }

  * {
    outline: unset !important;
    outline-color: unset !important;
  }

  /*
  FONTS
  */

  body {
    font-size: 1em;
  }
  .fonts-size-1 div * {
    font-size: 1.01em !important;
  }
  .fonts-size-2 div * {
    font-size: 1.015em !important;
  }
  h1 {
    font-size: 1em;
  }

  h2 {
    font-size: 1em;
  }
  p {
    font-size: 1em;
  }

  /*
  FONTS
  */

  button.vdpArrow {
    color: rgba(230, 230, 230, 0.07);
  }

  button.vdpArrow::before {
    color: black !important;
  }

  fieldset:focus, fieldset:focus * {
    outline: none !important;
  }

  fieldset:active, fieldset:active * {
    outline: none !important;
  }

  /*
  COLORS YB
  */

  // for all
  .colors-yb *:not(.help-item-color) {
    background-color: black !important;
    color: yellow !important;
  }

  // for all pseudo
  .colors-yb *::after {
    color: black !important;
    /*background: unset !important;*/
    background-color: yellow !important;
  }

  .colors-yb *::before {
    color: black !important;
    /*background: unset !important;*/
    background-color: yellow !important;
  }

  // hide carousel element
  .colors-yb .carousel-caption {
    display: none !important;
  }

  // fix cards
  .colors-yb .card.custom {
    border: 1px solid yellow !important;
  }

  .colors-yb .card.custom ::after {
    display: none !important;
  }

  .colors-yb .card-title.nowrap::before {
    display: none !important;
  }

  .colors-yb .d-inline-block.type-card.float-right::before {
    display: none !important;
  }

  // fix checkbox
  .colors-yb .custom-checkbox ::after {
    display: none !important;
  }

  .colors-yb .custom-checkbox label::before {
    background-color: black !important;
    border: 1px solid yellow !important;
  }

  .colors-yb .custom-checkbox label:checked::before {
    background-color: yellow !important;
    border: 1px solid yellow !important;
  }

  .colors-yb .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
    background-color: yellow !important;
    color: yellow !important;
  }

  // for treeselect
  .colors-yb .vue-treeselect__control {
    border: 1px solid yellow !important;
  }

  .colors-yb .vue-treeselect__icon.vue-treeselect__value-remove {
    border: unset !important;
  }

  // for buttons
  .colors-yb .btn.custom.btn-primary {
    border: 1px solid yellow !important;
  }

  // for logo
  .colors-yb .bgc-yellow {
    background-color: yellow !important;
  }

  // for carousel buttons
  .colors-yb .carousel-indicators li {
    border: 1px solid yellow !important;
  }

  // pagination
  .colors-yb .btn.btn-arrow {
    border: 1px solid yellow !important;
  }

  // calendar
  .colors-yb .vdpOuterWrap .vdpInnerWrap .vdpTable tbody .vdpRow .vdpCell:hover .vdpCellContent {
    box-shadow: 5px 5px 0px 0px yellow !important;
  }
  .colors-yb button.vdpArrow::before {
    color: black !important;
  }
  .colors-yb button.vdpArrow {
    color: black !important;
  }

  // files
  .colors-yb .file-box a {
    color: yellow !important;
  }

  // map
  .colors-yb #map * {
    color: black !important;
    background-color: unset !important;
    z-index: 9999;
  }

  // icons
  .colors-yb .icon::before {
    background-color: black !important;
    color: yellow !important;
  }

  .colors-yb hr {
    border: 1px solid yellow !important;
  }

  /*
  COLORS YB
  */

  /*
  COLORS BY
  */

  // for all
  .colors-by *:not(.help-item-color) {
    background-color: yellow !important;
    color: black !important;
  }

  // for all pseudo
  .colors-by *::after {
    color: yellow !important;
    /*background: unset !important;*/
    background-color: black !important;
  }

  .colors-by *::before {
    color: yellow !important;
    /*background: unset !important;*/
    background-color: black !important;
  }

  // hide carousel element
  .colors-by .carousel-caption {
    display: none !important;
  }

  // fix cards
  .colors-by .card.custom {
    border: 1px solid black !important;
  }

  .colors-by .card.custom ::after {
    display: none !important;
  }

  .colors-by .card-title.nowrap::before {
    display: none !important;
  }

  .colors-by .d-inline-block.type-card.float-right::before {
    display: none !important;
  }

  // fix checkbox
  .colors-by .custom-checkbox ::after {
    display: none !important;
  }

  .colors-by .custom-checkbox label::before {
    background-color: yellow !important;
    border: 1px solid black !important;
  }

  .colors-by .custom-checkbox label:checked::before {
    background-color: black !important;
    border: 1px solid black !important;
  }

  .colors-by .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
    background-color: black !important;
    color: black !important;
  }

  // for treeselect
  .colors-by .vue-treeselect__control {
    border: 1px solid black !important;
  }

  .colors-by .vue-treeselect__icon.vue-treeselect__value-remove {
    border: unset !important;
  }

  // for buttons
  .colors-by .btn.custom.btn-primary {
    border: 1px solid black !important;
  }

  // for logo
  .colors-by .bgc-yellow {
    background-color: yellow !important;
  }

  // for carousel buttons
  .colors-by .carousel-indicators li {
    border: 1px solid black !important;
  }

  // pagination
  .colors-by .btn.btn-arrow {
    border: 1px solid black !important;
  }

  // calendar
  .colors-by .vdpOuterWrap .vdpInnerWrap .vdpTable tbody .vdpRow .vdpCell:hover .vdpCellContent {
    box-shadow: 5px 5px 0px 0px black !important;
  }
  .colors-by button.vdpArrow::before {
    color: yellow !important;
  }
  .colors-by button.vdpArrow {
    color: yellow !important;
  }

  // files
  .colors-by .file-box a {
    color: black !important;
  }

  // map
  .colors-by #map * {
    color: black !important;
    background-color: unset !important;
    z-index: 9999;
  }

  // icons
  .colors-by .icon::before {
    background-color: yellow !important;
    color: black !important;
  }

  .colors-by hr {
    border: 1px solid black !important;
  }

  .colors-by .footer-page a img {
    background-color: black !important;
  }

  /*
  COLORS YB
  */

  /*
  COLORS WB
  */

  // for all
  .colors-wb *:not(.help-item-color) {
    background-color: white !important;
    color: black !important;
  }

  // for all pseudo
  .colors-wb *::after {
    color: white !important;
    /*background: unset !important;*/
    background-color: black !important;
  }

  .colors-wb *::before {
    color: white !important;
    /*background: unset !important;*/
    background-color: black !important;
  }

  // hide carousel element
  .colors-wb .carousel-caption {
    display: none !important;
  }

  // fix cards
  .colors-wb .card.custom {
    border: 1px solid black !important;
  }

  .colors-wb .card.custom ::after {
    display: none !important;
  }

  .colors-wb .card-title.nowrap::before {
    display: none !important;
  }

  .colors-wb .d-inline-block.type-card.float-right::before {
    display: none !important;
  }

  // fix checkbox
  .colors-wb .custom-checkbox ::after {
    display: none !important;
  }

  .colors-wb .custom-checkbox label::before {
    background-color: white !important;
    border: 1px solid black !important;
  }

  .colors-wb .custom-checkbox label:checked::before {
    background-color: black !important;
    border: 1px solid black !important;
  }

  .colors-wb .custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
    background-color: black !important;
    color: black !important;
  }

  // for treeselect
  .colors-wb .vue-treeselect__control {
    border: 1px solid black !important;
  }

  .colors-wb .vue-treeselect__icon.vue-treeselect__value-remove {
    border: unset !important;
  }

  // for buttons
  .colors-wb .btn.custom.btn-primary {
    border: 1px solid black !important;
  }

  // for logo
  .colors-wb .bgc-yellow {
    background-color: white !important;
  }

  // for carousel buttons
  .colors-wb .carousel-indicators li {
    border: 1px solid black !important;
  }

  // pagination
  .colors-wb .btn.btn-arrow {
    border: 1px solid black !important;
  }

  // calendar
  .colors-wb .vdpOuterWrap .vdpInnerWrap .vdpTable tbody .vdpRow .vdpCell:hover .vdpCellContent {
    box-shadow: 5px 5px 0px 0px black !important;
  }
  .colors-wb button.vdpArrow::before {
    color: white !important;
  }
  .colors-wb button.vdpArrow {
    color: white !important;
  }

  // files
  .colors-wb .file-box a {
    color: black !important;
  }

  // map
  .colors-wb #map * {
    color: black !important;
    background-color: unset !important;
    z-index: 9999;
  }

  // icons
  .colors-wb .icon::before {
    background-color: white !important;
    color: black !important;
  }

  .colors-wb hr {
    border: 1px solid black !important;
  }

  .colors-wb .footer-page a img {
    background-color: black !important;
  }

  /*
  COLORS WB
  */

  ///////////////////////////////////////////////////

  .mx-time-header {
    display: none;
  }

  .modal-mtsf-values div div.modal-content {
    width: 97vw !important;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }
</style>
