<template>
  <v-container>
    <v-row class="greetings" justify="center">
      <v-col cols="auto">
        <h1 class="textCool">{{ pageTitle }}</h1>
      </v-col>
      <v-col cols="12">
        <h3 class="textCool">{{ message }}</h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {  computed } from 'vue';

const route = useRoute();

// Calcula la propiedad pageTitle en base a la ruta actual
const pageTitle = computed(() => {
  switch (route.name) {
    case 'personas':
      return 'Personajes de Star Wars';
    case 'naves':
      return 'Naves de Star Wars';
    case 'planetas':
      return 'Planetas de Star Wars';
    default:
      return '';
  }
});

// Calcula la propiedad message en base a la ruta actual
const message = computed(() => {
  switch (route.name) {
    case 'personas':
      return 'Aquí encontrarás información sobre tus personajes favoritos.';
    case 'naves':
      return 'Aquí encontrarás información sobre todas las naves de star wars';
    case 'planetas':
      return 'Aquí encontrarás información sobre los planetas de la galaxia.';
    default:
      return '';
  }
});
</script>

<style scoped>
h1 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 20px;
    color: #7E57C2;
}

h3 {
  font-size: 1rem;
    font-weight: 300;
    color: grey;
}

.textCool{
font-family: "Share Tech Mono", monospace;
    color: #ffffff;
    text-align: center;
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0);
    }
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
