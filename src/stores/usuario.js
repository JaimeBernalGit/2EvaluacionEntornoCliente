import { defineStore } from "pinia"
import { ref } from "vue"
import { useAuthStore } from "./auth"

export const useUsuarioStore = defineStore("usuario", () => {
    const usuarios = ref([])
    const usuario = ref(null)
    const API_URL = "http://localhost:9689/api/Usuario"

    const getHeaders = () => {
        const authStore = useAuthStore()
        return { "Authorization": `Bearer ${authStore.token}` }
    }

    const getUsuarios = async () => {
        const response = await fetch(API_URL, { headers: getHeaders() })
        usuarios.value = await response.json()
    }

    const getUsuarioById = async (id) => {
        const response = await fetch(`${API_URL}/${id}`, { headers: getHeaders() })
        usuario.value = await response.json()
    }

    const updateUsuario = async (id, formData) => {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: getHeaders(),
            body: formData
        })
        await getUsuarios()
    }

    const deleteUsuario = async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: getHeaders()
        })
        await getUsuarios()
    }

    return { usuarios, usuario, getUsuarios, getUsuarioById, updateUsuario, deleteUsuario }
})