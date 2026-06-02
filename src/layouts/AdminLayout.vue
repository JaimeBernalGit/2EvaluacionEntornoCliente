<script setup>
import AdminHeader from '../components/AdminHeader.vue'
import AdminFooter from '../components/AdminFooter.vue'
</script>

<template>
  <AdminHeader />
  <main class="container mt-4">
    <RouterView />
  </main>
  <AdminFooter />
</template>