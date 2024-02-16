<!--<template>
<div><v-container>    
    <v-row>
    <v-col v-for="person in people" :key="person.url" cols="12" sm="6" md="4" lg="3">
    <v-card color="deep-purple-lighten-5" @click="showDetails(person)"  class="mx-auto mb-4" max-width="344" >
    <v-card-title  class="textCool">
    {{ person.name }}
    </v-card-title>
    <v-card-subtitle v-if="person.gender !== 'n/a'" class="mb-2">{{ person.gender }}</v-card-subtitle>
    <v-card-subtitle v-if="person.gender == 'n/a'" class="mb-2">No tiene Genero</v-card-subtitle>

       <v-card-text class="text-caption"><p>Edad: {{ person.birth_year.split('BBY')[0] }}</p></v-card-text>
    <v-divider></v-divider>
        <v-card-actions>
            <v-btn block variant="flat" color="#680c7b " @click="reveal = true" @click.stop="showDetails(person)">
            Ver
            </v-btn>
        </v-card-actions>

    </v-card>
    </v-col>
    

    </v-row>
  
    <v-dialog v-model="dialog" max-width="600">
           <v-card>
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
                            <p v-if="selectedPerson.starships.length !== 0"><strong>Naves:</strong> {{ selectedPerson.starships }}</p></div>
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
</template>-->
<template>
    <div>
        <v-container>
            <h2>Personas</h2>
            <v-row>
                <v-col v-for="person in people" :key="person.url" cols="12" sm="6" md="4" lg="3">
                    <v-card color="deep-purple-lighten-5" class="mx-auto mb-4" max-width="344">
                        <v-card-title class="textCool">{{ person.name }}</v-card-title>
                        <v-card-subtitle v-if="person.gender !== 'n/a'" class="mb-2">{{ person.gender }}</v-card-subtitle>
                        <v-card-subtitle v-if="person.gender == 'n/a'" class="mb-2">No tiene Genero</v-card-subtitle>
                        <v-card-text class="text-caption">
                            <p>Edad: {{ person.birth_year.split('BBY')[0] }}</p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn block variant="flat" color="#680c7b" @click="showDetails(person)">
                                Ver
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <router-view></router-view> <!-- Aquí se mostrará el detalle de la persona -->
        </v-container>
    </div>
</template>

<!--<script>
import axios from 'axios';

export default {
    data() {
        return {
            people: [], dialog: false,
            selectedPerson: null
        };
    },
    mounted() {
        this.fetchPeople();
    },
    methods: {
        fetchPeople() {
            axios.get('https://swapi.dev/api/people/')
                .then(response => {
                    this.people = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching people:', error);
                });
        },
        showDetails(person) {
            axios.get(person.url)
                .then(response => {
                    this.selectedPerson = response.data;
                    this.dialog = true;
                })
                .catch(error => {
                    console.error('Error fetching person details:', error);
                    this.dialog = false;
                });
        },
        showDetails2(person) {
            const id = this.getIdFromUrl(person.url);
            this.$router.push({ name: 'PersonaDetalle', params: { id:id } });
        }, 
        
        getIdFromUrl(url) {
      const parts = url.split('/');
      return parts[parts.length - 2];
    },

    }
};
</script>-->
<script>
import axios from 'axios';

export default {
    data() {
        return {
            people: []
        };
    },
    mounted() {
        this.fetchPeople();
    },
    methods: {
        fetchPeople() {
            axios.get('https://swapi.dev/api/people/')
                .then(response => {
                    this.people = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching people:', error);
                });
        },
        showDetails(person) {
            this.$router.push({ name: 'PersonaDetalle', params: { id: this.getIdFromUrl(person.url) } });
        },
        getIdFromUrl(url) {
            const parts = url.split('/');
            return parts[parts.length - 2];
        }
    }
};
</script>
<style>
.textCool{
font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;font-size: 22px;
text-shadow: -1px 1px 5px #c10ae6, 0 0 5px #000000;    }

.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}.person-details {
  flex: 1;
  padding: 20px;
}

.person-details h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.person-details p {
  font-size: 16px;
  margin-bottom: 5px;
}

</style>
