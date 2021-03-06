require('dotenv').config()
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import AlertComp from './components/Alert.vue'
import EditMeetupDetailsDialog from './views/Meetup/Edit/EditMeetupDetailsDialog'
import RegisterDialog from './views/Meetup/Registration/RegisterDialog'
Vue.component('app-alert', AlertComp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component("app-register-meetup-dialog", RegisterDialog )
Vue.config.productionTip = false


const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY ,
  authDomain: process.env.authDomain,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: "devmeetup-it",
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore()
export default  db ;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch("fetchMeetups")  
    this.$store.dispatch("fetchprofilesInfo")
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){
        store.dispatch("autoSignIn", firebaseUser)
      }
    })
    console.log("main js is created")

  }
}).$mount('#app')

