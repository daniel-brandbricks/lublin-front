<template>
  <div class="footer-page">
<b-container>
  <b-row v-if="$store.getters.menuAndFooter && $store.getters.menuAndFooter.footer">
    <b-col cols="12" lg="6" class="text-center">
      <a href="#" class="">
        <img :src="$store.getters.menuAndFooter.footer.image" alt="LOGO">
      </a>
    </b-col>
    <b-col cols="12" lg="6">
      <b-row>
        <b-col cols="12" lg="6">
         <p class="text-footer border-r">
           Urząd Miasta Lublin <br>
           Wydział Sportu <br>
           <b-link class="" target="_blank" :to="{ name: 'polityka.prywatnosci' }">
             Polityka prywatności
           </b-link>
           <br>
          <b-link class="" target="_blank" :to="{ name: 'deklaracja.dostepnosci' }">
            Deklaracja dostępności
          </b-link>
           <br>
          <b-link class="" target="_blank" :to="{ name: 'klauzula.informacyjna' }">
            Klauzula informacyjna
          </b-link>
         </p>

        </b-col>
        <b-col cols="12" lg="6">
          <p class="text-footer">
            Współzawodnictwo Sportowe <br> Szkół Miasta Lublin <br>
            <span class="icon icon-icon_mail"></span>{{$store.getters.menuAndFooter.footer.email}} <br>
            <span class="icon icon-icon_phone"></span>{{$store.getters.menuAndFooter.footer.phone}}
          <br>
            {{$store.getters.menuAndFooter.footer.address}}
          </p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>

</b-container>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped>

</style>
