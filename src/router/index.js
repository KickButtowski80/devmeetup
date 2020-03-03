import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateMeetup from "../views/Meetup/CreateMeetup"
import Meetups from "../views/Meetup/Meetups"
import Profile from '../views/User/Profile'
import Signin from '../views/User/Signin'
import Signup from '../views/User/Signup'
import Meetup from '../views/Meetup/Meetup'
import User from '../views/User/User'
import AuthGuard from './auth-guard'
// import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/meetup/create',
    name:"CreateMeetup",
    component: CreateMeetup,
    beforeEnter:  AuthGuard
  },
  {
    path: '/meetups/:id',
    props: true,
    name: "Meetup",
    component: Meetup,
    //  beforeEnter:  AuthGuard
  },
  {
    path:'/meetups',
    name:"meetups",
    component: Meetups
  },
  {
    path: '/users/:name/', component: User, 
    children: [
        {
        path: 'profile',
        name: "profile",
        component: Profile,
        // beforeEnter:  (to, from, next) => {
        //   if(!store.state.user) {
        //       next('/signin')
        //   }else{
        //       next()
        //   }
        // }
      }
    ]
   
  },
  {
    path: '/signin',
    name: "singin",
    component: Signin
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
