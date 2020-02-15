<template>

    <v-container>
        <v-row warp>  
            <v-col xs="12">
                <!-- <h1>{{meetup}}</h1> -->
                 <v-card
                    class="mx-auto"
                    max-width="1000"
                >
                    <v-img
                    class="white--text align-end"
                    height="400px"
                    :src= "meetup.newMeetup.src">

                    <v-card-title>{{meetup.newMeetup.title}}</v-card-title>
                    </v-img>
              
                    <v-card-subtitle class="pb-0 info--text">{{meetup.newMeetup.date}} which take place at
                    {{meetup.newMeetup.location }}
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                     {{meetup.newMeetup.description || meetup.description}}
                    </v-card-text>

                    <v-card-actions>
                    <v-btn
                        color="orange"
                        text
                    >
                        Register
                    </v-btn>

                    <v-btn
                        color="orange"
                        text
                    >
                        Explore  
                    </v-btn>
                    </v-card-actions>
                </v-card>              
            
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
//  import {mapGetters} from 'vuex'
export default {
    // set the props true so we can use the id as prop here to find 
    // current meetup group
    props: ['id'],
    computed:{
        meetup() {
            console.log('current meetup ' + this.$store.getters.loadedMeetup(this.id))
            return this.$store.getters.loadedMeetup(this.id)
        }
        
    },
         
       
 
    // computed:{
    //     // currentMeetup(){
    //     //    return  this.$store.getters.loadedMeetup(this.$route.params.id)
    //     // } 
    //   ...mapGetters({
    //       currentMeetup: 'loadedMeetup' 
    //   })
    // }
}
</script>