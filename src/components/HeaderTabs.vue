<template>
    <v-card flat>
        <v-toolbar height="100" :elevation="8" color="#020106" dark dense>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h5">
                <h2 @click="goHome" class="textCool">Star Wars Info</h2>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-text-field v-if="!isHomeView" v-model="searchQuery" label="Buscar por nombre o tipo" @input="filterItems"
                clearable variant="outlined" dense>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn text @click="goToPeople" variant="tonal" outlined class="textCoolNav">
                    Personajes
                </v-btn>
                <v-btn text @click="goToPlanets" variant="tonal" outlined class="textCoolNav">
                    Planetas
                </v-btn>
                <v-btn text @click="goToStarships" variant="tonal" outlined class="textCoolNav">
                    Naves
                </v-btn>
                <v-btn text @click="goToFilms" variant="tonal" outlined class="textCoolNav">
                    Peliculas
                </v-btn>
                <v-btn text @click="goToVehicles" variant="tonal" outlined class="textCoolNav">
                    Vehiculos
                </v-btn>
                <v-btn text @click="goToSpecies" variant="tonal" outlined class="textCoolNav">
                    Especies
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <!-- Modal para mostrar detalles -->
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-text>
                    <div class="person-details">
                        <p class="text-h4 text--primary">Detalles de {{ selectedResult.name }}</p>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="teal accent-4" @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>

    <!-- Lista de resultados -->
    <v-card v-if="searchQuery.length >= 2" class="search-results" max-width="450">
        <v-list>
            <v-list-item v-for="item in filteredItems" :key="item.url" @click="showDetails(item)" color="primary"
                rounded="shaped">
                <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: [],
            searchQuery: '',
            filteredItems: [],
            dialog: false,
            selectedResult: null,
        };
    },
    computed: {
        isHomeView() {
            // Comprueba si la ruta actual es HomeView
            return this.$route.name === 'home';
        }
    },
    mounted() {
        this.fetchItems('people');
        this.fetchItems('starships');
        this.fetchItems('planets');
        this.fetchItems('vehicles');
        this.fetchItems('species');
        this.fetchItems('films');
    },
    methods: {
       filterItems() {
            if (!this.searchQuery) {
                this.filteredItems = this.items;
                return;
            }
            const query = this.searchQuery.toLowerCase();
            this.filteredItems = this.items.filter(item => {
                const itemName = item.name || '';
                const itemType = this.getType(item) || '';
                return itemName.toLowerCase().includes(query) ||
                    itemType.toLowerCase().includes(query);
            });
        },
        fetchItems(category) {
            axios.get(`https://swapi.dev/api/${category}/`)
                .then(response => {
                    this.items = [...this.items, ...response.data.results];
                })
                .catch(error => {
                    console.error(`Error fetching ${category}:`, error);
                });
        },
        getType(item) {
            if (item.hasOwnProperty('gender')) {
                return 'Persona';
            } else if (item.hasOwnProperty('starship_class')) {
                return 'Nave';
            } else if (item.hasOwnProperty('terrain')) {
                return 'Planeta';
            } else if (item.hasOwnProperty('episode_id')) {
                return 'Pelicula';
            } else if (item.hasOwnProperty('skin_colors')) {
                return 'Especie';
            } else if (item.hasOwnProperty('vehicle_class')) {
                return 'Vehiculo';
            }
            return ''; //
        },
        showDetails(item) {
            let routeName;
            const tipo = this.getType(item);
            switch (tipo) {
                case 'Persona':
                    routeName = 'PersonaDetalle';
                    break;
                case 'Nave':
                    routeName = 'NaveDetalle';
                    break;
                case 'Planeta':
                    routeName = 'PlanetaDetalle';
                    break;
                case 'Pelicula':
                    routeName = 'PeliculaDetalle';
                    break;
                case 'Especie':
                    routeName = 'EspecieDetalle';
                    break;
                case 'Vehiculo':
                    routeName = 'VehiculoDetalle';
                    break;
                default:
                    console.error('Tipo de item no reconocido:', item.type);
                    return;
            }
            const id = this.getIdFromUrl(item.url); // Obtener el ID de la URL del item
            this.$router.push({ name: routeName, params: { id: id } }); // Navegar a la ruta de detalle correspondiente con el ID como parámetro
        },
        getIdFromUrl(url) {
            const parts = url.split('/');
            return parts[parts.length - 2];

        },
        goToPeople() {
            this.$router.push({ path: '/personas?page=1' });
        },
        goToPlanets() {
            this.$router.push({ path: '/planetas?page=1' });
        },
        goToStarships() {
            this.$router.push({ path: '/naves?page=1' });
        },
        goToFilms() {
            this.$router.push({ path: '/peliculas?page=1' });
        },
        goToSpecies() {
            this.$router.push({ path: '/especies?page=1' });
        },
        goToVehicles() {
            this.$router.push({ path: '/vehiculos?page=1' });
        },
        goHome() {
            this.$router.push({ path: '/' });
        }
    },
};
</script>

<style>
.search-results {
  background-color: transparent;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
  left: 50%; 
  transform: translateX(-50%); 
  max-width: 450px; 
}
.textCool{
font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;font-size: 30px;
    color: #daf6ff;
    text-shadow: -1px 1px 5px #c10ae6, 0 0 5px #c0ae2c;
    }
.textCoolNav{
font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;font-size: 12px;
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
    }
.person-details {
    padding: 16px;
}

.link-bio {
    color: white;
    text-decoration: none;
}

.link-bio:hover {
    text-decoration: underline;
}
</style>
