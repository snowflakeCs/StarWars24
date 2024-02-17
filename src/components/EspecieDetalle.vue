
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedSpecie" v-click-outside="hideDialog">
            <v-card-text class="pb-0">
                <div class="person-details">
                    <p class="text-h4 text--primary">
                        Detalles de Especie {{ selectedSpecie.name }}
                    </p>
                    <p><strong>Clasificación:</strong> {{ selectedSpecie.classification }}</p>
                    <p><strong>Designación:</strong> {{ selectedSpecie.designation }}</p>
                    <p><strong>Altura Promedio:</strong> {{ selectedSpecie.average_height }}</p>
                    <p><strong>Colores de piel:</strong> {{ selectedSpecie.skin_colors }}</p>
                    <p><strong>Colores de Pelo:</strong> {{ selectedSpecie.hair_colors }}</p>
                    <p><strong>Colores de ojos:</strong> {{ selectedSpecie.eye_colors }}</p>
                    <p><strong>Vida Estimada:</strong> {{ selectedSpecie.average_lifespan }}</p>
                    <p><strong>Lenguaje:</strong> {{ selectedSpecie.language }}</p>
                    <p v-if="selectedSpecie.homeworld.length !== 0">
                        <strong>Planeta Natal:</strong>
                    <ul>
                        <li v-for="home in selectedSpecie.homeworld" :key="home">
                            <a href="#" @click="showPlanetDetails(home)">{{ home }}</a>
                            <v-btn variant="flat" @click="showPlanetDetails(home)">
                                Ver Planeta
                            </v-btn>
                        </li>
                    </ul>
                    </p>
                    <p v-if="selectedSpecie.people.length !== 0">
                            <strong>Personajes de la Especie:</strong>
                        <ul>
                            <li v-for="person in selectedSpecie.people" :key="person">
                                <a href="#" @click="showPersonDetails(person)">{{ person }}</a>
                                <v-btn variant="flat" @click="showPersonDetails(person)">
                                    Ver Planeta
                                </v-btn>
                            </li>
                        </ul>
                        </p>
                        <p v-if="selectedSpecie.films.length !== 0">
                                <strong>Peliculas donde se encuentran:</strong>
                            <ul>
                                <li v-for="film in selectedSpecie.films" :key="film">
                                    <a href="#" @click="showFilmDetails(film)">{{ film }}</a>
                                    <v-btn variant="flat" @click="showFilmDetails(film)">
                                        Ver Peliculas
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
            selectedSpecie: null,
        };
    },
    mounted() {
        this.loadSpecieDetails(this.id);
    },
    methods: {
        loadSpecieDetails(id) {
            axios.get(`https://swapi.dev/api/specie/${id}/`)
                .then(response => {
                    this.selectedSpecie = response.data;
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        }, hideDialog() {
            this.$router.push({ name: 'especies' });
        },
        closeDialog() {
            this.$router.push({ name: 'especies' });
        }, showPlanetDetails(home) {
            const parts = home.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PlanetaDetalle', params: { id: result } });

        }
        , showPersonDetails(person) {
            const parts = person.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PersonaDetalle', params: { id: result } });

        }, showFilmDetails(film) {
            const parts = film.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PeliculaDetalle', params: { id: result } });

        }


    }
};
</script>

<style scoped></style>