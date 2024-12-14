<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">Sign in</h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">to access your resume</p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <div>
            <label class="text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-300">Password</label>
            <input 
              type="password" 
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
          </div>
        </div>
        <button 
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Add your login logic here
  console.log('Login attempt:', { email: email.value, password: password.value })
  // On successful login:
  router.push('/profile/user123')
}
</script>