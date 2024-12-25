<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Add a subtle gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 -z-10"></div>

    <!-- Top Navigation Bar with animation -->
    <nav class="bg-white/80 dark:bg-gray-800/80 shadow backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
          </div>
          
          <div class="flex items-center gap-4">
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

    <!-- Tabs Navigation with smooth sliding indicator -->
    <div class="mb-4 pl-8 pr-8 border-b border-gray-200 dark:border-gray-700 relative">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center relative">
        <li v-for="tab in tabs" :key="tab.id" class="mr-2">
          <button 
            @click="currentTab = tab.id"
            class="inline-block p-4 rounded-t-lg relative transition-all duration-300 ease-in-out"
            :class="[
              currentTab === tab.id
                ? 'text-blue-600 dark:text-blue-500'
                : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
            ]"
          >
            {{ tab.name }}
            <!-- Animated underline -->
            <div
              v-if="currentTab === tab.id"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-500"
              style="transform-origin: left center"
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="transform scale-x-0"
              enter-to-class="transform scale-x-100"
            ></div>
          </button>
        </li>
      </ul>
    </div>

    <!-- Main Content with tab transitions -->
    <main class="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <TransitionGroup
        name="fade-slide"
        mode="out-in"
      >
        <div v-if="error" key="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-shake" role="alert">
          <span class="block sm:inline">{{ error }}</span>
        </div>
        
        <div v-if="loading" key="loading" class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        
        <div v-else key="content" class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
          <!-- Tab Panels with transitions -->
          <TransitionGroup
            name="fade"
            mode="out-in"
          >
            <!-- Each tab content -->
            <div v-show="currentTab === 'personal'" key="personal" class="space-y-6">
              <form @submit.prevent="handleSubmit">
                <!-- Profile Picture Upload -->
                <div class="flex flex-col items-center space-y-4">        
                  <!-- Hidden file input -->
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleImageChange"
                    accept="image/*"
                    class="hidden"
                  >
                  
                  <!-- Image container -->
                  <div 
                    class="h-24 w-24 rounded-full overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity"
                    @click="$refs.fileInput.click()"
                  >
                    <img 
                      :src="previewImage || userProfile.profile_picture || ''"
                      alt="Profile preview"
                      class="h-full w-full object-cover"
                    >
                  </div>
                  
                  <!-- Change image text below -->
                  <button
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-10"
                  >
                    Change Image
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                  
                  <!-- Left Column -->
                  <div class="space-y-6">
                  
                    <!-- Name Fields Row -->
                    <div class="grid grid-cols-2 gap-4">
                      <!-- First Name Input -->
                      <div>
                        <label for="first_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          First Name
                        </label>
                        <input
                          id="first_name"
                          v-model="userProfile.first_name"
                          type="text"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                      </div>

                      <!-- Last Name Input -->
                      <div>
                        <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Last Name
                        </label>
                        <input
                          id="last_name"
                          v-model="userProfile.last_name"
                          type="text"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                      </div>
                    </div>

                    <!-- Email and Phone Row -->
                    <div class="grid grid-cols-2 gap-4">
                      <!-- Email Input -->
                      <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          id="email"
                          v-model="userProfile.email"
                          type="email"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                      </div>

                      <!-- Phone Input -->
                      <div>
                        <label for="phone_number" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <input
                          id="phone_number"
                          v-model="userProfile.phone_number"
                          type="number"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                      </div>
                    </div>

                    <!-- Address Input -->
                    <div>
                      <label for="address" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address
                      </label>
                      <textarea
                        id="address"
                        v-model="userProfile.address"
                        rows="3"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      ></textarea>
                    </div>

                    <!-- Social Media Section -->
                    <div class="grid grid-cols-2 gap-4">
                      <h3 class="text-lg font-medium text-gray-900 dark:text-white col-span-2">Social Media Links</h3>
                      
                      <!-- Left Column -->
                      <div>
                        <!-- Instagram URL -->
                        <div class="relative">
                          <label for="insta_url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Instagram Profile
                          </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                              <i class="fab fa-instagram"></i>
                            </span>
                            <input
                              id="insta_url"
                              v-model="userProfile.insta_url"
                              type="url"
                              class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="https://instagram.com/username"
                            >
                          </div>
                        </div>

                        <!-- Facebook URL -->
                        <div class="relative mt-4">
                          <label for="fb_url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Facebook Profile
                          </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                              <i class="fab fa-facebook"></i>
                            </span>
                            <input
                              id="fb_url"
                              v-model="userProfile.fb_url"
                              type="url"
                              class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="https://facebook.com/username"
                            >
                          </div>
                        </div>
                      </div>

                      <!-- Right Column -->
                      <div>
                        <!-- LinkedIn URL -->
                        <div class="relative">
                          <label for="linkedin_url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            LinkedIn Profile
                          </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                              <i class="fab fa-linkedin"></i>
                            </span>
                            <input
                              id="linkedin_url"
                              v-model="userProfile.linkedin_url"
                              type="url"
                              class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="https://linkedin.com/in/username"
                            >
                          </div>
                        </div>

                        <!-- GitHub URL -->
                        <div class="relative mt-4">
                          <label for="github_url" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GitHub Profile
                          </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                            <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                              <i class="fab fa-github"></i>
                            </span>
                            <input
                              id="github_url"
                              v-model="userProfile.github_url"
                              type="url"
                              class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="https://github.com/username"
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right Column -->
                  <div class="space-y-6">
                    <!-- Job Position Input -->
                    <div>
                      <label for="job_position" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Job Position
                      </label>
                      <input
                        id="job_position"
                        v-model="userProfile.job_position"
                        type="text"
                        required
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                    </div>

                    <!-- About Me Input -->
                    <div>
                      <label for="about" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        About Me
                      </label>
                      <textarea
                        id="about"
                        v-model="userProfile.about"
                        rows="7"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end mt-6">
                  <button
                    type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    :disabled="loading"
                  >
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                  </button>
                </div>
              </form>
            </div>

            <div v-show="currentTab === 'skills'" key="skills" class="space-y-6">
              <h2 class="text-xl font-bold">Skills</h2>
              
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                  <tr v-for="(skill, index) in userSkill" :key="skill.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        v-model="skill.skill"
                        type="text"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter skill name"
                      />
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <textarea
                        v-model="skill.description"
                        rows="2"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter description"
                      ></textarea>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input
                        v-model="skill.status"
                        type="text"
                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter status"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Experience Tab -->
            <div v-show="currentTab === 'experience'" key="experience" class="space-y-6">
              <h2 class="text-xl font-bold">Job Experience</h2>
              <!-- Add experience content here -->
            </div>

            <!-- Education Tab -->
            <div v-show="currentTab === 'education'" key="education" class="space-y-6">
              <h2 class="text-xl font-bold">Education Background</h2>
              <!-- Add education content here -->
            </div>

            <!-- Awards Tab -->
            <div v-show="currentTab === 'awards'" key="awards" class="space-y-6">
              <h2 class="text-xl font-bold">Awards</h2>
              <!-- Add awards content here -->
            </div>

            <!-- Certifications Tab -->
            <div v-show="currentTab === 'certifications'" key="certifications" class="space-y-6">
              <h2 class="text-xl font-bold">Certifications</h2>
              <!-- Add certifications content here -->
            </div>

            <!-- References Tab -->
            <div v-show="currentTab === 'references'" key="references" class="space-y-6">
              <h2 class="text-xl font-bold">References</h2>
              <!-- Add references content here -->
            </div>

            <!-- Languages Tab -->
            <div v-show="currentTab === 'languages'" key="languages" class="space-y-6">
              <h2 class="text-xl font-bold">Languages</h2>
              <!-- Add languages content here -->
            </div>
          </TransitionGroup>
        </div>
      </TransitionGroup>
    </main>
  </div>
