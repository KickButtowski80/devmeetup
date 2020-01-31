<template>
  <v-app >
     <navbar-app></navbar-app>
     <main></main>
  </v-app>
</template>

<script>
 
import Navbar from './components/Navbar'
export default {
  name: 'App',

  components: {
    'navbar-app': Navbar
  },

  data: () => ({
    //
  }),
};
</script>
