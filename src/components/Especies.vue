<template>
    <div>
        <v-container>
            <v-row>
                <v-col v-for="specie in species" :key="specie.url" cols="12" sm="6" md="4" lg="3">
                    <v-card color="deep-purple-lighten-5" class="mx-auto mb-4" max-width="344">
                        <v-card-title class="textCool">{{ specie.name }}</v-card-title>
                        <v-card-subtitle class="mb-2">{{ specie.classification }}</v-card-subtitle>
                        <v-card-text class="text-caption">
                            <p>Designacion: {{ specie.designation }}</p>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn block variant="flat" color="#680c7b" @click="showDetails(specie)">
                                Ver
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-btn @click="goToPreviousPage('people')" v-if="currentPage > 1">Anterior</v-btn>
            <v-btn @click="goToNextPage('people')" v-if="currentPage < totalPages">Siguiente</v-btn>
            <router-view></router-view>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            species: [],
            currentPage: 1,
            totalPages: null
        };
    },
    mounted() {
        this.fetchSpecies();
    },
    methods: {
        async fetchSpecies(page = 1) {
            try {
                const response = await axios.get(`https://swapi.dev/api/species/?page=${page}`);
                this.species = response.data.results;
                this.totalPages = Math.ceil(response.data.count / 10);
            } catch (error) {
                console.error('Error fetching people:', error);
            }
        },
        async goToPage(page) {
            await this.fetchSpecies(page);
            this.currentPage = page;
        },
        goToPreviousPage() {
            if (this.currentPage > 1) {
                this.goToPage(this.currentPage - 1);
            }
        },
        goToNextPage() {
            if (this.currentPage < this.totalPages) {
                this.goToPage(this.currentPage + 1);
            }
        },
        showDetails(specie) {
            this.$router.push({ name: 'EspecieDetalle', params: { id: this.getIdFromUrl(specie.url) } });
        },
        getIdFromUrl(url) {
            const parts = url.split('/');
            return parts[parts.length - 2];
        }
    }
};
</script>
<style>
.textCool {
    font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;
    font-size: 22px;
    text-shadow: -1px 1px 5px #c10ae6, 0 0 5px #000000;
}

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
