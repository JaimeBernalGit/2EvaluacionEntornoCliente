import { defineStore } from "pinia"
import { ref } from "vue"

export const useCursoStore = defineStore("curso", () => {
    const cursos = ref([])
    const curso = ref(null)
    const API_URL = "http://localhost:9689/api/Curso"

    const getCursos = async () => {
        const response = await fetch(API_URL)
        cursos.value = await response.json()
    }

    const getCursoById = async (id) => {
        const response = await fetch(`${API_URL}/${id}`)
        curso.value = await response.json()
    }

    const createCurso = async (formData) => {
        await fetch(API_URL, {
            method: "POST",
            body: formData
        })
        await getCursos()
    }

    const updateCurso = async (id, formData) => {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            body: formData
        })
        await getCursos()
    }

    const deleteCurso = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" })
        await getCursos()
    }

    return { cursos, curso, getCursos, getCursoById, createCurso, updateCurso, deleteCurso }
})