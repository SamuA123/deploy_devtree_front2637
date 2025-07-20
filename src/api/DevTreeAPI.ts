import { isAxiosError } from 'axios'
import api from '../config/axios'
import { User, UserHandle } from '../types'

// Obtener el perfil del usuario
export async function getUser() {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Actualizar el perfil
export async function updateProfile(formData: User) {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Subir una imagen de perfil
export async function uploadImage(file: File) {
    let formData = new FormData()
    formData.append('file', file)
    try {
        const { data: {image} } : {data: {image: string}} = await api.post('/user/image', formData)
        return image
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Obtener un usuario por handle
export async function getUserByHandle(handle: string) {
    try {
        const url = `/${handle}`
        const { data } = await api<UserHandle>(url)
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Buscar un usuario por handle
export async function searchByHandle(handle: string) {
    try {
        const { data } = await api.post<string>('/search', {handle})
        return data
    } catch (error) {
        if (isAxiosError (error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Incrementar el contador de visitas del perfil
export async function incrementProfileVisit(userId: string) {
    try {
        const { data } = await api.post<{ count: number }>(`/api/profile/${userId}/visit`)
        return data.count
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

// Obtener el contador de visitas del perfil
export async function getProfileVisitCount(userId: string) {
    try {
        const { data } = await api.get<{ count: number }>(`/api/profile/${userId}/visit`)
        return data.count
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}