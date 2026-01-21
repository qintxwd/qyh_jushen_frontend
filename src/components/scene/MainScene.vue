<template>
  <div class="main-scene" ref="containerRef">
    <div class="scene-canvas" ref="canvasRef"></div>
    
    <!-- 工具栏 -->
    <div v-if="modelLoaded" class="toolbar">
      <el-button 
        size="small" 
        :type="showGrid ? 'primary' : 'default'"
        @click="toggleGrid"
      >
        <SvgIcon name="grid" :size="16" />
        {{ showGrid ? '隐藏网格' : '显示网格' }}
      </el-button>
    </div>
    
    <!-- 加载状态 -->
    <div v-if="!modelLoaded && !loadError" class="loading-overlay">
      <SvgIcon name="refresh" :size="16" />
      <span>{{ loadStatus }}</span>
    </div>
    
    <!-- 错误状态 -->
    <div v-if="loadError" class="error-overlay">
      <SvgIcon name="warningfilled" :size="32" />
      <span>{{ loadError }}</span>
      <el-button size="small" @click="retryLoad">重试</el-button>
    </div>
    
    <!-- 调试信息 -->
    <div v-if="modelLoaded" class="debug-info">
      <span>3D场景已加载</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated, defineExpose, watch } from 'vue'
import * as THREE from 'three'
import { sceneManager } from './sceneManager'
import { useLayoutStore } from '@/stores/layout'
import apiClient from '@/api/client'
import { chassisApi, type MapData, type MapMeta, type MapEdge, type MapStation } from '@/api/chassis'
import { eventBus, EVENTS } from '@/utils/eventBus'
import { getApiBaseUrl } from '@/utils/apiUrl'
import { useDataPlane } from '@/composables/useDataPlane'

const layoutStore = useLayoutStore()
const { jointState, chassisState, liftState, armState, isConnected, connect, subscribe } = useDataPlane()

// API 配置 - 动态获取，支持远程访问
const getApiBase = () => getApiBaseUrl()

// Refs
const containerRef = ref<HTMLElement>()
const canvasRef = ref<HTMLElement>()

// 状态
const modelLoaded = ref(false)
const loadError = ref('')
const loadStatus = ref('正在加载机器人模型...')
const showGrid = ref(false)  // 网格显示状态，默认不显示

// 切换网格显示
function toggleGrid() {
  showGrid.value = sceneManager.toggleGrid()
}

// 轮询 intervals
let resizeObserver: ResizeObserver | null = null

// 初始化
async function initScene() {
  if (!canvasRef.value) return
  
  // 设置回调
  sceneManager.onLoadStatusChange = (status) => {
    loadStatus.value = status
  }
  sceneManager.onLoadError = (error) => {
    loadError.value = `加载失败: ${error}`
  }
  sceneManager.onModelLoaded = () => {
    modelLoaded.value = true
    loadStatus.value = '加载完成'
    // 加载地图
    loadMapData()
    // 开始状态轮询
    startPolling()
  }
  
  // 初始化场景（如果已初始化，只是重新附加渲染器）
  const wasInitialized = sceneManager.initScene(canvasRef.value)
  
  if (wasInitialized) {
    // 场景已存在，直接恢复
    modelLoaded.value = sceneManager.urdfLoaded
    if (sceneManager.urdfLoaded) {
      startPolling()
    }
  } else {
    // 首次初始化，加载 URDF
    await sceneManager.loadURDF()
  }
  
  // 监听容器大小变化
  resizeObserver = new ResizeObserver(() => {
    if (canvasRef.value) {
      sceneManager.handleResize(canvasRef.value)
    }
  })
  resizeObserver.observe(canvasRef.value)
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
}

function handleResize() {
  if (canvasRef.value) {
    sceneManager.handleResize(canvasRef.value)
  }
}

function retryLoad() {
  loadError.value = ''
  sceneManager.loadURDF()
}

