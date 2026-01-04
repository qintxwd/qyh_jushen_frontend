<template>
  <div class="ros-gui-container">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>ROS GUI 控制面板</h2>
          <el-button @click="goBack" size="small">
            <SvgIcon name="back" :size="16" />
            返回
          </el-button>
        </div>
      </el-header>

      <el-main>
        <el-tabs v-model="activeTab" type="card" @tab-change="handleTabChange">
          <!-- 夹爪控制 GUI -->
          <el-tab-pane label="夹爪控制" name="gripper">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>JODELL EPG 夹爪控制</span>
                  <div>
                    <el-tag v-if="guiStatus.gripper === 'running'" type="success">运行中</el-tag>
                    <el-tag v-else type="info">未启动</el-tag>
                    <el-button 
                      :type="guiStatus.gripper === 'running' ? 'danger' : 'primary'"
                      size="small"
                      @click="toggleGUI('gripper')"
                      :loading="loading.gripper"
                      style="margin-left: 10px"
                    >
                      {{ guiStatus.gripper === 'running' ? '停止' : '启动' }}
                    </el-button>
                  </div>
                </div>
              </template>
              
              <div class="gui-description">
                <SvgIcon name="infofilled" :size="16" />
                <div>
                  <p><strong>功能：</strong>双手夹爪实时监控和控制</p>
                  <ul>
                    <li>实时位置、力反馈可视化</li>
                    <li>快捷操作：全开、全闭、半开、轻抓</li>
                    <li>精确控制滑块（位置、速度、力度）</li>
                    <li>物体检测和故障诊断</li>
                  </ul>
                </div>
              </div>

              <div v-if="guiStatus.gripper === 'running'" class="gui-info">
                <el-alert 
                  title="GUI 已启动" 
                  type="success"
                  description="夹爪控制界面已在独立窗口中打开。请在窗口中进行操作。"
                  show-icon
                  :closable="false"
                />
                <div class="ros-commands">
                  <h4>ROS2 命令行测试：</h4>
                  <el-input 
                    v-model="commands.gripper.activate"
                    readonly
                    size="small"
                  >
                    <template #append>
                      <el-button @click="copyCommand(commands.gripper.activate)">
                        <SvgIcon name="copydocument" :size="16" />
                      </el-button>
                    </template>
                  </el-input>
                  <el-input 
                    v-model="commands.gripper.move"
                    readonly
                    size="small"
                    style="margin-top: 10px"
                  >
                    <template #append>
                      <el-button @click="copyCommand(commands.gripper.move)">
                        <SvgIcon name="copydocument" :size="16" />
                      </el-button>
                    </template>
                  </el-input>
                </div>
              </div>
            </el-card>
          </el-tab-pane>

          <!-- JAKA 控制 GUI -->
          <el-tab-pane label="机械臂控制" name="jaka">
            <el-row :gutter="20">
              <!-- 左侧：3D 可视化 -->
              <el-col :span="14">
                <el-card class="robot-3d-card">
                  <template #header>
                    <div class="card-header">
                      <span>双臂机器人 3D 视图</span>
                      <el-tag type="primary" size="small">实时</el-tag>
                    </div>
                  </template>
                  
                  <URDFViewer 
                    :enable-realtime="true"
                  />
                </el-card>
              </el-col>

              <!-- 右侧：控制面板 -->
              <el-col :span="10">
                <el-card>
                  <template #header>
                    <div class="card-header">
                      <span>JAKA 双臂机器人控制</span>
                      <div>
                        <el-tag v-if="guiStatus.jaka === 'running'" type="success">运行中</el-tag>
                        <el-tag v-else type="info">未启动</el-tag>
                        <el-button 
                          :type="guiStatus.jaka === 'running' ? 'danger' : 'primary'"
                          size="small"
                          @click="toggleGUI('jaka')"
                          :loading="loading.jaka"
                          style="margin-left: 10px"
                        >
                          {{ guiStatus.jaka === 'running' ? '停止' : '启动' }}
                        </el-button>
                      </div>
                    </div>
                  </template>
                  
                  <div class="gui-description">
                    <SvgIcon name="infofilled" :size="16" />
                    <div>
                      <p><strong>功能：</strong>JAKA 双臂完整控制界面</p>
                      <ul>
                        <li>关节空间和笛卡尔空间控制</li>
                        <li>伺服模式和点到点运动</li>
                        <li>实时状态监控</li>
                        <li>参数配置</li>
                      </ul>
                    </div>
                  </div>

                  <el-divider />

                  <!-- 快捷控制 -->
                  <div class="quick-controls">
                    <h4>快捷控制</h4>
                    <el-space wrap>
                      <el-button 
                        type="primary" 
                        size="small"
                        @click="sendQuickCommand('power_on')"
                      >
                        <SvgIcon name="videoplay" :size="16" />
                        上电
                      </el-button>
                      <el-button 
                        type="success" 
                        size="small"
                        @click="sendQuickCommand('enable')"
                      >
                        <SvgIcon name="check" :size="16" />
                        使能
                      </el-button>
                      <el-button 
                        type="warning" 
                        size="small"
                        @click="sendQuickCommand('disable')"
                      >
                        <SvgIcon name="close" :size="16" />
                        去使能
                      </el-button>
                      <el-button 
                        type="danger" 
                        size="small"
                        @click="sendQuickCommand('power_off')"
                      >
                        <SvgIcon name="switchbutton" :size="16" />
                        下电
                      </el-button>
                    </el-space>
                  </div>

                  <el-divider />

                  <div v-if="guiStatus.jaka === 'running'" class="gui-info">
                    <el-alert 
                      title="GUI 已启动" 
                      type="success"
                      description="JAKA 控制界面已在独立窗口中打开。"
                      show-icon
                      :closable="false"
                    />
                  </div>

                  <div class="ros-commands">
                    <h4>ROS2 命令行测试：</h4>
                    <el-input 
                      v-model="commands.jaka.startServo"
                      readonly
                      size="small"
                    >
                      <template #append>
                        <el-button @click="copyCommand(commands.jaka.startServo)">
                          <SvgIcon name="copydocument" :size="16" />
                        </el-button>
                      </template>
                    </el-input>
                    <el-input 
                      v-model="commands.jaka.getState"
                      readonly
                      size="small"
                      style="margin-top: 10px"
                    >
                      <template #append>
                        <el-button @click="copyCommand(commands.jaka.getState)">
                          <SvgIcon name="copydocument" :size="16" />
                        </el-button>
                      </template>
                    </el-input>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>

          <!-- 底盘控制 GUI -->
          <el-tab-pane label="底盘控制" name="chassis">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>Standard 移动底盘控制</span>
                  <div>
                    <el-tag v-if="guiStatus.chassis === 'running'" type="success">运行中</el-tag>
                    <el-tag v-else type="info">未启动</el-tag>
                    <el-button 
                      :type="guiStatus.chassis === 'running' ? 'danger' : 'primary'"
                      size="small"
                      @click="toggleGUI('chassis')"
                      :loading="loading.chassis"
                      style="margin-left: 10px"
                    >
                      {{ guiStatus.chassis === 'running' ? '停止' : '启动' }}
                    </el-button>
                  </div>
                </div>
              </template>
              
              <div class="gui-description">
                <SvgIcon name="infofilled" :size="16" />
                <div>
                  <p><strong>功能：</strong>移动底盘状态监控和控制</p>
                  <ul>
                    <li>实时电池电量和速度显示</li>
                    <li>手动速度控制（线速度/角速度）</li>
                    <li>导航目标设置</li>
                    <li>急停和充电控制</li>
                    <li>地图和站点管理</li>
                  </ul>
                </div>
              </div>

              <div v-if="guiStatus.chassis === 'running'" class="gui-info">
                <el-alert 
                  title="GUI 已启动" 
                  type="success"
                  description="底盘控制界面已在独立窗口中打开。请在窗口中进行操作。"
                  show-icon
                  :closable="false"
                />
                <div class="ros-commands">
                  <h4>ROS2 命令行测试：</h4>
                  <el-input 
                    v-model="commands.chassis.cmdVel"
                    readonly
                    size="small"
                  >
                    <template #append>
                      <el-button @click="copyCommand(commands.chassis.cmdVel)">
                        <SvgIcon name="copydocument" :size="16" />
                      </el-button>
                    </template>
                  </el-input>
                  <el-input 
                    v-model="commands.chassis.status"
                    readonly
                    size="small"
                    style="margin-top: 10px"
                  >
                    <template #append>
                      <el-button @click="copyCommand(commands.chassis.status)">
                        <SvgIcon name="copydocument" :size="16" />
                      </el-button>
                    </template>
                  </el-input>
                </div>
              </div>
            </el-card>
          </el-tab-pane>

          <!-- 全部启动 -->
          <el-tab-pane label="全部管理" name="all">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>批量操作</span>
                </div>
              </template>

              <div class="batch-operations">
                <el-alert 
                  title="提示" 
                  type="info"
                  description="这里可以批量启动或停止所有 ROS GUI 界面"
                  show-icon
                  :closable="false"
                  style="margin-bottom: 20px"
                />

                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-button 
                      type="primary" 
                      @click="startAllGUI"
                      :loading="loading.all"
                      style="width: 100%"
                      size="large"
                    >
                      <SvgIcon name="videoplay" :size="16" />
                      启动所有 GUI
                    </el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button 
                      type="danger" 
                      @click="stopAllGUI"
                      :loading="loading.all"
                      style="width: 100%"
                      size="large"
                    >
                      <SvgIcon name="videopause" :size="16" />
                      停止所有 GUI
                    </el-button>
                  </el-col>
                </el-row>

                <el-divider />

                <h3>当前状态</h3>
                <el-descriptions :column="1" border>
                  <el-descriptions-item label="夹爪控制">
                    <el-tag v-if="guiStatus.gripper === 'running'" type="success">运行中</el-tag>
                    <el-tag v-else type="info">未启动</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="机械臂控制">
                    <el-tag v-if="guiStatus.jaka === 'running'" type="success">运行中</el-tag>
                    <el-tag v-else type="info">未启动</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="底盘控制">
                    <el-tag v-if="guiStatus.chassis === 'running'" type="success">运行中</el-tag>
                    <el-tag v-else type="info">未启动</el-tag>
                  </el-descriptions-item>
                </el-descriptions>
              </div>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import URDFViewer from '@/components/URDFViewer.vue'

