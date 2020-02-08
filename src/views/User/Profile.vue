<template>
    <div>
        <h1>User Page</h1>
        <h2>Name: {{owner_name}}</h2>
    </div>
</template>
<script>
import {mapState} from 'vuex' 
export default {
    computed: {
        ...mapState({
             owner_name: state => state.user.name
        })
    }
}
</script>