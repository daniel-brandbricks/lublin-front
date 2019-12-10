import EventBus from '@/event-bus'

export default {
  name: 'EventBusEmit',
  data () {
    return {
    }
  },
  methods: {
    changeAdminNavbarButton (params) {
      console.log(params)
      EventBus.$emit('NAVBAR_BUTTON_LINK', (params))
    },
    changeAdminNavbarBreadcrumbs (params) {
      EventBus.$emit('NAVBAR_CHANGE_BREADCRUMBS', (params))
    }
  }
}
