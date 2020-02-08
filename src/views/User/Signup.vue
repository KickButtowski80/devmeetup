<template>
  <v-app id="inspire">
    <v-content>
      <v-container
       
        fluid
      >
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
                <v-btn color="primary"
                       v-on:click="singUp()">Sign Up</v-btn>
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


