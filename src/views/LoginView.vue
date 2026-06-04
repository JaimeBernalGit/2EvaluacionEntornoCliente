<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BCard, BForm, BFormGroup, BFormInput, BButton, BAlert } from 'bootstrap-vue-next'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ nombre_usuario: '', password: '' })
const error = ref(null)

const handleLogin = async () => {
    error.value = null
    try {
        await authStore.login(form.value)
        router.push('/')
    } catch (e) {
        error.value = e.message
    }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <BCard title="Iniciar sesión" style="width: 400px;">
      <BButton variant="link" class="ps-0 mb-2" @click="router.push('/')">← Volver al inicio</BButton>
      <BAlert v-if="error" variant="danger" :model-value="true">{{ error }}</BAlert>
      <BForm @submit.prevent="handleLogin">
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput v-model="form.nombre_usuario" type="text" placeholder="Nombre de usuario" />
        </BFormGroup>
        <BFormGroup label="Contraseña" class="mb-3">
          <BFormInput v-model="form.password" type="password" placeholder="Contraseña" />
        </BFormGroup>
        <BButton type="submit" variant="primary" class="w-100">Entrar</BButton>
        <p class="text-center mt-3">
          ¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
        </p>
      </BForm>
    </BCard>
  </div>
</template>