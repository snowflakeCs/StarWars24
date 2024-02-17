
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedFilm" v-click-outside="hideDialog">
            <v-card-text class="pb-0">
                <div class="person-details">
                    <p class="text-h4 text--primary">
                        Detalles de {{ selectedFilm.title }}
                    </p>
                    <p><strong>Episodio N°:</strong> {{ selectedFilm.episode_id }}</p>
                    <p><strong>Sinopsis:</strong> {{ selectedFilm.opening_crawl }}</p>
                    <p><strong>Director:</strong> {{ selectedFilm.director }}</p>
                    <p><strong>Produce:</strong> {{ selectedFilm.producer }}</p>
                    <p><strong>Fecha de Estreno:</strong> {{ selectedFilm.release_date }}</p>
                    <p v-if="selectedFilm.starships.length !== 0">
                        <strong>Naves En la Pelicula:</strong>
                    <ul>
                        <li v-for="starship in selectedFilm.starships" :key="starship">
                            <a href="#" @click="showStarshipDetails(starship)">{{ starship }}</a>
                            <v-btn variant="flat" @click="showStarshipDetails(starship)">
                                Ver Nave
                            </v-btn>
                        </li>
                    </ul>
                    </p>
                    <p v-if="selectedFilm.characters.length !== 0">
                            <strong>Personajes:</strong>
                        <ul>
                            <li v-for="person in selectedFilm.characters" :key="person">
                                <a href="#" @click="showPersonDetails(person)">{{ person }}</a>
                                <v-btn variant="flat" @click="showPersonDetails(person)">
                                    Ver Personaje
                                </v-btn>
                            </li>
                        </ul>
                        </p>
                        <p v-if="selectedFilm.planets.length !== 0">
                                <strong>Planetas Visitados:</strong>
                            <ul>
                                <li v-for="planet in selectedFilm.planets" :key="planet">
                                    <a href="#" @click="showPlanetDetails(planet)">{{ planet }}</a>
                                    <v-btn variant="flat" @click="showPlanetDetails(planet)">
                                        Ver Planeta
                                    </v-btn>
                                </li>
                            </ul>
                            </p>   
                            <p v-if="selectedFilm.vehicles.length !== 0">
                                    <strong>Vehiculos Utilizados:</strong>
                                <ul>
                                    <li v-for="vehicle in selectedFilm.vehicles" :key="vehicle">
                                        <a href="#" @click="showVehicleDetails(vehicle)">{{ vehicle }}</a>
                                        <v-btn variant="flat" @click="showVehicleDetails(vehicle)">
                                            Ver Vehiculo
                                        </v-btn>
                                    </li>
                                </ul>
                                </p>   
                             <p v-if="selectedFilm.species.length !== 0">
                                        <strong>Especies encontradas:</strong>
                                    <ul>
                                        <li v-for="specie in selectedFilm.species" :key="specie">
                                            <a href="#" @click="showSpecieDetails(specie)">{{ specie }}</a>
                                            <v-btn variant="flat" @click="showSpecieDetails(specie)">
                                                Ver Especies
                                            </v-btn>
                                        </li>
                                    </ul>
                                    </p>               

                </div>
            </v-card-text>
            <v-card-actions class="pt-0">
                <v-btn variant="text" color="teal-accent-4" @click.self="closeDialog">
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
            selectedFilm: null
        };
    },
    mounted() {
        this.loadFilmDetails(this.id);
    },
    methods: {
        loadFilmDetails(id) {
            axios.get(`https://swapi.dev/api/films/${id}/`)
                .then(response => {
                    this.selectedFilm = response.data;
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        }, hideDialog() {
            this.$router.push({ name: 'peliculas' });
        },
        closeDialog() {
            this.$router.push({ name: 'peliculas' });
        }, showStarshipDetails(starship) {
            const parts = starship.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'NaveDetalle', params: { id: result } });

        },
        showPlanetDetails(planet) {
            const parts = planet.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PlanetaDetalle', params: { id: result } });

        },
        showVehicleDetails(vehicle) {
            const parts = vehicle.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'VehiculoDetalle', params: { id: result } });

        },
        showPersonDetails(person) {
            const parts = person.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PersonaDetalle', params: { id: result } });

        },
        showSpecieDetails(specie) {
            const parts = specie.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'EspecieDetalle', params: { id: result } });

        }
    }
};
</script>

<style scoped></style>