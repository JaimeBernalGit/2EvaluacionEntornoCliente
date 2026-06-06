import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
    const tema = ref('light')

    const cambiarTema = () => {
        tema.value = tema.value === 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', tema.value)
    }

    const iniciarTema = () => {
        document.documentElement.setAttribute('data-bs-theme', tema.value)
    }

    return { tema, cambiarTema, iniciarTema }
})