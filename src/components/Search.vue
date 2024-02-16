<template>
    <v-container>
            <v-text-field
              v-model="searchQuery"
              label="Buscar por nombre o tipo"
              append-icon="mdi-magnify"
              @input="filterItems"
              clearable
            ></v-text-field>

        <v-row>
            <v-col cols="12">
            <v-list v-if="searchQuery.trim() !== ''">
              <v-list-item v-for="item in paginatedItems" :key="item.url" @click="showDetails(item)">
                <v-list-item-content>
                  <v-list-item-title>{{ item.name }} - {{ getType(item) }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <div v-if="selectedItem">
                <h2>Detalles de {{ selectedItem.name }}</h2>
                <div>
                    <p><strong>Tipo:</strong> {{ getType(selectedItem) }}</p>
                    <template v-if="selectedItem.birth_year">
                        <p><strong>Año de nacimiento:</strong> {{ selectedItem.birth_year }}</p>
                    </template>
                    <template v-if="selectedItem.eye_color">
                        <p><strong>Color de ojos:</strong> {{ selectedItem.eye_color }}</p>
                    </template>
                    <template v-if="selectedItem.mass">
                        <p><strong>Masa:</strong> {{ selectedItem.mass }}</p>
                    </template>
                    <template v-if="selectedItem.hair_color">
                        <p><strong>Color de Pelo:</strong> {{ selectedItem.hair_color }}</p>
                    </template>
                    <template v-if="selectedItem.skin_color">
                        <p><strong>Color de Piel:</strong> {{ selectedItem.skin_color }}</p>
                    </template>
                    <template v-if="selectedItem.homeworld">
                        <p><strong>Planeta Natal:</strong> {{ selectedItem.homeworld }}</p>
                    </template>
                    <template v-if="selectedItem.films">
                        <p><strong>Peliculas:</strong> {{ selectedItem.films }}</p>
                    </template>
                    <template v-if="selectedItem.starships">
                        <p><strong>Naves:</strong> {{ selectedItem.starships }}</p>
                    </template>
                </div>
            </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-btn @click="previousPage" :disabled="currentPage === 1">Anterior</v-btn>
                <v-btn @click="nextPage" :disabled="currentPage === totalPages">Siguiente</v-btn>
            </v-col>
        </v-row>
       
       </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            items: [],
            selectedItem: null,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 10
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredItems.length / this.itemsPerPage);
        },
        paginatedItems() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.filteredItems.slice(startIndex, endIndex);
        },
        filteredItems() {
            if (!this.searchQuery) {
                return this.items;
            }
            const query = this.searchQuery.toLowerCase();
            return this.items.filter(item =>
                item.name.toLowerCase().includes(query) ||
                this.getType(item).toLowerCase().includes(query)
            );
           
        }
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
        showDetails(item) {
            axios.get(item.url)
                .then(response => {
                    this.selectedItem = response.data;
                })
                .catch(error => {
                    console.error('Error fetching item details:', error);
                });
        },
        getType(item) {
            if (item.hasOwnProperty('gender')) {
                return 'Persona';
            } else if (item.hasOwnProperty('starship_class')) {
                return 'Nave';
            } else if (item.hasOwnProperty('terrain')) {
                return 'Planeta';
            }
            return '';
        },
        filterItems() {

            this.currentPage = 1; // Reset currentPage when search query changes
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    }
};
</script>
