<template>
    <v-card flat>
        <v-toolbar height="100" :elevation="8" color="#020106" dark dense>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title class="text-h5"><h2 class="textCool">Star Wars Info</h2></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="searchQuery" label="Buscar por nombre o tipo"
                @input="filterItems" clearable variant="outlined" dense>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-toolbar-items>
            <v-btn text @click="goToPeople"  variant="tonal" outlined class="textCoolNav">
                Personajes
            </v-btn>
            <v-btn text @click="goToPlanets"  variant="tonal" outlined class="textCoolNav">
                Planetas
            </v-btn>
            <v-btn text @click="goToStarships"  variant="tonal" outlined class="textCoolNav">
                Naves
            </v-btn>
        </v-toolbar-items>
        </v-toolbar>

        <!-- Modal para mostrar detalles -->
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-text>
                    <div class="person-details">
                        <p class="text-h4 text--primary">Detalles de {{ selectedResult.name }}</p>
                        <!-- Aquí muestra los detalles del elemento seleccionado -->
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
            <v-list-item v-for="item in filteredItems" :key="item.url" @click="showDetails(item)"  color="primary"
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
    mounted() {
        this.fetchItems('people');
        this.fetchItems('starships');
        this.fetchItems('planets');
    },
    methods: {
        fetchItems(category) {
            axios.get(`https://swapi.dev/api/${category}/`)
                .then(response => {
                    this.items = [...this.items, ...response.data.results];
                })
                .catch(error => {
                    console.error(`Error fetching ${category}:`, error);
                });
        },
        filterItems() {
            if (!this.searchQuery) {
                this.filteredItems = [];
                return;
            }
            const query = this.searchQuery.toLowerCase();
            this.filteredItems = this.items.filter(item =>
                item.name.toLowerCase().includes(query)
            );
        },
        showDetails(item) {
            this.selectedResult = item;
            this.dialog = true;
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
