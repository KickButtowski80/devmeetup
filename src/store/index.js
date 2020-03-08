import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import firebase from "firebase";
import db from "../main";
// import VuexPersist from "vuex-persist";
import AvataaarMetadata from "../avataaar/avataaarMetadata";

var util = require("util");
Vue.use(Vuex);

// const vuexLocalStorage = new VuexPersist({
//   key: "devmeetup-it", // The key to store the state on in the storage provider.
//   storage: window.localStorage // or window.sessionStorage or localForage
//   // Function that passes the state and returns the state with only the objects you want to store.

//   //  reducer: state => ({
//   //   keepLoadedMeetups : store.getters.loadedMeetups,
//   //   keepUser: store.getters.user,
//   //   keepProfilesInfo: state.profilesInfo
//   //   // getRidOfThisModule: state.getRidOfThisModule (No one likes it.)
//   // })
//   // Function that passes a mutation and lets you decide if it should update the state in localStorage.
//   // filter: mutation => (true)
// });

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
    profilesInfo: [],
    loading: false,
    error: null,
    userAvatar: {}
    //  { avatarStyle: "" ,
    // accessoriesType: "",
    // clotheType: "",
    // clotheColor: "",
    // eyebrowType: "",
    // eyeType: "",
    // facialHairColor: "",
    // facialHairType: "",
    // graphicType: "",
    // hairColor: "",
    // mouthType: "",
    // skinColor: "",
    // topType: ""},
  },

  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
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
    currentUserProfileInfo(state) {
      // debugger; // eslint-disable-line no-debugger
      return state.profilesInfo.find(
        userProfile => userProfile.id === store.getters.user.uid
      );
    },
    profilesInfo(state) {
      return state.profilesInfo;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    userAvatar(state) {
      return state.userAvatar;
    }
  },
  mutations: {
    setUserAvatar(state) {
      let values = Object.values(AvataaarMetadata);
      let tempArr = [];
      values.forEach(v => {
        console.log(
          v.properties[
            Math.floor(Math.random() * (v.properties.length - 1)) + 1
          ]
        );
        tempArr.push(
          v.properties[
            Math.floor(Math.random() * (v.properties.length - 1)) + 1
          ]
        );
      });
      state.userAvatar = {
        avatarStyle: tempArr[0].toString(), // it can be either Circle or Transparent
        accessoriesType: tempArr[1].toString(),
        clotheType: tempArr[2].toString(),
        clotheColor: tempArr[3].toString(),
        eyebrowType: tempArr[4].toString(),
        eyeType: tempArr[5].toString(),
        facialHairColor: tempArr[6].toString(),
        facialHairType: tempArr[7].toString(),
        graphicType: tempArr[8].toString(),
        hairColor: tempArr[9].toString(),
        mouthType: tempArr[10].toString(),
        skinColor: tempArr[11].toString(),
        topType: tempArr[12].toString()
      };
    },

    setLoadedMeetups(state, payload) {
      state.loadedMeetups = [...payload];
    },
    createMeetup(state, newMeetup) {
      state.loadedMeetups.push(newMeetup);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id == payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }

      if (payload.date) {
        meetup.date = payload.date;
      }

      if (payload.location) {
        meetup.location = payload.location;
      }
    },
    updateRegisteredMeetups(state, payload) {
      let currentUserProfile = state.profilesInfo.filter(
        p => p.id === state.user.uid
      );
      if (payload.meetup !== -1)
        currentUserProfile[0].registeredMeetups.splice(payload.meetup, 1);
      else currentUserProfile[0].registeredMeetups.push(payload.meetup_id);
    },
    setUser(state, payload) {
      // const { uid, refreshToken, photoURL, displayName, email } = payload;
      console.log("user === payload" + JSON.stringify(payload));

      // state.user = { ...{ uid, refreshToken, photoURL, displayName, email } };
      state.user = JSON.parse(JSON.stringify(payload));
      // debugger;// eslint-disable-line no-debugger

      // localStorage.setItem(state.user, JSON.stringify(payload))
    },
    setProfilesInfo(state, payload) {
      console.log("setProfilesInfo === payload" + JSON.stringify(payload));
      // state.profilesInfo.push(payload);
      state.profilesInfo = JSON.parse(JSON.stringify(payload));
      // }
      // else
      //    console.log("payload is empty for profile info")
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
    fetchMeetups(context) {
      context.commit("setLoading", true);
      db.collection("meetups")
        .get()
        .then(function(querySnapshot) {
          const meetups = [];
          querySnapshot.forEach(function(doc) {
            const numberOfKeys = Object.keys(doc.data()).length;
            //check if document is empty or not
            if (numberOfKeys !== 0) {
              let meetup = {
                id: doc.id,
                ...doc.data()
              };
              meetups.push(meetup);
            }
          });
          console.log("all the meetups are loaded from firebase");
          meetups.forEach(m => console.log(m));
          context.commit("setLoadedMeetups", meetups);
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          context.commit("setLoading", true);
        });
    },
    fetchprofilesInfo(context) {
      context.commit("setLoading", true);
      db.collection("profilesInfo")
        .get()
        .then(function(querySnapshot) {
          const profilesInfo = [];
          querySnapshot.forEach(function(doc) {
            const numberOfKeys = Object.keys(doc.data()).length;

            //check if document is empty or not
            if (numberOfKeys !== 0) {
              // let profileInfo = {
              //   id: doc.id,
              //   ...doc.data()
              // }
              profilesInfo.push({ ...doc.data() });
            }
          });
          console.log("all the profilesInfo are loaded from firebase");
          profilesInfo.forEach(p => console.log(p));
          // context.commit("setLoadedProfilesInfo", profilesInfo);
          context.commit("setProfilesInfo", profilesInfo);
          context.commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          // context.commit('setLoading', true)
        });
    },
    createMeetup(context, payload) {
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

      db.collection("meetups")
        .add({
          ...newMeetup,
          creatorId: context.state.user.uid
        })
        .then(function(docRef) {
          // const key = docRef.id
          console.log("Document written: ", docRef.id);

          context.commit("createMeetup", {
            ...newMeetup,
            creatorId: context.state.user.uid,
            id: docRef.id
          });
          console.log("newMeetup info is " + util.inspect(newMeetup));
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
    updateMeetupData({ commit }, payload) {
      //for now just, I pass title date and description and  location after
      commit("setLoading", true);
      db.collection("meetups")
        .doc(payload.id)
        .update({
          title: payload.title,
          description: payload.description,
          date: payload.date,
          location: payload.location
        })
        .then(() => {
          commit("setLoading", false);
          commit("updateMeetup", payload);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    //change registration status
    changeRegistrationStatus({ commit }, payload) {
      commit("setLoading", true);
      // so far here good commit ('updateRegisteredMeetups', payload)
      // following code works 1. id of profileinfo needs to be find
      // 2. if the meetup does exist , it has to be splice
      db.collection("profilesInfo")
        .where("id", "==", payload.profileInfoId)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (payload.meetup === -1) {
              db.collection("profilesInfo")
                .doc(doc.id)
                .update({
                  registeredMeetups: firebase.firestore.FieldValue.arrayUnion(
                    payload.meetup_id
                  )
                })
                .then(() => {
                  commit("setLoading", false);
                  commit("updateRegisteredMeetups", payload);
                })
                .catch(error => {
                  console.log(error);
                  commit("setLoading", false);
                });
            } else {
              db.collection("profilesInfo")
                .doc(doc.id)
                .update({
                  registeredMeetups: firebase.firestore.FieldValue.arrayRemove(
                    payload.meetup_id
                  )
                })
                .then(() => {
                  commit("setLoading", false);
                  commit("updateRegisteredMeetups", payload);
                })
                .catch(error => {
                  console.log(error);
                  commit("setLoading", false);
                });
            }
          });
        });
    },
    autoSignIn({ commit, dispatch }, payload) {
      // debugger;  // eslint-disable-line no-debugger

      commit("setUser", payload);
      dispatch("fetchMeetups");
      dispatch("fetchprofilesInfo");
    },

    signUserUp(context, payload) {
      //name , email , and password are in payload
      context.commit("setLoading", true);
      context.commit("clearError");

      context.commit("setUserAvatar");
      
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: payload.name,
              photoURL:
                "https://avataaars.io/?avatarStyle=Transparent&topType=" + context.state.userAvatar.topType +
                "&accessoriesType=" + context.state.userAvatar.accessoriesType + 
                "&hairColor=" + context.state.userAvatar.hairColor + 
                "&facialHairType=" + context.state.userAvatar.facialHairType +
                "&facialHairColor=" + context.state.userAvatar.facialHairColor + 
                "&clotheType=" + context.state.userAvatar.clotheType +
                "&clotheColor=Gray01&eyeType=Squint&eyebrowType=AngryNatural&mouthType=Sad&skinColor=Light"
            })
            .then(function() {
              console.log("Update displayName and photoURL are successful");
            })
            .catch(function(error) {
              console.log("Update displayName and photoURL error is " + error);
            });

          return data;
        })
        .then(data => {
          context.commit("setLoading", false);
          const newUser = {
            name: payload.name,
            photoURL: data.user.photoURL,
            id: data.user.uid,
            email: data.user.email
          };
          db.collection("profilesInfo")
            .add({
              id: data.user.uid,
              registeredMeetups: []
            })
            .then(function() {
              context.commit("setProfilesInfo", {
                id: data.user.uid,
                registeredMeetups: []
              });
              console.log("profilesInfo successfully written!");
            })
            .catch(function(error) {
              console.error("Error writing profilesInfo: ", error);
            });
          context.commit("setUser", newUser);
          router.push("/");
        })
        .catch(function(error) {
          context.commit("setLoading", false);
          context.commit("setError", error);
        });
    },

    signUserIn(context, payload) {
      // context.commit("setLoading", true);
      context.commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          // context.commit("setLoading", false);
          const currentUser = {
            name: firebase.auth().currentUser.displayName,
            id: firebase.auth().currentUser.id,
            photoURL: firebase.auth().currentUser.photoURL
          };
          console.log("@@@@@@>" + firebase.auth().currentUser.displayName);
          context.commit("setUser", currentUser);
          router.push("/");
        })
        .catch(error => {
          // context.commit("setLoading", false)
          context.commit("setError", error);
        });
    },
    clearError({ commit }) {
      commit("clearError");
    }
  }
  // plugins: [vuexLocalStorage.plugin]
});

export default store;
