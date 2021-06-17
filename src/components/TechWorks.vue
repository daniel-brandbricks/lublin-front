<template>
  <div class="cookies-alert-bottom alert alert-info" style="position: absolute !important;
    top: 50%; font-size: 20px;
    height: 12%;" :class="{'d-none': worksAccepted}">
    <a href="#" class="close" data-dismiss="alert" id="cookiesCloser" aria-label="close" @click="closeToast">&times;</a>
    Szanowni Panstwo, prace techniczne nad tym modulem "Prowadzacy" trwaja dluzej niz planowalismy. Caly czas dzialamy
    nad przywroceniem poprawnego funkcjonowania tej zakladki, ktora moze miec wplyw na dzialanie innych elementow
    serwisu. Przepraszamy za utrudnienia i dziekujemy za wyrozumialosc.
  </div>
</template>

<script>
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'TechWorks',
    mixins: [ToastMixin],
    data () {
      return {
        worksAccepted: false
      }
    },
    methods: {
      closeToast () {
        localStorage.setItem('worksAccepted', '1')
        this.worksAccepted = true
      }
    },
    created () {
      // var worksAccepted = localStorage.getItem('worksAccepted')
      // if (worksAccepted === 0 || worksAccepted === '0' || worksAccepted === null) {
      //   this.worksAccepted = false
      // } else {
      //   this.worksAccepted = true
      // }
    }
  }
</script>

<style type="text/css">
.cookies-alert-bottom {
  z-index: 10000;
  position: sticky !important;
  bottom: 5px;
  left: 2%;
  width: 96%;
  font-family: 'Muli', sans-serif;
  font-size: 18px;
  line-height: 22px;
}
</style>
