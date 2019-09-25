<template>
  <div class="tab-link-list mb-4">
    <b-link :to="{name:'www'}"
            active-class="active"
            class="tab-link-item">
      Lorem
    </b-link>
    <b-link :to="{name:'my'}"
            active-class="active"
            class="tab-link-item">
      Lorem
    </b-link>
    <b-link :to="{name:'dev'}"
            active-class="active"
            class="tab-link-item">
      Lorem
    </b-link>

  </div>

</template>

<script>
import EventBus from '@/event-bus'

export default {
  name: 'TabLinks',
  data () {
    return {
    }
  },
  computed: {},
  methods: {},
  created () {
    EventBus.$on('CHANGE_TABS', (params) => {
      console.log(params)
    })
  }
}
</script>

<style scoped>

</style>
