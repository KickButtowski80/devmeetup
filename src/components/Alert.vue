<template>
  <div>
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="error  accent-4"
      dark
      dismissible
      :value = true
    >
       {{text}}
    </v-alert>
 
  </div>
</template>
<script>
  export default {
    props: ["text"],
    data () {
      return {
        alert: true,
      }
    }
  }
</script>