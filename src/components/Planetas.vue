<template>
    <div>
        <v-container>
            <h2>Planetas</h2>
            <v-row>
                <v-col v-for="planet in planets" :key="planet.url" cols="12" sm="6" md="4" lg="3">
                    <v-card @click="showDetails(planet)" class="mx-auto mb-4" max-width="344">
                        <v-card-title class="textCool">{{ planet.name }}</v-card-title>
                        <v-card-subtitle class="mb-2">Diametro: {{ planet.diameter }}</v-card-subtitle>
                        <v-card-text class="text-caption">
                            <p>Clima: {{ planet.climate }}</p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn block variant="flat" color="#680c7b" @click="openDialog(planet)">
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
                        <p v-if="selectedPlanet.films.length !== 0"><strong>Peliculas:</strong> {{ selectedPlanet.films }}</p>

                    </div>
                </v-card-text>
                
                
            </v-card>
        </v-dialog>
     </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            planets: [],
            dialog: false,
            selectedPlanet: null,
            selectedResident: null
        };
    },
    mounted() {
        this.fetchPlanets();
    },
    methods: {
        fetchPlanets() {
            axios.get('https://swapi.dev/api/planets/')
                .then(response => {
                    this.planets = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching planets:', error);
                });
        },
        showDetails(planet) {
            this.selectedPlanet = planet;
            // Limpiamos la información del residente seleccionado
            this.selectedResident = null;
        },
        openDialog(planet) {
            // Mostramos el diálogo
            this.dialog = true;
            // Cargamos los detalles del planeta seleccionado
            this.showDetails(planet);
        },
        showResidentDetails(residentUrl) {
                    const parts = residentUrl.split('/');
                    const result = parts.slice(5, 6).join('/'); 
                    this.$router.push({ name: 'PersonaDetalle', params: { id: result } });
               
        }
    }
};
</script>

<style>
.textCool{
font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;font-size: 22px;
text-shadow: -1px 1px 5px #6b1287, 0 0 5px #000000;    }
.v-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.person-details {
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