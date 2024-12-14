<template>
    <div 
    class="min-h-screen transition-all duration-300"
    :style="{
      backgroundColor: currentTheme === 'modern' ? '#EFF6FF' : 
                      currentTheme === 'classic' ? '#ECFDF5' :
                      currentTheme === 'creative' ? '#FDF4FF' :
                      currentTheme === 'minimal' ? '#F9FAFB' : '#FFFFFF'
    }"
  >
      <!-- Header/Navigation -->
      <nav :class="[getThemeClasses(currentTheme, 'section'), 'sticky top-0 z-50 mb-6']">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex justify-between items-center">
            <span class="text-xl sm:text-2xl font-bold dark:text-white">
              <i class="fas fa-code mr-2"></i>Your Name
            </span>
            <div class="flex items-center gap-4">
              <ThemeSwitcher 
                @theme-change="handleThemeChange" 
                :currentTheme="currentTheme"
              />
              <button 
                @click="generatePDF"
                :class="[getThemeClasses(currentTheme, 'button'), 'px-4 py-2 rounded-lg flex items-center']"
              >
                <i class="fas fa-download mr-2"></i>
                <span v-if="!isGeneratingPDF">Download PDF</span>
                <span v-else>Generating...</span>
              </button>
              <button @click="toggleDarkMode" 
                      class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <i class="fas" :class="isDarkMode ? 'fa-sun' : 'fa-moon'"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Main Content -->
      <main class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Profile Section -->
        <section :class="[getThemeClasses(currentTheme, 'section'), 'mb-6']">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex-shrink-0">
              <img 
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                alt="Profile Photo" 
                class="w-full h-full rounded-full object-cover shadow-lg"
              >
            </div>
            <div class="text-center md:text-left">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Your Name
              </h1>
              <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mt-2">
                <i class="fas fa-laptop-code mr-2"></i>Senior Software Developer
              </p>
              <p class="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl">
                <i class="fas fa-quote-left mr-2 opacity-50"></i>
                Brief professional summary about yourself and your expertise in software development.
                <i class="fas fa-quote-right ml-2 opacity-50"></i>
              </p>
            </div>
          </div>
        </section>
  
        <!-- About Me Section -->
        <section :class="[getThemeClasses(currentTheme, 'section'), 'mb-6']">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            <i class="fas fa-user mr-3"></i>About Me
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            <i class="fas fa-info-circle mr-2"></i>
            I am a passionate software developer with over 5 years of experience in building web applications. 
            I enjoy solving complex problems and working on innovative projects.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div :class="getThemeClasses(currentTheme, 'card')">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <i class="fas fa-address-card mr-2"></i>Contact Information
              </h3>
              <ul class="space-y-3 text-gray-600 dark:text-gray-400">
                <li class="flex items-center">
                  <i class="fas fa-envelope w-6"></i>
                  <span class="ml-2 hover:text-blue-600 cursor-pointer">your.email@example.com</span>
                </li>
                <li class="flex items-center">
                  <i class="fas fa-phone w-6"></i>
                  <span class="ml-2">(123) 456-7890</span>
                </li>
                <li class="flex items-center">
                  <i class="fas fa-location-dot w-6"></i>
                  <span class="ml-2">City, Country</span>
                </li>
                <li class="flex items-center">
                  <i class="fas fa-globe w-6"></i>
                  <span class="ml-2">www.yourwebsite.com</span>
                </li>
              </ul>
            </div>
            <div :class="getThemeClasses(currentTheme, 'card')">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                <i class="fas fa-share-nodes mr-2"></i>Social Profiles
              </h3>
              <ul class="space-y-3 text-gray-600 dark:text-gray-400">
                <li class="flex items-center">
                  <i class="fab fa-linkedin w-6"></i>
                  <span class="ml-2 hover:text-blue-600 cursor-pointer">linkedin.com/in/yourprofile</span>
                </li>
                <li class="flex items-center">
                  <i class="fab fa-github w-6"></i>
                  <span class="ml-2 hover:text-blue-600 cursor-pointer">github.com/yourusername</span>
                </li>
                <li class="flex items-center">
                  <i class="fab fa-twitter w-6"></i>
                  <span class="ml-2 hover:text-blue-600 cursor-pointer">twitter.com/yourhandle</span>
                </li>
                <li class="flex items-center">
                  <i class="fab fa-medium w-6"></i>
                  <span class="ml-2 hover:text-blue-600 cursor-pointer">medium.com/@yourprofile</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- Skills Section -->
        <section :class="[getThemeClasses(currentTheme, 'section'), 'mb-6']">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            <i class="fas fa-tools mr-3"></i>Skills
          </h2>
          <div class="flex flex-wrap gap-3">
            <span v-for="(skill, index) in skills" 
                  :key="index"
                  :class="[getThemeClasses(currentTheme, 'tag'), 
                          'px-4 py-2 rounded-full text-sm font-medium']">
              <i class="fas fa-check-circle mr-2"></i>
              {{ skill }}
            </span>
          </div>
        </section>
  
        <!-- Experience and Education Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Experience Section -->
          <section :class="[getThemeClasses(currentTheme, 'section')]">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              <i class="fas fa-briefcase mr-3"></i>Experience
            </h2>
            <div :class="[getThemeClasses(currentTheme, 'timeline'), 'pl-4 space-y-6']">
              <div v-for="(job, index) in experience" 
                   :key="index"
                   :class="getThemeClasses(currentTheme, 'card')">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ job.title }}
                  <span v-if="index === 0" 
                        :class="[getThemeClasses(currentTheme, 'tag'), 
                                'text-sm ml-2 px-2 py-1 rounded']">
                    Current
                  </span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-2">
                  {{ job.company }} | {{ job.period }}
                </p>
                <ul class="space-y-2">
                  <li v-for="(responsibility, idx) in job.responsibilities" 
                      :key="idx"
                      class="flex items-start text-gray-600 dark:text-gray-400">
                    <i class="fas fa-angle-right mt-1.5 mr-2"></i>
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </div>
          </section>
  
          <!-- Education Section -->
          <section :class="[getThemeClasses(currentTheme, 'section')]">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              <i class="fas fa-graduation-cap mr-3"></i>Education
            </h2>
            <div :class="[getThemeClasses(currentTheme, 'timeline'), 'pl-4 space-y-6']">
              <div v-for="(edu, index) in education" 
                   :key="index"
                   :class="getThemeClasses(currentTheme, 'card')">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ edu.degree }}
                  <span v-if="index === 0" 
                        :class="[getThemeClasses(currentTheme, 'tag'), 
                                'text-sm ml-2 px-2 py-1 rounded']">
                    Latest
                  </span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-2">
                  {{ edu.school }} | {{ edu.year }}
                </p>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ edu.description }}
                </p>
              </div>
            </div>
          </section>
        </div>
  
        <!-- Awards & Certifications Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <!-- Awards Section -->
          <section :class="[getThemeClasses(currentTheme, 'section')]">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              <i class="fas fa-trophy mr-3"></i>Awards
            </h2>
            <div :class="[getThemeClasses(currentTheme, 'timeline'), 'pl-4 space-y-6']">
              <div v-for="(award, index) in awards" 
                   :key="index"
                   :class="getThemeClasses(currentTheme, 'card')">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ award.title }}
                  <span v-if="award.featured" 
                        :class="[getThemeClasses(currentTheme, 'tag'), 
                                'text-sm ml-2 px-2 py-1 rounded']">
                    Featured
                  </span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-2">{{ award.date }}</p>
                <p class="text-gray-600 dark:text-gray-400">{{ award.description }}</p>
              </div>
            </div>
          </section>
  
          <!-- Certifications Section -->
          <section :class="[getThemeClasses(currentTheme, 'section')]">
            <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              <i class="fas fa-certificate mr-3"></i>Certifications
            </h2>
            <div :class="[getThemeClasses(currentTheme, 'timeline'), 'pl-4 space-y-6']">
              <div v-for="(cert, index) in certifications" 
                   :key="index"
                   :class="getThemeClasses(currentTheme, 'card')">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ cert.title }}
                  <span v-if="cert.status === 'active'" 
                        :class="[getThemeClasses(currentTheme, 'tag'), 
                                'text-sm ml-2 px-2 py-1 rounded']">
                    Active
                  </span>
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-2">
                  {{ cert.issuer }} | {{ cert.date }}
                </p>
                <p class="text-gray-600 dark:text-gray-400 mb-4">{{ cert.description }}</p>
                <a v-if="cert.credentialUrl" 
                   :href="cert.credentialUrl" 
                   target="_blank"
                   :class="[getThemeClasses(currentTheme, 'button'), 
                           'inline-flex items-center px-4 py-2 rounded-lg']">
                  <i class="fas fa-external-link mr-2"></i>Verify
                </a>
              </div>
            </div>
          </section>
        </div>
  
        <!-- References Section -->
        <section :class="[getThemeClasses(currentTheme, 'section'), 'mt-6']">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            <i class="fas fa-users mr-3"></i>References
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(ref, index) in references" 
                 :key="index" 
                 :class="getThemeClasses(currentTheme, 'card')">
              <div class="flex items-center mb-4">
                <img :src="ref.avatar" 
                     :alt="ref.name"
                     @error="handleImageError"
                     loading="lazy"
                     class="w-12 h-12 rounded-full mr-4 object-cover">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ ref.name }}
                  </h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ ref.position }}
                  </p>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                {{ ref.company }}
              </p>
              <div class="space-y-2">
                <div class="flex items-center text-gray-500 dark:text-gray-400">
                  <i class="fas fa-envelope mr-2"></i>
                  <span class="hover:text-blue-600 cursor-pointer"
                        @click="sendEmail(ref.email)">
                    {{ ref.email }}
                  </span>
                </div>
                <div class="flex items-center text-gray-500 dark:text-gray-400">
                  <i class="fas fa-phone mr-2"></i>
                  <span class="hover:text-blue-600 cursor-pointer"
                        @click="callPhone(ref.phone)">
                    {{ ref.phone }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import ThemeSwitcher from '../components/ThemeSwitcher.vue'
  import { getThemeClasses } from '../themes/config'
  import html2pdf from 'html2pdf.js'
  
  const isDarkMode = ref(false)
  const isGeneratingPDF = ref(false)
  const currentTheme = ref('modern')
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark')
  }
  
  const handleThemeChange = (themeId) => {
    currentTheme.value = themeId
  }
  
  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`
  }
  
  const callPhone = (phone) => {
    window.location.href = `tel:${phone}`
  }
  
  const handleImageError = (e) => {
    e.target.src = '/default-avatar.png'
  }
  
  const generatePDF = async () => {
    try {
      isGeneratingPDF.value = true
      const element = document.querySelector('main')
      const opt = {
        margin: 10,
        filename: `resume_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      await html2pdf().set(opt).from(element).save()
    } catch (error) {
      console.error('PDF generation failed:', error)
    } finally {
      isGeneratingPDF.value = false
    }
  }
  
  // Theme transition effect
  watch(currentTheme, () => {
    document.documentElement.style.setProperty('--theme-transition', 'all 0.3s ease-in-out')
    setTimeout(() => {
      document.documentElement.style.removeProperty('--theme-transition')
    }, 300)
  })
  
  // Your existing data
  const experience = ref([
    {
      title: 'Senior Software Developer',
      company: 'Tech Company',
      period: '2020 - Present',
      responsibilities: [
        'Led development of key features for main product',
        'Managed team of 5 developers',
        'Implemented CI/CD pipeline',
        'Optimized application performance by 40%'
      ]
    },
    {
      title: 'Software Developer',
      company: 'Tech Startup',
      period: '2018 - 2020',
      responsibilities: [
        'Developed full-stack applications using Vue.js and Node.js',
        'Implemented responsive designs and UI components',
        'Collaborated with UX team for better user experience'
      ]
    }
  ])
  
  const skills = ref([
    'Vue.js',
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Node.js',
    'Git',
    'REST APIs',
    'SQL',
    'MongoDB',
    'Docker',
    'AWS'
  ])
  
  const education = ref([
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University Name',
      year: '2016 - 2020',
      description: 'Specialized in Software Engineering with focus on web technologies and distributed systems. Graduated with honors.',
      achievements: true
    },
    {
      degree: 'Full Stack Development Certification',
      school: 'Tech Academy',
      year: '2018',
      description: 'Intensive program covering modern web development technologies including Vue.js, Node.js, and cloud services.',
      achievements: false
    }
  ])
  
  const awards = ref([
    {
      title: 'Innovation Award',
      date: 'December 2022',
      description: 'Recognized for developing an innovative solution that improved system performance by 200%.',
      featured: true
    },
    {
      title: 'Best Team Lead',
      date: 'June 2021',
      description: 'Awarded for exceptional leadership and team management skills.',
      featured: false
    }
  ])
  
  const certifications = ref([
    {
      title: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Jan 2023',
      description: 'Professional level certification for AWS architecture and solutions design.',
      status: 'active',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      title: 'Google Cloud Professional Developer',
      issuer: 'Google',
      date: 'Mar 2022',
      description: 'Advanced certification for cloud application development.',
      status: 'active',
      credentialUrl: 'https://google.com/verification'
    }
  ])
  
  const references = ref([
    {
      name: 'John Doe',
      position: 'Technical Director',
      company: 'Tech Solutions Inc.',
      email: 'john.doe@techsolutions.com',
      phone: '+1 (555) 123-4567',
      avatar: 'path/to/john-avatar.jpg'
    },
    {
      name: 'Jane Smith',
      position: 'Senior Project Manager',
      company: 'Digital Innovations Ltd.',
      email: 'jane.smith@digital.com',
      phone: '+1 (555) 987-6543',
      avatar: 'path/to/jane-avatar.jpg'
    },
    {
      name: 'Mike Johnson',
      position: 'CTO',
      company: 'Future Systems',
      email: 'mike.j@futuresystems.com',
      phone: '+1 (555) 456-7890',
      avatar: 'path/to/mike-avatar.jpg'
    }
  ])
  </script>
  
  <style>
  html {
    scroll-behavior: smooth;
  }
  
  .theme-transition * {
    transition: var(--theme-transition, none);
  }
  
  @media print {
    .dark {
      --tw-text-opacity: 1;
      color: rgb(17 24 39 / var(--tw-text-opacity));
      background-color: white;
    }
    
    button[class*="darkMode"] {
      display: none;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    @page {
      margin: 1.5cm;
    }
  }
  </style>