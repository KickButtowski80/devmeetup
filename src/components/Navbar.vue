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
      <div class='hidden-xs-only'>   
            
          <v-btn text 
          v-for="item in menuItems"
          :key="item.title"
         >
          <router-link v-bind:to ="item.link" tag="span">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
            </router-link>
          </v-btn>  
         
          <v-btn text v-show="userIsAuthenticated" >
            <router-link v-on:click.native="signOut"  to="/signin"  tag="span" > 
              <v-icon left >exit_to_app</v-icon>   
              Logout           
            </router-link>   
          </v-btn>        

      </div>

    </v-app-bar>    
  <v-sheet>
    <v-navigation-drawer v-model="drawer" app temporary>         
    <v-list>
      <v-list-item
          v-for="item in menuItems"
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
      <v-list-item link v-show="userIsAuthenticated" >
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <router-link v-on:click.native="signOut" to="/signin"  tag="span" >                     
            Logout
         </router-link>  
      </v-list-item> 
    </v-list>    
    </v-navigation-drawer>  
  </v-sheet>
  </div>
</template>
<script>
import firebase from 'firebase'
// import router from '../router'
export default {
    data () {
      return {
        drawer: null,
        user: this.$store.getters.user ,
        }
    },
    methods: {
      signOut(){
        // alert("Sign out clicked")
      let self = this
       firebase.auth().signOut().then(function() {
          self.$store.state.user = null
          // window.localStorage.clear()
          // alert("successful sign out")
          // router.push('/signin')
        }).catch(function(error) {
          // An error happened.
          alert("error for singout is " + error)
        });
     }
        
    },
    created () { 
    //  this.user = firebase.auth().currentUser || false;
   
     
   },
    computed:{
      menuItems(){
        let menuItems =[
          { title: 'Sign up', icon: 'face', link: '/signup' },
          { title: 'Sign in', icon: 'lock_open', link: '/signin' },
        ]
      
      if(this.userIsAuthenticated){
        menuItems =[
          { title: 'View Meetups', icon: 'supervisor_account', link: '/meetups' },
          { title: 'Organize Meetup', icon: 'room', link: '/meetup/create' },
          { title: 'Profile', icon: 'person', link: '/users/' + this.$store.getters.user.displayName + '/profile' },      
          ]
      }

      return menuItems;
    },
    userIsAuthenticated(){
      // let self = this
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      // var user = firebase.auth().currentUser;
      // self.$store.getters.user = user
      // console.log("authenticated user name is " + user.name)
      // if (user) {
      //   return true 
      // } else {
      //   return false
      // }
    }
  
  }
}
</script>