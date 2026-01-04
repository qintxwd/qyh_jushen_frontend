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

  // 检查是否需要认证
  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      // 未登录，跳转到登录页
      next('/login')
      return
    }
    
    // 检查权限
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
      next('/')
      return
    }
    
    if (to.meta.requiresOperator && !authStore.isOperator) {
      next('/')
      return
    }
    
    // 如果已登录但心跳未启动，启动心跳
    if (!authStore.heartbeatTimer) {
      authStore.startHeartbeat()
    }
  }
  
  // 如果已登录用户访问登录页，重定向到首页
  if (to.path === '/login' && authStore.isLoggedIn) {
    next('/')
    return
  }
  
  next()
})

export default router
