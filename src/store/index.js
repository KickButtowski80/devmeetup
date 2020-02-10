import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups:[
      {src: "https://66.media.tumblr.com/73d9ce14ac438745eb701641c483824d/tumblr_p7qs9hIAU81qeafwfo1_1280.jpg",
       id: "1", 
       title: "Meetup New York",
       color: '#952175',
       date: "2021-01-22",
       location: "New York",
       description: "New you are ok"
    },
      {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU5PtF945hQNCefU7NXSFPp6AK8IcGlQioYLVYwMnjDe6mjFNa",
       id: "2" ,
       title:"Los Angeles Meetup",
       color: 'primary',
       date: "2020-09-25",
       location: "Los Angeles",
       description: "Agneles are in heaven"
    },
      {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/London_Thames_Sunset_panorama_-_Feb_2008.jpg/800px-London_Thames_Sunset_panorama_-_Feb_2008.jpg",
       id: "3" ,
       title:"London Meetup", 
       color: 'info',
       date: "2020-01-16",
       location: "London",
       description: "So spookey that you cannot imagine"
        }
    ],
    user: null
     },
     getters:{
       loadedMeetups(state){
         return state.loadedMeetups.sort((meetupA, meetupB) => {
            return meetupA.date > meetupB.date
         })
       },
       featuredMeetups(state, getters){
         return getters.loadedMeetups.slice(0,5)
       },
       loadedMeetup(state){
         return (meetupId) => {
           return state.loadedMeetups.find((meetup) => {
             return meetup.id === meetupId
           })
         }
       },
       user(state){
         return state.user
       }

     },
    mutations: {
      createMeetup (state, newMeetup){
        state.loadedMeetups.push(newMeetup)
      },
      setUser(state, payload){
        console.log("setUser is " + payload.name)
        state.user = payload  
        // localStorage.setItem(state.user, JSON.stringify(payload))
      }
    },
    actions: {
      createMeetup(context, payload){
        const newMeetup ={
          src:  payload.src,
          id: "4", 
          title: payload.title ,
          color: "#" + Math.random().toString(16).slice(2, 8),
          date: payload.date,
          location: payload.location
                }
        context.commit('createMeetup', newMeetup)
      },
      signUserUp(context, payload){  
        const self = this   
        console.log('in sign up user name is ' + payload.name)  
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                       .then (data => {
                         data.user 
                             .updateProfile({
                               displayName: payload.name
                             })
                       })  
                      .then( () => {
                          const newUser = {
                            name: payload.name,
                            id: '_' + Math.random().toString(36).substr(2, 9) ,
                            registeredMeetups: []
                          }
                          console.log('newUser in action is ' + newUser.id + "--" + newUser.registeredMeetups)
                          context.commit('setUser', newUser)
                          
                          router.push('/')
                        }                 
                                  
                      )
                    .catch(function(error) {
                        // Handle Errors here.
                          var errorCode = error.code;       
                          self.errorMessage = error.message

                          if (errorCode == 'auth/weak-password') {
                            alert('The password is too weak.');
                          } else {
                            alert("error message" + self.errorMessage);
                          }
                          alert("error is " + error);
                        });
         },
    
         signUserIn(context,payload){
          
          firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
             .then(() => {
               const currentUser = {
                 name: firebase.auth().currentUser.displayName,
                 id: firebase.auth().currentUser.id,
                 registeredMeetups: []
               }
               context.commit('setUser', currentUser) 
               router.push('/')
          }).catch((err) => {
            alert(err.message)
          })
        }
        

    }
    
 
})
