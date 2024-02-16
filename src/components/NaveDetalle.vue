
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedStarship">
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
                <v-btn variant="text" color="teal-accent-4" @click="closeDialog">
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-alert v-else>
            Loading...
        </v-alert>
    </v-dialog>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    data() {
        return {
            dialog: true,
            selectedStarship: null
        };
    },
    mounted() {
        this.loadStarshipDetails(this.id);
    },
    methods: {
        loadStarshipDetails(id) {
            axios.get(`https://swapi.dev/api/starships/${id}/`)
                .then(response => {
                    this.selectedStarship = response.data;
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        },
        closeDialog() {
            this.$router.push({ name: 'naves' });
        }
    }
};
</script>

<style scoped></style>