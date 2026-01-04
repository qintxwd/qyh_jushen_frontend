import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    name: 'Workspace',
    component: () => import('@/views/Workspace.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/monitor',
    name: 'Monitor3D',
    component: () => import('@/views/Monitor3D.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/task-editor',
    name: 'TaskEditor',
    component: () => import('@/views/TaskEditor.vue'),
    meta: { requiresAuth: true, requiresOperator: true }
  },
  {
    path: '/terminal',
    name: 'Terminal',
    component: () => import('@/views/Terminal.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/ros-gui',
    name: 'RosGUI',
    component: () => import('@/views/RosGUI.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/lift-control',
    name: 'LiftControl',
    component: () => import('@/views/LiftControl.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
  } else if (to.meta.requiresOperator && !authStore.isOperator) {
    next('/')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/')
  } else {
    next()
  }
})

export default router
