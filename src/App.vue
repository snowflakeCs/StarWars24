<script setup>
import {  RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import HeaderTabs from './components/HeaderTabs.vue';
</script>

<template>
  <HeaderTabs></HeaderTabs>
     <HelloWorld />
  <RouterView />
</template>

<style scoped>
body{height: auto;}
</style>
