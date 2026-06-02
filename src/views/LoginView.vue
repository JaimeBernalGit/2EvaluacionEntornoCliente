<script setup>
import { BCard, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next'
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <BCard title="Iniciar sesión" style="width: 400px;">
      <BForm>
        <BFormGroup label="Usuario" class="mb-3">
          <BFormInput type="text" placeholder="Nombre de usuario" />
        </BFormGroup>
        <BFormGroup label="Contraseña" class="mb-3">
          <BFormInput type="password" placeholder="Contraseña" />
        </BFormGroup>
        <BButton variant="primary" class="w-100">Entrar</BButton>
        <p class="text-center mt-3">
          ¿No tienes cuenta? <RouterLink to="/register">Regístrate</RouterLink>
        </p>
      </BForm>
    </BCard>
  </div>
</template>