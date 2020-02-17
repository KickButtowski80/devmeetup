<template>
<v-container>
    <v-row>
        <v-col xs="12">
            <h2 class="primary--text display-3">Create A New Meetup</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>                
            <v-form
                ref="form"             
                lazy-validation
            >
                <v-text-field
                name="title"
                label="title"
              
                id = "title"
                v-model="title"
                :rules="titleRules"          
                required
                prepend-icon="title"
                ></v-text-field>

                <v-text-field
                name="location"
                label="location"
                 prepend-icon="place"
                id = "location"
                v-model="location"
                :rules="locationRules"
                required
                ></v-text-field>

              <!--  <v-text-field
                name="imgUrl"
                label="Image URL"
                id = "image-url" 
                v-model="imageUrl" 
                required
                ></v-text-field> -->
                <!-- you can have multiple prop to accept more than one pic at the same time 
                 <v-file-input accept="image/*" 
                               label="File input"
                               v-click:change="pickAMeetupPic"
                               id="fileButton">
                </v-file-input>-->
                <v-file-input
                    v-model="imageFiles"
                    @change="pickaphoto"               
                    counter
                    label=""
                    placeholder="Select your files"
                    prepend-icon="mdi-paperclip"
                                    
                  >
                </v-file-input> 
                
         <v-progress-linear 
                  rounded
                   id="uploader" height="25" value="0" v-model="photoUploaded">
                   
                       <strong>{{photoUploaded}}%</strong> 
                 
                 </v-progress-linear>
                <v-row>
                    <v-chip
                    class="ma-2"
                    label
                    outlined
                    >
                    Preview
                    </v-chip>
                    <v-col 
                    ><img  height="150px" :src="imageFiles"  ></v-col>
                </v-row>
                
                <v-textarea
                name="description"
                label="Description"
                id = "description"  
                v-model="description" 
                rows="1"        
                :rules ="descriptionRules"
                required
                prepend-icon="assignment"
                ></v-textarea>
                <v-col cols="12" lg="6" md="6" offset-md="3"> 


                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :value="computedDateFormattedMomentjs"
                        v-model="date"
                        clearable
                        label="Pick a date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        :rules = "dateRules"
                        @click:clear="date = null"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date"
                      @change="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>



                <v-btn 
                  color="success"
                  class="mr-4"
                  @click="createNewMeetup()">Create</v-btn>
                  
                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Reset
                </v-btn>              
            </v-form>        
        </v-col>
    </v-row>
</v-container>
</template>
<script>
import moment from 'moment'
import firebase from "firebase";
  // import format from 'date-fns/format'
  export default {
    data: () => ({
      title: '',
      location: '',
      imageUrl: '',
      imageFiles: [],
      photoUploaded: 0 ,
      description: "",
      date: "",
      menu1: false,
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 15) || 'Title must be less than 15 characters',
      ],
   
      locationRules:[
            v => !!v || 'Location is required'
      ],
       
      descriptionRules:[
          v=> !!v || "description is required"
      ],
    
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      dateRules: [
        v => !!v || "Date is required"
      ]

    }),

    methods: {
     pickaphoto(){
       let uploader = document.getElementById('uploader')
       const pickimage = this.imageFiles

       let storageRef =firebase.storage().ref('meetup_pics/' + pickimage.name)
       var task = storageRef.put(pickimage)
       task.on('state_changed', 
         function progress(snapshot){
         
           console.log(snapshot);
           var percentage = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100
             console.log("%" + percentage)
           uploader.value = percentage
           console.log("photo value " + uploader.value )
         },
         function error(err){
           console.log('uploading error is ' + err)
         }
         
         
         )
     },
 
      reset () {
        this.$refs.form.reset()
      } ,
          
      // createNewMeetup(){
          // if(this.$refs.form.validate()){         
        //   console.log(this.title + " " + this.location + " " + this.description)
        //   this.$store.state.loadedMeetups.push({
            
        //   })
        //  this.$refs.form.reset()
        //   }
      // }
          createNewMeetup(){
          if(this.$refs.form.validate()){                
                this.$store.dispatch('createMeetup', 
                                {
                                src:  this.imageUrl,
                                id: "4", 
                                title: this.title ,
                                color: "#" + Math.random().toString(16).slice(2, 8),
                                date: this.date.toString(),
                                location: this.location,
                                description: this.description
                               })
        console.log("I created a new meetup")
        //  this.$refs.form.reset()
        //redirect to all meetups page 
         this.$router.push('/meetups') 
          }
      }
     
    },
      computed: {
      computedDateFormattedMomentjs () {
        console.log('the date is ' + this.date)
        return this.date ? moment(this.date).format('YYYY-MM-DD') : ''
      },
      // YYYY-MM-DD
      // computedDateFormattedDatefns () {
      //   return this.date ? format(this.date, 'YYYY-MM-DD') : ''
      // },
    },
  }
</script>