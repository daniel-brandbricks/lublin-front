import EventBus from '@/event-bus'

export default {
  name: 'EventBusEmit',
  data () {
    return {
    }
  },
  methods: {
    changeAdminNavbarButton (params) {
      EventBus.$emit('NAVBAR_BUTTON_LINK', (params))
    },
    changeAdminNavbarBreadcrumbs () {
      EventBus.$emit('CHANGE_BREADCRUMBS', ({ par1: 'breadcrumbs', par2: false }))
    },
    changeTabs (params) {
      EventBus.$emit('CHANGE_TABS', (params))
    }
  }
}
