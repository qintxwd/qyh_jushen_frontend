/**
 * 任务状态 WebSocket 连接 Hook
 */

import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useTaskEditorStore } from '@/stores/task'

export interface NodeStatusData {
  node_id: string
  node_type?: string
  node_name?: string
  status: 'idle' | 'running' | 'success' | 'failure' | 'halted'
  message?: string
  duration?: number
  // 扩展字段（用于复杂场景）
  children_count?: number
  current_child_index?: number
  current_iteration?: number
  total_iterations?: number
}

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
    node_statuses: NodeStatusData[]
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
      
      // 🔍 调试日志 - 详细显示收到的状态
      console.group(`📨 收到任务状态更新 [${new Date().toLocaleTimeString()}]`)
      console.log('📊 任务状态:', data.status)
      console.log('🎯 当前节点:', data.current_node_id)
      console.log('📈 进度:', `${(data.progress * 100).toFixed(0)}% (${data.completed_nodes}/${data.total_nodes})`)
      console.log('📝 节点状态数组长度:', data.node_statuses?.length || 0)
      
      if (data.node_statuses && data.node_statuses.length > 0) {
        console.table(data.node_statuses.map(ns => ({
          '节点ID': ns.node_id,
          '状态': ns.status,
          '图标': ns.status === 'idle' ? '⚪' : ns.status === 'running' ? '🔵' : ns.status === 'success' ? '✅' : '❌'
        })))
      }
      console.groupEnd()
      
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
        // 如果后端提供了完整的节点状态列表，直接使用
        console.log('✅ 使用node_statuses更新节点')
        for (const nodeStatus of data.node_statuses) {
          taskStore.updateNodeStatus(nodeStatus.node_id, {
            node_id: nodeStatus.node_id,
            node_type: nodeStatus.node_type,
            node_name: nodeStatus.node_name,
            status: nodeStatus.status,
            message: nodeStatus.message,
            duration: nodeStatus.duration,
            // 扩展字段
            children_count: nodeStatus.children_count,
            current_child_index: nodeStatus.current_child_index,
            current_iteration: nodeStatus.current_iteration,
            total_iterations: nodeStatus.total_iterations
          })
        }
      } else if (data.current_node_id) {
        // 如果只有 current_node_id，根据它来更新节点状态（兼容旧版本）
        console.log('⚠️  只使用current_node_id更新（node_statuses为空）')
        taskStore.updateCurrentRunningNode(data.current_node_id, data.status)
      } else {
        // 没有节点状态信息，检查是否是结束状态
        if (['completed', 'cancelled', 'failed'].includes(data.status)) {
          console.log('📋 任务结束，清理节点状态')
          // 任务结束时，把所有 running 的节点标记为最终状态
          taskStore.updateCurrentRunningNode('', data.status === 'completed' ? 'success' : data.status)
        } else {
          console.warn('⚠️  没有节点状态信息！')
        }
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
