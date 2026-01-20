import { ref, shallowRef } from 'vue'

export interface WebRTCStats {
  resolution: string
  framerate: number
  bitrate: number
  packetLoss: number
}

export function useWebRTCStream(sourceId: string) {
  const isConnected = ref(false)
  const isStreaming = ref(false)
  const stream = shallowRef<MediaStream | null>(null)
  const error = ref<string | null>(null)
  const stats = ref<WebRTCStats>({
    resolution: '-',
    framerate: 0,
    bitrate: 0,
    packetLoss: 0
  })

  let ws: WebSocket | null = null
  let pc: RTCPeerConnection | null = null
  let statsInterval: number | null = null

  // Configuration
  const RTC_CONFIG: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  }

  /**
   * Start WebRTC connection
   * @param host Server hostname (default: current window hostname or localhost)
   * @param port Media Plane port (default: 8888)
   */
  function start(host?: string, port: number = 8888) {
    stop() // Ensure clean start
    
    error.value = null
    const hostname = host || window.location.hostname || 'localhost'
    const url = `ws://${hostname}:${port}`
    
    console.log(`[WebRTC] Connecting to ${url} for source: ${sourceId}`)
    
    try {
      ws = new WebSocket(url)
      ws.onopen = handleWsOpen
      ws.onmessage = handleWsMessage
      ws.onerror = handleWsError
      ws.onclose = handleWsClose
    } catch (e: any) {
      error.value = `Connection failed: ${e.message}`
      console.error('[WebRTC] Setup error:', e)
    }
  }

  function stop() {
    if (statsInterval) {
      clearInterval(statsInterval)
      statsInterval = null
    }

    if (pc) {
      pc.close()
      pc = null
    }

    if (ws) {
      ws.close()
      ws = null
    }

    isConnected.value = false
    isStreaming.value = false
    stream.value = null
    stats.value = { resolution: '-', framerate: 0, bitrate: 0, packetLoss: 0 }
  }

  // WebSocket Handlers
  function handleWsOpen() {
    console.log('[WebRTC] WebSocket connected')
    isConnected.value = true
    // Wait for 'welcome' message usually, but typically we initiate or wait for server
    // According to docs: Server sends 'welcome' first.
  }

  function handleWsMessage(event: MessageEvent) {
    try {
      const msg = JSON.parse(event.data)
      handleSignalingMessage(msg)
    } catch (e) {
      console.error('[WebRTC] Failed to parse message:', event.data)
    }
  }

  function handleWsError(event: Event) {
    console.error('[WebRTC] WebSocket error:', event)
    error.value = 'Signaling connection error'
  }

  function handleWsClose() {
    console.log('[WebRTC] WebSocket closed')
    isConnected.value = false
    isStreaming.value = false
    stop() // Cleanup PC
  }

  // Signaling Handler
  async function handleSignalingMessage(msg: any) {
    switch (msg.type) {
      case 'welcome':
        console.log(`[WebRTC] Session started, Peer ID: ${msg.peer_id}`)
        // Request the stream
        send({
          type: 'request_stream',
          source: sourceId
        })
        break

      case 'offer':
        console.log('[WebRTC] Received Offer')
        await handleOffer(msg.sdp)
        break

      case 'ice_candidate':
        await handleIceCandidate(msg)
        break

      case 'error':
        console.error('[WebRTC] Server error:', msg.message)
        error.value = msg.message
        break
        
      default:
        console.warn('[WebRTC] Unknown message type:', msg.type)
    }
  }

  async function handleOffer(sdp: string) {
    try {
      pc = new RTCPeerConnection(RTC_CONFIG)
      
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          send({
            type: 'ice_candidate',
            candidate: event.candidate.candidate,
            sdp_mid: event.candidate.sdpMid,
            sdp_mline_index: event.candidate.sdpMLineIndex
          })
        }
      }

      pc.ontrack = (event) => {
        console.log('[WebRTC] Track received:', event.streams[0])
        stream.value = event.streams[0]
        isStreaming.value = true
        startStatsMonitoring()
      }

      pc.onconnectionstatechange = () => {
        console.log('[WebRTC] Connection state:', pc?.connectionState)
        if (pc?.connectionState === 'failed' || pc?.connectionState === 'disconnected') {
            error.value = 'Peer connection failed'
            stop()
        }
      }

      await pc.setRemoteDescription(new RTCSessionDescription({
        type: 'offer',
        sdp: sdp
      }))

      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)

      send({
        type: 'answer',
        sdp: answer.sdp
      })

    } catch (e: any) {
      console.error('[WebRTC] Error handling offer:', e)
      error.value = `WebRTC negotiation failed: ${e.message}`
    }
  }

  async function handleIceCandidate(msg: any) {
    if (!pc) return
    try {
      await pc.addIceCandidate(new RTCIceCandidate({
        candidate: msg.candidate,
        sdpMid: msg.sdp_mid,
        sdpMLineIndex: msg.sdp_mline_index
      }))
    } catch (e) {
      console.error('[WebRTC] Error adding ICE candidate:', e)
    }
  }

  function send(data: any) {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data))
    }
  }

  // Statistics Monitoring
  function startStatsMonitoring() {
    if (statsInterval) clearInterval(statsInterval)
    statsInterval = window.setInterval(async () => {
      if (!pc || !isStreaming.value) return
      
      try {
        const report = await pc.getStats()
        let videoStat: any = null
        
        report.forEach(stats => {
          if (stats.type === 'inbound-rtp' && stats.kind === 'video') {
            videoStat = stats
          }
        })

        if (videoStat) {
          // Calculate bitrate (approximate)
          // Note: Needs previous timestamp to be accurate, simplified here or ignored if complex
          // For now just basic info if available
          stats.value.packetLoss = videoStat.packetsLost || 0
          
          // Resolution is usually in 'track' stats or specific inbound-rtp properties
          // Depending on browser implementation
        }
      } catch (e) {
        // ignore
      }
    }, 2000)
  }

  return {
    start,
    stop,
    isConnected,
    isStreaming,
    stream,
    error,
    stats
  }
}
