
<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card v-if="selectedSpecie" v-click-outside="hideDialog">
            <v-card-text class="pb-0">
                <div class="person-details">
                    <p class="text-h4 text--primary">
                        Detalles de {{ selectedSpecie.name }}
                    </p>
                    <p><strong>Género:</strong> {{ selectedSpecie.gender }}</p>
                    <p><strong>Año de nacimiento:</strong> {{ selectedSpecie.birth_year.split('BBY')[0] }}</p>
                    <p><strong>Color de ojos:</strong> {{ selectedSpecie.eye_color }}</p>
                    <p><strong>Masa:</strong> {{ selectedSpecie.mass }}</p>
                    <p><strong>Color de Pelo:</strong> {{ selectedSpecie.hair_color }}</p>
                    <p><strong>Color de Piel:</strong> {{ selectedSpecie.skin_color }}</p>
                    <p><strong>Planeta Natal:</strong> {{ selectedSpecie.homeworld }}</p>

                    <p v-if="selectedSpecie.films.length !== 0"><strong>Peliculas:</strong>
                    <ul>
                        <li v-for="film in selectedSpecie.films" :key="film">
                            {{ filmNames[film] || film }}
                        </li>
                    </ul>
                    </p>
                    <p v-if="selectedSpecie.starships.length !== 0">
                        <strong>Naves:</strong>
                    <ul>
                        <li v-for="specie in selectedSpecie.starships" :key="specie">
                            <p>{{ specie }}</p>
                        </li>
                        <li v-for="specie in selectedSpecie.starships" :key="specie">
                            <a href="#" @click="showSpecieDetails(specie)">{{ specie }}</a>
                            <v-btn variant="flat" @click="showSpecieDetails(specie)">
                                Ver Especie
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
            selectedSpecie: null, filmNames: {}
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
        }, getFilmName(url) {
            if (this.filmNames[url]) {
                return this.filmNames[url];
                return url;
            }
        }, showSpecieDetails(specie) {
            const parts = specie.split('/');
            const result = parts.slice(5, 6).join('/');
            this.$router.push({ name: 'NaveDetalle', params: { id: result } });

        },
        async fetchFilmNames() {
            console.log('Fetching film names...');
            for (const film of this.selectedSpecie.films) {
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

<style scoped></style>