</template>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fade-slide transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Shake animation for error */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Hover effects for form inputs */
input, textarea {
  transition: all 0.3s ease;
}

input:hover, textarea:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* Card hover effect */
.hover-card {
  transition: transform 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-2px);
}

/* Button animations */
button {
  transition: all 0.3s ease;
}

button:active {
  transform: scale(0.95);
}

/* Profile picture hover effect */
.profile-picture-container {
  transition: all 0.3s ease;
}

.profile-picture-container:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.input-field {
  @apply block w-full rounded-md border-gray-300 shadow-sm 
         focus:border-blue-500 focus:ring-blue-500 
         dark:bg-gray-700 dark:border-gray-600 dark:text-white
         transition-all duration-300;
}

.input-field:hover {
  @apply border-blue-400;
}

.social-input-group {
  @apply relative;
}

.social-input-group i {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2;
}

/* Card hover effects */
.bg-white {
  @apply transition-all duration-300;
}

.bg-white:hover {
  @apply shadow-md;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUserStore } from '../stores/user'
import { useSkillStore } from '@/stores/skill'

const router = useRouter()
const auth = useAuthStore()
const userStore = useUserStore()
const skillStore = useSkillStore()
const previewImage = ref(null)
const loading = ref(false)
const error = ref(null)
const currentTab = ref('personal')

