<template>
  <div class="min-h-screen flex flex-col">
  
    <!-- Main Content -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" class="h-full" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { getThemeClasses } from './themes/config'

const router = useRouter()
const route = useRoute()


// Theme and Dark Mode
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')
const currentTheme = ref(localStorage.getItem('theme') || 'modern')

// Compute if we're on the login page
const isLoginPage = computed(() => route.name === 'Login')

// Dark Mode Toggle
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('darkMode', isDarkMode.value)
  document.documentElement.classList.toggle('dark')
}

// Theme Change Handler
const handleThemeChange = (themeId) => {
  currentTheme.value = themeId
  localStorage.setItem('theme', themeId)
}

// Logout Handler
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('userId')
  router.push('/login')
}

// Initialize dark mode on mount
if (isDarkMode.value) {
  document.documentElement.classList.add('dark')
}
</script>

<style>
/* Base Styles */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  width:100%
}

body {
  @apply bg-gray-50 dark:bg-gray-900 transition-colors duration-300;
}

/* Make router view take full height */
.router-view-container {
  height: calc(100vh - 64px); /* Adjust 64px based on your nav height */
  overflow-y: auto;
}

/* Theme Transition */
.theme-transition * {
  transition: var(--theme-transition, none);
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Print Styles */
@media print {
  .dark {
    --tw-text-opacity: 1;
    color: rgb(17 24 39 / var(--tw-text-opacity));
    background-color: white;
  }
  
  nav,
  button[class*="darkMode"],
  .no-print {
    display: none !important;
  }
  
  .page-break {
    page-break-before: always;
  }
  
  @page {
    margin: 1.5cm;
  }
}

/* Utility Classes */
.backdrop-blur {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Focus Styles */
*:focus {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>