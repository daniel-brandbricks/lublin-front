<template>
  <div>
    <TabLinks :links="tabLinks"></TabLinks>
    <b-row class="justify-content-center">

      <!--   image   -->
      <b-col cols="12" lg="3" class="">
        <h2>Zdjęcie</h2>
        <div class="wrap-img-input mb-3 mt-4">
          <img src="https://placeimg.com/200/200/any" alt="img">
        </div>
        <b-row class="justify-content-center justify-content-md-end">
          <b-col cols="12" sm="6" md="4" lg="12">
            <b-btn variant="primary" class="custom" block>Zmień</b-btn>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="12" lg="5" class="">
        <h2>Aktywuj</h2>
        <b-form-group class="mt-4 mb-4">
          <b-form-radio v-model="selectedRadio" name="some-radios" value="A" class="d-inline-block mr-3">Tak</b-form-radio>
          <b-form-radio v-model="selectedRadio" name="some-radios" value="B" class="d-inline-block">Nie</b-form-radio>
        </b-form-group>

        <h2>Dane ogólne</h2>
        <b-form-group class="mt-4">
          <b-form-radio v-model="selectedRadio" name="some-radios" value="A" class="d-inline-block mr-3">Klub</b-form-radio>
          <b-form-radio v-model="selectedRadio" name="some-radios" value="B" class="d-inline-block">Szkoła</b-form-radio>
        </b-form-group>
      </b-col>


    </b-row>
  </div>
</template>

<script>
import TabLinks from '@/components/TabLinks'
import EventBusEmit from '@/mixins/event-bus-emit'

export default {
  name: 'SchoolAndClubForm',
  components: { TabLinks },
  mixins: [ EventBusEmit ],
  data () {
    return {
      tabLinks: [
        {
          title: 'Dane ogólne',
          link: 'dane-ogólne'
        },
        {
          title: 'Obiekty sportowe',
          link: 'obiekty-sportowe'
        }
      ]
    }
  },
  computed: {},
  methods: {},
  created () {
  }
}
</script>

<style scoped>

</style>