const router = useRouter()
const activeTab = ref('jaka')

// GUI 状态
const guiStatus = reactive({
  gripper: 'stopped',
  jaka: 'stopped',
  chassis: 'stopped'
})

// 加载状态
const loading = reactive({
  gripper: false,
  jaka: false,
  chassis: false,
  all: false
})

// ROS2 命令
const commands = reactive({
  gripper: {
    activate: 'ros2 service call /left/activate_gripper qyh_gripper_msgs/srv/ActivateGripper',
    move: 'ros2 service call /left/move_gripper qyh_gripper_msgs/srv/MoveGripper "{position: 255, speed: 200, force: 150}"'
  },
  jaka: {
    startServo: 'ros2 service call /jaka/start_servo qyh_jaka_control_msgs/srv/StartServo',
    getState: 'ros2 topic echo /robot_state'
  },
  chassis: {
    cmdVel: 'ros2 topic pub /cmd_vel geometry_msgs/Twist "{linear: {x: 0.5, y: 0.0, z: 0.0}}"',
    status: 'ros2 topic echo /chassis/status'
  }
})

import { getApiV1BaseUrl } from '@/utils/apiUrl'
// API 基础 URL - 动态获取
const getApiBase = () => getApiV1BaseUrl()

// 启动/停止 GUI
const toggleGUI = async (guiType: string) => {
  loading[guiType] = true
  try {
    const action = guiStatus[guiType] === 'running' ? 'stop' : 'start'
    const response = await axios.post(`${getApiBase()}/ros-gui/${guiType}/${action}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.data.success) {
      guiStatus[guiType] = action === 'start' ? 'running' : 'stopped'
      ElMessage.success(response.data.message || `${guiType} GUI ${action === 'start' ? '启动' : '停止'}成功`)
    } else {
      ElMessage.error(response.data.message || '操作失败')
    }
  } catch (error) {
    console.error(`Toggle ${guiType} GUI error:`, error)
    ElMessage.error(`操作失败: ${error.response?.data?.detail || error.message}`)
  } finally {
    loading[guiType] = false
  }
}

// 启动所有 GUI
const startAllGUI = async () => {
  loading.all = true
  try {
    await Promise.all([
      toggleGUI('gripper'),
      toggleGUI('jaka'),
      toggleGUI('chassis')
    ])
    ElMessage.success('所有 GUI 启动成功')
  } catch (error) {
    ElMessage.error('批量启动失败')
  } finally {
    loading.all = false
  }
}

// 停止所有 GUI
const stopAllGUI = async () => {
  loading.all = true
  try {
    const promises = []
    if (guiStatus.gripper === 'running') promises.push(toggleGUI('gripper'))
    if (guiStatus.jaka === 'running') promises.push(toggleGUI('jaka'))
    if (guiStatus.chassis === 'running') promises.push(toggleGUI('chassis'))
    
    await Promise.all(promises)
    ElMessage.success('所有 GUI 已停止')
  } catch (error) {
    ElMessage.error('批量停止失败')
  } finally {
    loading.all = false
  }
}

// 快捷命令
const sendQuickCommand = async (command: string) => {
  try {
    const response = await axios.post(`${getApiBase()}/robot/${command}`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.data.success) {
      ElMessage.success(response.data.message || '命令执行成功')
    } else {
      ElMessage.error(response.data.message || '命令执行失败')
    }
  } catch (error) {
    console.error(`Quick command ${command} error:`, error)
    ElMessage.error(`命令执行失败: ${error.response?.data?.detail || error.message}`)
  }
}

// 复制命令
const copyCommand = (command: string) => {
  navigator.clipboard.writeText(command)
  ElMessage.success('命令已复制到剪贴板')
}

// 返回
const goBack = () => {
  router.push('/')
}

// 切换标签页
const handleTabChange = (tabName: string) => {
  console.log('切换到标签页:', tabName)
}

// 获取 GUI 状态
const fetchGUIStatus = async () => {
  try {
    const response = await axios.get(`${getApiBase()}/ros-gui/status`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.data) {
      Object.assign(guiStatus, response.data)
    }
  } catch (error) {
    console.error('获取 GUI 状态失败:', error)
  }
}

// 定时刷新状态
let statusInterval: number | null = null

onMounted(() => {
  fetchGUIStatus()
  statusInterval = setInterval(fetchGUIStatus, 5000) // 每5秒刷新一次
})

onUnmounted(() => {
  if (statusInterval) {
    clearInterval(statusInterval)
  }
})
</script>

<style scoped>
.ros-gui-container {
  height: 100vh;
  background-color: #f5f7fa;
}

.el-header {
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h2 {
  margin: 0;
  font-size: 18px;
}

.el-main {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.gui-description {
  display: flex;
  gap: 15px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 20px;
}

.gui-description .el-icon {
  font-size: 24px;
  color: #409eff;
  margin-top: 5px;
}

.gui-description p {
  margin: 0 0 10px 0;
}

.gui-description ul {
  margin: 0;
  padding-left: 20px;
}

.gui-description li {
  margin: 5px 0;
}

.gui-info {
  margin-top: 20px;
}

.ros-commands {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.ros-commands h4 {
  margin: 0 0 10px 0;
  color: #606266;
}

.batch-operations h3 {
  margin: 20px 0 10px 0;
  color: #303133;
}

:deep(.el-tabs__item) {
  font-size: 15px;
}

:deep(.el-card__body) {
  min-height: 300px;
}

.robot-3d-card {
  height: 700px;
}

.robot-3d-card :deep(.el-card__body) {
  padding: 0;
  height: calc(100% - 57px);
  overflow: hidden;
}

.quick-controls {
  margin: 15px 0;
}

.quick-controls h4 {
  margin: 0 0 10px 0;
  color: #303133;
  font-size: 14px;
}
</style>
