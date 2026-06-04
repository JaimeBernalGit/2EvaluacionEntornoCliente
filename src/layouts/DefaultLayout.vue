<script setup>
import AppHeader from "../components/AppHeader.vue"
import AppFooter from "../components/AppFooter.vue"
</script>

<template>
  <AppHeader />
  <main class="container mt-4">
    <RouterView />
  </main>
  <AppFooter />
</template>