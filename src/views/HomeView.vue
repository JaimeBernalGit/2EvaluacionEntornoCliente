<script setup>
import { BButton } from 'bootstrap-vue-next'
</script>

<template>
  <div>
    <div class="p-5 mb-4 bg-light rounded-3">
      <h1>Bienvenido a CursosApp</h1>
      <p class="lead">Aprende con los mejores cursos online.</p>
    </div>
    <p>Explora nuestro catálogo de cursos y empieza a aprender hoy.</p>
    <BButton variant="primary" to="/cursos">Ver cursos</BButton>
  </div>
</template>