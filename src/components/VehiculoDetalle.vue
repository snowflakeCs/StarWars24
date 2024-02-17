
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedVehicle" v-click-outside="hideDialog">
            <v-card-text class="pb-0">
                <div class="person-details">
                    <p class="text-h4 text--primary">
                        Detalles de {{ selectedVehicle.name }}
                    </p>
                    <p><strong>Modelo:</strong> {{ selectedVehicle.model }}</p>
                    <p><strong>Manufacturador:</strong> {{ selectedVehicle.manufacturer }}</p>
                    <p><strong>Largo:</strong> {{ selectedVehicle.length }}</p>
                    <p><strong>Max Velocidad:</strong> {{ selectedVehicle.max_atmosphering_speed }}</p>
                    <p><strong>Crew:</strong> {{ selectedVehicle.crew }}</p>
                    <p><strong>Pasajeros:</strong> {{ selectedVehicle.passengers }}</p>
                    <p><strong>Capacidad de Carga:</strong> {{ selectedVehicle.cargo_capacity }}</p>
                    <p><strong>Consumibles para:</strong> {{ selectedVehicle.consumables }}</p>
                    <p><strong>Clase:</strong> {{ selectedVehicle.vehicle_class }}</p>
                    <p v-if="selectedVehicle.pilots.length !== 0">Pilotos:
                    <ul>
                        <li v-for="person in selectedVehicle.pilots" :key="person">
                            <a href="#" @click="showPersonDetails(person)">{{ person }}</a>
                            <v-btn variant="flat" @click="showPersonDetails(person)">
                                Ver Piloto
                            </v-btn>
                        </li>

                    </ul>
                    </p>

                    <p v-if="selectedVehicle.films.length !== 0">Peliculas:
                        <ul>
                            <li v-for="film in selectedVehicle.films" :key="film">
                                <a href="#" @click="showFilmDetails(film)">{{ film }}</a>
                                <v-btn variant="flat" @click="showFilmDetails(film)">
                                    Ver Pelicula
                                </v-btn>
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
            selectedVehicle: null
        };
    },
    mounted() {
        this.loadVehicleDetails(this.id);
    },
    methods: {
        loadVehicleDetails(id) {
            axios.get(`https://swapi.dev/api/vehicles/${id}/`)
                .then(response => {
                    this.selectedVehicle = response.data;
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        }, hideDialog() {
            this.$router.push({ name: 'vehiculos' });
        },
        closeDialog() {
            this.$router.push({ name: 'vehiculos' });
        }, showPersonDetails(person) {
            const parts = person.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PersonaDetalle', params: { id: result } });

        },
        showFilmDetails(film) {
            const parts = film.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PeliculaDetalle', params: { id: result } });

        }
    }
};
</script>

<style scoped></style>