<template>
  <div> 
    <v-app-bar
       dark
       class='primary darken-1'>
      <v-app-bar-nav-icon  
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up">
      </v-app-bar-nav-icon>
      <router-link to="/" tag="span" style="cursor: pointer">
        <v-toolbar-title>DevMeetup</v-toolbar-title>
      </router-link>      
      <v-spacer></v-spacer>
      <div class='hidden-xs-only '>        
          <v-btn text 
          v-for="item in items"
          :key="item.title">
          <router-link v-bind:to ="item.link" tag="span">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
            </router-link>
          </v-btn>          
        
      </div>

    </v-app-bar>    
  <v-sheet>
    <v-navigation-drawer v-model="drawer" app temporary>         
    <v-list>
    <v-list-item
        v-for="item in items"
        :key="item.title"
        link
    > 
        <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <!-- adding tag span for not using the link tag -->
      <router-link :to= "item.link" tag="span">
        <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>     
     </router-link>      
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
          { title: 'View Meetups', icon: 'supervisor_account', link: '/meetups' },
          { title: 'Organize Meetup', icon: 'room', link: '/meetup/createmeetup' },
          { title: 'Profile', icon: 'person', link: '/profile' },
          { title: 'Sign up', icon: 'face', link: '/signin' },
          { title: 'Sign in', icon: 'lock_open', link: '/signup' },
          
        ],
      }
    },
  }
</script>