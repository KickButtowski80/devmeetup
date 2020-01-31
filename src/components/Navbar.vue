<template>
  <div> 
    <v-app-bar
       dark
       class='primary darken-1'>
      <v-app-bar-nav-icon  
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"></v-app-bar-nav-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class='hidden-sm-only'>
        <v-btn text 
          v-for="item in items"
          :key="item.title">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
         </v-btn>  
      </div>

    </v-app-bar>    
  <v-sheet>
    <v-navigation-drawer v-model="drawer" app>         
    <v-list>
    <v-list-item
        v-for="item in items"
        :key="item.title"
        link
    >
        <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    </v-list>    
    </v-navigation-drawer>   
  
  </v-sheet>
  
   
  
  
  
  </div>
 
</template>
<script>
export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'View Meetups', icon: 'supervisor_account' },
          { title: 'Organize Meetup', icon: 'room' },
          { title: 'Profile', icon: 'person' },
          { title: 'Sign up', icon: 'face' },
          { title: 'Sign in', icon: 'lock_open' },
          
        ],
      }
    },
  }
</script>