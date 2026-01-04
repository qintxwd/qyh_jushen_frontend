/**
 * 任务状态 WebSocket 连接 Hook
 */

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useTaskEditorStore } from '@/stores/task'

export interface TaskStatusMessage {
  type: 'task_status' | 'node_status' | 'error'
  data: {
    task_id?: string
    task_name?: string
    status: 'idle' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled'
    current_node_id?: string
    completed_nodes: number
    total_nodes: number
    progress: number
    elapsed_time: number
    node_statuses: Array<{
      node_id: string
      status: 'idle' | 'running' | 'success' | 'failure'
      message?: string
    }>
    error?: string
  }
}

export function useTaskWebSocket() {
  const taskStore = useTaskEditorStore()
  
  const ws = ref<WebSocket | null>(null)
  const connected = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  const reconnectDelay = 2000
  
  let reconnectTimer: number | null = null
  let heartbeatTimer: number | null = null
  
  // WebSocket URL
  const wsUrl = `ws://${window.location.hostname}:8000/api/v1/task/ws`
  
  function connect() {
    if (ws.value?.readyState === WebSocket.OPEN) {
      return
    }
    
    try {
      ws.value = new WebSocket(wsUrl)
      
      ws.value.onopen = () => {
        console.log('✅ Task WebSocket 已连接')
        connected.value = true
        reconnectAttempts.value = 0
        
        // 启动心跳
        startHeartbeat()
      }
      
      ws.value.onmessage = (event) => {
        try {
          const message: TaskStatusMessage = JSON.parse(event.data)
          handleMessage(message)
        } catch (e) {
          // 可能是 pong 响应
          if (event.data !== 'pong') {
            console.warn('无法解析 WebSocket 消息:', event.data)
          }
        }
      }
      
      ws.value.onclose = () => {
        console.log('🔌 Task WebSocket 已断开')
        connected.value = false
        stopHeartbeat()
        
        // 尝试重连
        if (reconnectAttempts.value < maxReconnectAttempts) {
          reconnectAttempts.value++
          console.log(`⏳ ${reconnectDelay / 1000}秒后重连 (${reconnectAttempts.value}/${maxReconnectAttempts})`)
          reconnectTimer = window.setTimeout(connect, reconnectDelay)
        }
      }
      
      ws.value.onerror = (error) => {
        console.error('❌ Task WebSocket 错误:', error)
      }
      
    } catch (e) {
      console.error('❌ 创建 WebSocket 失败:', e)
    }
  }
  
  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    
    stopHeartbeat()
    
    if (ws.value) {
      ws.value.close()
      ws.value = null
    }
    
    connected.value = false
  }
  
  function startHeartbeat() {
    stopHeartbeat()
    heartbeatTimer = window.setInterval(() => {
      if (ws.value?.readyState === WebSocket.OPEN) {
        ws.value.send('ping')
      }
    }, 30000) // 30秒心跳
  }
  
  function stopHeartbeat() {
    if (heartbeatTimer) {
      clearInterval(heartbeatTimer)
      heartbeatTimer = null
    }
  }
  
  function handleMessage(message: TaskStatusMessage) {
    if (message.type === 'task_status') {
      const data = message.data
      
      // 更新 store 中的执行状态
      taskStore.updateExecutionState({
        task_id: data.task_id || '',
        status: data.status,
        current_node_id: data.current_node_id,
        progress: data.progress,
        message: data.error
      })
      
      // 更新节点状态
      if (data.node_statuses && data.node_statuses.length > 0) {
        // 如果后端提供了完整的节点状态列表
        for (const nodeStatus of data.node_statuses) {
          taskStore.updateNodeStatus(nodeStatus.node_id, {
            node_id: nodeStatus.node_id,
            status: nodeStatus.status,
            message: nodeStatus.message
          })
        }
      } else if (data.current_node_id) {
        // 如果只有 current_node_id，根据它来更新节点状态
        // 先将之前的 running 节点标记为其他状态
        taskStore.updateCurrentRunningNode(data.current_node_id, data.status)
      }
      
      // 更新执行标志
      taskStore.isExecuting = data.status === 'running' || data.status === 'paused'
    }
  }
  
  // 组件挂载时自动连接
  onMounted(() => {
    connect()
  })
  
  // 组件卸载时断开连接
  onUnmounted(() => {
    disconnect()
  })
  
  return {
    connected,
    connect,
    disconnect,
    reconnectAttempts
  }
}
