<template>
  <div class="urdf-viewer" ref="containerRef">
    <div class="viewer-toolbar">
      <el-button-group size="small">
        <el-button @click="resetView">
          <el-icon><Refresh /></el-icon>
          重置视角
        </el-button>
        <el-button @click="toggleGrid">
          <el-icon><Grid /></el-icon>
          {{ showGrid ? '隐藏' : '显示' }}网格
        </el-button>
        <el-button @click="toggleAxes">
          <el-icon><Aim /></el-icon>
          {{ showAxes ? '隐藏' : '显示' }}坐标轴
        </el-button>
        <el-button @click="toggleWireframe">
          <el-icon><View /></el-icon>
          {{ wireframe ? '实体' : '线框' }}
        </el-button>
        <el-button @click="toggleMap" :type="showMap ? 'primary' : 'default'">
          <el-icon><MapLocation /></el-icon>
          {{ showMap ? '隐藏' : '显示' }}地图
        </el-button>
      </el-button-group>
      
      <el-space>
        <el-tag v-if="currentMapName" type="info" size="small">
          地图: {{ currentMapName }}
        </el-tag>
        <el-tag :type="modelLoaded ? 'success' : 'warning'" size="small">
          {{ modelLoaded ? '模型已加载' : '加载中...' }}
        </el-tag>
        <el-tag :type="connected ? 'success' : 'info'" size="small">
          {{ connected ? '实时连接' : '演示模式' }}
        </el-tag>
      </el-space>
    </div>

    <div class="viewer-canvas" ref="canvasRef"></div>

    <!-- 关节状态面板 -->
    <div class="joint-panel">
      <div class="joint-header">
        <span>关节状态</span>
        <el-switch v-model="showDegrees" active-text="度" inactive-text="弧度" size="small" />
      </div>
      <div class="arms-container">
        <div class="arm-section left">
          <div class="arm-label">左臂 (JAKA Zu7)</div>
          <div class="joint-row">
            <div 
              v-for="(angle, i) in leftJoints" 
              :key="'l'+i" 
              class="joint-box"
              :class="{ active: Math.abs(angle) > 0.01 }"
            >
              <span class="j-name">J{{ i + 1 }}</span>
              <span class="j-val" :class="angle >= 0 ? 'pos' : 'neg'">
                {{ formatAngle(angle) }}
              </span>
            </div>
          </div>
        </div>
        <div class="arm-section right">
          <div class="arm-label">右臂 (JAKA Zu7)</div>
          <div class="joint-row">
            <div 
              v-for="(angle, i) in rightJoints" 
              :key="'r'+i" 
              class="joint-box"
              :class="{ active: Math.abs(angle) > 0.01 }"
            >
              <span class="j-name">J{{ i + 1 }}</span>
              <span class="j-val" :class="angle >= 0 ? 'pos' : 'neg'">
                {{ formatAngle(angle) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import URDFLoader from 'urdf-loader'
import type { URDFRobot } from 'urdf-loader'
import axios from 'axios'
import { chassisApi, type MapData, type MapMeta, type MapEdge, type MapStation } from '@/api/chassis'
import { eventBus, EVENTS } from '@/utils/eventBus'

interface Props {
  apiBaseUrl?: string
  enableRealtime?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  apiBaseUrl: '',  // 将使用环境变量
  enableRealtime: true
})

const emit = defineEmits<{
  connectionChange: [connected: boolean]
}>()

import { getApiBaseUrl } from '@/utils/apiUrl'

// API 配置 - 动态获取，支持远程访问
const getRobotModelApi = () => `${getApiBaseUrl()}/api/v1/robot-model`

// 创建带认证的 axios 实例
const api = axios.create({
  baseURL: getRobotModelApi(),
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
  }
})
// Refs
const containerRef = ref<HTMLElement>()
const canvasRef = ref<HTMLElement>()

// State
const modelLoaded = ref(false)
const connected = ref(false)
const showGrid = ref(true)
const showAxes = ref(true)
const wireframe = ref(false)
const showDegrees = ref(true)
const showMap = ref(true)
const currentMapName = ref('')
const leftJoints = ref<number[]>([0, 0, 0, 0, 0, 0, 0])
const rightJoints = ref<number[]>([0, 0, 0, 0, 0, 0, 0])
const urdfSource = ref('')

