/**
 * 任务编辑器状态管理
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Node, Edge, XYPosition } from '@vue-flow/core'
import { 
  type TaskNode, 
  type TaskDefinition, 
  type NodeType, 
  type NodeStatus,
  type TaskExecutionState,
  getNodeDefinition,
  NODE_DEFINITIONS
} from '@/api/task'

// Vue Flow 节点数据
export interface FlowNodeData {
  type: NodeType
  label: string
  params: Record<string, any>
  status?: 'idle' | 'running' | 'success' | 'failure'
  color?: string
  icon?: string
}

export type FlowNode = Node<FlowNodeData>
export type FlowEdge = Edge

// 生成唯一 ID
let nodeIdCounter = 0
export function generateNodeId(): string {
  return `node_${Date.now()}_${++nodeIdCounter}`
}

export const useTaskEditorStore = defineStore('taskEditor', () => {
  // ==================== 状态 ====================
  
  // 当前编辑的任务
  const currentTask = ref<TaskDefinition | null>(null)
  const isDirty = ref(false)
  
  // Vue Flow 节点和边
  const nodes = ref<FlowNode[]>([])
  const edges = ref<FlowEdge[]>([])
  
  // 选中的节点
  const selectedNodeId = ref<string | null>(null)
  
  // 执行状态
  const executionState = ref<TaskExecutionState | null>(null)
  const nodeStatuses = ref<Map<string, NodeStatus>>(new Map())
  
  // UI 状态
  const nodePaletteVisible = ref(true)
  const propertyPanelVisible = ref(true)
  const isExecuting = ref(false)
  
  // ==================== 计算属性 ====================
  
  const selectedNode = computed(() => {
    if (!selectedNodeId.value) return null
    return nodes.value.find(n => n.id === selectedNodeId.value) || null
  })
  
  const selectedNodeDefinition = computed(() => {
    if (!selectedNode.value || !selectedNode.value.data) return null
    return getNodeDefinition(selectedNode.value.data.type) || null
  })
  
  const canExecute = computed(() => {
    return nodes.value.length > 0 && !isExecuting.value
  })
  
  const canPause = computed(() => {
    return isExecuting.value && executionState.value?.status === 'running'
  })
  
  const canResume = computed(() => {
    return executionState.value?.status === 'paused'
  })
  
  const canCancel = computed(() => {
    return isExecuting.value || executionState.value?.status === 'paused'
  })
  
  // ==================== 方法 ====================
  
  /** 新建任务 */
  function newTask() {
    currentTask.value = {
      name: '新任务',
      description: '',
      root: { id: 'root', type: 'Sequence', params: {}, children: [] }
    }
    nodes.value = []
    edges.value = []
    selectedNodeId.value = null
    isDirty.value = false
    
    // 不再添加默认的 Sequence 节点，用户直接拖拽技能节点即可
  }
  
  /** 加载任务 */
  function loadTask(task: TaskDefinition) {
    currentTask.value = task
    
    // 将任务树转换为 Vue Flow 节点（根 Sequence 会被隐藏展开）
    const { flowNodes, flowEdges } = taskTreeToFlow(task.root, undefined, { x: 400, y: 50 }, true)
    nodes.value = flowNodes
    edges.value = flowEdges
    
    selectedNodeId.value = null
    isDirty.value = false
  }
  
  /** 添加节点 */
  function addNode(type: NodeType, position: XYPosition, parentId?: string): FlowNode | null {
    const nodeDef = getNodeDefinition(type)
    if (!nodeDef) return null
    
    // 构建默认参数
    const defaultParams: Record<string, any> = {}
    for (const param of nodeDef.params) {
      if (param.default !== undefined) {
        defaultParams[param.name] = param.default
      }
    }
    
    const newNode: FlowNode = {
      id: generateNodeId(),
      type: nodeDef.hasChildren ? 'control' : 'skill',
      position,
      data: {
        type,
        label: nodeDef.name,
        params: defaultParams,
        status: 'idle',
        color: nodeDef.color,
        icon: nodeDef.icon
      }
    }
    
    nodes.value.push(newNode)
    
    // 如果有父节点，添加边
    if (parentId) {
      const newEdge: FlowEdge = {
        id: `edge_${parentId}_${newNode.id}`,
        source: parentId,
        target: newNode.id,
        type: 'smoothstep'
      }
      edges.value.push(newEdge)
    }
    
    isDirty.value = true
    return newNode
  }
  
  /** 删除节点 */
  function deleteNode(nodeId: string) {
    // 删除节点
    nodes.value = nodes.value.filter(n => n.id !== nodeId)
    
    // 删除相关的边
    edges.value = edges.value.filter(e => e.source !== nodeId && e.target !== nodeId)
    
    // 如果删除的是选中节点，清除选中
    if (selectedNodeId.value === nodeId) {
      selectedNodeId.value = null
    }
    
    isDirty.value = true
  }
  
  /** 更新节点参数 */
  function updateNodeParams(nodeId: string, params: Record<string, any>) {
    const node = nodes.value.find(n => n.id === nodeId)
    if (node && node.data) {
      node.data.params = { ...node.data.params, ...params }
      isDirty.value = true
    }
  }
  
  /** 选中节点 */
  function selectNode(nodeId: string | null) {
    selectedNodeId.value = nodeId
  }
  
  /** 更新节点位置 */
  function updateNodePosition(nodeId: string, position: XYPosition) {
    const node = nodes.value.find(n => n.id === nodeId)
    if (node) {
      node.position = position
    }
  }
  
  /** 添加边 */
  function addEdge(source: string, target: string) {
    // 检查是否已存在
    const exists = edges.value.some(e => e.source === source && e.target === target)
    if (exists) return
    
    const newEdge: FlowEdge = {
      id: `edge_${source}_${target}`,
      source,
      target,
      type: 'smoothstep'
    }
    edges.value.push(newEdge)
    isDirty.value = true
  }
  
  /** 删除边 */
  function deleteEdge(edgeId: string) {
    edges.value = edges.value.filter(e => e.id !== edgeId)
    isDirty.value = true
  }
  
  /** 更新节点状态（用于执行时高亮） */
  function updateNodeStatus(nodeId: string, status: NodeStatus) {
    nodeStatuses.value.set(nodeId, status)
    
    const node = nodes.value.find(n => n.id === nodeId)
    if (node && node.data) {
      node.data.status = status.status
    }
  }
  
  /** 根据 current_node_id 更新节点运行状态 */
  function updateCurrentRunningNode(currentNodeId: string, taskStatus: string) {
    // 如果任务已完成/失败/取消/idle，清除所有 running 状态
    if (['success', 'failure', 'cancelled', 'idle', 'completed', 'failed'].includes(taskStatus)) {
      for (const node of nodes.value) {
        if (node.data && node.data.status === 'running') {
          // 任务成功/完成时，之前运行的节点应该是成功的
          if (taskStatus === 'success' || taskStatus === 'completed') {
            node.data.status = 'success'
          } else if (taskStatus === 'failure' || taskStatus === 'failed') {
            node.data.status = 'failure'
          } else {
            // cancelled 或 idle 时重置为 idle
            node.data.status = 'idle'
          }
        }
      }
      return
    }
    
    // 更新节点状态 - 注意：并行执行时不要将其他running节点改为success
    // 只更新当前节点为running
    if (currentNodeId) {
      for (const node of nodes.value) {
        if (node.data && node.id === currentNodeId) {
          node.data.status = 'running'
        }
      }
    }
  }
  
  /** 清除所有节点状态 */
  function clearNodeStatuses() {
    nodeStatuses.value.clear()
    for (const node of nodes.value) {
      if (node.data) {
        node.data.status = 'idle'
      }
    }
  }
  
  /** 更新执行状态 */
  function updateExecutionState(state: TaskExecutionState) {
    executionState.value = state
    isExecuting.value = state.status === 'running' || state.status === 'paused'
  }
  
  /** 
   * 验证任务结构
   * 返回: { valid: boolean, error?: string, rootCount?: number, disconnectedNodes?: string[] }
   */
  function validateTask(): { valid: boolean; error?: string; rootCount?: number; disconnectedNodes?: string[] } {
    if (nodes.value.length === 0) {
      return { valid: false, error: '任务为空，请添加节点' }
    }
    
    // 找到所有根节点（没有入边的节点）
    const targetIds = new Set(edges.value.map(e => e.target))
    const rootNodes = nodes.value.filter(n => !targetIds.has(n.id))
    
    if (rootNodes.length === 0) {
      return { valid: false, error: '存在循环引用，无法确定起始节点' }
    }
    
    if (rootNodes.length > 1) {
      // 计算每个根节点能到达的节点数
      const reachableCounts = rootNodes.map(root => {
        const visited = new Set<string>()
        const queue = [root.id]
        while (queue.length > 0) {
          const nodeId = queue.shift()!
          if (visited.has(nodeId)) continue
          visited.add(nodeId)
          // 找到从这个节点出发的所有边
          edges.value.filter(e => e.source === nodeId).forEach(e => {
            if (!visited.has(e.target)) queue.push(e.target)
          })
        }
        return { root, count: visited.size }
      })
      
      // 找出不在最大簇中的节点
      const maxCluster = reachableCounts.reduce((a, b) => a.count > b.count ? a : b)
      const disconnectedNodes = rootNodes
        .filter(n => n.id !== maxCluster.root.id)
        .map(n => n.data?.label || n.id)
      
      return { 
        valid: false, 
        error: `存在 ${rootNodes.length} 个独立的节点/节点组，它们之间没有连接。请用连线将它们串联起来，或删除不需要的节点。`,
        rootCount: rootNodes.length,
        disconnectedNodes
      }
    }
    
    return { valid: true }
  }
  
  /** 导出为任务树 JSON */
  function exportToTaskTree(): TaskDefinition | null {
    if (nodes.value.length === 0) return null
    
    const root = flowToTaskTree()
    if (!root) return null
    
    return {
      ...currentTask.value,
      name: currentTask.value?.name || '未命名任务',
      root
    }
  }
  
  // ==================== 转换函数 ====================
  
  /**
   * 任务树转换为 Vue Flow 格式
   * 
   * 设计原则：
   * - 根节点如果是 Sequence，不显示它，直接展开其子节点为链式
   * - Loop/Parallel/Selector 显示为控制节点，其子节点根据类型展开
   * - 所有链式连接表示顺序执行
   */
  function taskTreeToFlow(
    root: TaskNode, 
    parentId?: string, 
    position: XYPosition = { x: 400, y: 50 },
    isRootSequence: boolean = false  // 是否是根 Sequence（需要隐藏）
  ): { flowNodes: FlowNode[]; flowEdges: FlowEdge[]; lastNodeId?: string } {
    const flowNodes: FlowNode[] = []
    const flowEdges: FlowEdge[] = []
    
    const nodeDef = getNodeDefinition(root.type as NodeType)
    if (!nodeDef) {
      console.warn(`Unknown node type: ${root.type}`)
      return { flowNodes, flowEdges }
    }
    
    // 布局参数
    const verticalSpacing = 120
    const horizontalSpacing = 220
    
    // 如果是 Sequence 且是根节点或需要隐藏，直接展开子节点
    if (root.type === 'Sequence' && (isRootSequence || !parentId)) {
      if (root.children && root.children.length > 0) {
        let currentY = position.y
        let prevNodeId = parentId
        let lastNodeId: string | undefined
        
        for (const child of root.children) {
          const result = taskTreeToFlow(
            child,
            prevNodeId,
            { x: position.x, y: currentY }
          )
          flowNodes.push(...result.flowNodes)
          flowEdges.push(...result.flowEdges)
          
          if (result.flowNodes.length > 0) {
            prevNodeId = result.lastNodeId || result.flowNodes[0].id
            lastNodeId = prevNodeId
            // 计算下一个节点的位置
            const maxY = Math.max(...result.flowNodes.map(n => n.position.y))
            currentY = maxY + verticalSpacing
          }
        }
        return { flowNodes, flowEdges, lastNodeId }
      }
      return { flowNodes, flowEdges }
    }
    
    // 创建当前节点
    const node: FlowNode = {
      id: root.id || generateNodeId(),
      type: nodeDef.hasChildren ? 'control' : 'skill',
      position: { x: position.x, y: position.y },
      data: {
        type: root.type as NodeType,
        label: nodeDef.name,
        params: root.params || {},
        status: 'idle',
        color: nodeDef.color,
        icon: nodeDef.icon
      }
    }
    flowNodes.push(node)
    
    // 如果有父节点，添加边
    if (parentId) {
      flowEdges.push({
        id: `edge_${parentId}_${node.id}`,
        source: parentId,
        target: node.id,
        type: 'smoothstep'
      })
    }
    
    let lastNodeId = node.id
    
    // 处理子节点（只有控制节点有子节点）
    if (nodeDef.hasChildren && root.children && root.children.length > 0) {
      const isSequential = root.type === 'Loop'  // Loop 的子节点链式排列
      const isParallel = root.type === 'Parallel' || root.type === 'Selector'
      
      if (isSequential) {
        // Loop: 子节点垂直链式排列
        let currentY = position.y + verticalSpacing
        let prevNodeId = node.id
        
        for (const child of root.children) {
          const result = taskTreeToFlow(
            child,
            prevNodeId,
            { x: position.x, y: currentY }
          )
          flowNodes.push(...result.flowNodes)
          flowEdges.push(...result.flowEdges)
          
          if (result.flowNodes.length > 0) {
            prevNodeId = result.lastNodeId || result.flowNodes[0].id
            lastNodeId = prevNodeId
            const maxY = Math.max(...result.flowNodes.map(n => n.position.y))
            currentY = maxY + verticalSpacing
          }
        }
      } else if (isParallel) {
        // Parallel/Selector: 子节点水平并排
        const childCount = root.children.length
        const totalWidth = (childCount - 1) * horizontalSpacing
        let currentX = position.x - totalWidth / 2
        const childY = position.y + verticalSpacing
        
        for (const child of root.children) {
          const result = taskTreeToFlow(
            child,
            node.id,
            { x: currentX, y: childY }
          )
          flowNodes.push(...result.flowNodes)
          flowEdges.push(...result.flowEdges)
          currentX += horizontalSpacing
        }
      }
    }
    
    return { flowNodes, flowEdges, lastNodeId }
  }
  
  /**
   * Vue Flow 转换为任务树格式
   * 
   * 设计原则：
   * - 从根节点开始，沿着链条收集所有节点
   * - 链式连接的节点自动包装成 Sequence
   * - 控制节点（Loop/Parallel/Selector）保持其结构
   */
  function flowToTaskTree(): TaskNode | null {
    if (nodes.value.length === 0) return null
    
    // 找到根节点（没有入边的节点）
    const targetIds = new Set(edges.value.map(e => e.target))
    const rootNodes = nodes.value.filter(n => !targetIds.has(n.id))
    
    if (rootNodes.length === 0) return null
    
    // 记录已处理的节点
    const processedNodes = new Set<string>()
    
    /**
     * 收集从某个节点开始的链式节点序列
     * 返回节点数组（按顺序）
     */
    function collectChain(startNode: FlowNode): FlowNode[] {
      const chain: FlowNode[] = []
      let currentNode: FlowNode | undefined = startNode
      
      while (currentNode && !processedNodes.has(currentNode.id)) {
        processedNodes.add(currentNode.id)
        chain.push(currentNode)
        
        // 如果当前节点是控制节点，不继续沿链收集（它的子节点会单独处理）
        const nodeDef = getNodeDefinition(currentNode.data!.type)
        if (nodeDef?.hasChildren) {
          break
        }
        
        // 找下一个链式节点
        const nextEdge = edges.value.find(e => 
          e.source === currentNode!.id && 
          !processedNodes.has(e.target)
        )
        
        if (nextEdge) {
          currentNode = nodes.value.find(n => n.id === nextEdge.target)
        } else {
          break
        }
      }
      
      return chain
    }
    
    /**
     * 将单个 FlowNode 转换为 TaskNode
     */
    function nodeToTask(node: FlowNode): TaskNode {
      const nodeData = node.data!
      const nodeDef = getNodeDefinition(nodeData.type)
      
      const taskNode: TaskNode = {
        id: node.id,
        type: nodeData.type,
        params: { ...nodeData.params }
      }
      
      // 处理控制节点的子节点
      if (nodeDef?.hasChildren) {
        const isSequential = nodeData.type === 'Loop'
        const isParallel = nodeData.type === 'Parallel' || nodeData.type === 'Selector'
        
        // 找到从此节点发出的所有边
        const childEdges = edges.value.filter(e => e.source === node.id)
        
        if (isSequential) {
          // Loop: 沿链收集子节点
          const children: TaskNode[] = []
          if (childEdges.length > 0) {
            const firstChildNode = nodes.value.find(n => n.id === childEdges[0].target)
            if (firstChildNode && !processedNodes.has(firstChildNode.id)) {
              const chain = collectChain(firstChildNode)
              for (const chainNode of chain) {
                children.push(nodeToTask(chainNode))
              }
            }
          }
          taskNode.children = children
        } else if (isParallel) {
          // Parallel/Selector: 收集所有直接子节点（每个子节点可能是一个链）
          const children: TaskNode[] = []
          for (const edge of childEdges) {
            const childNode = nodes.value.find(n => n.id === edge.target)
            if (childNode && !processedNodes.has(childNode.id)) {
              // 收集这个子节点开始的链
              const chain = collectChain(childNode)
              if (chain.length === 1) {
                // 单个节点，直接添加
                children.push(nodeToTask(chain[0]))
              } else if (chain.length > 1) {
                // 多个节点，包装成 Sequence
                const seqChildren = chain.map(n => nodeToTask(n))
                children.push({
                  id: generateNodeId(),
                  type: 'Sequence',
                  params: {},
                  children: seqChildren
                })
              }
            }
          }
          taskNode.children = children
        }
      }
      
      return taskNode
    }
    
    // 从第一个根节点开始收集链
    const rootChain = collectChain(rootNodes[0])
    
    if (rootChain.length === 0) return null
    
    if (rootChain.length === 1) {
      // 只有一个根节点
      const singleNode = nodeToTask(rootChain[0])
      // 如果是控制节点，直接返回
      const nodeDef = getNodeDefinition(rootChain[0].data!.type)
      if (nodeDef?.hasChildren) {
        return singleNode
      }
      // 如果是技能节点，包装成 Sequence
      return {
        id: generateNodeId(),
        type: 'Sequence',
        params: {},
        children: [singleNode]
      }
    }
    
    // 多个根节点形成链，包装成 Sequence
    const children = rootChain.map(n => nodeToTask(n))
    return {
      id: generateNodeId(),
      type: 'Sequence',
      params: {},
      children
    }
  }
  
  // 监听变化标记 dirty
  watch([nodes, edges], () => {
    if (currentTask.value) {
      isDirty.value = true
    }
  }, { deep: true })
  
  return {
    // 状态
    currentTask,
    isDirty,
    nodes,
    edges,
    selectedNodeId,
    executionState,
    nodeStatuses,
    nodePaletteVisible,
    propertyPanelVisible,
    isExecuting,
    
    // 计算属性
    selectedNode,
    selectedNodeDefinition,
    canExecute,
    canPause,
    canResume,
    canCancel,
    
    // 方法
    newTask,
    loadTask,
    addNode,
    deleteNode,
    updateNodeParams,
    selectNode,
    updateNodePosition,
    addEdge,
    deleteEdge,
    updateNodeStatus,
    updateCurrentRunningNode,
    clearNodeStatuses,
    updateExecutionState,
    validateTask,
    exportToTaskTree
  }
})
