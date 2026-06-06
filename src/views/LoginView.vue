<script setup>
import { useRouter } from 'vue-router'
import { BCard, BForm, BFormGroup, BFormInput, BButton, BAlert } from 'bootstrap-vue-next'
import { useAuthStore } from '../stores/auth'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()

const schema = yup.object({
    nombre_usuario: yup.string().required('El usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria')
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })
const { value: nombre_usuario } = useField('nombre_usuario')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async (values) => {
    try {
        await authStore.login(values)
        router.push('/')
    } catch (e) {
        errors.value = { ...errors.value, api: e.message }
    }
})
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <BCard title="Iniciar sesión" style="width: 400px;">
      <BButton variant="link" class="ps-0 mb-2" @click="router.push('/')">← Volver al inicio</BButton>
      <BAlert v-if="errors.api" variant="danger" :model-value="true">{{ errors.api }}</BAlert>
      <BForm @submit.prevent="onSubmit">
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput v-model="nombre_usuario" type="text" placeholder="Nombre de usuario"
            :state="errors.nombre_usuario ? false : null" />
          <div v-if="errors.nombre_usuario" class="text-danger small mt-1">{{ errors.nombre_usuario }}</div>
        </BFormGroup>
        <BFormGroup label="Contraseña" class="mb-3">
          <BFormInput v-model="password" type="password" placeholder="Contraseña"
            :state="errors.password ? false : null" />
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
        </BFormGroup>
        <BButton type="submit" variant="primary" class="w-100">Entrar</BButton>
        <p class="text-center mt-3">
          ¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
        </p>
      </BForm>
    </BCard>
  </div>
</template>