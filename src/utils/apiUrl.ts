/**
 * 动态获取 API 基础地址
 * 支持远程访问：自动使用当前访问的主机地址
 */

// 获取 API 基础 URL (不含 /api/v1)
export const getApiBaseUrl = (): string => {
  // 优先使用环境变量（如果设置了）
  const envUrl = import.meta.env.VITE_API_BASE_URL
  if (envUrl) {
    return envUrl
  }
  // 否则使用当前页面的主机地址
  const protocol = window.location.protocol
  const hostname = window.location.hostname
  return `${protocol}//${hostname}:8000`
}

// 获取 API v1 基础 URL (含 /api/v1)
export const getApiV1BaseUrl = (): string => {
  return `${getApiBaseUrl()}/api/v1`
}

// 获取 WebSocket 基础 URL
export const getWsBaseUrl = (): string => {
  // 优先使用环境变量
  const envUrl = import.meta.env.VITE_WS_URL
  if (envUrl) {
    return envUrl
  }
  // 否则根据当前主机动态生成
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const hostname = window.location.hostname
  return `${wsProtocol}//${hostname}:8000/ws`
}

// 导出常量（运行时计算）
export const API_BASE = getApiBaseUrl()
export const API_V1_BASE = getApiV1BaseUrl()
export const WS_BASE = getWsBaseUrl()
