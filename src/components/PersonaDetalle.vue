
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedPerson">
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
                   
                    <p v-if="selectedPerson.films.length !== 0"><strong>Peliculas:</strong>
                        <ul>
                            <li v-for="film in selectedPerson.films" :key="film">
                                {{ filmNames[film] || film }}
                            </li>
                        </ul>
                    </p>
                    <p v-if="selectedPerson.starships.length !== 0">
                            <strong>Naves:</strong>
                            <ul>
                                <li v-for="starship in selectedPerson.starships" :key="starship">
                                    <p>{{ starship }}</p>
                                </li>
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
    props: ['id'],
    data() {
        return {
            dialog: true,
            selectedPerson: null, filmNames: {}
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
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        },
        closeDialog() {
            this.$router.push({ name: 'personas' }); 
        }, getFilmName(url) {
            if (this.filmNames[url]) {
                return this.filmNames[url]; 
                return url; 
            }
        }, showStarshipDetails(starship) {
            const parts = starship.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'NaveDetalle', params: { id: result } });

        },
        async fetchFilmNames() {
            console.log('Fetching film names...');
            for (const film of this.selectedPerson.films) {
                try {
                    console.log('Fetching data for film:', film);
                    const response = await axios.get(film);
                    console.log('Response for film:', film, response.data);
                    if (response && response.data && response.data.title) {
                        this.$set(this.filmNames, film, response.data.title);
                    } else {
                        console.error('Film data incomplete or missing title:', film);
                    }
                } catch (error) {
                    console.error('Error fetching film data:', error);
                }
            }
            console.log('Film names fetched:', this.filmNames);
        },


    }
};
</script>

<style scoped>
</style>