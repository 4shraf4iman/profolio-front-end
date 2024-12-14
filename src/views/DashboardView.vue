<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Top Navigation Bar -->
      <nav class="bg-white dark:bg-gray-800 shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            
            <div class="flex items-center gap-4">
              <span class="text-gray-700 dark:text-gray-300">
                Welcome, {{ auth.user?.first_name }}!
              </span>
              <button 
                @click="handleLogout"
                class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <!-- You can add an icon here -->
                  <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span class="text-blue-600 dark:text-blue-200">📊</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Total Projects
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                        12
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <span class="text-green-600 dark:text-green-200">✓</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Completed Tasks
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                        25
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <span class="text-purple-600 dark:text-purple-200">🔄</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      In Progress
                    </dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                        8
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div class="p-6">
            <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
            <div v-else-if="error" class="text-center text-red-500">
              {{ error }}
            </div>
            <ul v-else class="divide-y divide-gray-200 dark:divide-gray-700">
              <li v-for="activity in recentActivities" :key="activity.id" class="py-4">
                <div class="flex space-x-3">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {{ activity.title }}
                    </p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ activity.description }}
                    </p>
                  </div>
                  <time class="text-sm text-gray-500 dark:text-gray-400">
                    {{ activity.time }}
                  </time>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const router = useRouter()
  const auth = useAuthStore()
  const loading = ref(false)
  const error = ref('')
  
  // Sample data - replace with actual API calls
  const recentActivities = ref([
    {
      id: 1,
      title: 'Project Updated',
      description: 'Updated the project documentation',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'New Task Added',
      description: 'Created a new task for the development team',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'Meeting Scheduled',
      description: 'Team meeting scheduled for tomorrow',
      time: '5 hours ago'
    }
  ])
  
  const handleLogout = async () => {
    try {
      await auth.logout()
      router.push('/login')
    } catch (err) {
      console.error('Logout error:', err)
    }
  }
  
  // You can add API calls here to fetch real data
  onMounted(async () => {
    try {
      loading.value = true
      // Add your API calls here
      // Example: const data = await api.get('/dashboard-stats')
    } catch (err) {
      error.value = 'Failed to load dashboard data'
      console.error('Dashboard loading error:', err)
    } finally {
      loading.value = false
    }
  })
  </script>