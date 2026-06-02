<script setup>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem } from 'bootstrap-vue-next'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <BNavbar variant="dark" style="background-color: #343a40;" class="px-3">
    <BNavbarBrand to="/">CursosApp</BNavbarBrand>
    <BNavbarNav>
      <BNavItem to="/" :active="route.path === '/'">Inicio</BNavItem>
      <BNavItem to="/cursos" :active="route.path === '/cursos'">Cursos</BNavItem>
      <BNavItem to="/login">Login</BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>