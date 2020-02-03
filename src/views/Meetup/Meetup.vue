<template>

    <v-container>
        <v-row warp>  
            <v-col xs="12">
                <v-card
                    class="mx-auto"
                    max-width="1000"
                >
                    <v-img
                    class="white--text align-end"
                    height="400px"
                    :src= meetup.src
                    >
                    <v-card-title>{{meetup.title}}</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">{{meetup.date}}</v-card-subtitle>

                    <v-card-text class="text--primary">
                    <!-- <h3 class="info--text">{{currentMeetup.title}}</h3> -->

                    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Qui ad veritatis cumque accusantium rerum. Nihil voluptates tempore,
                      amet vitae ullam sit minima recusandae error molestiae? Mollitia 
                      obcaecati enim inventore amet.</div>
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