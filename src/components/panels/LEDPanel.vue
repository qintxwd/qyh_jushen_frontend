<template>
  <div class="led-panel">
    <!-- 状态指示 -->
    <div class="status-row">
      <span class="status-label">LED状态</span>
      <span class="badge" :class="ledState.is_blinking ? 'warning' : 'success'">
        {{ ledState.is_blinking ? '闪烁中' : '纯色' }}
      </span>
      <div 
        class="color-preview" 
        :style="{ backgroundColor: currentColorCss }"
        :title="`R:${currentColor.r} G:${currentColor.g} B:${currentColor.b} W:${currentColor.w}`"
      ></div>
    </div>

    <!-- 预设颜色快捷按钮 -->
    <div class="section">
      <div class="section-title">快捷颜色</div>
      <div class="preset-colors">
        <button 
          v-for="(color, name) in presetColors" 
          :key="name"
          class="color-btn"
          :style="{ backgroundColor: rgbwToCss(color) }"
          :title="name"
          @click="setPresetColor(name)"
          :disabled="loading"
        >
          <span v-if="name === 'off'" class="off-icon">✕</span>
        </button>
      </div>
    </div>

    <!-- 自定义颜色 -->
    <div class="section">
      <div class="section-title">自定义颜色</div>
      <div class="color-sliders">
        <div class="slider-row">
          <span class="slider-label" style="color: #ff4444">R</span>
          <el-slider v-model="customColor.r" :min="0" :max="255" :show-tooltip="true" />
          <span class="slider-value">{{ customColor.r }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label" style="color: #44ff44">G</span>
          <el-slider v-model="customColor.g" :min="0" :max="255" :show-tooltip="true" />
          <span class="slider-value">{{ customColor.g }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label" style="color: #4444ff">B</span>
          <el-slider v-model="customColor.b" :min="0" :max="255" :show-tooltip="true" />
          <span class="slider-value">{{ customColor.b }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label" style="color: #ffffff">W</span>
          <el-slider v-model="customColor.w" :min="0" :max="255" :show-tooltip="true" />
          <span class="slider-value">{{ customColor.w }}</span>
        </div>
      </div>
      <div class="custom-preview-row">
        <div 
          class="custom-preview" 
          :style="{ backgroundColor: rgbwToCss(customColor) }"
        ></div>
        <el-button type="primary" @click="applyCustomColor" :loading="loading" size="small">
          应用颜色
        </el-button>
      </div>
    </div>

    <!-- 闪烁模式 -->
    <div class="section">
      <div class="section-title">闪烁模式</div>
      <div class="blink-modes">
        <el-button 
          v-for="(mode, name) in blinkModes" 
          :key="name"
          :type="getBlinkButtonType(name)"
          size="small"
          @click="setBlinkMode(name)"
          :loading="loading"
        >
          {{ blinkModeNames[name] || name }}
        </el-button>
      </div>
    </div>

    <!-- 自定义闪烁 -->
    <div class="section">
      <div class="section-title">自定义闪烁</div>
      <div class="custom-blink">
        <div class="blink-colors">
          <div 
            v-for="(color, index) in blinkColors" 
            :key="index" 
            class="blink-color-item"
          >
            <div 
              class="blink-color-preview" 
              :style="{ backgroundColor: rgbwToCss(color) }"
              @click="editBlinkColor(index)"
            ></div>
            <el-button 
              type="danger" 
              size="small" 
              circle 
              @click="removeBlinkColor(index)"
              :disabled="blinkColors.length <= 1"
            >
              <SvgIcon name="close" :size="10" />
            </el-button>
          </div>
          <el-button 
            type="primary" 
            size="small" 
            circle 
            @click="addBlinkColor"
            :disabled="blinkColors.length >= 8"
          >
            <SvgIcon name="plus" :size="12" />
          </el-button>
        </div>
        <div class="blink-interval">
          <span>间隔:</span>
          <el-input-number 
            v-model="blinkInterval" 
            :min="50" 
            :max="5000" 
            :step="50"
            size="small"
          />
          <span>ms</span>
        </div>
        <div class="blink-actions">
          <el-button type="success" @click="startCustomBlink" :loading="loading" size="small">
            开始闪烁
          </el-button>
          <el-button type="danger" @click="stopBlink" :loading="loading" size="small">
            停止
          </el-button>
        </div>
      </div>
    </div>

    <!-- 颜色编辑对话框 -->
    <el-dialog v-model="colorDialogVisible" title="编辑颜色" width="300px">
      <div class="color-edit-dialog">
        <div class="slider-row">
          <span class="slider-label" style="color: #ff4444">R</span>
          <el-slider v-model="editingColor.r" :min="0" :max="255" />
          <span class="slider-value">{{ editingColor.r }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label" style="color: #44ff44">G</span>
          <el-slider v-model="editingColor.g" :min="0" :max="255" />
          <span class="slider-value">{{ editingColor.g }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label" style="color: #4444ff">B</span>
          <el-slider v-model="editingColor.b" :min="0" :max="255" />
          <span class="slider-value">{{ editingColor.b }}</span>
        </div>
        <div class="slider-row">
          <span class="slider-label" style="color: #ffffff">W</span>
          <el-slider v-model="editingColor.w" :min="0" :max="255" />
          <span class="slider-value">{{ editingColor.w }}</span>
        </div>
        <div class="dialog-preview">
          <div 
            class="preview-box" 
            :style="{ backgroundColor: rgbwToCss(editingColor) }"
          ></div>
        </div>
      </div>
      <template #footer>
        <el-button @click="colorDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEditingColor">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import apiClient from '@/api/client'

interface RGBWColor {
  r: number
  g: number
  b: number
  w: number
}

interface LEDState {
  is_blinking: boolean
  current_color: RGBWColor | null
  blink_colors: RGBWColor[] | null
  blink_interval_ms: number | null
}

const loading = ref(false)
const colorDialogVisible = ref(false)
const editingColorIndex = ref(-1)

const ledState = reactive<LEDState>({
  is_blinking: false,
  current_color: null,
  blink_colors: null,
  blink_interval_ms: null
})

// 预设颜色
const presetColors: Record<string, RGBWColor> = {
  red: { r: 255, g: 0, b: 0, w: 0 },
  orange: { r: 255, g: 128, b: 0, w: 0 },
  yellow: { r: 255, g: 255, b: 0, w: 0 },
  green: { r: 0, g: 255, b: 0, w: 0 },
  cyan: { r: 0, g: 255, b: 255, w: 0 },
  blue: { r: 0, g: 0, b: 255, w: 0 },
  purple: { r: 128, g: 0, b: 255, w: 0 },
  magenta: { r: 255, g: 0, b: 255, w: 0 },
  white: { r: 0, g: 0, b: 0, w: 255 },
  warm_white: { r: 50, g: 30, b: 0, w: 200 },
  off: { r: 0, g: 0, b: 0, w: 0 }
}

// 闪烁模式
const blinkModes: Record<string, { colors: RGBWColor[], interval_ms: number }> = {
  warning: { colors: [{ r: 255, g: 200, b: 0, w: 0 }, { r: 0, g: 0, b: 0, w: 0 }], interval_ms: 200 },
  error: { colors: [{ r: 255, g: 0, b: 0, w: 0 }, { r: 0, g: 0, b: 0, w: 0 }], interval_ms: 300 },
  success: { colors: [{ r: 0, g: 255, b: 0, w: 0 }, { r: 0, g: 0, b: 0, w: 0 }], interval_ms: 500 },
  processing: { colors: [{ r: 0, g: 0, b: 255, w: 0 }, { r: 0, g: 255, b: 255, w: 0 }], interval_ms: 400 },
  rainbow: { 
    colors: [
      { r: 255, g: 0, b: 0, w: 0 },
      { r: 255, g: 128, b: 0, w: 0 },
      { r: 255, g: 255, b: 0, w: 0 },
      { r: 0, g: 255, b: 0, w: 0 },
      { r: 0, g: 255, b: 255, w: 0 },
      { r: 0, g: 0, b: 255, w: 0 },
      { r: 128, g: 0, b: 255, w: 0 }
    ], 
    interval_ms: 300 
  },
  police: { colors: [{ r: 255, g: 0, b: 0, w: 0 }, { r: 0, g: 0, b: 255, w: 0 }], interval_ms: 150 }
}

const blinkModeNames: Record<string, string> = {
  warning: '⚠️ 警告',
  error: '❌ 错误',
  success: '✅ 成功',
  processing: '🔄 处理中',
  rainbow: '🌈 彩虹',
  police: '🚨 警灯'
}

// 自定义颜色
const customColor = reactive<RGBWColor>({ r: 255, g: 255, b: 255, w: 0 })

// 自定义闪烁
const blinkColors = ref<RGBWColor[]>([
  { r: 255, g: 0, b: 0, w: 0 },
  { r: 0, g: 255, b: 0, w: 0 }
])
const blinkInterval = ref(500)

// 编辑中的颜色
const editingColor = reactive<RGBWColor>({ r: 0, g: 0, b: 0, w: 0 })

// 当前颜色
const currentColor = computed<RGBWColor>(() => {
  return ledState.current_color || { r: 0, g: 0, b: 0, w: 0 }
})

const currentColorCss = computed(() => rgbwToCss(currentColor.value))

// RGBW 转 CSS 颜色
function rgbwToCss(color: RGBWColor): string {
  // W 通道混合到 RGB 中显示
  const r = Math.min(255, color.r + color.w)
  const g = Math.min(255, color.g + color.w)
  const b = Math.min(255, color.b + color.w)
  return `rgb(${r}, ${g}, ${b})`
}

// 获取闪烁按钮类型
function getBlinkButtonType(name: string): string {
  const typeMap: Record<string, string> = {
    warning: 'warning',
    error: 'danger',
    success: 'success',
    processing: 'primary',
    rainbow: '',
    police: 'danger'
  }
  return typeMap[name] || ''
}

// 设置预设颜色
async function setPresetColor(name: string) {
  loading.value = true
  try {
    const res = await apiClient.post(`/api/v1/led/preset/${name}`)
    if (res.success) {
      const { success, message, code, error, ...payload } = res
      Object.assign(ledState, payload)
      ElMessage.success(`已设置为${name === 'off' ? '关闭' : name}`)
    } else {
      ElMessage.error(res.message)
    }
  } catch (error: any) {
    ElMessage.error(error.message || '设置失败')
  } finally {
    loading.value = false
  }
}

// 应用自定义颜色
async function applyCustomColor() {
  loading.value = true
  try {
    const res = await apiClient.post('/api/v1/led/color', customColor)
    if (res.success) {
      const { success, message, code, error, ...payload } = res
      Object.assign(ledState, payload)
      ElMessage.success('颜色已应用')
    } else {
      ElMessage.error(res.message)
    }
  } catch (error: any) {
    ElMessage.error(error.message || '设置失败')
  } finally {
    loading.value = false
  }
}

// 设置闪烁模式
async function setBlinkMode(name: string) {
  loading.value = true
  try {
    const res = await apiClient.post(`/api/v1/led/blink/preset/${name}`)
    if (res.success) {
      const { success, message, code, error, ...payload } = res
      Object.assign(ledState, payload)
      ElMessage.success(`已启动${blinkModeNames[name] || name}模式`)
    } else {
      ElMessage.error(res.message)
    }
  } catch (error: any) {
    ElMessage.error(error.message || '设置失败')
  } finally {
    loading.value = false
  }
}

// 开始自定义闪烁
async function startCustomBlink() {
  loading.value = true
  try {
    const res = await apiClient.post('/api/v1/led/blink', {
      colors: blinkColors.value,
      interval_ms: blinkInterval.value
    })
    if (res.success) {
      const { success, message, code, error, ...payload } = res
      Object.assign(ledState, payload)
      ElMessage.success('闪烁已启动')
    } else {
      ElMessage.error(res.message)
    }
  } catch (error: any) {
    ElMessage.error(error.message || '设置失败')
  } finally {
    loading.value = false
  }
}

// 停止闪烁
async function stopBlink() {
  loading.value = true
  try {
    const res = await apiClient.post('/api/v1/led/stop')
    if (res.success) {
      const { success, message, code, error, ...payload } = res
      Object.assign(ledState, payload)
      ElMessage.success('闪烁已停止')
    } else {
      ElMessage.error(res.message)
    }
  } catch (error: any) {
    ElMessage.error(error.message || '停止失败')
  } finally {
    loading.value = false
  }
}

// 添加闪烁颜色
function addBlinkColor() {
  blinkColors.value.push({ r: 255, g: 255, b: 255, w: 0 })
}

// 移除闪烁颜色
function removeBlinkColor(index: number) {
  if (blinkColors.value.length > 1) {
    blinkColors.value.splice(index, 1)
  }
}

// 编辑闪烁颜色
function editBlinkColor(index: number) {
  editingColorIndex.value = index
  Object.assign(editingColor, blinkColors.value[index])
  colorDialogVisible.value = true
}

// 保存编辑的颜色
function saveEditingColor() {
  if (editingColorIndex.value >= 0) {
    blinkColors.value[editingColorIndex.value] = { ...editingColor }
  }
  colorDialogVisible.value = false
}

// 获取 LED 状态
async function fetchLEDState() {
  try {
    const res = await apiClient.get('/api/v1/led/state')
    if (res.success) {
      const { success, message, code, error, ...payload } = res
      Object.assign(ledState, payload)
    }
  } catch {
    // 静默失败
  }
}

onMounted(() => {
  fetchLEDState()
})
</script>

<style scoped>
.led-panel {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow-y: auto;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: var(--el-bg-color-page);
  border-radius: 8px;
}

.status-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge.success {
  background: rgba(0, 200, 83, 0.15);
  color: #00c853;
}

.badge.warning {
  background: rgba(255, 193, 7, 0.15);
  color: #ffc107;
}

.color-preview {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 2px solid var(--el-border-color);
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.section {
  background: var(--el-bg-color-page);
  border-radius: 8px;
  padding: 12px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 12px;
}

.preset-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.color-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 2px solid var(--el-border-color);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-btn:hover {
  transform: scale(1.1);
  border-color: var(--el-color-primary);
}

.color-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.off-icon {
  color: #666;
  font-size: 14px;
  font-weight: bold;
}

.color-sliders {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.slider-label {
  width: 20px;
  font-weight: bold;
  text-align: center;
}

.slider-row :deep(.el-slider) {
  flex: 1;
}

.slider-value {
  width: 36px;
  text-align: right;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.custom-preview-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.custom-preview {
  width: 48px;
  height: 32px;
  border-radius: 6px;
  border: 2px solid var(--el-border-color);
}

.blink-modes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.custom-blink {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.blink-colors {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.blink-color-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.blink-color-preview {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 2px solid var(--el-border-color);
  cursor: pointer;
  transition: all 0.2s;
}

.blink-color-preview:hover {
  transform: scale(1.1);
  border-color: var(--el-color-primary);
}

.blink-interval {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.blink-interval :deep(.el-input-number) {
  width: 120px;
}

.blink-actions {
  display: flex;
  gap: 8px;
}

.color-edit-dialog {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dialog-preview {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.preview-box {
  width: 80px;
  height: 40px;
  border-radius: 8px;
  border: 2px solid var(--el-border-color);
}
</style>
