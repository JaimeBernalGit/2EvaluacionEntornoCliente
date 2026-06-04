<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BCard, BForm, BFormGroup, BFormInput, BButton, BAlert } from 'bootstrap-vue-next'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ nombre: '', nombre_usuario: '', password: '', correo: '', fotoPerfil: null })
const error = ref(null)

const handleFoto = (e) => {
    form.value.fotoPerfil = e.target.files[0]
}

const handleRegister = async () => {
    error.value = null
    try {
        await authStore.register(form.value)
        router.push('/')
    } catch (e) {
        error.value = e.message
    }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <BCard title="Crear cuenta" style="width: 400px;">
      <BButton variant="link" class="ps-0 mb-2" @click="router.push('/')">← Volver al inicio</BButton>
      <BAlert v-if="error" variant="danger" :model-value="true">{{ error }}</BAlert>
      <BForm @submit.prevent="handleRegister">
        <BFormGroup label="Nombre" class="mb-3">
          <BFormInput v-model="form.nombre" type="text" placeholder="Nombre completo" />
        </BFormGroup>
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput v-model="form.nombre_usuario" type="text" placeholder="Nombre de usuario" />
        </BFormGroup>
        <BFormGroup label="Correo" class="mb-3">
          <BFormInput v-model="form.correo" type="email" placeholder="correo@ejemplo.com" />
        </BFormGroup>
        <BFormGroup label="Contraseña" class="mb-3">
          <BFormInput v-model="form.password" type="password" placeholder="Contraseña" />
        </BFormGroup>
        <BFormGroup label="Foto de perfil" class="mb-3">
          <input type="file" class="form-control" accept="image/*" @change="handleFoto" />
        </BFormGroup>
        <BButton type="submit" variant="success" class="w-100">Registrarse</BButton>
        <p class="text-center mt-3">
          ¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
        </p>
      </BForm>
    </BCard>
  </div>
</template>