// Three.js objects
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let controls: OrbitControls
let gridHelper: THREE.GridHelper
let axesHelper: THREE.AxesHelper
let animationId: number

// Robot model
let robot: URDFRobot | null = null

// Map objects
let mapGroup: THREE.Group | null = null  // 地图组，包含地图图片、边、站点
let mapMeta: MapMeta | null = null

// 格式化角度显示
const formatAngle = (angle: number): string => {
  if (showDegrees.value) {
    return (angle * 180 / Math.PI).toFixed(1) + '°'
  }
  return angle.toFixed(3)
}

// 初始化 Three.js 场景
const initScene = () => {
  if (!canvasRef.value) return

  // Scene
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x1a1a2e)

  // Camera
  const aspect = canvasRef.value.clientWidth / canvasRef.value.clientHeight
  camera = new THREE.PerspectiveCamera(50, aspect, 0.01, 100)
  
  // 关键：设置相机 up 向量为 Z 轴（ROS 坐标系）
  camera.up.set(0, 0, 1)
  camera.position.set(1.5, -1.5, 1.2)
  camera.lookAt(0, 0, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasRef.value.appendChild(renderer.domElement)

  // Controls - 轨道相机模式
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.minDistance = 0.3
  controls.maxDistance = 50  // 增大以适应地图
  
  // 焦点固定在地面原点
  controls.target.set(0, 0, 0)
  
  // 鼠标按键映射
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN
  }
  
  // 限制垂直旋转角度
  controls.minPolarAngle = 0.1
  controls.maxPolarAngle = Math.PI / 2 - 0.1
  controls.rotateSpeed = 0.8
  controls.screenSpacePanning = false
  controls.update()

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
  dirLight1.position.set(5, 5, 5)
  dirLight1.castShadow = true
  scene.add(dirLight1)

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4)
  dirLight2.position.set(-5, 5, -5)
  scene.add(dirLight2)

  // Grid - 更大的网格以适应地图 (100m x 100m, 每格1m)
  gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x333333)
  gridHelper.rotation.x = Math.PI / 2 // XY plane
  scene.add(gridHelper)

  // Axes - 更大的坐标轴
  axesHelper = new THREE.AxesHelper(2)
  scene.add(axesHelper)

  // Handle resize
  window.addEventListener('resize', onWindowResize)
}

// 从后端获取 URDF 并解析
const loadRobotModel = async () => {
  try {
    // 1. 从后端获取处理过的 URDF
    const response = await api.get('/urdf')
    const { urdf, source } = response.data
    
    urdfSource.value = source
    console.log('URDF source:', source)
    console.log('URDF content length:', urdf.length)
    
    // 2. 使用 URDFLoader 解析 URDF
    const loader = new URDFLoader()
    
    // 设置包路径解析器
    loader.packages = (pkg: string) => {
      return `${getApiBaseUrl()}/api/v1/robot-model/package/${pkg}`
    }
    
    // 设置自定义 mesh 加载器 (使用 STL)
    loader.loadMeshCb = (
      path: string,
      manager: THREE.LoadingManager,
      onComplete: (mesh: THREE.Object3D, err?: Error) => void
    ) => {
      let meshUrl = path
      if (path.startsWith('/api/')) {
        meshUrl = `${getApiBaseUrl()}${path}`
      } else if (!path.startsWith('http')) {
        meshUrl = `${getApiBaseUrl()}/api/v1/robot-model/package/${path}`
      }
      
      console.log('Loading mesh:', meshUrl)
      
      const stlLoader = new STLLoader(manager)
      stlLoader.load(
        meshUrl,
        (geometry) => {
          geometry.computeVertexNormals()
          const material = new THREE.MeshStandardMaterial({
            color: 0xb0b0b0,
            metalness: 0.5,
            roughness: 0.4
          })
          const mesh = new THREE.Mesh(geometry, material)
          mesh.castShadow = true
          mesh.receiveShadow = true
          onComplete(mesh)
        },
        undefined,
        (error) => {
          console.warn('Failed to load mesh:', meshUrl, error)
          const geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02)
          const material = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true })
          const placeholder = new THREE.Mesh(geometry, material)
          onComplete(placeholder)
        }
      )
    }
    
    // 3. 解析 URDF 字符串
    robot = loader.parse(urdf)
    
    if (!robot) {
      throw new Error('URDF 解析失败')
    }
    
    console.log('Robot parsed:', robot.robotName)
    console.log('Robot joints:', Object.keys(robot.joints))
    
    // 4. 添加到场景
    scene.add(robot)
    
    // 5. 设置材质
    robot.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xb0b0b0,
          metalness: 0.5,
          roughness: 0.4
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    
    modelLoaded.value = true
    
  } catch (error: any) {
    console.error('Failed to load robot from URDF:', error)
    modelLoaded.value = false
  }
}

