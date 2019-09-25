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
      EventBus.$emit('NAVBAR_CHANGE_BREADCRUMBS', ({ par1: 'breadcrumbs', par2: false }))
    }
  }
}
