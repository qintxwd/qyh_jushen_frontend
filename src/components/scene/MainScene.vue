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
import { ref, onMounted, onUnmounted, onActivated, onDeactivated, defineExpose } from 'vue'
import * as THREE from 'three'
import { sceneManager } from './sceneManager'
import { useLayoutStore } from '@/stores/layout'
import axios from 'axios'
import { chassisApi, type MapData, type MapMeta, type MapEdge, type MapStation } from '@/api/chassis'
import { eventBus, EVENTS } from '@/utils/eventBus'
import { getApiBaseUrl } from '@/utils/apiUrl'
import { normalizeApiResponse } from '@/api/client'

const layoutStore = useLayoutStore()

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
let jointStateInterval: number | null = null
let chassisStateInterval: number | null = null
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
  if (jointStateInterval) return // 已经在轮询
  
  const api = axios.create({
    baseURL: `${getApiBase()}/api/v1/robot-model`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
  })
  api.interceptors.response.use((response) => ({
    ...response,
    data: normalizeApiResponse(response.data)
  }))
  
  // 关节状态轮询
  const fetchJointStates = async () => {
    try {
      const response = await api.get('/joint_states')
      const data = response.data
      
      // 只要有有效数据就更新（无论是 ros2 还是 mock）
      if (data.left && data.right) {
        sceneManager.leftJoints = data.left
        sceneManager.rightJoints = data.right
        sceneManager.updateJointAngles()
        
        // 根据数据来源更新连接状态
        const isRealData = data.source === 'ros2'
        layoutStore.updateConnectionStatus({
          ros: isRealData,
          leftArm: isRealData,
          rightArm: isRealData
        })
      } else {
        layoutStore.updateConnectionStatus({
          ros: false,
          leftArm: false,
          rightArm: false
        })
      }
    } catch {
      layoutStore.updateConnectionStatus({
        ros: false,
        leftArm: false,
        rightArm: false
      })
    }
  }
  
  // 底盘和升降状态轮询
  const fetchChassisAndLiftState = async () => {
    try {
      const chassisStatus = await chassisApi.getStatus()
      if (chassisStatus?.pose) {
        sceneManager.chassisPose.x = chassisStatus.pose.x
        sceneManager.chassisPose.y = chassisStatus.pose.y
        sceneManager.chassisPose.yaw = chassisStatus.pose.yaw
        sceneManager.updateChassisPosition()
      }
    } catch { /* 忽略 */ }
    
    try {
      const liftResponse = await axios.get(`${getApiBase()}/api/v1/lift/state`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
      })
      const liftData = normalizeApiResponse(liftResponse.data)
      if (liftData?.current_position !== undefined) {
        sceneManager.liftHeight = liftData.current_position
        sceneManager.updateArmPosition()
      }
    } catch { /* 忽略 */ }
  }
  
  fetchJointStates()
  fetchChassisAndLiftState()
  
  jointStateInterval = window.setInterval(fetchJointStates, 100)
  chassisStateInterval = window.setInterval(fetchChassisAndLiftState, 200)
}

function stopPolling() {
  if (jointStateInterval) {
    clearInterval(jointStateInterval)
    jointStateInterval = null
  }
  if (chassisStateInterval) {
    clearInterval(chassisStateInterval)
    chassisStateInterval = null
  }
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
