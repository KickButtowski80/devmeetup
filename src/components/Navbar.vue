<template>
    <v-sheet
      height="100%"
    >
    <v-app-bar>
      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text >
        <v-icon left>supervisor_account</v-icon>
        View Meetups
      </v-btn>  
    </v-app-bar>    
    <v-navigation-drawer v-model="drawer">         
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
</template>
<script>
export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'View Meetups', icon: 'supervisor_account' },
          { title: 'About', icon: 'question_answer' },
        ],
      }
    },
  }
</script>