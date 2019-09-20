<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <b-btn variant="primary">Primary</b-btn>
        <b-btn >Primary</b-btn>
        <p>
          <span class="icon-icon_login"></span>Primary
        </p>
        <h1>Lorem ipsum. </h1>
        <h1 class="c-green">Lorem ipsum. </h1>
        <h1 class="bgc-green">Lorem ipsum. </h1>

      </div>

      <div class="col-12 mt-5">
        <b-form-group
          class="custom"
          label="Enter your name"
          label-for="input-1">
          <b-form-input id="input-1" class="custom"
                        placeholder="E-mail"
                        v-model="name"></b-form-input>
        </b-form-group>
        <b-form-group
          class="custom"
          label="Enter your name"
          label-for="input-2">
          <b-form-input id="input-2" class="custom" v-model="name"></b-form-input>
        </b-form-group>
      </div>
      <b-col cols="12">
        <b-form-group label="Using options array:" class="custom">
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="selected"
            :options="options"
            name="flavour-1"
          ></b-form-checkbox-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="Individual radios">
          <b-form-radio v-model="selectedRadio" name="some-radios" value="A">Option A</b-form-radio>
          <b-form-radio v-model="selectedRadio" name="some-radios" value="B">Option B</b-form-radio>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <div class="container-figure">
          <div class="parallelogram">
            <p>Lorem ipsum.</p>
          </div>
        </div>


      </b-col>
      <b-col cols="4">
        <div class="container">


          <b-card
            class="custom"
            title="Card title that wraps to a new line"
            title-tag="h2"
            footer-class="p-0"
          >
            <b-card-text>
              This is a wider c
            </b-card-text>
            <footer slot="footer" >
              <div class="container-figure">
                <div class="parallelogram">
                  <p>SZKOŁA</p>
                </div>
              </div>
            </footer>


          </b-card>

        </div>


      </b-col>

    </div>

  </div>
</template>

<script>

  export default {
    data(){
      return{
        selected:[],
        selectedRadio:'A',
        options:[
          {text:'first',value:'1'},
          {text:'secondary',value:'2'},
          {text:'third',value:'3'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>
