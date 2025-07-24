<template>
  <div class="container">
    <!-- 左侧iframe区域 -->
    <div class="left-panel">
      <iframe 
        ref="targetIframe"
        class="content-iframe" 
        src="https://mscrm.echase.cn/hbTradeInH5/#/"
        frameborder="1"
        scrolling="auto"
      ></iframe>
    </div>
    
    <!-- 右侧操作控制台 -->
    <div class="right-panel">
      <h2 class="panel-title">操作控制台</h2>
      
      <el-card class="control-card">
        <!-- 时间设置区域 -->
        <div class="control-section">
          <el-form-item label="开始时间">
            <el-time-picker
              v-model="startTime"
              format="HH:mm"
              value-format="HH:mm"
              placeholder="选择时间"
              :disabled="isRunning"
            ></el-time-picker>
          </el-form-item>
        </div>
        
        <!-- 抢票类型选择 -->
        <div class="control-section">
          <el-form-item label="抢票类型">
            <el-select
              v-model="ticketType"
              placeholder="请选择抢票类型"
              :disabled="isRunning"
            >
              <el-option label="第一个类型" value="concert"></el-option>
              <el-option label="第二个类型" value="train"></el-option>
              <el-option label="第三个类型" value="flight"></el-option>
              <el-option label="第四个类型" value="scenic"></el-option>
              <el-option label="第五个类型" value="movie"></el-option>
            </el-select>
          </el-form-item>
        </div>
        
        <!-- 频率设置区 -->
        <div class="control-section">
          <el-form-item label="操作频率">
            <el-select
              v-model="frequency"
              placeholder="请选择操作频率"
              :disabled="isRunning"
            >
              <el-option label="一秒钟抢十次" value="100"></el-option>
              <el-option label="一秒钟抢5次" value="500"></el-option>
              <el-option label="一秒钟抢一次" value="1000"></el-option>
              <el-option label="两秒钟抢一次" value="2000"></el-option>
            </el-select>
          </el-form-item>
        </div>
        
        <!-- 操作按钮区 -->
        <div class="button-group">
          <el-button 
            type="success" 
            icon="Check" 
            :disabled="isRunning"
            @click="startOperation"
          >
            开始
          </el-button>
          <el-button 
            type="danger" 
            icon="Close" 
            :disabled="!isRunning"
            @click="stopOperation"
          >
            停止
          </el-button>
        </div>
        
        <!-- 状态显示 -->
        <div class="status-indicator" :class="isRunning ? 'running' : 'stopped'">
          <el-icon :size="16">
            <CircleCheckFilled v-if="isRunning" />
            <CircleCloseFilled v-else />
          </el-icon>
          <span>{{ isRunning ? '正在运行中...' : '已停止' }}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
// 正确示例
import { ref, onMounted, onUnmounted } from 'vue';
// 不需要导入 clearInterval 和 setInterval
import { 
  Check, 
  Close, 
  CircleCheckFilled, 
  CircleCloseFilled 
} from '@element-plus/icons-vue';

// 状态变量
const isRunning = ref(false);
const startTime = ref('09:00');
const ticketType = ref('');
const frequency = ref('100');
const targetIframe = ref(null);
const operationInterval = ref(null);

// 开始操作
const startOperation = () => {
  isRunning.value = true;
  
  // 开始定时操作
  operationInterval.value = setInterval(() => {
    simulateOperation();
  }, parseInt(frequency.value));
};

// 停止操作
const stopOperation = () => {
  isRunning.value = false;
  if (operationInterval.value) {
    clearInterval(operationInterval.value);
    operationInterval.value = null;
  }
};
// 替换原有的simulateOperation函数
const simulateOperation = () => {
  if (!targetIframe.value) return;
  
  // 向iframe发送消息（而非直接操作DOM）
  targetIframe.value.contentWindow.postMessage({
    type: 'click', // 指令类型：例如click、input等
    selector: 'uni-button' // 需要操作的元素选择器
  }, '*'); // 第二个参数指定允许接收的域名，生产环境建议写具体域名（如'https://your-domain.com'）
};
// 模拟在iframe中执行操作
// const simulateOperation = () => {
//   if (!targetIframe.value) return;
  
//   try {
//     // 这里可以根据实际需求修改，模拟在iframe中执行点击等操作
//     const iframeDocument = targetIframe.value.contentDocument || 
//                           targetIframe.value.contentWindow.document;
    
//     // 示例：尝试点击页面中的按钮（可根据实际页面结构修改选择器）
//     const targetButton = iframeDocument.querySelector('uni-button');
//     console.log(targetButton)
//     // if (targetButton) {
//     //   targetButton.click();
//     //   console.log('执行点击操作');
//     // }
//   } catch (error) {
//     console.error('操作执行失败:', error);
//   }
// };

// 组件挂载时的初始化
onMounted(() => {
  // 可以在这里添加初始化逻辑
});

// 组件卸载时清理
onUnmounted(() => {
  if (operationInterval.value) {
    clearInterval(operationInterval.value);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
  min-width: 1024px; /* 最小宽度限制 */
}

/* 左侧iframe区域 - 70%宽度 */
.left-panel {
  flex: 7;
  height: 100%;
  border-right: 1px solid #e5e7eb;
  box-sizing: border-box;
}

.content-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 右侧操作控制台 - 30%宽度 */
.right-panel {
  flex: 3;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #f9fafb;
}

.panel-title {
  margin: 0 0 20px 0;
  color: #1e293b;
  font-size: 1.5rem;
  font-weight: 600;
}

.control-card {
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.control-section {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 15px;
  margin: 30px 0;
  justify-content: center;
}

.status-indicator {
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.status-indicator.running {
  background-color: #f0fdf4;
  color: #166534;
}

.status-indicator.stopped {
  background-color: #fef2f2;
  color: #b91c1c;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .container {
    min-width: 900px;
  }
  
  .left-panel {
    flex: 6;
  }
  
  .right-panel {
    flex: 4;
  }
}
</style>
