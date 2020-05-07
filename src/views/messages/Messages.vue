<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="6">
        <h4 class="mb-4">Dane ogólne</h4>
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
        <h4 class="mb-2">Lista odbiorców</h4>
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
          <b-col cols="4">
            <b-btn block variant="primary" class="custom" @click="sendMessage()">
              Wyślij
            </b-btn>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="6">
        <h4 class="mb-3">Wysłane</h4>
        <b-table
          :items="mails"
          :fields="recipientFields"
          striped
          responsive="md"
          class="custom table-responsive"
        >
          <template slot="title" slot-scope="scope">
            <p>{{scope.item.mailTemplate.title}}</p>
          </template>
          <template slot="created" slot-scope="scope">
            <p>{{scope.item.mailTemplate.created}}</p>
          </template>
          <template slot="recipient" slot-scope="scope">
            <p>{{scope.item.recipient.email}}</p>
          </template>
          <template slot="status" slot-scope="scope">
             <span class="status" :class="{'active': scope.item.status}">
            {{scope.item.status == 1 ? 'Przeczytane w systemie' : 'Nieprzeczytane w systemie'}}
          </span>
          </template>
          <template slot="description" slot-scope="scope">
            <p @click="showDescription(scope.item)" class="c-pointer">Zobacz</p>
          </template>

          <template slot="edit" slot-scope="scope">
            <b-link class="icon-link">
              <span class="icon icon-iconm_search"></span>
            </b-link>
          </template>
        </b-table>
      </b-col>
    </b-row>

    <b-modal ref="modalMessageDesc"
             @hidden="resetModal"
             modal-class="custom"
             centered size="md"
             :hide-footer="true"
             footer-class="justify-content-between"
             title-tag="h2"
             header-class="pr-4 pb-0">

      <template slot="modal-title">
        {{selectedMail.title}}
      </template>

      <div slot="default" class="d-flex">
        <p>{{selectedMail.description}}</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
  // node_modules
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import FormMixin from '@/mixins/form-mixin'
  import EventBusEmit from '@/mixins/event-bus-emit'
  import MessagesMixin from '@/mixins/messages-mixin'
  import ParticipantMixin from '@/mixins/participant-mixin'

  export default {
    name: 'Messages',
    components: {Treeselect},
    mixins: [EventBusEmit, FormMixin, MessagesMixin],
    data () {
      return {
        selectedMail: {
          title: '',
          description: ''
        },

        mailTemplate: {
          id: this.id,
          title: '',
          description: ''
        },
        selectedSchoolOrCLub: [],
        selectedLeaders: [],

        typeOptions: [
          {text: 'klub', value: 0},
          {text: 'szkola', value: 1}
        ],
        selectedType: [],
        templateFields: [
          {key: 'title', label: 'Tytuł', sortable: true},
          {key: 'description', label: 'Treść', sortable: true}
        ],
        recipientFields: [
          {key: 'title', label: 'Tytuł', sortable: true},
          {key: 'created', label: 'Data wysłania', sortable: true},
          {key: 'recipient', label: 'Odbiorca', sortable: true},
          {key: 'status', label: 'Status', sortable: true},
          {key: 'description', label: 'Treść', sortable: true}
        ]
      }
    },
    computed: {
      sender () {
        return this.$store.getters.sender
      },
      mailTemplates () {
        return this.sender ? this.sender.mailTemplates : []
      },
      mails () {
        return this.sender ? this.sender.mails : []
      }
    },
    methods: {
      resetModal () {
        this.selectedMail = {
          title: '',
          description: ''
        }
      },
      showDescription (item) {
        this.selectedMail.title = item.mailTemplate.title
        this.selectedMail.description = item.mailTemplate.description
        this.$refs.modalMessageDesc.show()
      },
      sendMessage () {
        let data = {
          mailTemplate: {...this.mailTemplate},
          selectedSchoolOrCLub: [...this.selectedSchoolOrCLub],
          selectedLeaders: [...this.selectedLeaders]
        }
        const method = 'postSender'
        this.$store.dispatch(method, data)
          .then(() => {
            this.postSubmitRedirect('messages')
          })
          .catch((error) => {
            this.postSubmitError(error)
          })
      },
      rowRedirectMails (row) {
        this.$router.push({
          name: 'recipient',
          params: {'id': row.id}
        })
      }
    },
    created () {
      this.$store.dispatch('getSender')
      this.$store.dispatch('getSchools', {confirmed: 1})
      this.$store.dispatch('getLeaders', {confirmed: 1})
      this.$store.dispatch('getLeaders', {confirmed: 0})

      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
      this.changeAdminNavbarBreadcrumbs([{text: 'Komunikaty', active: true}])
    }
  }
</script>

<style scoped>

</style>
