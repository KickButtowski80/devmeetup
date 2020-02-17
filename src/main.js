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

Vue.component('app-alert', AlertComp)
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
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser){
        store.dispatch("autoSignIn", firebaseUser)
      }
    })
    console.log("main js is created")

  }
}).$mount('#app')

