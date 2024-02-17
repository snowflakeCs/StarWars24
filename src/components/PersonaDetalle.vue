
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedPerson" v-click-outside="hideDialog">
            <v-card-text class="pb-0">
                <div class="person-details">
                    <p class="text-h4 text--primary">
                        Detalles de {{ selectedPerson.name }}
                    </p>
                    <p><strong>Género:</strong> {{ selectedPerson.gender }}</p>
                    <p><strong>Año de nacimiento:</strong> {{ selectedPerson.birth_year.split('BBY')[0] }}</p>
                    <p><strong>Color de ojos:</strong> {{ selectedPerson.eye_color }}</p>
                    <p><strong>Masa:</strong> {{ selectedPerson.mass }}</p>
                    <p><strong>Color de Pelo:</strong> {{ selectedPerson.hair_color }}</p>
                    <p><strong>Color de Piel:</strong> {{ selectedPerson.skin_color }}</p>
                    <p><strong>Planeta Natal:</strong> {{ selectedPerson.homeworld }}</p>
                   
                   
                 <p v-if="selectedPerson.films.length !== 0">
                                <strong>Peliculas:</strong>
                                <ul>
                               
                                    <li v-for="film in selectedPerson.films" :key="film">
                                            <a href="#" @click="showFilmsDetails(film)">{{ filmTitles.title }}</a>
                                            <v-btn variant="flat" @click="showFilmsDetails(film)">
                                                Ver Pelicula
                                            </v-btn>
                                        </li>
                                </ul>
                            </p>
                    <p v-if="selectedPerson.starships.length !== 0">
                            <strong>Naves:</strong>
                            <ul>
                               
                                <li v-for="starship in selectedPerson.starships" :key="starship">
                                        <a href="#" @click="showStarshipDetails(starship)">{{ starship }}</a>
                                        <v-btn variant="flat" @click="showStarshipDetails(starship)">
                                            Ver Nave
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
    props: ['id','film'],
    data() {
        return {
            dialog: true,
            selectedPerson: null, filmTitles: {}
        };
    },
    mounted() {
        this.loadPersonDetails(this.id);

    },
    methods: {
        loadPersonDetails(id) {
            axios.get(`https://swapi.dev/api/people/${id}/`)
                .then(response => {
                    this.selectedPerson = response.data;
                    this.loadFilmTitles();
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        },  loadFilmTitles() {
            this.selectedPerson.films.forEach(filmUrl => {
                axios.get(filmUrl)
                    .then(response => {
                        if (response.data && response.data.title) {
                            this.filmTitles=response.data
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching film details:', error);
                    });
            });
        },
        getFilmName(filmUrl) {
            return this.filmTitles[filmUrl] || filmUrl;
        },hideDialog() {
            this.$router.push({ name: 'personas' });
        },
        closeDialog() {
            this.$router.push({ name: 'personas' }); 
        }
        , showStarshipDetails(starship) {
            const parts = starship.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'NaveDetalle', params: { id: result } });

        },
        showFilmsDetails(film) {
            const parts = film.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'PeliculaDetalle', params: { id: result } });

        }
        
    }
};
</script>

<style scoped>
</style>