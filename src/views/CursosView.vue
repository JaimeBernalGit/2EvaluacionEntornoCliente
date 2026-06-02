<script setup>
import { BRow, BCol } from 'bootstrap-vue-next'
import CursoCard from '../components/CursoCard.vue'

const cursos = [
  { id: 1, titulo: 'Python para Principiantes', descripcion: 'Aprende Python desde cero.', categoria: 'Programación', nivel: 'Básico', precio: 15.50 },
  { id: 2, titulo: 'Fotografía Profesional', descripcion: 'Iluminación y composición avanzada.', categoria: 'Arte', nivel: 'Avanzado', precio: 45.00 },
  { id: 3, titulo: 'Marketing Digital 360', descripcion: 'SEO, SEM y Redes Sociales.', categoria: 'Marketing', nivel: 'Intermedio', precio: 29.99 },
]
</script>

<template>
  <div>
    <h2 class="mb-4">Catálogo de Cursos</h2>
    <BRow>
      <BCol md="4" v-for="curso in cursos" :key="curso.id" class="mb-4">
        <CursoCard :curso="curso" />
      </BCol>
    </BRow>
  </div>
</template>