<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
    >
      <i class="fas fa-palette mr-2"></i>
      Theme
    </button>

    <div v-if="isOpen" 
         class="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50">
      <div class="space-y-4">
        <div v-for="theme in themes" 
             :key="theme.id"
             @click="selectTheme(theme.id)"
             class="cursor-pointer p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
             :class="{ 'ring-2 ring-blue-500': currentTheme === theme.id }"
        >
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-lg overflow-hidden mr-3 bg-gradient-to-br"
                 :class="theme.previewClass">
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">{{ theme.name }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ theme.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  currentTheme: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['theme-change'])

const isOpen = ref(false)

const themes = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and minimalist design with bold accents',
    previewClass: 'from-blue-100 to-blue-200'
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional layout with sophisticated styling',
    previewClass: 'from-emerald-100 to-emerald-200'
  },
  {
    id: 'creative',
    name: 'Creative Tech',
    description: 'Dynamic design for tech professionals',
    previewClass: 'from-purple-100 to-pink-200'
  },
  {
    id: 'minimal',
    name: 'Minimal Focus',
    description: 'Ultra-clean design emphasizing content',
    previewClass: 'from-gray-100 to-gray-200'
  }
]

const selectTheme = (themeId) => {
  emit('theme-change', themeId)
  isOpen.value = false
}
</script>