// 状态轮询
function startPolling() {
  // 连接 WebSocket
  if (!isConnected.value) connect()
  
  // 订阅话题
  setTimeout(() => {
    if (isConnected.value) {
      subscribe(['joint_state', 'chassis_state', 'actuator_state', 'robot_state', 'arm_state'])
    }
  }, 1000)
}

// 监听状态
watch(jointState, (newState) => {
  if (!newState.names || !newState.positions) return
  
  const left: number[] = []
  const right: number[] = []
  
  // 简单的名称匹配逻辑，后续根据实际关节名称调整
  // 假设格式为 "left_arm_1" ... "left_arm_7" 或 "l-j1" ...
  // 这里暂时尝试寻找包含 "left" 和 "right" 的关节
  // 如果没有具体名称，可能无法映射，需要后端保证顺序或者提供名称映射
  
  // 临时映射：假设后端发来的 names 包含 "left_joint1" 等
  const n = newState.names
  const p = newState.positions
  
  // 构造 Map
  const jointMap = new Map<string, number>()
  for (let i = 0; i < n.length; i++) {
    jointMap.set(n[i], p[i])
  }
  
  // 尝试提取 left 1-7, right 1-7
  // 这里需要确认实际的 joint names。
  // 无论如何，先尝试更新连接状态
  layoutStore.updateConnectionStatus({
    ros: true,
    leftArm: true, 
    rightArm: true
  })

  // 假设关节名是 joint1...joint7, joint8...joint14 ?
  // 或者 arm_left_1 ...
  // 由于缺乏信息，暂时保留旧逻辑的 mock 或者是简单的分配
  // TODO: 确认实际关节名称
  
  // 如果没有匹配逻辑，先不做赋值，以免报错
  // sceneManager.leftJoints = ...
  // sceneManager.updateJointAngles()
})

watch(chassisState, (newState) => {
  console.log('[MainScene] 收到底盘状态:', newState)
  const odom = newState.odom
  if (odom && odom.position) {
    sceneManager.chassisPose.x = odom.position.x || 0
    sceneManager.chassisPose.y = odom.position.y || 0
    
    // Quaternion to Yaw 转换
    if (odom.orientation) {
      const q = odom.orientation
      const siny_cosp = 2 * ((q.w || 0) * (q.z || 0) + (q.x || 0) * (q.y || 0))
      const cosy_cosp = 1 - 2 * ((q.y || 0) * (q.y || 0) + (q.z || 0) * (q.z || 0))
      sceneManager.chassisPose.yaw = Math.atan2(siny_cosp, cosy_cosp)
    }
    
    sceneManager.updateChassisPosition()
    console.log('[MainScene] 更新底盘位置:', sceneManager.chassisPose)
  }
}, { deep: true })

watch(liftState, (newState) => {
  if (newState.position !== undefined) {
    sceneManager.liftHeight = Math.round(newState.position * 1000) // m -> mm
    sceneManager.updateArmPosition()
  }
})

// 监听手臂状态更新3D模型关节角度
watch(armState, (newState) => {
  console.log('[MainScene] 收到手臂状态:', newState)
  
  // 从 armState 获取关节角度
  const leftPositions = newState.leftPositions || newState.left_positions
  const rightPositions = newState.rightPositions || newState.right_positions
  
  if (leftPositions && leftPositions.length >= 7) {
    for (let i = 0; i < 7; i++) {
      sceneManager.leftJoints[i] = leftPositions[i]
    }
  }
  
  if (rightPositions && rightPositions.length >= 7) {
    for (let i = 0; i < 7; i++) {
      sceneManager.rightJoints[i] = rightPositions[i]
    }
  }
  
  if (leftPositions || rightPositions) {
    sceneManager.updateJointAngles()
    console.log('[MainScene] 更新关节角度:', { left: sceneManager.leftJoints, right: sceneManager.rightJoints })
  }
}, { deep: true })

function stopPolling() {
  // Do nothing or disconnect if needed
}

// ==================== 地图渲染 ====================
function mapToWorld(x_mm: number, y_mm: number): [number, number] {
  return [x_mm / 1000, y_mm / 1000]
}

