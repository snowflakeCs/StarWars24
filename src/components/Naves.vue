<template>
    <div>
    <v-container>
        <h2>Naves</h2>
        <v-row>
            <v-col v-for="starship in starships" :key="starship.url" cols="12" sm="6" md="4" lg="3">
                <v-card @click="showDetails(starship)" class="mx-auto mb-4" max-width="344">
                    <v-card-title class="textCool">{{ starship.name }}</v-card-title>
                    <v-card-subtitle class="mb-2">Clase: {{ starship.starship_class }}</v-card-subtitle>
                    <v-card-text class="text-caption">
                        <p>Modelo:{{ starship.model }} </p>
                    </v-card-text>
                 <v-divider></v-divider>
                <v-card-actions>
                    <v-btn block variant="flat" color="#680c7b" @click="openDialog(starship)">
                    Ver
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-text class="pb-0">
                    <div class="starship-details">
                        <p class="text-h4 text--primary">
                            Detalles de {{ selectedStarship.name }}
                        </p>
                        <p><strong>Modelo:</strong> {{ selectedStarship.model }}</p>
                        <p><strong>Costo:</strong> {{ selectedStarship.cost_in_credits }}</p>
                        <p><strong>Manufacturador:</strong> {{ selectedStarship.manufacturer }}</p>
                        <p><strong>Max Velocidad:</strong> {{ selectedStarship.max_atmosphering_speed }}</p>
                        <p><strong>Pasajeros:</strong> {{ selectedStarship.passengers }}</p>
                        <p><strong>Capacidad Cargo:</strong> {{ selectedStarship.cargo_capacity }}</p>
                        <p><strong>Consumibles:</strong> {{ selectedStarship.consumables }}</p>
                        <p><strong>Clase:</strong> {{ selectedStarship.starship_class }}</p>
                        <p v-if="selectedStarship.films.length !== 0"><strong>Peliculas:</strong> {{ selectedStarship.films }}</p>
                        <p v-if="selectedStarship.pilots.length !== 0"><strong>Pilotos:</strong> {{ selectedStarship.pilots }}</p>


                    </div>
                </v-card-text>
                <v-card-actions class="pt-0">
                    <v-btn variant="text" color="teal-accent-4" @click="dialog = false">
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            starships: [],
            dialog: false,
            selectedStarship: null
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
            this.selectedStarship = starship;
            this.dialog = true;
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