// 更新关节角度
const updateJointAngles = () => {
  if (!robot) return
  
  // 更新左臂关节
  for (let i = 0; i < 7; i++) {
    const jointName = `left_joint${i + 1}`
    if (robot.joints[jointName]) {
      robot.setJointValue(jointName, leftJoints.value[i])
    }
  }
  
  // 更新右臂关节
  for (let i = 0; i < 7; i++) {
    const jointName = `right_joint${i + 1}`
    if (robot.joints[jointName]) {
      robot.setJointValue(jointName, rightJoints.value[i])
    }
  }
}

// 获取关节状态
let jointStateInterval: number | null = null

const startJointStatePolling = () => {
  let wasConnected = false  // 记录上次连接状态
  
  const fetchJointStates = async () => {
    try {
      const response = await api.get('/joint_states')
      const data = response.data
      
      // 判断是否是真实的 ROS2 数据
      const isRealData = data.source === 'ros2'
      
      if (isRealData && data.left && data.right) {
        // 真实数据
        leftJoints.value = data.left
        rightJoints.value = data.right
        
        if (!wasConnected) {
          connected.value = true
          emit('connectionChange', true)
          wasConnected = true
        }
      } else {
        // 未连接：保持当前姿态（不运行演示动画）
        if (wasConnected || connected.value) {
          connected.value = false
          emit('connectionChange', false)
          wasConnected = false
        }
      }
    } catch (error) {
      // 请求失败
      if (wasConnected || connected.value) {
        connected.value = false
        emit('connectionChange', false)
        wasConnected = false
      }
    }
  }

  fetchJointStates()
  // 100ms 轮询以实现流畅的动画效果
  jointStateInterval = window.setInterval(fetchJointStates, 100)
}

// 演示动画（目前不使用，保留备用）
let demoTime = 0
const demoAnimation = () => {
  demoTime += 0.02
  leftJoints.value = leftJoints.value.map((_, i) => 
    Math.sin(demoTime + i * 0.5) * 0.3
  )
  rightJoints.value = rightJoints.value.map((_, i) => 
    Math.cos(demoTime + i * 0.5) * 0.3
  )
}

// 监听关节角度变化
watch([leftJoints, rightJoints], () => {
  updateJointAngles()
}, { deep: true })

// 动画循环
const animate = () => {
  animationId = requestAnimationFrame(animate)
  
  controls.update()
  renderer.render(scene, camera)
}

// 窗口大小变化
const onWindowResize = () => {
  if (!canvasRef.value) return
  
  camera.aspect = canvasRef.value.clientWidth / canvasRef.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
}

// 控制函数
const resetView = () => {
  camera.up.set(0, 0, 1)
  camera.position.set(1.5, -1.5, 1.2)
  controls.target.set(0, 0, 0)
  controls.update()
}

const toggleGrid = () => {
  showGrid.value = !showGrid.value
  gridHelper.visible = showGrid.value
}

const toggleAxes = () => {
  showAxes.value = !showAxes.value
  axesHelper.visible = showAxes.value
}

const toggleWireframe = () => {
  wireframe.value = !wireframe.value
  
  if (robot) {
    robot.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.wireframe = wireframe.value
      }
    })
  }
}

const toggleMap = () => {
  showMap.value = !showMap.value
  if (mapGroup) {
    mapGroup.visible = showMap.value
  }
}

// ==================== 地图渲染 ====================

