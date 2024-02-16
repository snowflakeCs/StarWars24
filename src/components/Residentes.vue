<template>
    <div>
        <h2>Resident Detail</h2>
        <p>Name: {{ resident.name }}</p>
        <p>Height: {{ resident.height }}</p>
        <!-- Agrega aquí más detalles sobre el residente -->
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            resident: {}
        };
    },
    methods: {
        fetchResident() {
            axios.get(`https://swapi.dev/api/people/${this.$route.params.residentId}/`)
                .then(response => {
                    this.resident = response.data;
                })
                .catch(error => {
                    console.error('Error fetching resident:', error);
                });
        }
    },
    mounted() {
        this.fetchResident();
    }
};
</script>
