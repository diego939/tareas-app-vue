import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './pages/Login.vue'
import TareasView from './pages/Tareas.vue'
import AgregarView from './components/Modal.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/home', component: HomeView },
  { path: '/tareas', component: TareasView },
  { path: '/tareaDelete', component: TareasView },
  { path: '/tareaEdit', component: TareasView },
  { path: '/agregar', component: AgregarView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})


export default router