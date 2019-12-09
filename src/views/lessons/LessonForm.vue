<template>
  <div class="container">
    <TabLinks :links="tabLinks"></TabLinks>
    <template>
      <FormMainData :lesson="lesson" @childSubmit="submit" ref="FormMainData"
                    :key="$route.params.tab+'FormMainData'" v-show="$route.params.tab === 'main-data'"/>
    </template>
  </div>
</template>

<script>
  import TabLinks from '@/components/TabLinks'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'

  import FormMainData from '@/views/lessons/components/FormMainData'

  export default {
    name: 'LessonForm',
    components: {
      FormMainData
    },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        tabLinks: [
          {
            title: 'Dane ogólne',
            link: 'lesson',
            tab: 'main-data'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
