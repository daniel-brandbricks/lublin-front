<template>
  <div class="container">
    <b-row class="justify-content-center">
      <b-col cols="12" lg="5">
        <h2>Zdjęcie</h2>
        <div :key="image.id" v-for="(image,index) in event.images">
          <ImageInputAdvanced :imgPath="event.images[index].path" @afterCropImage="afterCropImage"
                              :image-multiple="true" :imageId="image.id"
                              :min-aspect-ratio="5/4" :max-aspect-ratio="6/4" :min-height="100"
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
                  name="event.description" :key="'event.description'"/>
        <b-form-group
          class="custom">
          <b-form-input id="input-2" class="custom"
                        placeholder="E-mail"
                        :class="{'error-input-custom': veeErrors.has('event.email')}"
                        name="event.email" key="event.email" v-validate="{'email':true}"
                        v-model="event.email"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-3" class="custom"
                        placeholder="Telefon"
                        name="event.phone" key="event.phone"
                        v-model="event.phone"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="Facebook"
                        name="event.facebook" key="event.facebook"
                        v-model="event.facebook"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="Youtube"
                        name="event.youtube" key="event.youtube"
                        v-model="event.youtube"/>
        </b-form-group>
        <b-form-group
          class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="WWW"
                        name="event.www" key="event.www"
                        v-model="event.www"/>
        </b-form-group>
        <b-form-group>
          <b-form-group v-if="event.discipline">
            <treeselect v-model="event.discipline.id"
                        :multiple="false"
                        placeholder="Dyscyplina"
                        :options="disciplinesPrepared"
                        class="custom mb-2"
                        name="event.discipline" key="event.discipline"/>
          </b-form-group>
        </b-form-group>

        <h2 class="my-4">Organizator</h2>
        <b-form-group>
          <b-form-radio @change="event.school.id = null"
                        v-if="event.id === undefined"
                        v-model="orgType" :value="element.value" class="d-inline-block mt-3 mr-3"
                        :class="{'error-input-custom': veeErrors.has('organizatorType')}"
                        name="organizatorType" :key="'organizatorType'+index" v-validate="{'required':true}"
                        v-for="(element,index) in [{title: 'Klub', value: 0}, {title: 'Szkoła', value: 1}, {title: 'Inny podmiot', value: 2}]">
            {{ element.title }}
          </b-form-radio>
        </b-form-group>

        <div v-if="orgType !== 2">
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
        </div>
        <div v-else>
          <b-form-group class="custom">
            <b-form-input id="input-1" class="custom mb-3"
                          placeholder="Nazwa organizatora"
                          :class="{'error-input-custom': veeErrors.has('event.organization')}"
                          name="event.organization" key="event.organization" v-validate="{'required':true}"
                          v-model="event.organization"/>
          </b-form-group>
        </div>

        <b-form-group class="custom">
          <b-form-input id="input-4" class="custom"
                        placeholder="Osoba kontaktowa"
                        :class="{'error-input-custom': veeErrors.has('event.personToContact')}"
                        name="event.personToContact" key="event.personToContact" v-validate="{'required':true}"
                        v-model="event.personToContact"/>
        </b-form-group>

        <h2 class="my-4">Lokalizacja</h2>
<!--        <b-form-group>-->
<!--          <b-form-radio @click="clearAddress"-->
<!--                        v-if="event.id === undefined || (event.addressDesc.length < 1 && event.address.length < 1)"-->
<!--                        v-model="addressType" :value="element.value" class="d-inline-block mt-3 mr-3"-->
<!--                        :class="{'error-input-custom': veeErrors.has('addressType')}"-->
<!--                        name="addressType" :key="'addressType'+index" v-validate="{'required':true}"-->
<!--                        v-for="(element,index) in [{title: 'Jeden adres', value: 0}, {title: '2 i więcej', value: 1}]">-->
<!--            {{ element.title }}-->
<!--          </b-form-radio>-->
<!--        </b-form-group>-->

<!--        <div v-if="(addressType === 0 && event.id === undefined) ||-->
<!--        (addressType === 0 && event.id !== undefined && (event.addressDesc === null || event.addressDesc.length < 1)) ||-->
<!--        (event.id !== undefined && (event.addressDesc === null || event.addressDesc.length < 1) && (event.address !== null && event.address.length > 0))">-->
        <div>
          <b-form-group class="custom">
            <b-form-input id="input-address" class="custom"
                          placeholder="Adres"
                          :class="{'error-input-custom': veeErrors.has('event.address')}"
                          name="event.address" key="event.address" v-validate="{'required':true}"
                          v-model="event.address"/>
          </b-form-group>
        </div>
