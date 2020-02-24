<template>
  <v-row justify="center">
    <v-dialog v-model="registerDialog" persistent max-width="300">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          {{registerStatus }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline"
          >Use Google's location service?</v-card-title
        >
        <v-card-text>{{ userIsRegisterd }}=={{ this.id }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false"
            >Disagree</v-btn
          >
          <v-btn color="green darken-1" text @click="dialog = false"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  // props: ["meetupId"],
  data() {
    return {
      meetupId: "eMtJqfCIa5IF34RLu4Zs",
      registerDialog: false
    };
  },
  computed: {
    userIsRegisterd() {
      
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId;
      }) >= 0
      // if it is zero and bigger means we found meetup id in the array
    },
    registerStatus(){
      return this.userIsRegisterd ? 'unREGISTER' : 'REGISTER'
    }
  }
};
</script>
