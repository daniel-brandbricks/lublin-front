<template>
  <div class="cookies-alert-bottom alert alert-info" :class="{'d-none': cookieAccepted}">
    <a href="#" class="close" data-dismiss="alert" id="cookiesCloser" aria-label="close" @click="closeToast">&times;</a>
    W ramach naszej witryny stosujemy pliki cookies w celu świadczenia Państwu usług na najwyższym poziomie, w
    tym w sposób dostosowany do indywidualnych potrzeb. Korzystanie z witryny bez zmiany ustawień dotyczących
    cookies oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym. Możecie Państwo dokonać w
    każdym czasie zmiany ustawień dotyczących cookies. Więcej informacji na ten temat znajdziecie Państwo w
    naszej polityce prywatności.
  </div>
</template>

<script>
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'Cookie',
    mixins: [ ToastMixin ],
    data () {
      return {
        cookieAccepted: false
      }
    },
    methods: {
      closeToast () {
        localStorage.setItem('cookiesAccept', '1');
        this.cookieAccepted = true;
      }
    },
    created () {
      var cookiesAccept = localStorage.getItem('cookiesAccept');
      if (cookiesAccept === 0 || cookiesAccept === '0' || cookiesAccept === null) {
        this.cookieAccepted = false
      } else {
        this.cookieAccepted = true
      }
    }
  }
</script>

<style type="text/css">
  .cookies-alert-bottom{
    z-index: 10000;
    position: fixed;
    bottom: 5px;
    left:2%;
    width: 96%;
    font-family: 'Muli', sans-serif;
    font-size: 18px;
    line-height: 22px;
  }
</style>
