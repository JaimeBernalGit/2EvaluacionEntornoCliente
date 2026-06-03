<script setup>
import { onMounted } from 'vue'
import { BRow, BCol } from 'bootstrap-vue-next'
import CursoCard from '../components/CursoCard.vue'
import { useCursoStore } from '../stores/curso'

const cursoStore = useCursoStore()

onMounted(() => {
    cursoStore.getCursos()
})
</script>

<template>
  <div>
    <h2 class="mb-4">Catálogo de Cursos</h2>
    <BRow>
      <BCol md="4" v-for="curso in cursoStore.cursos" :key="curso.id" class="mb-4">
        <CursoCard :curso="curso" />
      </BCol>
    </BRow>
  </div>
</template>