<template>
  <b-row class="justify-content-center">
    <b-col cols="6">
      <h5>Dane ogólne</h5>
        <b-form-group class="custom mb-2">
          <b-form-input id="title-1" class="custom m-0"
                        placeholder="Tytuł"
                        :class="{'error-input-custom': veeErrors.has('mailTemplate.title')}"
                        name="mailTemplate.title" key="mailTemplate.title" v-validate="{'required':true}"
                        v-model="mailTemplate.title"/>
        </b-form-group>
      <textarea class="custom w-100 mb-4" v-model="mailTemplate.description" placeholder="Wiadomość"
                :class="{'error-input-custom': veeErrors.has('mailTemplate.description')}"
                name="mailTemplate.description" :key="'mailTemplate.description'" :v-validate="'required'"/>
      <h2 class="mb-2">Lista odbiorców</h2>
            <b-form-checkbox-group class="mr-3 mb-2"
              id="checkbox-group-1"
              v-model="selectedType"
              :options="typeOptions"
              name="checkbox-group-type"
            />
          <treeselect v-model="selectedSchoolOrCLub"
                      :multiple="true"
                      :searchable="false"
                      placeholder="Nazwa klubu/Szkoły"
                      :options="schoolsTreeselect"
                      class="custom mb-2"/>

      <treeselect v-model="selectedLeaders" v-if="selectedLeaders"
                  :multiple="true" class="custom mb-2"
                  placeholder="Prowadzący" :options="leadersTreeselect"
      />
      <b-row class="mt-4">
        <div class="col">
          <b-btn variant="delete" class="custom"
                 @click="deleteFromForm('deleteSender', sender.id, undefined, 'messages')">
            Usuń
          </b-btn>
          <b-link block class="custom btn" :to="{ name: 'messages' }">
            Anuluj
          </b-link>
        </div>

        <b-col>
          <b-btn block class="custom" @click="submit(true)">
            Zapisz
          </b-btn>
        </b-col>
        <b-col>
          <b-btn block variant="primary" class="custom" @click="goToFormTab('places')">
            Dalej
          </b-btn>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import FormMixin from '@/mixins/form-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'

  export default {
    name: 'MailTemplate',
    props: [ 'sender' ],
    components: { Treeselect },
    mixins: [ EventBusEmit, FormMixin ],
    data () {
      return {
        mailTemplate: {
          id: this.id,
          title: '',
          description: ''
        },
        selectedSchoolOrCLub: [],
        selectedLeaders: [],
        typeOptions: [
          { text: 'klub', value: 0 },
          { text: 'szkola', value: 1 }
        ],
        selectedType: []
      }
    },
    computed: {
      // schoolsTreeselect () {
      //   let data = this.$store.getters.schools
      //   let preparedSchools = []
      //
      //   for (let schoolIndex in data) {
      //     preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].name })
      //   }
      //
      //   return preparedSchools
      // },
      schoolsTreeselect () {
        let data = this.$store.getters.schoolsConfirmed
        let preparedSchools = []

        for (let schoolIndex in data) {
          if (this.selectedType.length > 0) {
            if (this.selectedType.includes(data[schoolIndex].type)) {
              preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].email })
            }
          } else {
            preparedSchools.push({ id: data[schoolIndex].id, label: data[schoolIndex].email })
          }
        }

        return preparedSchools
      },
      leadersTreeselect () {
        let data = this.$store.getters.leaders
        let preparedLeaders = []

        for (let leaderIndex in data) {
          preparedLeaders.push({ id: data[leaderIndex].id, label: data[leaderIndex].email })
        }

        return preparedLeaders
      }
    },
    methods: {
      prepareMailTemplate () {
        this.mailTemplate = {...this.mailTemplate}
      },
      submit () {
        let sender = this.sender
        console.log(this.sender)
        // school.image = this.mixinImage

        const method = this.id === undefined ? 'postSender' : 'putSender'
        this.$store.dispatch(method, sender)
          .then(() => {
            this.postSubmitRedirect('sender')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      }
    },
    created () {
      if (this.$route.params === undefined) {
        this.$router.push({ name: 'messages' })
      }

      this.$store.dispatch('getSchools', { confirmed: 1 })
      this.$store.dispatch('getLeaders', {confirmed: 1})
      this.$store.dispatch('getLeaders', {confirmed: 0})

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})

      let breadcrumbs = [
        { text: 'Komunikaty', to: { name: 'messages' } },
        { text: 'Tytuł', active: true } // todo mailTemplates.tittle
      ]
      this.changeAdminNavbarBreadcrumbs(breadcrumbs)

      if (this.id) {
        this.$store.dispatch('getSender', {mailTemplate: this.title})
          .then((response) => {
            this.prepareMailTemplate(response)
            /** @buttonLink route name || false if button must be hidden */
            this.changeAdminNavbarButton({ buttonLink: false })

            let breadcrumbs = [
              { text: 'Komunikaty', to: { name: 'messages' } },
              { text: response.title, active: true }
            ]
            this.changeAdminNavbarBreadcrumbs(breadcrumbs)
          })
      }
    }
  }
</script>

<style scoped>

</style>
