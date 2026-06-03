import { defineStore } from "pinia"
import { ref } from "vue"

export const useUsuarioStore = defineStore("usuario", () => {
    const usuarios = ref([])
    const usuario = ref(null)
    const API_URL = "http://localhost:9689/api/Usuario"
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJhbmFfZyIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYW5hQGVtYWlsLmNvbSIsIm5iZiI6MTc4MDUwMTgyOSwiZXhwIjoxNzgxMTA2NjI5LCJpYXQiOjE3ODA1MDE4MjksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0Ojk2ODkiLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo3MDAwIn0.ZY0C0sS2SrCHCQ-OrBkS1OFxMj6r0gjbQYYu7BQ0Ams"

    const getHeaders = () => ({
        "Authorization": `Bearer ${TOKEN}`
    })

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