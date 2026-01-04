<template>
  <img 
    :src="iconPath" 
    :alt="name"
    :style="iconStyle"
    :class="['svg-icon', className]"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  name: string              // 图标名称，如: 'document', 'setting', 'camera'
  size?: string | number    // 图标大小
  color?: string           // 图标颜色（通过CSS filter实现）
  className?: string       // 自定义类名
}

const props = withDefaults(defineProps<Props>(), {
  size: '1em',
  color: 'currentColor',
  className: ''
})

const error = ref(false)

const iconPath = computed(() => `/icons/svg/${props.name.toLowerCase()}.svg`)

const iconStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  display: 'inline-block',
  verticalAlign: 'middle',
  transition: 'all 0.3s ease'
}))

const onError = () => {
  error.value = true
  console.warn(`图标 "${props.name}" 加载失败`)
}
</script>

<style scoped>
.svg-icon {
  /* 使用 CSS filter 改变颜色 - 适用于单色SVG */
  object-fit: contain;
}

/* 主题色滤镜 */
.svg-icon.primary {
  filter: brightness(0) saturate(100%) invert(68%) sepia(67%) saturate(457%) hue-rotate(359deg) brightness(101%) contrast(93%);
}

.svg-icon.success {
  filter: brightness(0) saturate(100%) invert(71%) sepia(53%) saturate(425%) hue-rotate(101deg) brightness(94%) contrast(86%);
}

.svg-icon.danger {
  filter: brightness(0) saturate(100%) invert(44%) sepia(85%) saturate(2498%) hue-rotate(337deg) brightness(99%) contrast(91%);
}

.svg-icon.warning {
  filter: brightness(0) saturate(100%) invert(68%) sepia(67%) saturate(457%) hue-rotate(359deg) brightness(101%) contrast(93%);
}
</style>