// 坐标转换: 地图坐标(mm) -> Three.js 坐标(m)
// 地图数据中的坐标是世界坐标（毫米），直接转换为米
const mapToWorld = (x_mm: number, y_mm: number, meta: MapMeta): [number, number] => {
  return [x_mm / 1000, y_mm / 1000]
}

// 加载并渲染地图
const loadMapData = async () => {
  try {
    const data: MapData = await chassisApi.getMapData()
    
    if (!data.success) {
      console.warn('获取地图数据失败')
      return
    }
    
    currentMapName.value = data.map_name
    mapMeta = data.meta
    
    // 清除旧的地图
    clearMapObjects()
    
    // 创建新的地图组
    mapGroup = new THREE.Group()
    mapGroup.name = 'map_group'
    
    // 1. 加载地图图片作为地面纹理
    if (data.has_image && data.image_url) {
      await loadMapImage(data.image_url, data.meta)
    }
    
    // 2. 绘制边/路径 (z=0.002)
    renderEdges(data.edges, data.meta)
    
    // 3. 绘制站点 (z=0.005)
    renderStations(data.stations, data.meta)
    
    scene.add(mapGroup)
    mapGroup.visible = showMap.value
    
    // 4. 自动调整相机以显示完整地图
    autoFitCamera(data)
    
    console.log(`地图加载完成: ${data.map_name}, ${data.nodes.length}节点, ${data.edges.length}边, ${data.stations.length}站点`)
    
  } catch (error) {
    console.warn('加载地图数据失败:', error)
  }
}

// 自动调整相机位置以显示地图
const autoFitCamera = (data: MapData) => {
  // 收集所有坐标点
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
  
  // 计算边界
  const minX = Math.min(...allX)
  const maxX = Math.max(...allX)
  const minY = Math.min(...allY)
  const maxY = Math.max(...allY)
  
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const rangeX = maxX - minX
  const rangeY = maxY - minY
  const maxRange = Math.max(rangeX, rangeY, 1)  // 至少1米
  
  // 设置相机位置，俯视地图
  const distance = maxRange * 1.5 + 2  // 距离地图中心
  camera.position.set(centerX, centerY - distance * 0.5, distance * 0.8)
  controls.target.set(centerX, centerY, 0)
  controls.update()
  
  console.log(`相机定位到地图中心: (${centerX.toFixed(2)}, ${centerY.toFixed(2)}), 范围: ${maxRange.toFixed(2)}m`)
}

// 清除地图对象
const clearMapObjects = () => {
  if (mapGroup) {
    scene.remove(mapGroup)
    mapGroup.traverse((child) => {
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
    mapGroup = null
  }
}

// 处理地图图片：将黑色/深灰色障碍物替换为红色，提高可见性
const processMapImage = (image: HTMLImageElement): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')!
  
  // 绘制原图
  ctx.drawImage(image, 0, 0)
  
  // 获取像素数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data
  
  // 遍历所有像素，将黑色/深灰色替换为红色
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // const a = data[i + 3]
    
    // 判断是否为黑色或深灰色（障碍物）
    // 阈值：RGB都小于80，且颜色相近（灰度）
    const maxVal = Math.max(r, g, b)
    const minVal = Math.min(r, g, b)
    
    if (maxVal < 80 && (maxVal - minVal) < 30) {
      // 将黑色/深灰色替换为更亮的红色
      data[i] = 255      // R - 最亮
      data[i + 1] = 60   // G
      data[i + 2] = 60   // B
      data[i + 3] = 255  // Alpha - 完全不透明
    }
  }
  
  ctx.putImageData(imageData, 0, 0)
  return canvas
}

