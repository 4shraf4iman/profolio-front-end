<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mt-4">Page not found</p>
        <router-link 
          to="/" 
          class="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </router-link>
      </div>
    </div>
  </template>