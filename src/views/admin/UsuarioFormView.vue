<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BCard, BForm, BFormGroup, BFormInput, BFormSelect, BButton, BAlert } from 'bootstrap-vue-next'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useUsuarioStore } from '../../stores/usuario'

const router = useRouter()
const route = useRoute()
const usuarioStore = useUsuarioStore()

const fotoPerfil = ref(null)
const error = ref(null)

const schema = yup.object({
    nombre: yup.string().required('El nombre es obligatorio'),
    nombre_usuario: yup.string().required('El usuario es obligatorio').min(3, 'Mínimo 3 caracteres'),
    correo: yup.string().required('El correo es obligatorio').email('Correo no válido'),
    password: yup.string().required('La contraseña es obligatoria').min(6, 'Mínimo 6 caracteres'),
    estado: yup.string().required('El estado es obligatorio'),
})

const { handleSubmit, errors, setValues } = useForm({ validationSchema: schema })
const { value: nombre } = useField('nombre')
const { value: nombre_usuario } = useField('nombre_usuario')
const { value: correo } = useField('correo')
const { value: password } = useField('password')
const { value: estado } = useField('estado')

const estadosOpciones = [
    { value: 'activo', text: 'Activo' },
    { value: 'Inactivo', text: 'Inactivo' },
    { value: 'suspendido', text: 'Suspendido' },
]

onMounted(async () => {
    await usuarioStore.getUsuarioById(route.params.id)
    const u = usuarioStore.usuario
    setValues({
        nombre: u.nombre,
        nombre_usuario: u.nombre_Usuario ?? u.Nombre_Usuario,
        correo: u.correo,
        password: '',
        estado: u.estado,
    })
})

const handleFoto = (e) => { fotoPerfil.value = e.target.files[0] }

const onSubmit = handleSubmit(async (values) => {
    error.value = null
    try {
        const formData = new FormData()
        formData.append('nombre', values.nombre)
        formData.append('nombre_usuario', values.nombre_usuario)
        formData.append('correo', values.correo)
        formData.append('password', values.password)
        formData.append('estado', values.estado)
        if (fotoPerfil.value) formData.append('fotoPerfil', fotoPerfil.value)

        await usuarioStore.updateUsuario(route.params.id, formData)
        router.push('/admin')
    } catch (e) {
        error.value = e.message
    }
})
</script>

<template>
  <div class="d-flex justify-content-center">
    <BCard title="Editar Usuario" style="width: 600px;">
      <BButton variant="link" class="ps-0 mb-2" @click="router.push('/admin')">← Volver</BButton>
      <BAlert v-if="error" variant="danger" :model-value="true">{{ error }}</BAlert>
      <BForm @submit.prevent="onSubmit">
        <BFormGroup label="Nombre" class="mb-3">
          <BFormInput v-model="nombre" type="text"
            :state="errors.nombre ? false : null" />
          <div v-if="errors.nombre" class="text-danger small mt-1">{{ errors.nombre }}</div>
        </BFormGroup>
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput v-model="nombre_usuario" type="text"
            :state="errors.nombre_usuario ? false : null" />
          <div v-if="errors.nombre_usuario" class="text-danger small mt-1">{{ errors.nombre_usuario }}</div>
        </BFormGroup>
        <BFormGroup label="Correo" class="mb-3">
          <BFormInput v-model="correo" type="email"
            :state="errors.correo ? false : null" />
          <div v-if="errors.correo" class="text-danger small mt-1">{{ errors.correo }}</div>
        </BFormGroup>
        <BFormGroup label="Nueva contraseña" class="mb-3">
          <BFormInput v-model="password" type="password" placeholder="Escribe una nueva contraseña"
            :state="errors.password ? false : null" />
          <div v-if="errors.password" class="text-danger small mt-1">{{ errors.password }}</div>
        </BFormGroup>
        <BFormGroup label="Estado" class="mb-3">
          <BFormSelect v-model="estado" :options="estadosOpciones"
            :state="errors.estado ? false : null" />
          <div v-if="errors.estado" class="text-danger small mt-1">{{ errors.estado }}</div>
        </BFormGroup>
        <BFormGroup label="Foto de perfil" class="mb-3">
          <input type="file" class="form-control" accept="image/*" @change="handleFoto" />
          <div class="text-muted small mt-1">Deja vacío para mantener la foto actual</div>
        </BFormGroup>
        <BButton type="submit" variant="primary" class="w-100">Guardar cambios</BButton>
      </BForm>
    </BCard>
  </div>
</template>