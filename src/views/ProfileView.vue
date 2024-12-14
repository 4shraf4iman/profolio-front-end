<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h1>
        
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
          <!-- Personal Information -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="text-gray-700 dark:text-gray-300">Full Name</label>
                <input 
                  type="text" 
                  v-model="profile.fullName"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
              </div>
              <div>
                <label class="text-gray-700 dark:text-gray-300">Job Title</label>
                <input 
                  type="text" 
                  v-model="profile.jobTitle"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
              </div>
              <!-- Add more fields as needed -->
            </div>
          </div>
  
          <!-- Theme Settings -->
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Theme Settings</h2>
            <div class="space-y-4">
              <div>
                <label class="text-gray-700 dark:text-gray-300">Resume Theme</label>
                <select 
                  v-model="profile.theme"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option v-for="theme in availableThemes" :key="theme" :value="theme">
                    {{ theme.charAt(0).toUpperCase() + theme.slice(1) }}
                  </option>
                </select>
              </div>
            </div>
          </div>
  
          <!-- Save Button -->
          <div class="flex justify-end">
            <button 
              @click="saveSettings"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getAvailableThemes } from '../themes/config'
  
  const router = useRouter()
  const availableThemes = getAvailableThemes()
  
  const profile = ref({
    fullName: 'John Doe',
    jobTitle: 'Senior Software Developer',
    theme: 'modern'
  })
  
  const saveSettings = () => {
    // Add your save logic here
    console.log('Saving settings:', profile.value)
    // Redirect to profile page after saving
    router.push('/profile/user123')
  }
  </script>