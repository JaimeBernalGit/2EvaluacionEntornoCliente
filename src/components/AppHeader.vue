<script setup>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BButton } from 'bootstrap-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()

const logout = () => {
    authStore.logout()
    router.push('/')
}
</script>

<template>
  <BNavbar variant="dark" style="background-color: #343a40;" class="px-3">
    <BNavbarBrand to="/">CursosApp</BNavbarBrand>
    <BNavbarNav>
      <BNavItem to="/">
        <span :style="route.path === '/' ? 'color: #ffc107; font-weight: bold;' : 'color: white;'">
          Inicio
        </span>
      </BNavItem>
      <BNavItem to="/cursos">
        <span :style="route.path === '/cursos' ? 'color: #ffc107; font-weight: bold;' : 'color: white;'">
          Cursos
        </span>
      </BNavItem>
      <BNavItem v-if="authStore.isAdmin" to="/admin">
        <span :style="route.path.startsWith('/admin') ? 'color: #ffc107; font-weight: bold;' : 'color: white;'">
          ⚙ Admin
        </span>
      </BNavItem>
    </BNavbarNav>
    <BNavbarNav class="ms-auto align-items-center">
      <BNavItem>
        <BButton size="sm" variant="outline-light" @click="uiStore.cambiarTema">
          {{ uiStore.tema === 'light' ? '🌙 Oscuro' : '☀️ Claro' }}
        </BButton>
      </BNavItem>
      <BNavItem v-if="!authStore.isLoggedIn" to="/login">
        <span style="color: white;">Login</span>
      </BNavItem>
      <BNavItem v-else @click="logout" style="cursor: pointer;">
        <span style="color: #adb5bd;">Cerrar sesión ({{ authStore.usuario?.unique_name }})</span>
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>