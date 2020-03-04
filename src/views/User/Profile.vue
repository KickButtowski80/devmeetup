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
            color="grey"
            size="164"
            tile
          >
            <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
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
              <v-list-item-subtitle>Meetup organizer :</v-list-item-subtitle>
                <ol start="1" v-for="(meetup,i) in meetups" v-bind:key="i">
                    <span >{{i+1}}. {{meetup.title}}</span>
                </ol>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
  <h1>profile info: {{this.profilesInfo}}</h1>
  </div>
</template>
<script>
import {mapState} from 'vuex' 
export default {
    computed: {
        ...mapState({
             owner_name: state => state.user.displayName,
             user_info: state => state.user
        }),
        meetups(){
           return this.$store.getters.loadedMeetups
                       .filter( meetup => meetup.creatorId === this.$store.getters.user.uid )
        },
        profilesInfo(){
           let currentUserProfile = this.$store.state.profilesInfo
                          .find( userProfile =>
                                 userProfile.id === this.$store.getters.user.uid )
           return currentUserProfile         
        }

                         
    }
}
</script>