async function loadMapData() {
  try {
    const data: MapData = await chassisApi.getMapData()
    if (data?.success === false) return
    
    clearMapObjects()
    
    sceneManager.mapGroup = new THREE.Group()
    sceneManager.mapGroup.name = 'map_group'
    
    if (data.has_image && data.image_url) {
      await loadMapImage(data.image_url, data.meta)
    }
    
    renderEdges(data.edges, data.meta)
    renderStations(data.stations, data.meta)
    
    sceneManager.scene?.add(sceneManager.mapGroup)
    autoFitCamera(data)
    
    console.log(`地图加载完成: ${data.map_name}`)
  } catch (error) {
    console.warn('加载地图失败:', error)
  }
}

function clearMapObjects() {
  if (sceneManager.mapGroup && sceneManager.scene) {
    sceneManager.scene.remove(sceneManager.mapGroup)
    sceneManager.mapGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose())
        } else if (child.material) {
          child.material.dispose()
        }
      } else if (child instanceof THREE.Line) {
        child.geometry.dispose()
        if (child.material instanceof THREE.Material) {
          child.material.dispose()
        }
      }
    })
    sceneManager.mapGroup = null
  }
}

// 处理地图图片：将黑色/深灰色障碍物替换为中国红/朱红色
// 原始地图：大部分透明/白色，障碍物为黑色或深灰色
function processMapImage(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')!
  
  // 绘制原图
  ctx.drawImage(image, 0, 0)
  
  // 获取像素数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  // 遍历所有像素，根据黑度转换为红色（越黑越红）
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const a = data[i + 3]
    
    // 跳过完全透明的像素
    if (a < 10) continue
    
    // 计算亮度（0=纯黑，255=纯白）
    const brightness = (r + g + b) / 3
    
    // 只处理较暗的像素（亮度 < 200）
    if (brightness < 200) {
      // 计算红色强度：越暗越红
      // 亮度 0~200 映射到强度 1.0~0.0
      const redIntensity = 1.0 - (brightness / 200)
      
      // 中国红 #CC0000 = (204, 0, 0)
      // 朱红色 #FF4500 = (255, 69, 0)  
      // 我们用纯正的红色，G/B 通道尽量低
      
      // R 通道：200~255（保持高红色）
      const redValue = Math.round(200 + redIntensity * 55)
      // G 通道：越黑越低，最低为 0
      const greenValue = Math.round(brightness * 0.15)  // 0~30
      // B 通道：同样很低
      const blueValue = Math.round(brightness * 0.1)    // 0~20
      
      data[i] = redValue        // R - 中国红
      data[i + 1] = greenValue  // G - 很低
      data[i + 2] = blueValue   // B - 很低
      data[i + 3] = Math.round(180 + redIntensity * 75)  // Alpha: 180~255
    }
  }
  
  ctx.putImageData(imageData, 0, 0)
  return canvas
}

