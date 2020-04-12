<template>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <div>
          <h4>Wiadomość</h4>
          <h6 id="op">Tytuł</h6>
          {{sender}}
        </div>
      </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'Recipient',
    props: [ 'sender' ],
    data () {
      return {
        recipient: {
          id: this.id,
          title: '',
          description: ''
        }
      }
    },
    computed: {},
    methods: {
      prepareRecipient () {
        this.recipient = {...this.recipient}
      }
    },
    created () {

      if (this.id) {
        this.$store.dispatch('getSender', {mailTemplate: this.id})
          .then((response) => {
            this.prepareRecipient(response)
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
#op{
  opacity: 0.6;
}
</style>
