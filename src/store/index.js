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
    error: null,
  },
  getters: {
    registeredMeetups(state){
      console.log("))))" + JSON.stringify(state.user.registeredMeetups))
      return state.registeredMeetups
    },
    loadedMeetups(state) {
      console.log('loadedMeetups are ' + JSON.stringify(state.loadedMeetups))
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
      // state.loadedMeetups = payload.slice()
      console.log("setLoadedMeetups payload is  " + JSON.stringify(payload))
      state.loadedMeetups = [...payload]
      console.log("setLoadedMeetups " + JSON.stringify(state.loadedMeetups))
    },
    createMeetup(state, newMeetup) {
      console.log('mutation for create meetup is ' + JSON.stringify(newMeetup))
      state.loadedMeetups.push(newMeetup)
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id == payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }

      if (payload.date) {
        meetup.date = payload.date
      }

      if (payload.location) {
        meetup.location = payload.location 
      }
    },
    setUser(state, payload) {
      console.log("setUser payload is " + JSON.stringify(payload))

      state.user = {...payload} 
      console.log('user === payload' + `${state.user === payload}`)
      //I do not understand that following chaining 
      // state.user.name = payload.displayName
      
      localStorage.setItem(state.user, JSON.stringify(payload))
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
          const numberOfKeys = Object.keys(doc.data()).length;
          console.log("fetching docs are " + JSON.stringify(doc.data()))
          //check if document is empty or not 
          if(numberOfKeys !== 0){
            let meetup = {
              id: doc.id,
              ...doc.data()
            }
            meetups.push(meetup)
          }
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
      console.log("creatmeetup payload is " + JSON.stringify(payload))
      let newMeetup = {
        src: payload.src,
        title: payload.title,
        color:
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8),
        date: payload.date,
        location: payload.location,
        description: payload.description
      };
      console.log("user inof is " + JSON.stringify(context.state.user.uid))
      db.collection("meetups")
        .add({
          ...newMeetup,
          creatorId: context.state.user.uid,
         
        })
        .then(function(docRef) {
          // const key = docRef.id
          console.log("Document written: ", docRef.id);

          context.commit("createMeetup", {
            ...newMeetup,
            creatorId: context.state.user.uid,
            id: docRef.id
            
          });
          console.log("newMeetup info is " + util.inspect(newMeetup))

        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateMeetupData({ commit }, payload) {
      //for now just, I pass title dateand description and  location after 
      commit("setLoading", true)
      // const updatedObj = {} 
      // if (payload.title) {
      //   updatedObj.title = payload.title
      // }
      // if (payload.description) {
      //   updatedObj.description = payload.description
      // }

      // if (payload.date) {
      //   updatedObj.date = payload.date
      // }
  
      db.collection("meetups")
        .doc(payload.id)
        .update({          
            title: payload.title,
            description : payload.description,
            date: payload.date,
            location: payload.location          
        })
        .then(() => {
           commit('setLoading', false)
          //console.log("I am updeting " + JSON.stringify(payload) + " " + JSON.stringify(updatedObj))
          commit ('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
      })
    },
    autoSignIn({commit}, payload){
     commit('setUser', payload)
    },
    signUserUp(context, payload) {
      // const self = this
      context.commit("setLoading", true);
      context.commit("clearError");
      console.log("in sign up user name is " + JSON.stringify(payload));
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user.updateProfile({
            displayName: payload.name,
            providerData:{
              registeredMeetups: []
            }           
          });
          // data.user.setValue({
          //   registeredMeetups: []
          // }            
          // )
          return data
        })
        .then((data) => {
          context.commit("setLoading", false);
          
          const newUser = {
            // name: payload.name,
            id: data.user.uid,
            // id:
            //   "_" +
            //   Math.random()
            //     .toString(36)
            //     .substr(2, 9),
            // email: payload.email,
            registeredMeetups: []
          };
          console.log(
            "newUser in action is " +
              newUser.id +
              "--" +
              newUser.registeredMeetups.length
          );
          console.log("*****>" + JSON.stringify(newUser))
          context.commit("setUser", newUser);

          router.push("/");
        })
        .catch(function(error) {
          // Handle Errors here.
          context.commit("setLoading", false);
          context.commit("setError", error);
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
         console.log("@@@@@@>" + firebase.auth().currentUser.name)
          context.commit("setUser", currentUser);
          router.push("/");
        })
        .catch(error => {
          context.commit("setLoading", false)
          context.commit("setError", error);
        });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  }
});

export default store;
