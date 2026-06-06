<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { BCard, BForm, BFormGroup, BFormInput, BButton, BAlert } from 'bootstrap-vue-next'
import { useAuthStore } from '../stores/auth'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const authStore = useAuthStore()
const fotoPerfil = ref(null)

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    nombre_usuario: yup.string().required('El usuario es obligatorio').min(3, 'Mínimo 3 caracteres'),
    correo: yup.string().required('El correo es obligatorio').email('El correo no es válido'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
})

const { handleSubmit, errors } = useForm({ validationSchema: schema })
const { value: nombre } = useField('nombre')
const { value: nombre_usuario } = useField('nombre_usuario')
const { value: correo } = useField('correo')
const { value: password } = useField('password')

const handleFoto = (e) => {
    fotoPerfil.value = e.target.files[0]
}

const onSubmit = handleSubmit(async (values) => {
    try {
        await authStore.register({ ...values, fotoPerfil: fotoPerfil.value })
        router.push('/')
    } catch (e) {
        errors.value = { ...errors.value, api: e.message }
    }
})
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <BCard title="Crear cuenta" style="width: 400px;">
      <BButton variant="link" class="ps-0 mb-2" @click="router.push('/')">← Volver al inicio</BButton>
      <BAlert v-if="errors.api" variant="danger" :model-value="true">{{ errors.api }}</BAlert>
      <BForm @submit.prevent="onSubmit">
        <BFormGroup label="Nombre" class="mb-3">
          <BFormInput v-model="nombre" type="text" placeholder="Nombre completo"
            :state="errors.nombre ? false : null" />
          <div v-if="errors.nombre" class="text-danger small mt-1">{{ errors.nombre }}</div>
        </BFormGroup>
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput v-model="nombre_usuario" type="text" placeholder="Nombre de usuario"
            :state="errors.nombre_usuario ? false : null" />
          <div v-if="errors.nombre_usuario" class="text-danger small mt-1">{{ errors.nombre_usuario }}</div>
        </BFormGroup>
        <BFormGroup label="Correo" class="mb-3">
          <BFormInput v-model="correo" type="email" placeholder="correo@ejemplo.com"
            :state="errors.correo ? false : null" />
          <div v-if="errors.correo" class="text-danger small mt-1">{{ errors.correo }}</div>
        </BFormGroup>
        <BFormGroup label="Contraseña" class="mb-3">
          <BFormInput v-model="password" type="password" placeholder="Contraseña"
            :state="errors.password ? false : null" />
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
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