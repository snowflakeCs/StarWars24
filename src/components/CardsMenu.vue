<template>
    <div class="cards-list">
      <div class="card 1">
        <div class="card_image"> <img  alt="" src="https://comicvine.gamespot.com/a/uploads/scale_small/12/124259/8689453-ezgif-4-29eb1c585d.jpg" /> </div>
        <div class="card_title title-white">
          <p>Personajes</p>
        </div>
      </div>

      <div class="card 2">
        <div class="card_image">
          <img alt="" src="https://www.nosolobits.com/imagenes/guia/tatooine_891005164.jpg" />
        </div>
        <div class="card_title title-white">
          <p>Planetas</p>
        </div>
      </div>

      <div class="card 3">
        <div class="card_image">
          <img alt="" src="https://i.blogs.es/695e9b/e54c5b1124ea6b3fc940db5dc277d7b9/1366_2000.jpg" />
        </div>
        <div class="card_title">
          <p>Naves</p>
        </div>
      </div>

      <div class="card 4">
        <div class="card_image">
          <img alt="" src="https://erikstore.com/blog/wp-content/uploads/2023/08/Orden-cronologico-star-wars.webp" />
        </div>
        <div class="card_title title-black">
          <p>Peliculas</p>
        </div>
      </div>

     <div class="card 5">
            <div class="card_image">
              <img alt="" src="https://pm1.aminoapps.com/6584/043180ef9b5c5057e96de7d373376a12de7296ce_hq.jpg" />
            </div>
            <div class="card_title title-black">
              <p>Vehiculos</p>
            </div>
          </div>

     <div class="card 6">
            <div class="card_image">
              <img alt="" src="https://bacanika.com/images/4.0_BACANIKA/CULTURA/star_wars_2022/BACANIKA_BESTIARIO-STAR-WARS_web-PORG.jpg" />
            </div>
            <div class="card_title title-black">
              <p>Especies</p>
            </div>
          </div>


    </div>
</template>
<style>
.cards-list {
    z-index: 0;
    padding: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    align-items: baseline;
}

.card {
  margin: 4vh auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  box-shadow: 5px 5px 30px 7px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 7px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 40px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
  border-radius: 0px 0px 40px 40px;
  font-family: "Share Tech Mono", monospace;
  font-weight: bold;
  font-size: 4vh;
  margin-top: -60px;
  height: 40px;
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 30px 15px rgba(0, 0, 0, 0.25),
    -5px -5px 30px 15px rgba(0, 0, 0, 0.22);
}

.title-white {
  color: white;
}

.title-black {
  color: black;
}

@media all and (max-width: 500px) {
  .card-list {
    flex-direction: column;
  }
}

</style>


<script>
import axios from 'axios';

export default {
    data() {
        return {
           
        };
    }, computed: {
       
    },
    mounted() {
      
    },
    methods: {
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