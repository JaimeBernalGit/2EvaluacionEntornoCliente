import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useAuthStore = defineStore("auth", () => {
    const token = ref(null)
    const usuario = ref(null)
    const API_URL = import.meta.env.VITE_API_URL

    // computed para saber si hay sesión activa
    const isLoggedIn = computed(() => token.value !== null)
    const isAdmin = computed(() => usuario.value?.role === "admin")

    const login = async (loginDTO) => {
        const response = await fetch(`${API_URL}/Auth/Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginDTO)
        })

        if (!response.ok) throw new Error("Credenciales inválidas")

        const data = await response.json()
        token.value = data.token
        usuario.value = parseJwt(data.token)
    }

    const register = async (registerDTO) => {
        const formData = new FormData()
        formData.append("nombre", registerDTO.nombre)
        formData.append("nombre_usuario", registerDTO.nombre_usuario)
        formData.append("password", registerDTO.password)
        formData.append("correo", registerDTO.correo)
        formData.append("fotoPerfil", registerDTO.fotoPerfil)

        const response = await fetch(`${API_URL}/Auth/Register`, {
            method: "POST",
            body: formData
        })

        if (!response.ok) throw new Error("Error al registrarse")

        const data = await response.json()
        token.value = data.token ?? data
        usuario.value = parseJwt(token.value)
    }

    const logout = () => {
        token.value = null
        usuario.value = null
    }

    const parseJwt = (token) => {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        return JSON.parse(atob(base64))
    }

    return { token, usuario, isLoggedIn, isAdmin, login, register, logout }
})