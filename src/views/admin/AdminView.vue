<script setup>
import { onMounted } from 'vue'
import { BTable, BButton } from 'bootstrap-vue-next'
import { useCursoStore } from '../../stores/curso'
import { useUsuarioStore } from '../../stores/usuario'

const cursoStore = useCursoStore()
const usuarioStore = useUsuarioStore()

const camposCursos = ['titulo', 'categoria', 'nivel', 'precio', 'acciones']
const camposUsuarios = ['nombre', 'nombre_Usuario', 'correo', 'rol', 'acciones']

onMounted(() => {
    cursoStore.getCursos()
    usuarioStore.getUsuarios()
})

const eliminarCurso = async (id) => {
    await cursoStore.deleteCurso(id)
}

const eliminarUsuario = async (id) => {
    await usuarioStore.deleteUsuario(id)
}
</script>

<template>
  <div>
    <h2 class="mb-4">Panel de Administración</h2>

    <h4>Gestión de Cursos</h4>
    <BTable :items="cursoStore.cursos" :fields="camposCursos" class="mb-5">
      <template #cell(acciones)="{ item }">
        <BButton size="sm" variant="warning" class="me-2">Editar</BButton>
        <BButton size="sm" variant="danger" @click="eliminarCurso(item.id)">Eliminar</BButton>
      </template>
    </BTable>

    <h4>Gestión de Usuarios</h4>
    <BTable :items="usuarioStore.usuarios" :fields="camposUsuarios">
      <template #cell(acciones)="{ item }">
        <BButton size="sm" variant="warning" class="me-2">Editar</BButton>
        <BButton size="sm" variant="danger" @click="eliminarUsuario(item.id)">Eliminar</BButton>
      </template>
    </BTable>
  </div>
</template>