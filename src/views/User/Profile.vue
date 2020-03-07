<template  >
<div>
  <v-card
    class="mx-auto"
    max-width="434"    
    tile
  >
   <v-img
      height="100%"
      src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
    > 
      <v-row
        align="end"
        class="fill-height"
      >
        <v-col
          align-self="start"
          class="pa-0"
          cols="12"
        >
          <v-avatar
            class="profile"
            
            size="164"
            tile
          >
          <img :src="imgUrl" alt="">
 
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item
            color="rgba(0, 0, 0, .4)"
            dark
          >
            <v-list-item-content>
              <v-list-item-title class="title">Name: {{owner_name}}</v-list-item-title>
              <v-list-item-subtitle>Email: {{user_info.email}}</v-list-item-subtitle>
              <template v-if="meetups.length> 0 ">
                <v-list-item-subtitle>Meetup organizer :</v-list-item-subtitle>
                  <v-card color="rgba(255, 0, 0, 0.5)">
                    <ol start="1" v-for="(meetup,i) in meetups" v-bind:key="i">
                        <span >{{i+1}}. {{meetup.title}}</span>
                    </ol>              
                </v-card>
              </template>
              <template>
                <div v-if="registeredMeetups.length> 0 ">
                  <v-list-item-subtitle>Meetup Registred :</v-list-item-subtitle>
                  <v-card color="rgba(255, 0, 0, 0.5)">
                    <ol start="1" v-for="(meetup,i) in registeredMeetups" v-bind:key="i">
                        <span >{{i+1}}. {{meetup.title}}</span>
                    </ol>              
                  </v-card>
                </div>
              </template>

            </v-list-item-content>
          </v-list-item>
        
        </v-col>
      </v-row>
    </v-img>

  </v-card>
  <!--<h3>orginzer meetups:  {{this.meetups}}</h3>
  <h3>registered meetups: {{this.registeredMeetups}}</h3>
  <h3>All the meetups: {{this.$store.getters.loadedMeetups}} </h3> 
  <div style="word-wrap: break-word"> {{imgUrl}} </div>-->
   
  </div>
</template>
<script>
import {mapState} from 'vuex' 
export default {
    data(){
      return {
        imgUrl: this.$store.state.user.photoURL
      }
    },
    created(){
      // this.$store.subscribe((mutation, state) => {
      //   if (mutation.type === "setUserAvatar") {
      //     //debugger; // eslint-disable-line no-debugger
      //     this.imgUrl = state.user.photoURL
      //   }
      // });
    },
    computed: {
        ...mapState({
             owner_name: state => state.user.displayName,
             user_info: state => state.user
        }),
        registeredMeetups(){
          let rm= this.$store.getters.currentUserProfileInfo.registeredMeetups
          let allm = this.$store.getters.loadedMeetups
          let meetupsInfo = []
          let i , j 
          console.log("rm and all meetups are " + JSON.stringify(allm))
          for (i = 0; i < rm.length; i++) {
            console.log("rm=" + rm[i].toString()  )
            for ( j = 0 ; j < allm.length; j++){
              console.log("lm= " + JSON.stringify(allm[j]))
                if(allm[j].id == rm[i].toString()) 
                  meetupsInfo.push(allm[j])
                  }
          }
           console.log("meetupsInfo " + JSON.stringify(this.$store.state.photoURL))
          return meetupsInfo
        },
        meetups(){
           return this.$store.getters.loadedMeetups
                       .filter( meetup => meetup.creatorId === this.$store.getters.user.uid )
        },
        profilesInfo(){
          //  let currentUserProfile = this.$store.state.profilesInfo
          //                 .find( userProfile =>
          //                        userProfile.id === this.$store.getters.user.uid )
           return this.$store.getters.currentUserProfileInfo       
        }

                         
    }
}
</script>