// 加载地图图片
const loadMapImage = async (imageUrl: string, meta: MapMeta) => {
  return new Promise<void>((resolve) => {
    const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${getApiBaseUrl()}${imageUrl}`
    
    // 使用 Image 对象加载图片，以便进行颜色处理
    const image = new Image()
    image.crossOrigin = 'anonymous'
    
    image.onload = () => {
      // 处理图片颜色
      const processedCanvas = processMapImage(image)
      
      // 从处理后的 canvas 创建纹理
      const texture = new THREE.CanvasTexture(processedCanvas)
      texture.needsUpdate = true
      
      // resolution 单位是 cm/pixel，转换为 mm/pixel
      const resMmPerPx = meta.resolution * 10  // cm/pixel -> mm/pixel
      
      // 计算地图实际大小 (m)
      const widthM = (meta['size.x'] * resMmPerPx) / 1000  // mm -> m
      const heightM = (meta['size.y'] * resMmPerPx) / 1000  // mm -> m
      
      // zero_offset.x, zero_offset.y 是原点在图片中的像素位置
      const originXPx = meta['zero_offset.x']
      const originYPx = meta['zero_offset.y']
      
      // 图片中心的世界坐标
      const centerOffsetX = (meta['size.x'] / 2 - originXPx) * resMmPerPx / 1000
      const centerOffsetY = (originYPx - meta['size.y'] / 2) * resMmPerPx / 1000
      
      // 创建平面几何体
      const geometry = new THREE.PlaneGeometry(widthM, heightM)
      
      // 创建材质
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      })
      
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(centerOffsetX, centerOffsetY, -0.001)  // 略低于地面，避免z-fighting
      mesh.name = 'map_image'
      
      if (mapGroup) {
        mapGroup.add(mesh)
      }
      
      console.log(`地图图片加载: ${widthM.toFixed(2)}m x ${heightM.toFixed(2)}m, 中心偏移: (${centerOffsetX.toFixed(2)}, ${centerOffsetY.toFixed(2)}), 黑色障碍物已替换为红色`)
      resolve()
    }
    
    image.onerror = (error) => {
      console.warn('地图图片加载失败:', error)
      resolve()
    }
    
    image.src = fullUrl
  })
}

// 绘制边/路径
const renderEdges = (edges: MapEdge[], meta: MapMeta) => {
  const LINE_COLOR = 0x00ff00  // 绿色
  const BEZIER_COLOR = 0x00ffff  // 青色
  const LINE_Z = 0.002  // 略高于地面
  
  edges.forEach(edge => {
    const [sx, sy] = mapToWorld(edge.sx, edge.sy, meta)
    const [ex, ey] = mapToWorld(edge.ex, edge.ey, meta)
    
    if (edge.type === 3) {
      // 贝塞尔曲线
      const [cx, cy] = mapToWorld(edge.cx || edge.sx, edge.cy || edge.sy, meta)
      const [dx, dy] = mapToWorld(edge.dx || edge.ex, edge.dy || edge.ey, meta)
      
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(sx, sy, LINE_Z),
        new THREE.Vector3(cx, cy, LINE_Z),
        new THREE.Vector3(dx, dy, LINE_Z),
        new THREE.Vector3(ex, ey, LINE_Z)
      )
      
      const points = curve.getPoints(20)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: BEZIER_COLOR, linewidth: 2 })
      const line = new THREE.Line(geometry, material)
      line.name = `edge_${edge.id}`
      
      if (mapGroup) {
        mapGroup.add(line)
      }
    } else {
      // 直线
      const points = [
        new THREE.Vector3(sx, sy, LINE_Z),
        new THREE.Vector3(ex, ey, LINE_Z)
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: LINE_COLOR, linewidth: 2 })
      const line = new THREE.Line(geometry, material)
      line.name = `edge_${edge.id}`
      
      if (mapGroup) {
        mapGroup.add(line)
      }
    }
  })
}

// 绘制站点
const renderStations = (stations: MapStation[], meta: MapMeta) => {
  const STATION_COLOR = 0xff6600  // 橙色
  const ARROW_COLOR = 0xff0000  // 红色
  const STATION_Z = 0.01  // 高于路径
  const STATION_RADIUS = 0.15  // 150mm 半径 (更大以便看到)
  
  stations.forEach(station => {
    // 获取位置 (兼容不同字段名)
    const posX = station['pos.x'] ?? station.x ?? 0
    const posY = station['pos.y'] ?? station.y ?? 0
    const posYaw = station['pos.yaw'] ?? station.yaw ?? 0
    
    const [x, y] = mapToWorld(posX, posY, meta)
    
    // 绘制站点圆圈
    const circleGeometry = new THREE.CircleGeometry(STATION_RADIUS, 16)
    const circleMaterial = new THREE.MeshBasicMaterial({ 
      color: STATION_COLOR,
      side: THREE.DoubleSide 
    })
    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.position.set(x, y, STATION_Z)
    circle.name = `station_${station.id}`
    
    if (mapGroup) {
      mapGroup.add(circle)
    }
    
    // 绘制方向箭头 (yaw 单位是毫弧度)
    const yawRad = posYaw / 1000
    const arrowLength = 0.3  // 300mm (更大以便看到)
    const arrowEndX = x + arrowLength * Math.cos(yawRad)
    const arrowEndY = y + arrowLength * Math.sin(yawRad)
    
    // 箭头主体
    const arrowPoints = [
      new THREE.Vector3(x, y, STATION_Z + 0.001),
      new THREE.Vector3(arrowEndX, arrowEndY, STATION_Z + 0.001)
    ]
    const arrowGeometry = new THREE.BufferGeometry().setFromPoints(arrowPoints)
    const arrowMaterial = new THREE.LineBasicMaterial({ color: ARROW_COLOR, linewidth: 3 })
    const arrow = new THREE.Line(arrowGeometry, arrowMaterial)
    arrow.name = `station_arrow_${station.id}`
    
    if (mapGroup) {
      mapGroup.add(arrow)
    }
    
    // 箭头头部
    const headLength = 0.1  // 更大的箭头头部
    const headAngle = 2.5  // ~143度
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
    head.name = `station_arrow_head_${station.id}`
    
    if (mapGroup) {
      mapGroup.add(head)
    }
  })
}

// 重新加载地图 (供外部调用)
const reloadMap = async () => {
  await loadMapData()
}

// 暴露给父组件
defineExpose({
  reloadMap
})

// 生命周期
onMounted(async () => {
  initScene()
  await loadRobotModel()
  await loadMapData()  // 加载地图
  animate()
  
  if (props.enableRealtime) {
    startJointStatePolling()
  }
  
  // 监听地图刷新事件
  eventBus.on(EVENTS.MAP_REFRESHED, reloadMap)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  
  if (jointStateInterval) {
    clearInterval(jointStateInterval)
  }
  
  window.removeEventListener('resize', onWindowResize)
  
  // 移除地图刷新事件监听
  eventBus.off(EVENTS.MAP_REFRESHED, reloadMap)
  
  if (renderer) {
    renderer.dispose()
  }
  
  // 清理地图对象
  clearMapObjects()
  
  // 清理机器人模型
  if (robot) {
    scene.remove(robot)
    robot.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose())
        } else {
          child.material.dispose()
        }
      }
    })
    robot = null
  }
})
</script>

<style scoped>
.urdf-viewer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
}

.viewer-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #16213e;
  border-bottom: 1px solid #0f3460;
}

.viewer-canvas {
  flex: 1;
  min-height: 300px;
  max-height: 500px;
  overflow: hidden;
}

.joint-panel {
  background-color: #16213e;
  border-top: 1px solid #0f3460;
  padding: 12px 15px;
}

.joint-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: #e4e4e4;
  font-weight: bold;
  font-size: 13px;
}

.arms-container {
  display: flex;
  gap: 20px;
}

.arm-section {
  flex: 1;
  background-color: #1a1a2e;
  border-radius: 6px;
  padding: 8px;
}

.arm-label {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid;
}

.arm-section.left .arm-label {
  border-color: #3498db;
}

.arm-section.right .arm-label {
  border-color: #9b59b6;
}

.joint-row {
  display: flex;
  gap: 4px;
}

.joint-box {
  flex: 1;
  background-color: #16213e;
  border-radius: 4px;
  padding: 4px 2px;
  text-align: center;
  transition: all 0.2s;
}

.joint-box.active {
  background-color: #1e3a5f;
  box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
}

.j-name {
  display: block;
  font-size: 9px;
  color: #64748b;
  font-weight: bold;
}

.j-val {
  display: block;
  font-size: 10px;
  font-family: 'Consolas', monospace;
  margin-top: 2px;
}

.j-val.pos {
  color: #2ecc71;
}

.j-val.neg {
  color: #e67e22;
}
</style>
