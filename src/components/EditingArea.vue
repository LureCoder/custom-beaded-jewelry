<template>
  <section class="flex-1 flex flex-col min-w-0 bg-gray-50">
    <!-- 工具栏 -->
    <header class="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-white items-center">
      <button
        @click="handleSave"
        class="px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer"
      >
        保存
      </button>
      <button
        @click="handleLoad"
        class="px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer"
      >
        加载
      </button>
      <button
        @click="handleReset"
        class="px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer"
      >
        清空
      </button>
      <button
        @click="handleExportPng"
        class="px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer"
      >
        导出PNG
      </button>
      <button
        @click="handleExportJson"
        class="px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer"
      >
        导出JSON
      </button>
      <label class="px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer">
        导入JSON
        <input
          type="file"
          accept="application/json"
          @change="handleImportJson"
          class="hidden"
        />
      </label>
      
      <!-- 移动端：显示面板按钮 -->
      <button
        v-if="isMobile"
        @click="$emit('showPanel')"
        class="ml-auto px-3 py-1.5 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50 cursor-pointer"
      >
        配件面板
      </button>
    </header>

    <!-- 画布区域 -->
    <div
      ref="canvasWrap"
      class="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @click="handleCanvasClick"
      :class="{ 'drag-over': isDragOver }"
    >
      <!-- 拖拽提示 -->
      <div
        v-if="isDragOver"
        class="absolute inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 border-2 border-dashed border-blue-400 rounded-lg m-4 z-10"
      >
        <div class="text-center text-blue-600">
          <div class="text-4xl mb-2">📿</div>
          <div class="text-lg font-semibold">松开以添加配件</div>
        </div>
      </div>

      <!-- 错误提示 -->
      <div
        v-if="errorMessage"
        class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-20 animate-fade-in"
      >
        {{ errorMessage }}
      </div>

      <!-- SVG画布 -->
      <svg
        ref="svgRef"
        class="w-full h-full block min-h-[600px]"
        xmlns="http://www.w3.org/2000/svg"
        tabindex="0"
        aria-label="念珠设计画布"
      >
        <!-- SVG滤镜 -->
        <defs>
          <filter id="bevel" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="1" dy="1" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- 基础珠（108颗） -->
        <g id="base-beads">
          <circle
            v-for="(pos, index) in baseBeadPositions"
            :key="`base-${index}`"
            :cx="pos.x"
            :cy="pos.y"
            :r="baseBeadRadius"
            fill="#D4A574"
            stroke="#B8956A"
            stroke-width="1"
            filter="url(#bevel)"
            class="base-bead"
          />
        </g>

        <!-- 配件渲染 -->
        <g id="accessories">
          <!-- 顶珠 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.TOP_BEAD]"
            :key="item.id"
            :item="item"
            :position="getAccessoryPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
          
          <!-- 腰珠 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.WAIST_BEAD]"
            :key="item.id"
            :item="item"
            :position="getAccessoryPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
          
          <!-- 跳珠 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.JUMP_BEAD]"
            :key="item.id"
            :item="item"
            :position="getAccessoryPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
          
          <!-- 侧挂 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.SIDE_HANG]"
            :key="item.id"
            :item="item"
            :position="getSideHangPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
          
          <!-- 三通 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.THROUGH_BEAD]"
            :key="item.id"
            :item="item"
            :position="getAccessoryPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
          
          <!-- 背云 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.BACK_CLOUD]"
            :key="item.id"
            :item="item"
            :position="getBackCloudPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
          
          <!-- 弟子珠 -->
          <AccessoryGroup
            v-for="item in store.rosaryStructure[store.ACCESSORY_TYPES.DISCIPLE_BEAD]"
            :key="item.id"
            :item="item"
            :position="getDiscipleBeadPosition(item)"
            :accessory="store.getAccessoryById(item.accessoryId)"
            :is-selected="selectedRosaryItem?.id === item.id"
            @click="handleSelectRosaryItem(item)"
          />
        </g>
      </svg>

      <!-- 空状态提示 -->
      <div
        v-if="totalAccessories === 0"
        class="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none"
      >
        <div class="text-center">
          <div class="text-6xl mb-4">📿</div>
          <p class="text-lg mb-2">从左侧拖拽配件到此处开始设计</p>
          <p class="text-sm">念珠已默认显示108颗基础珠</p>
        </div>
      </div>
    </div>

    <!-- 属性面板（选中念珠上的配件时显示） -->
    <RosaryAccessoryPanel
      v-if="selectedRosaryItem"
      :item="selectedRosaryItem"
      @close="clearSelection"
      @delete="handleDeleteRosaryItem"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useJewelryStore, ACCESSORY_TYPES } from '@/stores/jewelry'
import AccessoryGroup from './AccessoryGroup.vue'
import RosaryAccessoryPanel from './RosaryAccessoryPanel.vue'

const props = defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['showPanel'])

const store = useJewelryStore()
const svgRef = ref(null)
const canvasWrap = ref(null)
const isDragOver = ref(false)
const selectedRosaryItem = ref(null)
const errorMessage = ref(null)

// 基础珠配置
const baseBeadRadius = 6
const baseBeadCount = computed(() => store.baseBeadCount)

