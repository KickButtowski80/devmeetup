<template>
    <div>
        <h1>{{owner_name}} profile</h1>
        <h2>Name: {{owner_name}}</h2>
        <h2>Email: {{user_info.email}}</h2>
        <ul v-for="(meetup,i) in meetups" v-bind:key="i">
            <li>{{meetup.title}}</li>
        </ul>
        
    </div>
</template>
<script>
import {mapState} from 'vuex' 
export default {
    computed: {
        ...mapState({
             owner_name: state => state.user.displayName,
             user_info: state => state.user
        }),
        meetups(){
           return this.$store.getters.loadedMeetups
                        .filter( meetup => meetup.creatorId === this.$store.getters.user.uid )
        } 
    }
}
</script>