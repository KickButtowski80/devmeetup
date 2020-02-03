<template>
     <v-container fluid>
       <v-row no-gutters>
         <v-col cols="12" xs="12" sm="6" class="text-center text-sm-right" >
           <v-btn x-large
                 rotuer to="/meetups" class="primary mx-3" width="224">
                 Explore Meetups
           </v-btn>
         </v-col>
         <v-col cols="12" xs="12" sm="6" class="my-xs-5  text-center text-sm-left">
           <v-btn x-large
                 rotuer to="/meetup/create" class="primary" >
                 Organize Meetups
           </v-btn>
         </v-col>
       </v-row>
       <v-row>
         <v-col cols="12" xs="10" offset-xs="2">
            <v-carousel  style="cursor: pointer">
              <v-carousel-item
                v-for="(meetup) in meetups"
                :key="meetup.id"
                :src="meetup.src"
                reverse-transition="fade-transition"
                transition="fade-transition"  
                v-on:click="onLoadMeetup(meetup.id)"             
              >
              <v-sheet
                class="vsheet"
                height="100%"
                tile
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-1">{{ meetup.title }} </div>
                </v-row>
              </v-sheet>              
              </v-carousel-item>
            </v-carousel>         
         </v-col>
       </v-row>
       <v-row>
         <v-col cols="12" xs="12" class="text-center">
           
              <h2>Join Our awesome meetups!</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Voluptatibus porro minima quibusdam dolor rem fuga sed atque
               deleniti velit eligendi, est autem ea quisquam, beatae iusto 
               dolores sunt et laborum.</p>
             
         </v-col>
       </v-row>
     </v-container>
</template>

<script>
import {mapState} from 'vuex' 
export default {
  
  methods:{
    onLoadMeetup(id){
      this.$router.push("/meetups/" + id)    
    }
  },
  computed:{ 
    ...mapState({
      meetups: state => state.loadedMeetups
    })
  }
}
</script>

<style scoped>
 
  .vsheet{
    background-color: rgba(0,0,0,0.2);
    color: white;
     
  }

 
</style>
