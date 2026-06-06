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
  <BNavbar variant="dark" style="background-color: #4a0e8f;" class="px-3">
    <BNavbarBrand to="/admin" style="color: #e0aaff;">⚙ Admin Panel</BNavbarBrand>
    <BNavbarNav>
      <BNavItem to="/admin">
        <span :style="route.path === '/admin' ? 'color: #e0aaff; font-weight: bold;' : 'color: white;'">
          Dashboard
        </span>
      </BNavItem>
      <BNavItem to="/">
        <span style="color: white;">← Volver al sitio</span>
      </BNavItem>
    </BNavbarNav>
    <BNavbarNav class="ms-auto align-items-center">
      <BNavItem>
        <BButton size="sm" variant="outline-light" @click="uiStore.cambiarTema">
          {{ uiStore.tema === 'light' ? '🌙 Oscuro' : '☀️ Claro' }}
        </BButton>
      </BNavItem>
      <BNavItem @click="logout" style="cursor: pointer;">
        <span style="color: #adb5bd;">Cerrar sesión ({{ authStore.usuario?.unique_name }})</span>
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>