import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "../stores/auth"
import DefaultLayout from "../layouts/DefaultLayout.vue"
import AdminLayout from "../layouts/AdminLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        { path: "", component: () => import("../views/HomeView.vue") },
        { path: "cursos", component: () => import("../views/CursosView.vue") },
      ]
    },
    {
      path: "/admin",
      component: AdminLayout,
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        { path: "", component: () => import("../views/admin/AdminView.vue") },
        { path: "cursos/crear", component: () => import("../views/admin/CursoFormView.vue") },
        { path: "cursos/editar/:id", component: () => import("../views/admin/CursoFormView.vue") },
        { path: "usuarios/editar/:id", component: () => import("../views/admin/UsuarioFormView.vue") },
      ]
    },
    { path: "/login", component: () => import("../views/LoginView.vue") },
    { path: "/register", component: () => import("../views/RegisterView.vue") },
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) return "/login"
  if (to.meta.requiresAdmin && !authStore.isAdmin) return "/"
})

export default router