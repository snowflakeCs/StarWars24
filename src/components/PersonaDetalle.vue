<!--<template>
    <div v-if="person">
        <h2>Detalles de {{ person.name }}</h2>
        <div>
            <p><strong>Género:</strong> {{ person.gender }}</p>
            <p><strong>Año de nacimiento:</strong> {{ person.birth_year }}</p>
            <p><strong>Color de ojos:</strong> {{ person.eye_color }}</p>
            <p><strong>Masa:</strong> {{ person.mass }}</p>
            <p><strong>Color de Pelo:</strong> {{ person.hair_color }}</p>
            <p><strong>Color de Piel:</strong> {{ person.skin_color }}</p>
            <p><strong>Planeta Natal:</strong> {{ person.homeworld }}</p>
            <p><strong>Peliculas:</strong> {{ person.films }}</p>
            <p><strong>Naves:</strong> {{ person.starships }}</p>
        </div>
    </div>
</template>-->
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
                    <p v-if="selectedPerson.films.length !== 0"><strong>Peliculas:</strong> {{ selectedPerson.films }}</p>
                    <p v-if="selectedPerson.starships.length !== 0"><strong>Naves:</strong> {{ selectedPerson.starships }}
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
<!--
<script>
import axios from 'axios';

export default {
    props: ['id'],
    data() {
        return {
            person: null
        };
    },
    created() {
        this.fetchPersonDetails(this.id);
    },
    methods: {
        fetchPersonDetails(id) {
            axios.get(`https://swapi.dev/api/people/${id}/`)
                .then(response => {
                    this.person = response.data;
                    console.log(id);
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                });
        }
    }
};
</script>-->
<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
    props: ['id'],
    data() {
        return {
            dialog: true, // Esto puede ser verdadero o falso dependiendo de cómo quieras mostrar el diálogo inicialmente
            selectedPerson: null
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
            this.$router.push({ name: 'personas' }); // Navega de regreso a la lista de personas
        }
    }
};
</script>

<style scoped>
/* Agrega estilos específicos del componente aquí si es necesario */
</style>