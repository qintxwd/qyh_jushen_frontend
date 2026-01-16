<template>
  <div ref="terminalContainer" class="terminal-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'

const props = defineProps<{
  wsUrl?: string
}>()

const terminalContainer = ref<HTMLElement>()
let terminal: Terminal | null = null
let fitAddon: FitAddon | null = null
let websocket: WebSocket | null = null

onMounted(() => {
  if (!terminalContainer.value) return

  // 创建终端实例
  terminal = new Terminal({
    cursorBlink: true,
    fontSize: 14,
    fontFamily: 'Consolas, "Courier New", monospace',
    theme: {
      background: '#1e1e1e',
      foreground: '#d4d4d4',
      cursor: '#d4d4d4',
      black: '#000000',
      red: '#cd3131',
      green: '#0dbc79',
      yellow: '#e5e510',
      blue: '#2472c8',
      magenta: '#bc3fbc',
      cyan: '#11a8cd',
      white: '#e5e5e5',
      brightBlack: '#666666',
      brightRed: '#f14c4c',
      brightGreen: '#23d18b',
      brightYellow: '#f5f543',
      brightBlue: '#3b8eea',
      brightMagenta: '#d670d6',
      brightCyan: '#29b8db',
      brightWhite: '#e5e5e5'
    }
  })

  // 添加插件
  fitAddon = new FitAddon()
  terminal.loadAddon(fitAddon)
  terminal.loadAddon(new WebLinksAddon())

  // 挂载到 DOM
  terminal.open(terminalContainer.value)
  fitAddon.fit()

  // 连接 WebSocket
  connectWebSocket()

  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (websocket) {
    websocket.close()
  }
  if (terminal) {
    terminal.dispose()
  }
})

const connectWebSocket = () => {
  const token = localStorage.getItem('token')
  // 动态获取 WebSocket URL，支持远程访问
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const wsHost = window.location.hostname
  const defaultWsUrl = `${wsProtocol}//${wsHost}:8000/ws/terminal?token=${token}`
  const wsUrl = props.wsUrl || defaultWsUrl

  websocket = new WebSocket(wsUrl)

  websocket.onopen = () => {
    console.log('终端 WebSocket 已连接')
    if (terminal) {
      terminal.writeln('已连接到服务器终端...')
    }
  }

  websocket.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data)
      if (message.type === 'output' && terminal) {
        terminal.write(message.data)
      } else if (message.type === 'connected' && terminal) {
        terminal.write(message.data)
      } else if (message.type === 'error' && terminal) {
        terminal.writeln(`\r\n错误: ${message.data}\r\n`)
      }
    } catch (e) {
      console.error('解析消息错误:', e)
    }
  }

  websocket.onerror = (error) => {
    console.error('WebSocket 错误:', error)
    if (terminal) {
      terminal.writeln('\r\n连接错误\r\n')
    }
  }

  websocket.onclose = () => {
    console.log('WebSocket 已断开')
    if (terminal) {
      terminal.writeln('\r\n连接已断开\r\n')
    }
  }

  // 监听终端输入
  if (terminal) {
    terminal.onData((data) => {
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify({
          type: 'input',
          data: data
        }))
      }
    })
  }
}

const handleResize = () => {
  if (fitAddon && terminal) {
    fitAddon.fit()
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify({
        type: 'resize',
        rows: terminal.rows,
        cols: terminal.cols
      }))
    }
  }
}
</script>

<style scoped>
.terminal-container {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: var(--color-bg-secondary, #1e1e1e);
}
</style>
