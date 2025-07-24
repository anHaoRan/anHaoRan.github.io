// 以下是默认生成的Vue项目代码，现已注释掉不使用
// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

// 导入Vue核心功能，createApp用于创建Vue应用实例
import { createApp } from 'vue'
// 导入根组件App
import App from './App.vue'
// 导入路由配置，用于页面导航
import router from './router'
// 导入状态管理库，用于集中管理应用状态
import store from './store'

// 引入Element Plus组件库
import ElementPlus from 'element-plus'
// 导入Element Plus的样式文件
import 'element-plus/dist/index.css'
// 引入Element Plus的图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建Vue应用实例
const app = createApp(App)

// 注册所有Element Plus图标组件
// 遍历所有图标并全局注册，使其在任何组件中都可用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 将Element Plus组件库安装到应用中
app.use(ElementPlus)
// 安装Vuex状态管理
app.use(store)
// 安装Vue Router路由管理
app.use(router)
// 将应用挂载到DOM元素#app上，开始渲染
app.mount('#app')