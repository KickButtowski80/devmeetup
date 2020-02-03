<template>
    <div>
        <v-container>
            <v-row justify="center" align="center" > 
                <v-col
                v-for="(item, i) in items"
                :key="i"
                cols="12"  
            
                >
                    <v-card
                        :color="item.color"
                        dark
                        max-width="600"
                        class="mx-auto"
                    >
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <v-avatar
                            class="ma-3"                            
                            size= "123"
                            tile
                        >
                        <v-img :src="item.src"></v-img>
                        </v-avatar>
                        <div>
                            <v-card-title
                            class="headline"
                            v-text="item.title"
                            ></v-card-title>
                            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                            <v-card-actions> 
                        <v-btn outlined to="/meetups/1" >
                            <v-icon left >arrow_forward</v-icon>
                            View Meetup
                        </v-btn>
                    </v-card-actions> 
                        </div>
                    </div>   
      
                    </v-card>                        
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          color: 'primary',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'My Meetup',
          artist: 'TBA',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
    }),
  }
</script>