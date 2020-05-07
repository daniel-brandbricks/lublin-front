<template>
    <b-row class="justify-content-center">
      <b-col cols="8">
        <div>
          <h4>Wiadomość</h4>
          <h6 id="op">Tytuł</h6>
          <div>{{sender}}</div>
          <h6 id="op1">Wiadomość</h6>
          <div>{{mails}}</div>
        </div>
      </b-col>
    </b-row>
</template>

<script>
  export default {
    name: 'Recipient',
    // props: [ 'sender' ],
    data () {
      return {
        mailTemplates: {
          title: '',
          description: ''
        }
      }
    },
    computed: {
      sender () {
        return this.$store.getters.sender
      },
      mailTitles () {
        return this.sender ? this.sender.mailTemplates.title : []
      },
      mails () {
        return this.sender ? this.mailTemplates.title : []
      }
    },
    methods: {
      // prepareRecipient () {
      //   this.recipient = {...this.recipient}
      // }
    },
    created () {
      this.$store.dispatch('getSender', {id: this.id})
      // .then((response) => {
      //   this.prepareRecipient(response)
      //   /** @buttonLink route name || false if button must be hidden */
      //   this.changeAdminNavbarButton({ buttonLink: false })
      //
      //   let breadcrumbs = [
      //     { text: 'Komunikaty', to: { name: 'messages' } },
      //     { text: response.title, active: true }
      //   ]
      //   this.changeAdminNavbarBreadcrumbs(breadcrumbs)
      // })
    }
  }
</script>

<style scoped>
#op{
  opacity: 0.6;
}
#op1{
  opacity: 0.6;
}
</style>
