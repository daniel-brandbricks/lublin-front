<template>
  <b-row class="justify-content-center">
    <b-col cols="14" lg="5">
      <h2 class="center">MENU ITEM</h2>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Tytuł"
                      :class="{'error-input-custom': veeErrors.has('menuItem.title')}"
                      name="menuItem.title" key="menuItem.title" v-validate="{'required':true}"
                      v-model="menuItem.title"/>
      </b-form-group>
      <b-form-group class="custom">
        <b-form-input id="input-1" class="custom"
                      placeholder="Link"
                      :class="{'error-input-custom': veeErrors.has('menuItem.link')}"
                      name="menuItem.link" key="menuItem.link" v-validate="{'required':true}"
                      v-model="menuItem.link"/>
      </b-form-group>
      <b-row class="justify-content-center justify-content-sm-end">
        <b-col cols="12" sm="4">
          <b-btn block variant="primary" class="custom" @click="submit(1, true)">
            Zapisz
          </b-btn>
        </b-col>

      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  export default {
    name: 'MenuItemData',
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        menuItem: {
          id: this.id,
          title: '',
          link: ''
        }
      }
    },
    methods: {
      prepareMenuItem (menuItem) {
        this.menuItem = menuItem
      },
      submit () {
        let menuItem = {...this.menuItem}
        const method = 'putMenuItem'
        this.$store.dispatch(method, menuItem)
          .then(() => {
            this.postSubmitRedirect('www')
          })
          .catch((error) => {
            this.postSubmitRedirect(error)
          })
      }
    },
    created () {
      if (this.$route.params === undefined) {
        this.$router.push({ name: 'www', params: {'tab': 'menu'} })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      let breadcrumbs = [
        {text: 'Strona www', to: {name: 'www'}},
        {text: 'Nowy', active: true}
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)
      if (this.id) {
        this.$store.dispatch('getMenuItem', {id: this.id})
          .then((response) => {
            this.prepareMenuItem(response)
            console.log(response)
            console.log(111)
            /** @buttonLink route name || false if button must be hidden */
            this.changeAdminNavbarButton({ buttonLink: false })

            let breadcrumbs = [
              {text: 'Strona www', to: {name: 'www'}},
              {text: response.title, active: true}
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
