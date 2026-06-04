<script setup>
import { BCard, BCardText } from "bootstrap-vue-next"
defineProps({
  curso: { type: Object, required: true }
})
</script>

<template>
  <BCard :title="curso.titulo" class="h-100">
    <BCardText>{{ curso.descripcion }}</BCardText>
    <BCardText><strong>Categoría:</strong> {{ curso.categoria }}</BCardText>
    <BCardText><strong>Nivel:</strong> {{ curso.nivel }}</BCardText>
    <BCardText><strong>Precio:</strong> {{ curso.precio }}€</BCardText>
  </BCard>
</template>