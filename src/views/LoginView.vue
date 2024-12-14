<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 flex items-center">
    <div class="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Please sign in to your account</p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 space-y-6 border border-gray-100 dark:border-gray-700">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Input -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Email Address</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </span>
              <input 
                type="email" 
                v-model="loginForm.email"
                :disabled="loading"
                class="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
                required
              >
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">Password</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </span>
              <input 
                type="password" 
                v-model="loginForm.password"
                :disabled="loading"
                class="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
                required
              >
            </div>
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
              <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
            </div>
            <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Forgot password?</a>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">{{ error }}</p>
          </div>

          <!-- Login Button -->
          <button 
            type="submit"
            :disabled="loading"
            class="w-full px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign in</span>
          </button>

          <!-- Sign Up Link -->
          <p class="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Don't have an account? 
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore();

const router = useRouter()
const error = ref('')
const loading = ref(false)
const loginForm = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''
    
    const response = await authStore.login(loginForm.value)
    console.log('Login successful:', response)
    
    // Redirect based on user role
    if (response.user.role === 'admin') {
      router.push('/admin/dashboard')
    } else {
      router.push('/dashboard')
    }
    
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || 'Failed to login. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>