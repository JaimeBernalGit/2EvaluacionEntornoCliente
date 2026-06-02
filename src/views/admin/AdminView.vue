<script setup>
import { BTable, BButton } from 'bootstrap-vue-next'

const camposCursos = ['titulo', 'categoria', 'nivel', 'precio', 'acciones']
const cursos = [
  { titulo: 'Python para Principiantes', categoria: 'Programación', nivel: 'Básico', precio: '15.50€' },
]

const camposUsuarios = ['nombre', 'nombre_usuario', 'correo', 'rol', 'acciones']
const usuarios = [
  { nombre: 'Ana García', nombre_usuario: 'ana_g', correo: 'ana@email.com', rol: 'admin' },
]
</script>

<template>
  <div>
    <h2 class="mb-4">Panel de Administración</h2>

    <h4>Gestión de Cursos</h4>
    <BTable :items="cursos" :fields="camposCursos" class="mb-5">
      <template #cell(acciones)>
        <BButton size="sm" variant="warning" class="me-2">Editar</BButton>
        <BButton size="sm" variant="danger">Eliminar</BButton>
      </template>
    </BTable>

    <h4>Gestión de Usuarios</h4>
    <BTable :items="usuarios" :fields="camposUsuarios">
      <template #cell(acciones)>
        <BButton size="sm" variant="warning" class="me-2">Editar</BButton>
        <BButton size="sm" variant="danger">Eliminar</BButton>
      </template>
    </BTable>
  </div>
</template>