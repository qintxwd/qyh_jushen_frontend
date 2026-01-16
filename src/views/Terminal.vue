<template>
  <div class="terminal-page">
    <el-page-header @back="$router.back()" title="返回">
      <template #content>
        <span class="page-title">
          <SvgIcon name="monitor" :size="16" />
          系统终端
        </span>
      </template>
      <template #extra>
        <el-button @click="reconnect" size="small">
          <SvgIcon name="refreshright" :size="16" />
          重新连接
        </el-button>
      </template>
    </el-page-header>

    <div class="terminal-wrapper">
      <Terminal :key="terminalKey" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref } from 'vue'
import Terminal from '@/components/Terminal.vue'

const terminalKey = ref(0)

const reconnect = () => {
  terminalKey.value++
}
</script>

<style scoped>
.terminal-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f0f2f5;
}

.el-page-header {
  padding: 16px 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
}

.terminal-wrapper {
  flex: 1;
  margin: 20px;
  background-color: var(--color-bg-secondary, #1e1e1e);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
</style>
