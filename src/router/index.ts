import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ResumeView.vue'
import { useAuthStore } from '../stores/auth' // We'll create this next

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      name: '',
      component: HomeView,
    },
    {
      path: '/profile/user123',
      name: 'profile',
      component: ProfileView,
    },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('../views/RegisterView.vue'),
    //   meta: { requiresGuest: true }
    // },
    // {
    //   path: '/forgot-password',
    //   name: 'forgot-password',
    //   component: () => import('../views/ForgotPasswordView.vue'),
    //   meta: { requiresGuest: true }
    // },
    // {
    //   path: '/reset-password/:token',
    //   name: 'reset-password',
    //   component: () => import('../views/ResetPasswordView.vue'),
    //   meta: { requiresGuest: true }
    // },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/admin/dashboard',
    //   name: 'admin-dashboard',
    //   component: () => import('../views/admin/DashboardView.vue'),
    //   meta: { requiresAuth: true, requiresAdmin: true }
    // }
  ]
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login') 
  } else if (to.meta.requiresGuest && auth.isAuthenticated) {
    next('/dashboard')
  } else if (to.meta.requiresAdmin && auth.user?.role !== 'admin') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router