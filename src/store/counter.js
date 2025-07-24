import { defineStore } from 'pinia'

// 定义并导出一个Store
export const useCounterStore = defineStore('counter', {
  // 状态
  state: () => ({
    count: 0,
    message: 'Hello Pinia'
  }),
  
  // 计算属性
  getters: {
    doubleCount: (state) => state.count * 2
  },
  
  // 方法
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    setMessage(newMessage) {
      this.message = newMessage
    }
  }
})
    