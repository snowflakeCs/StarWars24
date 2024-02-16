<template>
    <div>
    <v-container>
        <v-row>
            <v-col v-for="starship in starships" :key="starship.url" cols="12" sm="6" md="4" lg="3">
                <v-card color="deep-purple-lighten-5" class="mx-auto mb-4" max-width="344">
                    <v-card-title class="textCool">{{ starship.name }}</v-card-title>
                    <v-card-subtitle class="mb-2">Clase: {{ starship.starship_class }}</v-card-subtitle>
                    <v-card-text class="text-caption">
                        <p>Modelo:{{ starship.model }} </p>
                    </v-card-text>
                 <v-divider></v-divider>
                <v-card-actions>
                    <v-btn block variant="flat" color="#680c7b" @click="showDetails(starship)">
                    Ver
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <router-view></router-view> 
    </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            starships: []
        };
    },
    mounted() {
        this.fetchStarships();
    },
    methods: {
        fetchStarships() {
            axios.get('https://swapi.dev/api/starships/')
                .then(response => {
                    this.starships = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching starships:', error);
                });
        },
        showDetails(starship) {
         this.$router.push({ name: 'NaveDetalle', params: { id: this.getIdFromUrl(starship.url) } });

        }, getIdFromUrl(url) {
            const parts = url.split('/');
            return parts[parts.length - 2];
        }
    }
};
</script>

<style>
.textCool{
font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;font-size: 22px;
text-shadow: -1px 1px 5px #6b1287, 0 0 5px #000000;    }
.v-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.starship-details {
    flex: 1;
    padding: 20px;
}

.starship-details h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.starship-details p {
    font-size: 16px;
    margin-bottom: 5px;
}

</style>
