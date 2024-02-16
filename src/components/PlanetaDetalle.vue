
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedPlanet">
            <v-card-text class="pb-0">
                 <div class="person-details">
                            <p class="text-h4 text--primary">
                                Detalles de {{ selectedPlanet.name }}
                            </p>
                            <p><strong>Diametro:</strong> {{ selectedPlanet.diameter }}</p>
                            <p><strong>Clima:</strong> {{ selectedPlanet.climate }}</p>
                            <p><strong>Gravedad:</strong> {{ selectedPlanet.gravity }}</p>
                            <p><strong>Rotacion:</strong> {{ selectedPlanet.rotation_period }}</p>
                            <p><strong>Terreno:</strong> {{ selectedPlanet.terrain }}</p>
                            <p><strong>Poblacion:</strong> {{ selectedPlanet.population }}</p>
                            <p><strong>Superficie de Agua:</strong> {{ selectedPlanet.surface_water }}</p>
                            <p v-if="selectedPlanet.residents.length !== 0">Residents:
                            <ul>
                                <li v-for="residentUrl in selectedPlanet.residents" :key="residentUrl">
                                    <a href="#" @click="showResidentDetails(residentUrl)">{{ residentUrl }}</a>
                                    <v-btn variant="flat" @click="showResidentDetails(residentUrl)">
                                        Ver Persona
                                    </v-btn>
                                </li>

                            </ul>
                            </p>

                            <p v-if="selectedPlanet.films.length !== 0">
                            <strong>Peliculas:</strong>
                            <ul>
                                <li v-for="film in selectedPlanet.films" :key="film">
                                    <p>{{ film }}</p>
                                </li>
                            </ul>
                             </p>

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
            selectedPlanet: null
        };
    },
    mounted() {
        this.loadPlanetDetails(this.id);
    },
    methods: {
        loadPlanetDetails(id) {
            axios.get(`https://swapi.dev/api/planets/${id}/`)
                .then(response => {
                    this.selectedPlanet = response.data;
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        },
        closeDialog() {
            this.$router.push({ name: 'planetas' });
        }
    }
};
</script>

<style scoped></style>