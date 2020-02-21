<template>

    <v-container>
    <v-row>
        <v-col> 
        <v-spacer></v-spacer>
        <template v-if="currentUser">
            <app-edit-meetup-details-dialog id="x"></app-edit-meetup-details-dialog>
        </template>
        </v-col>
    </v-row>
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
                    :src= "meetup.src">

                    <v-card-title>{{meetup.title}}</v-card-title>
                    
                    </v-img>
              
                    <v-card-subtitle class="pb-0 info--text">{{meetup.date}} which take place
                    {{meetup.location }}
                    </v-card-subtitle>

                    <v-card-text class="text--primary">
                     {{meetup.description}}
                    </v-card-text>

                    <v-card-actions>

                      
                        <v-btn
                            color="orange"
                            text
                        >
                            Register
                        </v-btn> 
                    </v-card-actions>
                </v-card>              
            <!--<h1>{{userInfo.uid}}--{{meetup}}</h1>-->
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
//  import {mapGetters} from 'vuex'
 
export default {
     
    data() {
        return {
  
        }
    },
    // set the props true so we can use the id as prop here to find 
    // current meetup group
    props: ['id'],
    computed:{
        meetup() {
            console.log('current meetup ' + JSON.stringify(this.$store.getters.loadedMeetup(this.id)))
            return this.$store.getters.loadedMeetup(this.id)
        },
        userInfo(){
            return this.$store.getters.user
        },
        currentUser(){
            console.log("current user " + this.$store.getters.user)
            return this.$store.getters.user.uid == this.meetup.creatorId
        }
        
    },
}
</script>
<style lang="css">
   #x {
      margin-right: 15px
    }
</style>