const userProfile = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  profile_picture: '',
  job_position: '',
  about: '',
  address: '',
  insta_url: '',
  fb_url: '',
  linkedin_url: '',
  github_url: ''
})

const userSkill = ref([])

const tabs = [
  { id: 'personal', name: 'Personal Details' },
  { id: 'skills', name: 'Skills' },
  { id: 'experience', name: 'Experience' },
  { id: 'education', name: 'Education' },
  { id: 'awards', name: 'Awards' },
  { id: 'certifications', name: 'Certifications' },
  { id: 'references', name: 'References' },
  { id: 'languages', name: 'Languages' }
]

const handleImageChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)

    // Upload file
    try {
      const response = await userStore.uploadProfilePicture(auth.user.id, file)
      // Update the profile picture URL in userProfile
      userProfile.value.profile_picture = response.profile_picture
    } catch (err) {
      console.error('Failed to upload profile picture:', err)
    }
  }
}

const handleSubmit = async () => {
  try {
    await userStore.updateUser(auth.user.id, userProfile.value)
    // Show success message or redirect
  } catch (err) {
    console.error('Profile save error:', err)
  }
}

const handleLogout = async () => {
  try {
    await auth.logout()
    router.push('/login')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

onMounted(async () => {
  loading.value = true
  error.value = null
  
  try {
    if (!auth.user?.id) {
      throw new Error('No user ID found')
    }
    
    const userData = await userStore.fetchUserById(auth.user.id)
    const skillData = await skillStore.fetchSkillByUserId(auth.user.id)
    console.log(skillData);
    console.log('Fetched user data:', userData)
    
    userProfile.value = {
      first_name: userData.user.first_name,
      last_name: userData.user.last_name,
      job_position: userData.user.job_position,
      email: userData.user.email,
      phone_number: userData.user.phone_number,
      profile_picture: userData.user.profile_picture || '',
      about: userData.user.about_me || '',
      address: userData.user.address || '',
      insta_url: userData.user.insta_url || '',
      fb_url: userData.user.fb_url || '',
      linkedin_url: userData.user.linkedin_url || '',
      github_url: userData.user.github_url || ''
    },

    userSkill.value = skillData.data.map(skill => ({
      id: skill.id,
      skill: skill.skill || 'N/A', // Default to 'N/A' if skill is null
      description: skill.description || 'N/A', // Default to 'N/A' if description is null
      image: skill.image,
      skillLevel: skill.skill_level || 'N/A', // Default to 'N/A' if skill_level is null
      status: skill.status,
      createdAt: skill.created_at,
      updatedAt: skill.updated_at
    }))
  } catch (err) {
    console.error('Profile loading error:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
})

// Add smooth scroll behavior when switching tabs
</script>