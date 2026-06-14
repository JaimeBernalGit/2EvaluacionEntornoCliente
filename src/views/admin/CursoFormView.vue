<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BCard, BForm, BFormGroup, BFormInput, BFormSelect, BButton, BAlert } from 'bootstrap-vue-next'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useCursoStore } from '../../stores/curso'

const router = useRouter()
const route = useRoute()
const cursoStore = useCursoStore()

const esEdicion = computed(() => !!route.params.id)
const doc = ref(null)

const schema = yup.object({
    titulo: yup.string().required('El título es obligatorio'),
    descripcion: yup.string().required('La descripción es obligatoria'),
    categoria: yup.string().required('La categoría es obligatoria'),
    nivel: yup.string().required('El nivel es obligatorio'),
    precio: yup.number().typeError('Debe ser un número').positive('Debe ser mayor que 0').required('El precio es obligatorio'),
})

const { handleSubmit, errors, setValues } = useForm({ validationSchema: schema })
const { value: titulo } = useField('titulo')
const { value: descripcion } = useField('descripcion')
const { value: categoria } = useField('categoria')
const { value: nivel } = useField('nivel')
const { value: precio } = useField('precio')

const nivelesOpciones = [
    { value: 'Básico', text: 'Básico' },
    { value: 'Intermedio', text: 'Intermedio' },
    { value: 'Avanzado', text: 'Avanzado' },
]

const error = ref(null)

onMounted(async () => {
    if (esEdicion.value) {
        await cursoStore.getCursoById(route.params.id)
        const c = cursoStore.curso
        setValues({
            titulo: c.titulo,
            descripcion: c.descripcion,
            categoria: c.categoria,
            nivel: c.nivel,
            precio: c.precio,
        })
    }
})

const handleDoc = (e) => { doc.value = e.target.files[0] }

const onSubmit = handleSubmit(async (values) => {
    error.value = null
    try {
        const formData = new FormData()
        formData.append('titulo', values.titulo)
        formData.append('descripcion', values.descripcion)
        formData.append('categoria', values.categoria)
        formData.append('nivel', values.nivel)
        formData.append('precio', values.precio)
        if (doc.value) formData.append('doc', doc.value)

        if (esEdicion.value) {
            await cursoStore.updateCurso(route.params.id, formData)
        } else {
            await cursoStore.createCurso(formData)
        }
        router.push('/admin')
    } catch (e) {
        error.value = e.message
    }
})
</script>

<template>
  <div class="d-flex justify-content-center">
    <BCard :title="esEdicion ? 'Editar Curso' : 'Nuevo Curso'" style="width: 600px;">
      <BButton variant="link" class="ps-0 mb-2" @click="router.push('/admin')">← Volver</BButton>
      <BAlert v-if="error" variant="danger" :model-value="true">{{ error }}</BAlert>
      <BForm @submit.prevent="onSubmit">
        <BFormGroup label="Título" class="mb-3">
          <BFormInput v-model="titulo" type="text" placeholder="Título del curso"
            :state="errors.titulo ? false : null" />
          <div v-if="errors.titulo" class="text-danger small mt-1">{{ errors.titulo }}</div>
        </BFormGroup>
        <BFormGroup label="Descripción" class="mb-3">
          <BFormInput v-model="descripcion" type="text" placeholder="Descripción"
            :state="errors.descripcion ? false : null" />
          <div v-if="errors.descripcion" class="text-danger small mt-1">{{ errors.descripcion }}</div>
        </BFormGroup>
        <BFormGroup label="Categoría" class="mb-3">
          <BFormInput v-model="categoria" type="text" placeholder="Categoría"
            :state="errors.categoria ? false : null" />
          <div v-if="errors.categoria" class="text-danger small mt-1">{{ errors.categoria }}</div>
        </BFormGroup>
        <BFormGroup label="Nivel" class="mb-3">
          <BFormSelect v-model="nivel" :options="nivelesOpciones"
            :state="errors.nivel ? false : null" />
          <div v-if="errors.nivel" class="text-danger small mt-1">{{ errors.nivel }}</div>
        </BFormGroup>
        <BFormGroup label="Precio (€)" class="mb-3">
          <BFormInput v-model="precio" type="number" step="0.01" placeholder="0.00"
            :state="errors.precio ? false : null" />
          <div v-if="errors.precio" class="text-danger small mt-1">{{ errors.precio }}</div>
        </BFormGroup>
        <BFormGroup label="Documento PDF" class="mb-3">
          <input type="file" class="form-control" accept="application/pdf" @change="handleDoc" />
          <div v-if="esEdicion" class="text-muted small mt-1">Deja vacío para mantener el documento actual</div>
        </BFormGroup>
        <BButton type="submit" variant="primary" class="w-100">
          {{ esEdicion ? 'Guardar cambios' : 'Crear curso' }}
        </BButton>
      </BForm>
    </BCard>
  </div>
</template>