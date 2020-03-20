<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12" lg="5">
        <h2>Zdjęcie</h2>
        <ImageInputAdvanced :imgPath="event.image" @afterCropImage="afterCropImage"
                            :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                            :min-width="100" :max-height="1000" :max-width="1000"/>
      </b-col>
      <b-col class="justify-content-center justify-content-md-end">
        <h2 class="my-4">Dane ogólne</h2>
        <b-form-group class="custom">
          <b-form-input id="input-1" class="custom mb-3"
            placeholder="Nazwa Imprezy"
            :class="{'error-input-custom': veeErrors.has('event.title')}"
            name="event.title" key="event.title" v-validate="{'required':true}"
            v-model="event.title"/>
        </b-form-group>
        <textarea class="custom w-100 mb-3" v-model="event.description" placeholder="Opis"
                  :class="{'error-input-custom': veeErrors.has('event.description')}"
                  name="event.description" :key="'event.description'" :v-validate="'required'"/>
        <b-form-group
          class="custom">
          <b-form-input id="input-2" class="custom"
                        placeholder="E-mail"
                        :class="{'error-input-custom': veeErrors.has('event.email')}"
                        name="event.email" key="event.email" v-validate="{'required':true, 'email':true}"
                        v-model="event.email"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-3" class="custom"
                        placeholder="Telefon"
                        :class="{'error-input-custom': veeErrors.has('event.phone')}"
                        name="event.phone" key="event.phone" v-validate="{'required':true}"
                        v-model="event.phone"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="Facebook"
                        :class="{'error-input-custom': veeErrors.has('event.facebook')}"
                        name="event.facebook" key="event.facebook" v-validate="{'required':true}"
                        v-model="event.facebook"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="Youtube"
                        :class="{'error-input-custom': veeErrors.has('event.youtube')}"
                        name="event.youtube" key="event.youtube" v-validate="{'required':true}"
                        v-model="event.youtube"/>
        </b-form-group>
        <h2 class="my-4">Organizator</h2>
        <b-form-group>
          <b-form-radio @change="event.school.id = null"
                        v-model="orgType" :value="element.value" class="d-inline-block mt-3 mr-3"
                        :class="{'error-input-custom': veeErrors.has('organizatorType')}"
                        name="organizatorType" :key="'organizatorType'+index" v-validate="{'required':true}"
                        v-for="(element,index) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}]">
            {{ element.title }}
          </b-form-radio>
        </b-form-group>
        <b-form-group v-if="event.school">
          <treeselect v-model="event.school.id"
                      :multiple="false"
                      placeholder="Klub / Szkoła"
                      :options="schoolsAndClubsPrepared"
                      class="custom mb-2"
                      :class="{'error-input-custom': veeErrors.has('event.school')}"
                      name="event.school" key="event.school" v-validate="{'required':true}"/>
        </b-form-group>
        <b-form-group class="custom mb-2" v-if="event.leader">
          <treeselect class="custom m-0"
                      v-model="event.leader.id"
                      :multiple="false"
                      placeholder="Prowadzący" :options="leadersTreeselect(event.school.id)"
                      :class="{'error-input-custom': veeErrors.has('event.leaders')}"
                      name="event.leaders" key="event.leaders" v-validate="{'required':true}"/>
        </b-form-group>
<!--                    todo BTN-POSITION              -->
        <b-row class="mt-4">
          <div class="col">
            <b-btn variant="delete" class="custom"
                   @click="deleteFromForm('deleteEvent', event.id, undefined, 'events', {tab: 'confirmed'})">
              Usuń
            </b-btn>
            <b-btn class="custom btn" :to="{ name: 'events', params: { 'tab': 'confirmed' } }">
              Anuluj
            </b-btn>
          </div>

          <b-col>
            <b-btn block variant="primary" class="custom btn" @click="submit(true)">
              Zapisz
            </b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  import EventBusEmit from '@/mixins/event-bus-emit'
  import FormMixin from '@/mixins/form-mixin'
  import ImageInputAdvanced from '@/components/ImageInputAdvanced'

  import EventsMixin from '@/mixins/event-mixin'

  import {mapGetters} from 'vuex'

  export default {
    name: 'FormMainData',
    props: [ 'event' ],
    components: { Treeselect, ImageInputAdvanced },
    mixins: [ EventBusEmit, FormMixin, EventsMixin ],
    data () {
      return {
        orgType: 0
      }
    },
    computed: {
      ...mapGetters(['schools']),
      leadersTreeselect () {
        return eventId => {
          let leadersConfirmed = this.leadersConfirmed
          let prepared = []
          for (let index in leadersConfirmed) {
            // get places with @eventId
            if (!Array.isArray(leadersConfirmed[index].eventsUsers) ||
              undefined === leadersConfirmed[index].eventsUsers.find(x => {
                return parseInt(x.school.id) === eventId
            })) {
              continue
            }
            prepared.push({id: leadersConfirmed[index].id, label: leadersConfirmed[index].firstName})
          }
          return prepared
        }
      }
    },
    methods: {
      submit (validRequired) {
        if (validRequired) {
          this.preSubmit()
            .then((result) => {
              if (!result) {
                this.loading = false
                return
              }

              this.loading = false
              this.$parent.submit()
            })
        } else {
          this.$parent.submit()
        }
      },
      afterCropImage (base64) {
        this.school.image = base64
      }
    },
    mounted () {
      // validate form after redirect from another tab (component)
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }
    },
    created () {
      this.$store.dispatch('getSchools')
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({ buttonLink: false })
    }
  }
</script>

<style scoped>

</style>
