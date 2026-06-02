<script setup>
import { BCard, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next'
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <BCard title="Crear cuenta" style="width: 400px;">
      <BForm>
        <BFormGroup label="Nombre" class="mb-3">
          <BFormInput type="text" placeholder="Nombre completo" />
        </BFormGroup>
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput type="text" placeholder="Nombre de usuario" />
        </BFormGroup>
        <BFormGroup label="Correo" class="mb-3">
          <BFormInput type="email" placeholder="correo@ejemplo.com" />
        </BFormGroup>
        <BFormGroup label="Contraseña" class="mb-3">
          <BFormInput type="password" placeholder="Contraseña" />
        </BFormGroup>
        <BButton variant="success" class="w-100">Registrarse</BButton>
        <p class="text-center mt-3">
          ¿Ya tienes cuenta? <RouterLink to="/login">Inicia sesión</RouterLink>
        </p>
      </BForm>
    </BCard>
  </div>
</template>