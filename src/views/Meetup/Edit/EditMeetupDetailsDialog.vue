<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
      <v-btn  color="primary"
              fab dark v-on="on">
            
              <v-icon>edit</v-icon>
      </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit {{editedTitle}} Meetup </span>
        </v-card-title>
        <v-card-text>
          <v-container>
          <v-row>
              <v-col cols="12" sm="6" md="4">                  
                <v-text-field label="title" required
                  v-model="editedTitle"></v-text-field>
              </v-col>

             <v-col cols="12">
               <v-textarea
                name="input-7-1"
                label="description"
                v-model="editedDescription"
                
              ></v-textarea>
              </v-col>
            <v-col cols="12">
               <v-text-field label= "date" v-model="editedDate"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
              <v-text-field label= "location" v-model="editedLocation"></v-text-field>
              
              </v-col>
            </v-row> 
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" class="blue--text darken-3" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" class="blue--text darken-3" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
      props:['meetup'],
 
  
    data () {
      return {
        dialog: false,
        userInfo: JSON.stringify(this.$store.getters.user),
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editedDate: this.meetup.date,
        editedLocation: this.meetup.location,
      }
    },
    computed:{
      user(){
        return  this.$store.getters.user
      }
    }
  }
</script>