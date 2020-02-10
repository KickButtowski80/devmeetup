<template>
  <v-app id="inspire">
    <v-content>
      <v-container
       
        fluid
      >
      <v-row v-if="error">
        <v-col>
          <app-alert :text="error.message"></app-alert>
        </v-col>
      </v-row>
        <v-row
         
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">  

              <v-card-text>
                <v-form>
            
                  <v-text-field
                    label="Email"
                    name="email"
                    v-model="email"
                    prepend-icon="email"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="password"
                    prepend-icon="lock"
                    type="password"
                     
                  />
       
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary"
                      v-on:click="singIn()"
                      :loading="loading"
                      :disabled="loading" 
                      class="ma-2 white--text"
                    
                      @click="loader = 'loading'">Sign In
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>                        
                </v-btn>
              </v-card-actions>
            </v-card>            
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
 
  export default {

    data(){
      return{ 
        email: "",
        password: "", 
        errorMessage: " ",
        // define more rules for email and passwords filds
        rules:{
         
        }

      }
    },
    methods:{
      singIn(){
        const payload = { 
            email: this.email,
            password: this.password
        }
      this.$store.dispatch('signUserIn', payload )
      }
   },
   computed:{
        error(){
       return this.$store.getters.error
       },
       loading(){
         return this.$store.getters.loading
       }
    //  user(){
    //    return this.$store.getters.user
    //  }
   },
  //  watch:{
  //    user(value){
  //      if(value !== null && value !== undefined){
  //        this.$rotuer.push('/meetups')
  //      }
  //    }
  //  }
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
