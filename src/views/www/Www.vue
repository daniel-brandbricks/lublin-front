<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12">
        <TabLinks :links="tabLinks"/>
      </b-col>
    </b-row>

    <Menu v-if="$route.params.tab === 'menu'"/>
    <Cms v-if="$route.params.tab === 'cms'"/>
    <Footer v-if="$route.params.tab === 'footer'"/>
  </div>
</template>

<script>
  import TabLinks from '../../components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'

  import Menu from '@/views/www/components/Menu'
  import Cms from '@/views/www/components/Cms'
  import Footer from '@/views/www/components/Footer'

  export default {
    // eslint-disable-next-line standard/object-curly-even-spacing
    components: { TabLinks, Menu, Cms, Footer },
    mixins: [ EventBusEmit ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Menu',
            link: 'www',
            tab: 'menu'
          },
          {
            title: 'Home',
            link: 'www',
            tab: 'cms'
          },
          {
            title: 'Footer',
            link: 'www',
            tab: 'footer'
          }
        ]
      }
    },
    created () {
      if (this.$route.params.tab === undefined) {
        this.$router.push({ name: 'www', params: { 'tab': 'menu' } })
      }

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
      this.changeAdminNavbarBreadcrumbs([ { text: 'Strona www', active: true } ])
    }
  }
</script>

<style scoped>

</style>
