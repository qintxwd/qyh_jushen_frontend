<template>
  <router-view />
  <AuthGuard v-if="isLoggedIn" />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthGuard from '@/components/AuthGuard.vue'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

// 初始化时应用主题
onMounted(() => {
  const saved = localStorage.getItem('app_settings')
  let darkMode = true // 默认暗色
  
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      darkMode = parsed.darkMode ?? true
    } catch (e) {
      console.error('Failed to load theme settings:', e)
    }
  }
  
  // 应用主题
  if (darkMode) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  } else {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 使用 CSS 变量，自动跟随主题 */
body {
  background-color: var(--color-bg-primary, #1a1a1a);
  color: var(--color-text-primary, #e0e0e0);
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
