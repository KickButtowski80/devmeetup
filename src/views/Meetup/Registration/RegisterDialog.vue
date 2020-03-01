<template>
  <v-row justify="center">
    <v-dialog v-model="registerDialog" persistent max-width="321">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          {{registerStatus}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Your Registration Status?</v-card-title>
        <v-card-text> 
          <p>--::::{{userIsRegisterd}} </p>
        
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="registerDialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" text @click="changeRegisterationStatus">{{registerStatus}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      meetup_id: this.meetupId,
      registerDialog: false, 
    };
  },
  methods:{
    changeRegisterationStatus(){
      this.registerDialog = false
       
    }

  },
  computed: {
    userIsRegisterd() {
      
      // let value =  this.$store.state.profilesInfo.findIndex(userId=> {
      //   console.log("user id " + JSON.stringify(userId) )
      //   return userId.id === "ydAcLcJccDhcLD8REMkaytSlT2g2"
      // }) === 0
      // // if it is zero and bigger means we found meetup id in the array
      // console.log("userIsRegisterd value is " + value)
      // return value 
      let value = this.$store.state.profilesInfo.filter( v => v["id"] === this.$store.getters.user.uid)
      // alert(JSON.stringify(value))
      return value[0]["registeredMeetups"].includes(this.meetup_id)
      
    }, 
    userInfo(){
      return this.$store.getters.user
    }, 
    registerStatus(){
     
      return this.userIsRegisterd  ? 'unREGISTER' : 'REGISTER'
    }
  }
};
</script>
