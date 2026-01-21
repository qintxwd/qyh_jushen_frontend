<template>
  <div class="joint-status-overlay" :class="{ collapsed: isCollapsed }">
    <div class="overlay-header" @click="toggleCollapse">
      <span class="overlay-title">关节状态</span>
      <span v-if="!connected" class="disconnected-badge">未连接</span>
      <el-icon :class="{ rotated: isCollapsed }"><ArrowDown /></el-icon>
    </div>
    
    <div class="overlay-content" v-show="!isCollapsed">
      <div class="arm-row">
        <div class="arm-label left">左臂</div>
        <div class="joint-values">
          <span 
            v-for="(angle, i) in leftJoints" 
            :key="'l'+i"
            class="joint-chip"
            :class="{ active: Math.abs(angle) > 1 }"
          >
            {{ angle.toFixed(1) }}°
          </span>
        </div>
      </div>
      <div class="arm-row">
        <div class="arm-label right">右臂</div>
        <div class="joint-values">
          <span 
            v-for="(angle, i) in rightJoints" 
            :key="'r'+i"
            class="joint-chip"
            :class="{ active: Math.abs(angle) > 1 }"
          >
            {{ angle.toFixed(1) }}°
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useDataPlaneSingleton } from '@/composables/useDataPlane'

const isCollapsed = ref(false)
const connected = ref(false)

const dataPlane = useDataPlaneSingleton()
const { isAuthenticated, connect, subscribe, jointState } = dataPlane

// 关节角度 (弧度值，从后端获取)
const leftJoints = ref([0, 0, 0, 0, 0, 0, 0])
const rightJoints = ref([0, 0, 0, 0, 0, 0, 0])

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

// 弧度转角度
function radToDeg(rad: number): number {
  return rad * 180 / Math.PI
}

function updateFromJointState(state: any) {
  if (!state?.positions || state.positions.length === 0) {
    connected.value = false
    leftJoints.value = [0, 0, 0, 0, 0, 0, 0]
    rightJoints.value = [0, 0, 0, 0, 0, 0, 0]
    return
  }

  const names = Array.isArray(state.names) ? state.names.map((name: any) => String(name ?? '')) : []
  const positions = state.positions.map((pos: any) => Number(pos ?? 0))

  let left: number[] = []
  let right: number[] = []
  const unknown: number[] = []

  if (names.length) {
    for (let i = 0; i < names.length; i++) {
      const lower = names[i].toLowerCase()
      const pos = positions[i] ?? 0

      if (lower.includes('left') || lower.startsWith('l_') || lower.startsWith('l-')) {
        if (left.length < 7) left.push(pos)
        continue
      }
      if (lower.includes('right') || lower.startsWith('r_') || lower.startsWith('r-')) {
        if (right.length < 7) right.push(pos)
        continue
      }
      unknown.push(pos)
    }
  } else {
    unknown.push(...positions)
  }

  if (left.length === 0 && right.length === 0 && positions.length >= 14) {
    left = positions.slice(0, 7)
    right = positions.slice(7, 14)
  } else {
    for (const pos of unknown) {
      if (left.length < 7) {
        left.push(pos)
      } else if (right.length < 7) {
        right.push(pos)
      }
    }
  }

  while (left.length < 7) left.push(0)
  while (right.length < 7) right.push(0)

  leftJoints.value = left.map(radToDeg)
  rightJoints.value = right.map(radToDeg)
  connected.value = true
}

watch(isAuthenticated, (authed) => {
  if (!authed) return
  subscribe(['joint_state'])
}, { immediate: true })

watch(jointState, updateFromJointState, { deep: true, immediate: true })

onMounted(() => {
  connect()
})
</script>

<style scoped>
.joint-status-overlay {
  background-color: rgba(30, 30, 46, 0.7);
  border-radius: 8px;
  border: 1px solid rgba(60, 60, 60, 0.6);
  backdrop-filter: blur(12px);
  min-width: 320px;
  transition: all 0.2s;
}

.overlay-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #3c3c3c;
}

.joint-status-overlay.collapsed .overlay-header {
  border-bottom: none;
}

.overlay-title {
  font-size: 12px;
  font-weight: 500;
  color: #ccc;
}

.overlay-header .el-icon {
  color: #666;
  transition: transform 0.2s;
}

.overlay-header .el-icon.rotated {
  transform: rotate(-90deg);
}

.disconnected-badge {
  font-size: 10px;
  color: #f56c6c;
  background-color: rgba(245, 108, 108, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: 8px;
}

.overlay-content {
  padding: 8px 12px 12px;
}

.arm-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.arm-row:last-child {
  margin-bottom: 0;
}

.arm-label {
  font-size: 11px;
  font-weight: 600;
  min-width: 28px;
}

.arm-label.left {
  color: #409eff;
}

.arm-label.right {
  color: #67c23a;
}

.joint-values {
  display: flex;
  gap: 4px;
  flex: 1;
}

.joint-chip {
  font-size: 10px;
  font-family: 'Consolas', 'Monaco', monospace;
  padding: 2px 6px;
  background-color: var(--color-bg-tertiary, #2d2d2d);
  border-radius: 4px;
  color: var(--color-text-muted, #909399);
  min-width: 36px;
  text-align: center;
  transition: all 0.2s;
}

.joint-chip.active {
  background-color: #094771;
  color: #fff;
}
</style>
