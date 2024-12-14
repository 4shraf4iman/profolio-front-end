import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../api'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const token = ref(localStorage.getItem('token'))

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  async function login(credentials) {
    try {
      const response = await api.post('/login', {
        login: credentials.email,
        password: credentials.password
      })

      // Store token and user data
      token.value = response.data.access_token
      user.value = response.data.user
      
      // Save to localStorage
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      // Update API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      return response.data
    } catch (error) {
      throw error
    }
  }

  function logout() {
    // Clear state
    user.value = null
    token.value = null
    
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Remove API header
    delete api.defaults.headers.common['Authorization']
  }

  // Initialize API header if token exists
  if (token.value) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  return {
    // State
    user,
    token,
    
    // Getters
    isAuthenticated,
    isAdmin,
    
    // Actions
    login,
    logout
  }
})