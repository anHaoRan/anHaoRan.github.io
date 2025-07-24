<template>
  <div class="about">
    <h1>关于页</h1>
    <p>{{ counter.message }}</p>
    <el-input 
      v-model="newMessage" 
      placeholder="输入新消息"
      style="width: 300px; margin: 10px 0;"
    />
    <el-button @click="updateMessage" type="primary">更新消息</el-button>
    <el-button @click="goToHome" type="success">返回首页</el-button>
  </div>
</template>

<script setup>
import { useCounterStore } from '../store/counter'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// 获取路由实例
const router = useRouter()

// 获取Store实例
const counter = useCounterStore()

// 输入框绑定的值
const newMessage = ref('')

// 更新消息
const updateMessage = () => {
  if (newMessage.value) {
    counter.setMessage(newMessage.value)
    newMessage.value = ''
  }
}

// 跳转到首页
const goToHome = () => {
  router.push('/')
}
</script>
    