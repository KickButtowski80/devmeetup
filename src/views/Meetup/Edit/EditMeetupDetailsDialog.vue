<template>
  <v-row justify="end">
    <v-dialog   v-model="editDialog" persistent max-width="600px">
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
          <v-form  ref="form">
            <v-row>
              <v-col cols="12" sm="6" md="4">                  
                <v-text-field label="title" 
                  v-model="editedTitle"
                  :rules = "titleRules"></v-text-field>
              </v-col>

             <v-col cols="12">
               <v-textarea
                name="input-7-1"
                label="description"
                v-model="editedDescription"
                :rules = "descriptionRules"
                
              ></v-textarea>
              </v-col>
            <v-col cols="12">
               <v-text-field label= "date" v-model="editedDate" :rules="dateRules"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
              <v-text-field label= "location" v-model="editedLocation" :rules="locationRules"></v-text-field>
              
              </v-col>
            </v-row> 
          
          
          </v-form>

          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" class="blue--text darken-3" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" class="blue--text darken-3" text @click="onSaveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    
    </v-dialog>
  </v-row>
</template>
<script>
import moment from 'moment'
  export default {
      props:['meetup'],
 
  //add rules for fields 
    data () {
      return {
        editDialog: false, 
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editedDate: this.meetup.date,
        editedLocation: this.meetup.location,
        titleRules: [
          v => !!v || 'Title is required',        
          v => v.length >=5 || 'Title must not be less than 5 characters'
        ],
        descriptionRules: [                   
          v => !!v || 'Description is required',        
          v => v.length >=5 || 'Description must not be less than 5 characters'         
        ],
        dateRules: [
          v => !!v || "Date is required",
          v => moment(v,"YYYY-MM-DD", true).isValid()  || "Date format must be YYYY-MM-DD"
        ],
        locationRules: [
           v => !!v || "Location is required",
           v => v.length >= 10 || "Location must not be less than 15 characters"
        ]
      }
    },
    computed:{
      user(){
        return  this.$store.getters.user
      }
    },
    methods:{
      onSaveChanges(){
        //check for empty fields by decribing rules later
        
        if (this.$refs.form.validate()) {
            this.editDialog = false
            this.$store.dispatch('updateMeetupData', {
              id: this.meetup.id,
              title: this.editedTitle,
              description: this.editedDescription,
              date: this.editedDate,
              location: this.editedLocation
            } )
        }
      }
    }
  }
</script>