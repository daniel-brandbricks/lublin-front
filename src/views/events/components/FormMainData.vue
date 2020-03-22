<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12" lg="5">
        <h2>Zdjęcie</h2>
        <div :key="image.id" v-for="(image,index) in event.images">
          <ImageInputAdvanced :imgPath="event.images[index].path" @afterCropImage="afterCropImage"
                              :image-multiple="true" :imageId="image.id"
                              :min-aspect-ratio="8/8" :max-aspect-ratio="10/8" :min-height="100"
                              :min-width="100" :max-height="1000" :max-width="1000"/>
        </div>

        <b-btn variant="primary" class="custom mt-4" @click="addImage" block>Dodaj kolejne</b-btn>
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
                        v-if="event.id === undefined"
                        v-model="orgType" :value="element.value" class="d-inline-block mt-3 mr-3"
                        :class="{'error-input-custom': veeErrors.has('organizatorType')}"
                        name="organizatorType" :key="'organizatorType'+index" v-validate="{'required':true}"
                        v-for="(element,index) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}]">
            {{ element.title }}
          </b-form-radio>
        </b-form-group>
        <b-form-group v-if="event.school">
          <treeselect v-model="event.school.id"
                      :disabled="event.id ==! undefined"
                      :multiple="false"
                      placeholder="Klub / Szkoła"
                      :options="schoolsAndClubsPrepared"
                      class="custom mb-2"
                      :class="{'error-input-custom': veeErrors.has('event.school')}"
                      name="event.school" key="event.school" v-validate="{'required':true}"/>
        </b-form-group>

        <b-form-group class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="Osoba kontaktowa"
                        :class="{'error-input-custom': veeErrors.has('event.personToContact')}"
                        name="event.personToContact" key="event.personToContact" v-validate="{'required':true}"
                        v-model="event.personToContact"/>
        </b-form-group>

        <h2 class="my-4">Lokalizacja i Data</h2>
        <b-form-group>
          <b-form-radio @click="clearAddress"
                        v-if="event.id === undefined"
                        v-model="addressType" :value="element.value" class="d-inline-block mt-3 mr-3"
                        :class="{'error-input-custom': veeErrors.has('addressType')}"
                        name="addressType" :key="'addressType'+index" v-validate="{'required':true}"
                        v-for="(element,index) in [{title: 'Jeden adres', value: 0}, {title: '2 i więcej', value: 1}]">
            {{ element.title }}
          </b-form-radio>
        </b-form-group>

        <div v-if="(addressType === 0 && event.id === undefined) ||
        (event.id !== undefined && (event.addressDesc === null || event.addressDesc.length < 1))">
          <b-form-group class="custom">
            <b-form-input id="input-address" class="custom"
                          placeholder="Adres"
                          :class="{'error-input-custom': veeErrors.has('event.address')}"
                          name="event.address" key="event.address" v-validate="{'required':true}"
                          v-model="event.address"/>
          </b-form-group>
        </div>
        <div v-if="(addressType === 1 && event.id === undefined) ||
        (event.id !== undefined && (event.address === null || event.address.length < 1))">
          <textarea class="custom w-100 mb-3" v-model="event.addressDesc" placeholder="Opis miejscowości"
                    :class="{'error-input-custom': veeErrors.has('event.addressDesc')}"
                    name="event.addressDesc" :key="'event.addressDesc'" :v-validate="'required'"/>
        </div>

        <div :key="date.id" v-for="(date,index) in event.dates">
          <b-row>
            <b-col>
              <date-picker v-model="event.dates[index].date" :lang="'pl'"
                           :class="{'error-input-custom': veeErrors.has('event.date'+date.id)}"
                           :name="'event.date'+date.id" :key="'event.date'+date.id"
                           value-type="format" format="YYYY-MM-DD"
                           type="date"
                           v-validate="{'required': true}"
                           :id="'event.date'+date.id" placeholder="" class="w-100 custom mb-3">
              </date-picker>
            </b-col>
            <b-col>
              <date-picker v-model="event.dates[index].timeRange" :lang="'pl'"
                           :class="{'error-input-custom': veeErrors.has('event.timeRange'+date.id)}"
                           :name="'event.timeRange'+date.id" :key="'event.timeRange'+date.id"
                           type="time"
                           range @clear="event.dates[index].timeRange = []"
                           :show-second="false"
                           value-type="format"
                           format="HH:mm"
                           v-validate="{'required': true}"
                           :id="'event.timeRange'+date.id" placeholder="" class="w-100 custom mb-3">
              </date-picker>
            </b-col>
          </b-row>
          <b-btn variant="delete" class="custom" @click="removeDate(date.id)">Usuń datę
          </b-btn>
        </div>
        <b-btn variant="primary" class="custom mt-4" @click="addDate" block>Dodaj datę</b-btn>

        <b-row class="mt-4">
          <b-col>
            <b-btn variant="delete" class="custom"
                   @click="deleteFromForm('deleteEvent', event.id, undefined, 'events', {tab: 'confirmed'})">
              Usuń
            </b-btn>
          </b-col>
          <b-col>
            <b-btn block class="custom btn" :to="{ name: 'events', params: { 'tab': 'confirmed' } }">
              Anuluj
            </b-btn>
          </b-col>
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
  import DatePicker from "vue2-datepicker";

  export default {
    name: 'FormMainData',
    props: ['event'],
    components: {Treeselect, ImageInputAdvanced, DatePicker},
    mixins: [EventBusEmit, FormMixin, EventsMixin],
    data() {
      return {
        orgType: 0,
        addressType: 0
      }
    },
    computed: {
      ...mapGetters(['schools']),
      leadersTreeselect() {
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
      removeDate(dateId) {
        let index = this.$parent.event.dates.findIndex(x => x.id === dateId)
        this.$parent.event.dates.splice(index, 1)
      },
      addDate() {
        let dateId = -1

        for (let index in this.$parent.event.dates) {
          if (this.$parent.event.dates[index].id && this.$parent.event.dates[index].id <= dateId) {
            dateId = this.$parent.event.dates[index].id - 1
          }
        }
        this.$parent.event.dates.push({date: null, timeRange: '', id: dateId})
      },
      clearAddress() {
        this.event.addressDesc = ''
        this.event.address = ''
      },
      addImage() {
        let imageId = -1
        for (let index in this.$parent.event.images) {
          if (this.$parent.event.images[index].id && this.$parent.event.images[index].id <= imageId) {
            imageId = this.$parent.event.images[index].id - 1
          }
        }
        this.$parent.event.images.push({path: null, id: imageId})
      },
      removeImage(imageId) {
        let index = this.$parent.event.images.findIndex(x => x.id === imageId)
        this.$parent.event.images.splice(index, 1)
      },
      submit(validRequired) {
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
      afterCropImage(data) {
        console.log(data)
        for (let index in this.$parent.event.images) {
          if (this.$parent.event.images[index].id === data.id) {
            this.$parent.event.images[index].path = data.image
          }
        }
        // this.school.image = base64
      }
    },
    mounted() {
      // validate form after redirect from another tab (component)
      if (this.$route.params.validateForm) {
        this.checkValidForm()
      }
    },
    created() {
      this.$store.dispatch('getSchools')
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
    }
  }
</script>

<style scoped>

</style>
