<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BTable, BButton } from 'bootstrap-vue-next'
import { useCursoStore } from '../../stores/curso'
import { useUsuarioStore } from '../../stores/usuario'

const router = useRouter()
const cursoStore = useCursoStore()
const usuarioStore = useUsuarioStore()

const camposCursos = ['titulo', 'categoria', 'nivel', 'precio', 'acciones']
const camposUsuarios = ['nombre', 'Nombre_Usuario', 'correo', 'rol', 'acciones']

onMounted(() => {
    cursoStore.getCursos()
    usuarioStore.getUsuarios()
})

const eliminarCurso = async (id) => await cursoStore.deleteCurso(id)
const eliminarUsuario = async (id) => await usuarioStore.deleteUsuario(id)
</script>

<template>
  <div>
    <h2 class="mb-4">Panel de Administración</h2>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="mb-0">Gestión de Cursos</h4>
      <BButton variant="success" @click="router.push('/admin/cursos/crear')">+ Nuevo curso</BButton>
    </div>
    <BTable :items="cursoStore.cursos" :fields="camposCursos" class="mb-5">
      <template #cell(acciones)="{ item }">
        <BButton size="sm" variant="warning" class="me-2"
          @click="router.push(`/admin/cursos/editar/${item.id}`)">Editar</BButton>
        <BButton size="sm" variant="danger" @click="eliminarCurso(item.id)">Eliminar</BButton>
      </template>
    </BTable>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="mb-0">Gestión de Usuarios</h4>
    </div>
    <BTable :items="usuarioStore.usuarios" :fields="camposUsuarios">
      <template #cell(acciones)="{ item }">
        <BButton size="sm" variant="warning" class="me-2"
          @click="router.push(`/admin/usuarios/editar/${item.id}`)">Editar</BButton>
        <BButton size="sm" variant="danger" @click="eliminarUsuario(item.id)">Eliminar</BButton>
      </template>
    </BTable>
  </div>
</template>