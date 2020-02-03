import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups:[
      {src: "https://66.media.tumblr.com/73d9ce14ac438745eb701641c483824d/tumblr_p7qs9hIAU81qeafwfo1_1280.jpg", id: "1", title: "Meetup New York",color: '#952175'},
      {src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU5PtF945hQNCefU7NXSFPp6AK8IcGlQioYLVYwMnjDe6mjFNa", id: "2" ,  title:"Los Angeles Meetup",color: 'primary'},
      {src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/London_Thames_Sunset_panorama_-_Feb_2008.jpg/800px-London_Thames_Sunset_panorama_-_Feb_2008.jpg", id: "3" , title:"London Meetup", color: 'info'}
    ]
     },
     getters:{

     },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
