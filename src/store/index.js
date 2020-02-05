import Vue from 'vue'
import Vuex from 'vuex'

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
        // (YYYY-MM-DD) 
    }
    ],
    user:{
      id: 'asdfasdaf',
      //list meetups that user registered for 
      registeredMeetups: [1]
    }
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
       }

     },
    mutations: {
      createMeetup (state, newMeetup){
        state.loadedMeetups.push(newMeetup)
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
      }
    },
    modules: {
     
    }
})