<!--        <div v-if="(addressType === 1 && event.id === undefined) ||-->
<!--               (addressType === 1 && event.id !== undefined && (event.address === null || event.address.length < 1)) ||-->
<!--               (event.id !== undefined && (event.address === null || event.address.length < 1) && (event.addressDesc !== null && event.addressDesc.length > 0))">-->
<!--          &lt;!&ndash;          <textarea class="custom w-100 mb-3" v-model="event.addressDesc" placeholder="Opis miejscowości"&ndash;&gt;-->
<!--          &lt;!&ndash;                    :class="{'error-input-custom': veeErrors.has('event.addressDesc')}"&ndash;&gt;-->
<!--          &lt;!&ndash;                    name="event.addressDesc" :key="'event.addressDesc'" :v-validate="'required'"/>&ndash;&gt;-->
<!--          <b-form-group class="custom">-->
<!--            <b-form-input-->
<!--              class="mb-3 custom"-->
<!--              v-model="event.addressDesc"-->
<!--              placeholder="Opis miejscowości"-->
<!--              :class="{'error-input-custom': veeErrors.has('event.addressDesc')}"-->
<!--              name="event.addressDesc" :key="'event.addressDesc'" :v-validate="'required'"-->
<!--            ></b-form-input>-->
<!--          </b-form-group>-->
<!--        </div>-->

        <h2 class="my-4">Data / Zakres dat</h2>
        <b-row class="pb-0 mb-0">
          <b-col>
            <date-picker v-model="event.dateStart" :lang="datepickerParams.lang"
                         :class="{'error-input-custom': veeErrors.has('event.dateStart')}"
                         :name="'event.dateStart'" :key="'event.dateStart'"
                         value-type="format" format="YYYY-MM-DD"
                         type="date"
                         v-validate="{'required': true}"
                         :id="'event.dateStart'" placeholder="data rozpoczęcia" class="w-100 custom mt-3">
            </date-picker>
          </b-col>
          <b-col>
            <date-picker v-model="event.dateEnd" :lang="datepickerParams.lang"
                         :class="{'error-input-custom': veeErrors.has('event.dateEnd')}"
                         :name="'event.dateEnd'" :key="'event.dateEnd'"
                         value-type="format" format="YYYY-MM-DD"
                         type="date"
                         v-validate="{'required': true}"
                         :id="'event.dateEnd'" placeholder="data zakończenia" class="w-100 custom mt-3">
            </date-picker>
          </b-col>
        </b-row>

        <h6 class="mb-0 pb-0 mt-4" v-if="event.dates.length > 0">Harmonogram</h6>
        <div :key="date.id" v-for="(date,index) in event.dates">
          <b-row class="pb-0 mb-0">
            <b-col>
              <date-picker v-model="event.dates[index].date" :lang="datepickerParams.lang"
                           :class="{'error-input-custom': veeErrors.has('event.date'+date.id)}"
                           :name="'event.date'+date.id" :key="'event.date'+date.id"
                           value-type="format" format="YYYY-MM-DD"
                           type="date"
                           v-validate="{'required': true}"
                           :id="'event.date'+date.id" placeholder="data" class="w-100 custom mt-3">
              </date-picker>
            </b-col>
            <b-col>
              <date-picker v-model="event.dates[index].timeRange" :lang="datepickerParams.lang"
                           :minute-step="5"
                           :hour-options="datepickerParams.hours"
                           format="HH:mm"
                           value-type="format"
                           type="time"
                           placeholder="Godziny / minuty"
                           range
                           :class="{'error-input-custom': veeErrors.has('event.timeRange'+date.id)}"
                           :name="'event.timeRange'+date.id" :key="'event.timeRange'+date.id"
                           @clear="event.dates[index].timeRange = []"
                           v-validate="{'required': true}"
                           :id="'event.timeRange'+date.id" class="w-100 custom mt-3">
                <template v-slot:header="{ emit }">
                  <b-row class="mt-1 justify-content-center">
                    <b-col class="text-center">
                      <p class="">Godz:min</p>
                    </b-col>
                    <b-col class="text-center">
                      <p class="">Godz:min</p>
                    </b-col>
                  </b-row>
                </template>
              </date-picker>
            </b-col>
          </b-row>
          <b-btn variant="delete" class="custom" @click="removeDate(date.id)">Usuń datę
          </b-btn>
        </div>
        <b-btn variant="primary" class="custom mt-4" @click="addDate" block>Dodaj datę</b-btn>

        <b-row class="mt-4">
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-btn variant="delete" class="custom"
                   @click="deleteFromForm('deleteEvent', event.id, undefined, 'events', {tab: 'confirmed'})">
              Usuń
            </b-btn>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
            <b-btn block class="custom btn" :to="{ name: 'events', params: { 'tab': 'confirmed' } }">
              Anuluj
            </b-btn>
          </b-col>
          <b-col xl="4" lg="4" md="12" sm="12" class="mb-2">
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
  import DatePicker from 'vue2-datepicker'
  import {DATEPICKER_PARAMS} from '@/config/AppConfig'

  export default {
    name: 'FormMainData',
    props: ['event'],
    components: {Treeselect, ImageInputAdvanced, DatePicker},
    mixins: [EventBusEmit, FormMixin, EventsMixin],
    data() {
      return {
        datepickerParams: DATEPICKER_PARAMS,
        orgType: 0,
        addressType: 0
      }
    },
    watch: {
      orgType: function (val) {
        console.log(val)
        if (val === 2) {
          this.event.school.id = null
        } else {
          this.event.organization = ''
        }
      },
      event: function (val) {
        console.log(val)
        if (val.id) {
          if (val.school.id === null) {
            this.event.organization = val.organization
            this.orgType = 2
          }
        }
        console.log(val)
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
      this.$store.dispatch('getSchools', {})
      this.$store.dispatch('getDisciplines')
      /** @buttonLink route name || false if button must be hidden */
      this.changeAdminNavbarButton({buttonLink: false})
    }
  }
</script>

<style scoped>

</style>
