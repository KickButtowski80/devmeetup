<template>
    <div>
        <v-container justify="center" align="center" >
      
           <v-row > 
           
              <v-col
                v-for="(meetup, i) in meetups"
                :key="i"
                cols="12" 
               
                >   
                     
                    <v-card
                        :color="meetup.color"
                        dark
                        max-width="600"
                        class="mx-auto"
                    >
                    <div class="d-flex flex-no-wrap justify-space-between mx-5">
                        <v-avatar
                            class="ma-3"                            
                            size= "123"
                            tile
                        >
                        <v-img :src="meetup.src"></v-img>
                        </v-avatar>
                    <div style="width:250px">
                            <v-card-title
                            class="headline"
                            v-text="meetup.title"
                            ></v-card-title>
                            <v-card-subtitle >
                              location: {{meetup.location}}
                              <br/>
                              date: {{meetup.date}}
                            </v-card-subtitle>

                    <v-card-actions> 
                        <v-btn outlined v-bind:to="'/meetups/' + meetup.id" >
                            <v-icon left >arrow_forward</v-icon>
                            View Meetup
                        </v-btn>
                    </v-card-actions> 
                        </div>
                    </div>   
      
                    </v-card>                        
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
//   import store from './store'
// var util = require('util')
  export default {
  
    computed:{
       meetups(){   
        console.log("====meetups list")
        console.log("the list---> " +  JSON.stringify(this.$store.getters.loadedMeetups))          
        return this.$store.getters.loadedMeetups
         
         
      }
    }
  }
</script>