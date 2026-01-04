/**
 * 简单的事件总线，用于组件间通信
 */
import { ref } from 'vue'

type EventCallback = (...args: any[]) => void

class EventBus {
  private events: Map<string, Set<EventCallback>> = new Map()

  on(event: string, callback: EventCallback) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback)
  }

  off(event: string, callback: EventCallback) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.delete(callback)
    }
  }

  emit(event: string, ...args: any[]) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => callback(...args))
    }
  }

  once(event: string, callback: EventCallback) {
    const onceCallback = (...args: any[]) => {
      callback(...args)
      this.off(event, onceCallback)
    }
    this.on(event, onceCallback)
  }
}

export const eventBus = new EventBus()

// 定义事件名称常量
export const EVENTS = {
  MAP_REFRESHED: 'map:refreshed',  // 地图刷新完成事件
}

export default eventBus
