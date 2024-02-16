<template>
    <div>
    <v-container>
        <v-row>
            <v-col v-for="starship in starships" :key="starship.url" cols="12" sm="6" md="4" lg="3">
                <v-card color="deep-purple-lighten-5" class="mx-auto mb-4" max-width="344">
                    <v-card-title class="textCool">{{ starship.name }}</v-card-title>
                    <v-card-subtitle class="mb-2">Clase: {{ starship.starship_class }}</v-card-subtitle>
                    <v-card-text class="text-caption">
                        <p>Modelo:{{ starship.model }} </p>
                    </v-card-text>
                 <v-divider></v-divider>
                <v-card-actions>
                    <v-btn block variant="flat" color="#680c7b" @click="showDetails(starship)">
                    Ver
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
       <v-btn @click="goToPreviousPage('starships')" v-if="currentPage > 1">Anterior</v-btn>
        <v-btn @click="goToNextPage('starships')" v-if="currentPage < totalPages">Siguiente</v-btn>
        <router-view></router-view> 
    </v-container>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            starships: [],
            currentPage: 1,
            totalPages: null
        };
    },
    mounted() {
        this.fetchStarships();
    },
    methods: {
        async fetchStarships(page = 1) {
            try {
                const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
                this.starships = response.data.results;
                this.totalPages = Math.ceil(response.data.count / 10); // Suponiendo que cada página contiene 10 elementos
            } catch (error) {
                console.error('Error fetching starships:', error);
            }
        },
        async goToPage(page) {
            await this.fetchStarships(page);
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
        showDetails(starship) {
            this.$router.push({ name: 'NaveDetalle', params: { id: this.getIdFromUrl(starship.url) } });
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
text-shadow: -1px 1px 5px #6b1287, 0 0 5px #000000;    }
.v-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.starship-details {
    flex: 1;
    padding: 20px;
}

.starship-details h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.starship-details p {
    font-size: 16px;
    margin-bottom: 5px;
}

</style>
