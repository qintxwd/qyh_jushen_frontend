/**
 * 3D 场景管理器 - 单例模式
 * 保持场景状态，避免重复加载 URDF
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import URDFLoader from 'urdf-loader'
import type { URDFRobot } from 'urdf-loader'
import apiClient from '@/api/client'
import { getApiBaseUrl } from '@/utils/apiUrl'

// API 配置 - 动态获取，支持远程访问
const getApiBase = () => getApiBaseUrl()

// 底盘尺寸 (m)
const CHASSIS_LENGTH = 0.95
const CHASSIS_WIDTH = 0.62
const CHASSIS_HEIGHT = 0.292
const ARM_BASE_OFFSET = 0.60

// 单例场景管理器
class SceneManager {
  // 初始化状态
  private _initialized = false
  private _urdfLoaded = false
  private _urdfLoading = false
  
  // Three.js 核心对象
  scene: THREE.Scene | null = null
  camera: THREE.PerspectiveCamera | null = null
  renderer: THREE.WebGLRenderer | null = null
  controls: OrbitControls | null = null
  
  // 机器人和底盘
  robot: URDFRobot | null = null
  chassisGroup: THREE.Group | null = null
  mapGroup: THREE.Group | null = null
  gridHelper: THREE.GridHelper | null = null
  showGrid = false  // 默认不显示网格
  
  // 状态
  chassisPose = { x: 0, y: 0, yaw: 0 }
  liftHeight = 0
  leftJoints = [0, 0, 0, 0, 0, 0, 0]
  rightJoints = [0, 0, 0, 0, 0, 0, 0]
  
  // 回调
  onLoadStatusChange: ((status: string) => void) | null = null
  onLoadError: ((error: string) => void) | null = null
  onModelLoaded: (() => void) | null = null
  
  // 动画 ID
  private animationId: number | null = null
  
  get initialized() { return this._initialized }
  get urdfLoaded() { return this._urdfLoaded }
  
  /**
   * 初始化场景（只执行一次）
   */
  initScene(container: HTMLElement): boolean {
    if (this._initialized && this.renderer) {
      // 已初始化，只需要重新附加渲染器到容器
      console.log('[SceneManager] 重新附加渲染器到容器')
      if (this.renderer.domElement.parentElement !== container) {
        container.appendChild(this.renderer.domElement)
      }
      this.handleResize(container)
      this.startAnimation()
      return true
    }
    
    console.log('[SceneManager] 首次初始化场景')
    
    // 创建场景
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x888888)
    
    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.01,
      100
    )
    this.camera.up.set(0, 0, 1)
    this.camera.position.set(1.5, -1.5, 1.2)
    this.camera.lookAt(0, 0, 0)
    
    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(this.renderer.domElement)
    
    // 创建控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.minDistance = 0.3
    this.controls.maxDistance = 50
    this.controls.target.set(0, 0, 0)
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    }
    this.controls.minPolarAngle = 0.1
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1
    this.controls.rotateSpeed = 0.8
    this.controls.screenSpacePanning = false
    this.controls.update()
    
    // 添加灯光
    this.addLights()
    
    // 添加网格
    this.addGrid()
    
    // 添加坐标轴
    this.addAxes()
    
    this._initialized = true
    
    // 开始动画循环
    this.startAnimation()
    
    return false // 返回 false 表示首次初始化
  }
  
  /**
   * 加载 URDF（只执行一次）
   */
  async loadURDF(): Promise<void> {
    if (this._urdfLoaded || this._urdfLoading) {
      console.log('[SceneManager] URDF 已加载或正在加载，跳过')
      return
    }
    
    this._urdfLoading = true
    
    try {
      this.onLoadStatusChange?.('正在获取 URDF 文件...')
      
      const data = await apiClient.get('/api/v1/robot-model/urdf')
      
      let urdf = ''
      if (typeof data === 'string') {
        urdf = data
      } else if (data && typeof data === 'object' && 'urdf' in data) {
         // @ts-ignore
         urdf = data.urdf
      } else {
        console.error('[SceneManager] 无效的 URDF 数据格式', data)
        throw new Error('无效的 URDF 数据格式')
      }
      
      console.log('[SceneManager] URDF loaded, length:', urdf.length)
      this.onLoadStatusChange?.('正在解析 URDF...')
      
      const loader = new URDFLoader()
      
      loader.packages = (pkg: string) => {
        return `${getApiBase()}/api/v1/robot-model/package/${pkg}`
      }
      
      loader.loadMeshCb = (
        path: string,
        manager: THREE.LoadingManager,
        onComplete: (mesh: THREE.Object3D, err?: Error) => void
      ) => {
        let meshUrl = path
        if (path.startsWith('/api/')) {
          meshUrl = `${getApiBase()}${path}`
        } else if (!path.startsWith('http')) {
          meshUrl = `${getApiBase()}/api/v1/robot-model/package/${path}`
        }
        
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
          () => {
            const geometry = new THREE.BoxGeometry(0.02, 0.02, 0.02)
            const material = new THREE.MeshStandardMaterial({ color: 0xff0000, wireframe: true })
            const placeholder = new THREE.Mesh(geometry, material)
            onComplete(placeholder)
          }
        )
      }
      
      this.onLoadStatusChange?.('正在加载 3D 模型...')
      
      this.robot = loader.parse(urdf)
      
      if (!this.robot) {
        throw new Error('URDF 解析失败')
      }
      
      // 设置材质
      this.robot.traverse((child) => {
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
      
      // 创建底盘
      this.createChassis()
      
      this._urdfLoaded = true
      this._urdfLoading = false
      
      this.onModelLoaded?.()
      console.log('[SceneManager] URDF 加载完成')
      
    } catch (error: any) {
      this._urdfLoading = false
      console.error('[SceneManager] URDF 加载失败:', error)
      this.onLoadError?.(error.message || '未知错误')
    }
  }
  
  private addLights() {
    if (!this.scene) return
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 10, 7)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)
    
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4)
    fillLight.position.set(-5, 5, -5)
    this.scene.add(fillLight)
    
    const bottomLight = new THREE.DirectionalLight(0xffffff, 0.2)
    bottomLight.position.set(0, -5, 0)
    this.scene.add(bottomLight)
  }
  
  private addGrid() {
    if (!this.scene) return
    this.gridHelper = new THREE.GridHelper(100, 100, 0x444444, 0x333333)
    this.gridHelper.rotation.x = Math.PI / 2
    this.gridHelper.visible = this.showGrid  // 默认不显示
    this.scene.add(this.gridHelper)
  }
  
  // 切换网格显示
  toggleGrid() {
    this.showGrid = !this.showGrid
    if (!this.gridHelper && this.scene) {
      this.addGrid()
    }
    if (this.gridHelper) {
      this.gridHelper.visible = this.showGrid
    }
    return this.showGrid
  }
  
  private addAxes() {
    if (!this.scene) return
    const axesHelper = new THREE.AxesHelper(2)
    this.scene.add(axesHelper)
  }
  
  private createChassis() {
    if (!this.scene || !this.robot) return
    
    this.chassisGroup = new THREE.Group()
    this.chassisGroup.name = 'chassis_group'
    
    // 底盘长方体
    const chassisGeometry = new THREE.BoxGeometry(CHASSIS_LENGTH, CHASSIS_WIDTH, CHASSIS_HEIGHT)
    const chassisMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a5298,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.9
    })
    const chassisMesh = new THREE.Mesh(chassisGeometry, chassisMaterial)
    chassisMesh.position.set(0, 0, CHASSIS_HEIGHT / 2)
    chassisMesh.castShadow = true
    chassisMesh.receiveShadow = true
    this.chassisGroup.add(chassisMesh)
    
    // 边框线
    const edges = new THREE.EdgesGeometry(chassisGeometry)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff })
    const wireframe = new THREE.LineSegments(edges, lineMaterial)
    wireframe.position.copy(chassisMesh.position)
    this.chassisGroup.add(wireframe)
    
    // 方向箭头 - 指向X轴正方向（前进方向）
    const arrowGeometry = new THREE.ConeGeometry(0.06, 0.18, 8)
    const arrowMaterial = new THREE.MeshStandardMaterial({ color: 0xff3300 })  // 更亮的红色
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
    // ConeGeometry 默认沿 Y 轴，需要旋转到 X 轴正方向
    arrow.rotation.z = -Math.PI / 2  // 绕Z轴旋转-90度，让锥体指向X正方向
    arrow.position.set(CHASSIS_LENGTH / 2 + 0.12, 0, CHASSIS_HEIGHT / 2)  // 放在底盘前端
    this.chassisGroup.add(arrow)
    
    // 将机器人添加到底盘组
    this.chassisGroup.add(this.robot)
    this.updateArmPosition()
    
    this.scene.add(this.chassisGroup)
  }
  
  updateArmPosition() {
    if (!this.robot) return
    const armHeight = CHASSIS_HEIGHT + (this.liftHeight / 1000) + ARM_BASE_OFFSET
    this.robot.position.set(0, 0, armHeight)
  }
  
  updateChassisPosition() {
    if (!this.chassisGroup) return
    this.chassisGroup.position.set(this.chassisPose.x, this.chassisPose.y, 0)
    this.chassisGroup.rotation.z = this.chassisPose.yaw
    this.updateArmPosition()
  }
  
  updateJointAngles() {
    if (!this.robot) return
    
    for (let i = 0; i < 7; i++) {
      // 使用URDF中的关节名称: l-j1, l-j2, ... 和 r-j1, r-j2, ...
      const leftJointName = `l-j${i + 1}`
      const rightJointName = `r-j${i + 1}`
      
      if (this.robot.joints[leftJointName]) {
        this.robot.setJointValue(leftJointName, this.leftJoints[i])
      }
      if (this.robot.joints[rightJointName]) {
        this.robot.setJointValue(rightJointName, this.rightJoints[i])
      }
    }
  }
  
  handleResize(container: HTMLElement) {
    if (!this.camera || !this.renderer) return
    
    const width = container.clientWidth
    const height = container.clientHeight
    
    if (width > 0 && height > 0) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    }
  }
  
  resetCamera() {
    if (!this.camera || !this.controls) return
    this.camera.up.set(0, 0, 1)
    this.camera.position.set(1.5, -1.5, 1.2)
    this.controls.target.set(0, 0, 0)
    this.controls.update()
  }

  setTopView() {
    if (!this.camera || !this.controls) return
    const target = this.controls.target.clone()
    const distance = Math.max(this.camera.position.distanceTo(target), 2)
    // 顶视图：从 +Z 方向俯视
    this.camera.up.set(0, 1, 0)
    this.camera.position.set(target.x, target.y, target.z + distance)
    this.controls.target.copy(target)
    this.controls.update()
  }

  setFrontView() {
    if (!this.camera || !this.controls) return
    const target = this.controls.target.clone()
    const distance = Math.max(this.camera.position.distanceTo(target), 2)
    // 前视图：沿 +X 方向观察，稍微抬高
    this.camera.up.set(0, 0, 1)
    this.camera.position.set(target.x + distance, target.y, target.z + distance * 0.25)
    this.controls.target.copy(target)
    this.controls.update()
  }
  
  private startAnimation() {
    if (this.animationId !== null) return
    
    const animate = () => {
      this.animationId = requestAnimationFrame(animate)
      this.controls?.update()
      if (this.scene && this.camera && this.renderer) {
        this.renderer.render(this.scene, this.camera)
      }
    }
    animate()
  }
  
  stopAnimation() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }
  
  /**
   * 从容器中分离渲染器（不销毁）
   */
  detachRenderer() {
    this.stopAnimation()
    if (this.renderer?.domElement?.parentElement) {
      this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
    }
  }
}

// 导出单例
export const sceneManager = new SceneManager()
