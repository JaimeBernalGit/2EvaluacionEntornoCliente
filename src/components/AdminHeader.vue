<script setup>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem } from 'bootstrap-vue-next'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <BNavbar variant="dark" style="background-color: #1a1a2e;" class="px-3">
    <BNavbarBrand to="/admin">⚙ Admin Panel</BNavbarBrand>
    <BNavbarNav>
      <BNavItem to="/admin" :active="route.path === '/admin'">Dashboard</BNavItem>
      <BNavItem to="/">Volver al sitio</BNavItem>
    </BNavbarNav>
  </BNavbar>
</template>