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
                    label="Name"
                    name="name"
                    v-model="name"
                    prepend-icon="person"
                    type="text"
                  />
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
                   <v-text-field
                    id="confirmpassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    v-model="confirmPassword"
                    prepend-icon="lock"
                    type="password"
                    :rules =[rules.checkPasswords]
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
            
              </v-card-actions>
                     <v-btn color="primary"
                      v-on:click="singUp()"
                      :loading="loading"
                      :disabled="loading" 
                      class="ma-2 white--text"
                      @click="loader = 'loading'">Sign Up
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>                        
                </v-btn>
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
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: " ",
        // define more rules for email and passwords filds
        rules:{
          checkPasswords: v => v == this.password || 'Passwords do not match'
        }

      }
    },
    methods:{
      singUp(){
        const payload = {
            name: this.name,
            email: this.email,
            password: this.password
        }
      this.$store.dispatch('signUserUp', payload )
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