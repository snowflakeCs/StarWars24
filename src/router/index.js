import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Personas from '../components/Personas.vue'
import Planetas from '../components/Planetas.vue'
import Naves from '../components/Naves.vue'
import PersonaDetalle from '../components/PersonaDetalle.vue'
import NaveDetalle from '../components/NaveDetalle.vue'
import PlanetaDetalle from '../components/PlanetaDetalle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { path: '/personas', name: 'personas',component: Personas },
    { path: '/planetas', name: 'planetas',component: Planetas },
    { path: '/naves', name: 'naves',component: Naves },
    {
      path: '/personas/:id',
      name: 'PersonaDetalle',
      component: PersonaDetalle,
      props: true
    },
    {
      path: '/planetas/:id',
      name: 'PlanetaDetalle',
      component: PlanetaDetalle,
      props: true
    },
    {
      path: '/naves/:id',
      name: 'NaveDetalle',
      component: NaveDetalle,
      props: true
    }
  ]
})

export default router