async function loadMapImage(imageUrl: string, meta: MapMeta) {
  return new Promise<void>((resolve) => {
    const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${getApiBase()}${imageUrl}`
    
    // 使用 Image 对象加载图片，以便进行颜色处理
    const image = new Image()
    image.crossOrigin = 'anonymous'
    
    image.onload = () => {
      // 处理图片颜色
      const processedCanvas = processMapImage(image)
      
      // 从处理后的 canvas 创建纹理
      const texture = new THREE.CanvasTexture(processedCanvas)
      texture.needsUpdate = true
      
      const resMmPerPx = meta.resolution * 10
      const widthM = (meta['size.x'] * resMmPerPx) / 1000
      const heightM = (meta['size.y'] * resMmPerPx) / 1000
      
      const originXPx = meta['zero_offset.x']
      const originYPx = meta['zero_offset.y']
      
      const centerOffsetX = (meta['size.x'] / 2 - originXPx) * resMmPerPx / 1000
      const centerOffsetY = (originYPx - meta['size.y'] / 2) * resMmPerPx / 1000
      
      const geometry = new THREE.PlaneGeometry(widthM, heightM)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(centerOffsetX, centerOffsetY, -0.001)
      sceneManager.mapGroup?.add(mesh)
      
      console.log('地图图片已处理：黑色障碍物已替换为红色')
      resolve()
    }
    
    image.onerror = () => {
      console.warn('地图图片加载失败')
      resolve()
    }
    
    image.src = fullUrl
  })
}

function renderEdges(edges: MapEdge[], _meta: MapMeta) {
  const LINE_COLOR = 0x00ff00
  const BEZIER_COLOR = 0x00ffff
  const LINE_Z = 0.002
  
  edges.forEach(edge => {
    const [sx, sy] = mapToWorld(edge.sx, edge.sy)
    const [ex, ey] = mapToWorld(edge.ex, edge.ey)
    
    if (edge.type === 3) {
      const [cx, cy] = mapToWorld(edge.cx || edge.sx, edge.cy || edge.sy)
      const [dx, dy] = mapToWorld(edge.dx || edge.ex, edge.dy || edge.ey)
      
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(sx, sy, LINE_Z),
        new THREE.Vector3(cx, cy, LINE_Z),
        new THREE.Vector3(dx, dy, LINE_Z),
        new THREE.Vector3(ex, ey, LINE_Z)
      )
      
      const points = curve.getPoints(20)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: BEZIER_COLOR })
      const line = new THREE.Line(geometry, material)
      sceneManager.mapGroup?.add(line)
    } else {
      const points = [
        new THREE.Vector3(sx, sy, LINE_Z),
        new THREE.Vector3(ex, ey, LINE_Z)
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: LINE_COLOR })
      const line = new THREE.Line(geometry, material)
      sceneManager.mapGroup?.add(line)
    }
  })
}

function createTextSprite(text: string, color: string = '#FFFFFF', fontSize: number = 48): THREE.Sprite {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = 256
  canvas.height = 64
  
  context.fillStyle = 'rgba(0, 0, 0, 0.6)'
  context.roundRect(0, 0, canvas.width, canvas.height, 8)
  context.fill()
  
  context.font = `bold ${fontSize}px Arial`
  context.fillStyle = color
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  
  const texture = new THREE.CanvasTexture(canvas)
  const material = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true,
    depthTest: false
  })
  
  const sprite = new THREE.Sprite(material)
  sprite.scale.set(0.8, 0.2, 1)
  return sprite
}

function renderStations(stations: MapStation[], _meta: MapMeta) {
  const STATION_COLOR = 0xff6600
  const ARROW_COLOR = 0xff0000
  const STATION_Z = 0.01
  const STATION_RADIUS = 0.15
  
  stations.forEach(station => {
    const posX = station['pos.x'] ?? station.x ?? 0
    const posY = station['pos.y'] ?? station.y ?? 0
    const posYaw = station['pos.yaw'] ?? station.yaw ?? 0
    
    const [x, y] = mapToWorld(posX, posY)
    
    // 站点圆圈
    const circleGeometry = new THREE.CircleGeometry(STATION_RADIUS, 16)
    const circleMaterial = new THREE.MeshBasicMaterial({ 
      color: STATION_COLOR,
      side: THREE.DoubleSide 
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.position.set(x, y, STATION_Z)
    sceneManager.mapGroup?.add(circle)
    
    // 方向箭头
    const yawRad = posYaw / 1000
    const arrowLength = 0.3
    const arrowEndX = x + arrowLength * Math.cos(yawRad)
    const arrowEndY = y + arrowLength * Math.sin(yawRad)
    
    const arrowPoints = [
      new THREE.Vector3(x, y, STATION_Z + 0.001),
      new THREE.Vector3(arrowEndX, arrowEndY, STATION_Z + 0.001)
    ]
    const arrowGeometry = new THREE.BufferGeometry().setFromPoints(arrowPoints)
    const arrowMaterial = new THREE.LineBasicMaterial({ color: ARROW_COLOR })
    const arrow = new THREE.Line(arrowGeometry, arrowMaterial)
    sceneManager.mapGroup?.add(arrow)
    
    // 箭头头部
    const headLength = 0.1
    const headAngle = 2.5
    const leftX = arrowEndX - headLength * Math.cos(yawRad - headAngle)
    const leftY = arrowEndY - headLength * Math.sin(yawRad - headAngle)
    const rightX = arrowEndX - headLength * Math.cos(yawRad + headAngle)
    const rightY = arrowEndY - headLength * Math.sin(yawRad + headAngle)
    
    const headPoints = [
      new THREE.Vector3(leftX, leftY, STATION_Z + 0.001),
      new THREE.Vector3(arrowEndX, arrowEndY, STATION_Z + 0.001),
      new THREE.Vector3(rightX, rightY, STATION_Z + 0.001)
    ]
    const headGeometry = new THREE.BufferGeometry().setFromPoints(headPoints)
    const head = new THREE.Line(headGeometry, arrowMaterial)
    sceneManager.mapGroup?.add(head)
    
    // 站点名称标签
    const stationName = station.name || `站点${station.id}`
    const textSprite = createTextSprite(stationName, '#FFFF00', 36)
    textSprite.position.set(x, y, STATION_Z + 0.3)
    sceneManager.mapGroup?.add(textSprite)
  })
}

function autoFitCamera(data: MapData) {
  const allX: number[] = []
  const allY: number[] = []
  
  data.nodes.forEach(n => {
    allX.push(n.x / 1000)
    allY.push(n.y / 1000)
  })
  
  data.edges.forEach(e => {
    allX.push(e.sx / 1000, e.ex / 1000)
    allY.push(e.sy / 1000, e.ey / 1000)
  })
  
  data.stations.forEach(s => {
    const x = (s['pos.x'] ?? s.x ?? 0) / 1000
    const y = (s['pos.y'] ?? s.y ?? 0) / 1000
    allX.push(x)
    allY.push(y)
  })
  
  if (allX.length === 0) return
  
  const minX = Math.min(...allX)
  const maxX = Math.max(...allX)
  const minY = Math.min(...allY)
  const maxY = Math.max(...allY)
  
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const maxRange = Math.max(maxX - minX, maxY - minY, 1)
  
  const distance = maxRange * 1.5 + 2
  
  if (sceneManager.camera && sceneManager.controls) {
    sceneManager.camera.position.set(centerX, centerY - distance * 0.5, distance * 0.8)
    sceneManager.controls.target.set(centerX, centerY, 0)
    sceneManager.controls.update()
  }
}

async function reloadMap() {
  await loadMapData()
}

function resetCamera() {
  sceneManager.resetCamera()
}

function setTopView() {
  sceneManager.setTopView()
}

function setFrontView() {
  sceneManager.setFrontView()
}

// 暴露方法给父组件
defineExpose({
  resetCamera,
  setTopView,
  setFrontView,
  reloadMap,
  get leftJoints() { return sceneManager.leftJoints },
  get rightJoints() { return sceneManager.rightJoints },
  get robot() { return sceneManager.robot }
})

onMounted(() => {
  initScene()
  eventBus.on(EVENTS.MAP_REFRESHED, reloadMap)
})

onUnmounted(() => {
  eventBus.off(EVENTS.MAP_REFRESHED, reloadMap)
  stopPolling()
  
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  
  window.removeEventListener('resize', handleResize)
  
  // 不销毁场景，只分离渲染器
  sceneManager.detachRenderer()
})
</script>

<style scoped>
.main-scene {
  width: 100%;
  height: 100%;
  position: relative;
}

.scene-canvas {
  width: 100%;
  height: 100%;
}

.loading-overlay,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: rgba(26, 26, 46, 0.9);
  color: #ccc;
  font-size: 14px;
}

.loading-icon {
  font-size: 32px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-overlay {
  color: #f56c6c;
}

.debug-info {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.5);
  color: #8f8;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
}

.toolbar {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
  z-index: 10;
}
</style>
