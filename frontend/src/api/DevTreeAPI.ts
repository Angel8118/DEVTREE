import { isAxiosError } from "axios"
import api from "../config/axios"
import type {  User, UserHandle } from "../types"

export async function getUser() {
    try {
        const {data} = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
export async function updateProfile(formData: User) {
    try {
        const {data} = await api.patch<{message: string}>('/user', formData)
        return data.message
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error al actualizar el perfil')
        }
        throw new Error('Error de conexión')
    }
}

export async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    try {
        const {data: {image}} : {data: {image: string}} = await api.post('/user/image', formData)
        return image
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getUserByHandle(handle: string) {
    try {
        const {data} = await api<UserHandle>(`/${handle}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message || 'Usuario no encontrado')
        }
        throw new Error('Error de conexión')
    }
}