// 计算基础珠位置（环形布局）
const baseBeadPositions = computed(() => {
  const positions = []
  const centerX = 400
  const centerY = 300
  const radius = 200
  
  // 108颗珠子排列成环形
  for (let i = 0; i < baseBeadCount.value; i++) {
    const angle = (i / baseBeadCount.value) * Math.PI * 2 - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    positions.push({ x, y, angle })
  }
  
  return positions
})

// 计算配件总数
const totalAccessories = computed(() => {
  return Object.values(store.rosaryStructure).reduce(
    (sum, arr) => sum + arr.length, 0
  )
})

// 根据类型获取配件位置
function getAccessoryPositionForType(item, type) {
  if (type === ACCESSORY_TYPES.SIDE_HANG) {
    return getSideHangPosition(item)
  } else if (type === ACCESSORY_TYPES.BACK_CLOUD) {
    return getBackCloudPosition(item)
  } else if (type === ACCESSORY_TYPES.DISCIPLE_BEAD) {
    return getDiscipleBeadPosition(item)
  } else {
    return getAccessoryPosition(item)
  }
}

// 获取配件位置（基于基础珠位置）
function getAccessoryPosition(item) {
  const beadIndex = Math.floor(item.position)
  const bead = baseBeadPositions.value[beadIndex]
  if (!bead) {
    // 如果位置超出范围，使用中心点
    return { x: 400, y: 300 }
  }
  return { x: bead.x, y: bead.y }
}

// 侧挂位置（基础珠外侧）
function getSideHangPosition(item) {
  const beadIndex = Math.floor(item.position)
  const bead = baseBeadPositions.value[beadIndex]
  if (!bead) {
    return { x: 400, y: 300 }
  }
  // 向外偏移
  const offset = 40
  const x = 400 + (bead.x - 400) * (1 + offset / 200)
  const y = 300 + (bead.y - 300) * (1 + offset / 200)
  return { x, y }
}

// 背云位置（三通下方）
function getBackCloudPosition(item) {
  const throughBead = store.rosaryStructure[ACCESSORY_TYPES.THROUGH_BEAD][0]
  if (throughBead) {
    const pos = getAccessoryPosition(throughBead)
    return { x: pos.x, y: pos.y + 50 }
  }
  // 如果没有三通，放在底部
  return { x: 400, y: 550 }
}

// 弟子珠位置（底部排列）
function getDiscipleBeadPosition(item) {
  const index = store.rosaryStructure[ACCESSORY_TYPES.DISCIPLE_BEAD].findIndex(i => i.id === item.id)
  const startX = 350
  const spacing = 20
  return {
    x: startX + index * spacing,
    y: 550
  }
}

// 处理拖拽放置
function handleDrop(event) {
  event.preventDefault()
  event.stopPropagation()
  isDragOver.value = false
  
  try {
    const data = JSON.parse(event.dataTransfer.getData('application/json'))
    if (data && data.type === 'accessory' && data.accessoryId) {
      const accessory = store.getAccessoryById(data.accessoryId)
      if (!accessory) {
        showError('配件不存在')
        return
      }
      
      try {
        store.addToRosary(accessory.type, data.accessoryId)
      } catch (error) {
        showError(error.message)
      }
    }
  } catch (e) {
    console.error('拖拽数据解析失败', e)
  }
}

function handleDragOver(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
  isDragOver.value = true
}

function handleDragLeave(event) {
  // 检查是否真的离开了画布区域
  if (!canvasWrap.value?.contains(event.relatedTarget)) {
    isDragOver.value = false
  }
}

function handleCanvasClick(event) {
  if (event.target === svgRef.value || event.target === canvasWrap.value) {
    clearSelection()
  }
}

// 选择念珠上的配件
function handleSelectRosaryItem(item) {
  selectedRosaryItem.value = item
  store.selectRosaryAccessory(item.type, item.id)
}

function clearSelection() {
  selectedRosaryItem.value = null
  store.clearRosarySelection()
}

// 删除念珠上的配件
function handleDeleteRosaryItem(item) {
  store.removeFromRosary(item.type, item.accessoryId)
  clearSelection()
}

// 错误提示函数
function showError(message) {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = null
  }, 3000)
}

// 保存/加载/导出等方法
function handleSave() {
  const data = store.exportData()
  localStorage.setItem('jewelry-design', JSON.stringify(data))
  alert('保存成功！')
}

function handleLoad() {
  const saved = localStorage.getItem('jewelry-design')
  if (saved) {
    try {
      const data = JSON.parse(saved)
      store.importData(data)
      alert('加载成功！')
    } catch (e) {
      alert('加载失败：数据格式错误')
    }
  } else {
    alert('没有保存的数据')
  }
}

function handleReset() {
  if (confirm('确定要清空所有内容吗？')) {
    store.reset()
    clearSelection()
  }
}

function handleExportPng() {
  if (!svgRef.value) return
  
  const svg = svgRef.value
  const svgData = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  
  canvas.width = svg.clientWidth || 800
  canvas.height = svg.clientHeight || 600
  
  img.onload = () => {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)
    
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `jewelry-design-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }
  
  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
}

function handleExportJson() {
  const data = store.exportData()
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `jewelry-design-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function handleImportJson(event) {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      store.importData(data)
      alert('导入成功！')
    } catch (err) {
      alert('导入失败：' + err.message)
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}
</script>

<style scoped>
.base-bead {
  transition: fill 0.2s;
}

.base-bead:hover {
  fill: #C4966B;
}

.drag-over {
  background-color: rgba(59, 130, 246, 0.05);
}
</style>
