<template>
  <b-col cols="12">
    <template>
      <date-pick
        v-model="date"
        :hasInputElement="false"
      ></date-pick>
      <!--todo добавить класс на ячейку с событием, и дописать ему стиля от .disablet-->
      <!--todo убрать с header select-->
    </template>
  </b-col>
</template>

<script>
// node_modules
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import EventBusEmit from '@/mixins/event-bus-emit'
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'

export default {
  components: {Treeselect, DatePick},
  mixins: [EventBusEmit],
  props: ['events'],
  data () {
    return {
      date: '2019-09-01',
    }
  },
  computed: {},
  created () {}
}
</script>

<style scoped>

</style>
