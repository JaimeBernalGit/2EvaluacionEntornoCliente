import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', component: () => import('../views/HomeView.vue') },
        { path: 'cursos', component: () => import('../views/CursosView.vue') },
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: '', component: () => import('../views/admin/AdminView.vue') },
      ]
    },
    // Login y Register sin layout
    { path: '/login', component: () => import('../views/LoginView.vue') },
    { path: '/register', component: () => import('../views/RegisterView.vue') },
  ]
})

export default router