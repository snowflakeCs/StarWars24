<template>
    <div>
        <v-container>
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
            people: [], 
            currentPage: 1,
            totalPages: null
        };
    },
    mounted() {
        this.fetchPeople();
    },
    methods: {
        async fetchPeople(page = 1) {
            try {
                const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
                this.people = response.data.results;
                this.totalPages = Math.ceil(response.data.count / 10);
            } catch (error) {
                console.error('Error fetching people:', error);
            }
        },
        async goToPage(page) {
            await this.fetchPeople(page);
            this.currentPage = page;
        },
        goToPreviousPage(category) {
            if (this.currentPage > 1) {
                this.goToPage(category, this.currentPage - 1);
            }
        },
        goToNextPage(category) {
            if (this.currentPage < this.totalPages) {
                this.goToPage(category, this.currentPage + 1);
            }
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
