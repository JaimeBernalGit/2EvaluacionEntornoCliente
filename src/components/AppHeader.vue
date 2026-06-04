<script setup>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BButton } from 'bootstrap-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
    authStore.logout()
    router.push('/')
}
</script>

<template>
  <BNavbar variant="dark" style="background-color: #343a40;" class="px-3">
    <BNavbarBrand to="/">CursosApp</BNavbarBrand>
    <BNavbarNav>
      <BNavItem to="/" :active="route.path === '/'">Inicio</BNavItem>
      <BNavItem to="/cursos" :active="route.path === '/cursos'">Cursos</BNavItem>
      <BNavItem v-if="authStore.isAdmin" to="/admin" :active="route.path === '/admin'">
        ⚙ Admin
      </BNavItem>
    </BNavbarNav>
    <BNavbarNav class="ms-auto">
      <BNavItem v-if="!authStore.isLoggedIn" to="/login">Login</BNavItem>
      <BNavItem v-else @click="logout" style="cursor: pointer;">
        Cerrar sesión ({{ authStore.usuario?.unique_name }})
      </BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>