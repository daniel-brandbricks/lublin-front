<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col lg="6" sm="12" class="mb-2">
        <h4 class="mb-4">Dane ogólne</h4>
        <b-form-group class="custom mb-2">
          <b-form-input id="title-1" class="custom m-0"
                        placeholder="Tytuł"
                        :class="{'error-input-custom': veeErrors.has('mailTemplate.title')}"
                        name="mailTemplate.title" key="mailTemplate.title"
                        v-model="mailTemplate.title"/>
        </b-form-group>
        <textarea class="custom w-100 mb-4" v-model="mailTemplate.description" placeholder="Wiadomość"
                  :class="{'error-input-custom': veeErrors.has('mailTemplate.description')}"
                  name="mailTemplate.description" :key="'mailTemplate.description'" :v-validate="'required'"/>
        <h4 class="mb-2">Lista odbiorców</h4>
        <b-form-checkbox-group class="mr-3 mb-2"
                               v-if="$store.getters.isAdmin"
                               id="checkbox-group-1"
                               v-model="selectedType"
                               :options="typeOptions"
                               name="checkbox-group-type"
        />
        <treeselect v-model="selectedSchoolOrCLub"
                    v-if="$store.getters.isAdmin"
                    :multiple="true"
                    :searchable="false"
                    placeholder="Nazwa klubu/Szkoły"
                    :options="schoolsTreeselect"
                    class="custom mb-2"/>

        <treeselect v-model="selectedLeaders" v-if="selectedLeaders"
                    :multiple="true" class="custom mb-2"
                    placeholder="Prowadzący" :options="leadersTreeselect"
        />

        <b-row class="mt-4 justify-content-end">
          <b-col sm="12" lg="4" class="mb-2" v-if="$store.getters.isAdmin">
            <b-btn block variant="primary" class="custom" @click="selectAll(0)">
              Wszystkie Szkoły / Kluby
            </b-btn>
          </b-col>
          <b-col sm="12" lg="4" class="mb-2">
            <b-btn block variant="primary" class="custom" @click="selectAll(1)">
              Wszyscy prowadzący
            </b-btn>
          </b-col>
          <b-col sm="12" lg="4" class="mb-2">
            <b-btn block variant="primary" class="custom" @click="sendMessage()">
              Wyślij
            </b-btn>
          </b-col>
        </b-row>
      </b-col>

      <b-col lg="6" sm="12">
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
        <p style="white-space: pre-wrap">{{selectedMail.description}}</p>
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
  import ToastMixin from '@/mixins/toast-mixin'

  export default {
    name: 'Messages',
    components: {Treeselect},
    mixins: [EventBusEmit, FormMixin, MessagesMixin, ToastMixin],
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
          // {key: 'status', label: 'Status', sortable: true},
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
        if (this.sender && this.sender.mails && this.sender.mails.length > 0) {
          let mails = JSON.parse(JSON.stringify(this.sender.mails))
          return mails.sort((a, b) => b.id - a.id)
        }
        return []
      }
    },
    methods: {
      selectAll (type) {
        for (let index in type === 0 ? this.schoolsTreeselect : this.leadersTreeselect) {
          if (type === 0 && !this.selectedSchoolOrCLub.includes(this.schoolsTreeselect[index].id)) { this.selectedSchoolOrCLub.push(this.schoolsTreeselect[index].id) }
          if (type === 1 && !this.selectedLeaders.includes(this.leadersTreeselect[index].id)) { this.selectedLeaders.push(this.leadersTreeselect[index].id) }
        }
      },
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
        if (this.selectedSchoolOrCLub.length < 1 && this.selectedLeaders.length < 1) {
          this.showToast('Wybierz co najmniej jednego odbiorcę', 'Uwaga!', 'danger')
          return
        }
        if (this.mailTemplate.title.length < 1 || this.mailTemplate.description.length < 1) {
          this.showToast('Wypełni treść', 'Uwaga!', 'danger')
          return
        }

        let data = {
          mailTemplate: {...this.mailTemplate},
          selectedSchoolOrCLub: [...this.selectedSchoolOrCLub],
          selectedLeaders: [...this.selectedLeaders]
        }
        const method = 'postSender'
        this.$store.dispatch(method, data)
          .then(() => {
            this.showToast('Wiadomość została wysłana', 'Uwaga!', 'success')
            this.clearData()
            this.$store.dispatch('getSender')
          })
          .catch((error) => {
            this.postSubmitError(error)
            this.clearData()
          })
      },
      clearData () {
        this.mailTemplate = {
          id: this.id,
          title: '',
          description: ''
        }
        this.selectedSchoolOrCLub = []
        this.selectedLeaders = []
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
