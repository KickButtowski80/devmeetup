import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import firebase from "firebase";
import db from "../main";
var util = require('util')
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    loadedMeetups: [
      //   {src: "https://66.media.tumblr.com/73d9ce14ac438745eb701641c483824d/tumblr_p7qs9hIAU81qeafwfo1_1280.jpg",
      //    id: "1",
      //    title: "Meetup New York",
      //    color: '#952175',
      //    date: "2021-01-22",
      //    location: "New York",
      //    description: "New you are ok"
      // },
      //   {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU5PtF945hQNCefU7NXSFPp6AK8IcGlQioYLVYwMnjDe6mjFNa",
      //    id: "2" ,
      //    title:"Los Angeles Meetup",
      //    color: 'primary',
      //    date: "2020-09-25",
      //    location: "Los Angeles",
      //    description: "Agneles are in heaven"
      // },
      //   {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/London_Thames_Sunset_panorama_-_Feb_2008.jpg/800px-London_Thames_Sunset_panorama_-_Feb_2008.jpg",
      //    id: "3" ,
      //    title:"London Meetup",
      //    color: 'info',
      //    date: "2020-01-16",
      //    location: "London",
      //    description: "So spookey that you cannot imagine"
      //     }
    ],
    user: null,
    loading: false,
    error: null
  },
  getters: {
    loadedMeetups(state) {
       return state.loadedMeetups.sort((meetupA, meetupB) => {
          return meetupA.date > meetupB.date
       })

    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  },
  mutations: {
    setLoadedMeetups(state, payload){
             
      state.loadedMeetups= payload
    },
    createMeetup(state, newMeetup) {
      state.loadedMeetups.push(newMeetup)
    },
    setUser(state, payload) {
      console.log("setUser is " + payload.name)
      state.user = payload;
      // localStorage.setItem(state.user, JSON.stringify(payload))
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    fetchMeetups(context){
      context.commit('setLoading', true)
      db.collection("meetups")
      .get()
      .then(function(querySnapshot) {
        const meetups = []
        querySnapshot.forEach(function(doc) {
          console.log("Document data:", doc);
          let meetup = {
            data: doc.data(),
            id: doc.id
          }
          meetups.push(meetup)
        });
        console.log("all the meetups are loaded from firebase") 
        meetups.forEach( m => console.log( m ))     
        context.commit('setLoadedMeetups', meetups)
        context.commit('setLoading', false)  
      })
      .catch(error => {
        console.log(error);
        // context.commit('setLoading', true)
      });
    },
    createMeetup(context, payload) {
      const newMeetup = {
        src: payload.src,
        title: payload.title,
        color:
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8),
        date: payload.date,
        location: payload.location
      };

      db.collection("meetups")
        .add({
          newMeetup
        })
        .then(function(docRef) {
          // const key = docRef.id
          console.log("Document written: ", docRef.id);

          context.commit("createMeetup", {
            ...newMeetup,
            id: docRef.id
          });
          console.log("newMeetup info is " + util.inspect(newMeetup))
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    signUserUp(context, payload) {
      // const self = this
      context.commit("setLoading", true);
      context.commit("clearError");
      console.log("in sign up user name is " + payload.name);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user.updateProfile({
            displayName: payload.name
          });
        })
        .then(() => {
          context.commit("setLoading", false);
          const newUser = {
            name: payload.name,
            id:
              "_" +
              Math.random()
                .toString(36)
                .substr(2, 9),
            registeredMeetups: []
          };
          console.log(
            "newUser in action is " +
              newUser.id +
              "--" +
              newUser.registeredMeetups
          );
          context.commit("setUser", newUser);

          router.push("/");
        })
        .catch(function(error) {
          // Handle Errors here.
          context.commit("setLoading", false);
          context.commit("setError", error);
          // var errorCode = error.code;
          // self.errorMessage = error.message

          // if (errorCode == 'auth/weak-password') {
          //   alert('The password is too weak.');
          // } else {
          //   alert("error message" + self.errorMessage);
          // }
          // alert("error is " + error);
        });
    },

    signUserIn(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          context.commit("setLoading", false);
          const currentUser = {
            name: firebase.auth().currentUser.displayName,
            id: firebase.auth().currentUser.id,
            registeredMeetups: []
          };
         console.log(firebase.auth().currentUser)
          context.commit("setUser", currentUser);
          router.push("/");
        })
        .catch(error => {
          context.commit("setLoading", false)
          context.commit("setError", error);
          // alert(error.message)
        });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  }
});
// store.dispatch("fetchMeetups")
export default store;
