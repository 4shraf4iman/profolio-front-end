import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api'

interface UserProfile {
  id?: number
  name: string
  email: string
  profile_picture: string
  job_position: string
  about: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUserById = async (userId: number) => {
    try {
      loading.value = true
      const response = await api.get(`/users/${userId}`)
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch user data'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUserByUsername = async (userId: string) => {
    try {
      loading.value = true
      const response = await api.get(`/users/${userId}`)
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to fetch user data'
      throw err
    } finally {
      loading.value = false
    }
  }

  

  const updateUser = async (userId: number, userData: Partial<UserProfile>) => {
    try {
      loading.value = true
      const response = await api.post(`/users/${userId}`, userData)
      user.value = response.data
      return response.data
    } catch (err) {
      error.value = 'Failed to update user data'
      throw err
    } finally {
      loading.value = false
    }
  }

  const uploadProfilePicture = async (userId: number, file: File) => {
    try {
      loading.value = true
      const formData = new FormData()
      formData.append('profile_picture', file)
      
      const response = await api.post(`/users/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      if (user.value) {
        user.value.profile_picture = response.data.profile_picture
      }
      
      return response.data
    } catch (err) {
      error.value = 'Failed to upload profile picture'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    fetchUserById,
    updateUser,
    uploadProfilePicture
  }
})