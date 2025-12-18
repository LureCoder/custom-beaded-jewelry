<template>
  <aside
    :class="[
      'sidebar bg-gray-50 border-r border-gray-200 overflow-y-auto transition-transform duration-300',
      isMobile && !showPanel ? '-translate-x-full' : 'translate-x-0'
    ]"
  >
    <div class="p-4">
      <!-- 移动端头部 -->
      <div v-if="isMobile" class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">配件面板</h2>
        <button
          @click="$emit('close')"
          class="text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      </div>
      <h2 v-else class="text-lg font-semibold mb-4">配件面板</h2>

      <!-- 分类列表 -->
      <div class="space-y-4">
        <div
          v-for="type in typeList"
          :key="type"
          class="category-section"
        >
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-sm font-medium text-gray-700">
              {{ store.getTypeName(type) }}
            </h3>
            <button
              @click="handleAddAccessory(type)"
              class="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              title="添加新配件"
            >
              + 添加
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="accessory in store.getAccessoriesByType(type)"
              :key="accessory.id"
              :class="[
                'palette-item relative p-2 bg-white border rounded-lg cursor-grab hover:border-blue-300 hover:shadow-sm transition group',
                accessory.isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
              ]"
              draggable="true"
              @dragstart="handleDragStart($event, accessory)"
              @click="store.selectAccessory(accessory.id)"
            >
              <!-- 拖拽时半透明效果 -->
              <div class="accessory-thumbnail">
                <div
                  v-if="!accessory.material"
                  class="w-12 h-12 rounded-full mx-auto mb-1 border border-gray-300"
                  :style="{ backgroundColor: accessory.color }"
                ></div>
                <img
                  v-else
                  :src="accessory.material"
                  :alt="accessory.name"
                  class="w-12 h-12 rounded-full mx-auto mb-1 border border-gray-300 object-cover"
                />
              </div>
              <div class="text-xs text-center truncate">{{ accessory.name }}</div>
              
              <!-- 删除按钮 -->
              <button
                @click.stop="handleDeleteAccessory(type, accessory.id)"
                class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 hover:opacity-100 hover:bg-red-600 transition flex items-center justify-center leading-none"
                title="删除配件"
              >
                ×
              </button>
              
              <!-- 替换素材按钮 -->
              <button
                @click.stop="handleReplaceMaterial(accessory)"
                class="absolute bottom-1 right-1 px-1.5 py-0.5 bg-gray-600 text-white rounded text-xs opacity-0 hover:opacity-100 hover:bg-gray-700 transition"
                title="替换素材"
              >
                替换
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 素材替换弹窗 -->
    <MaterialReplaceDialog
      v-if="showReplaceDialog"
      :accessory="selectedAccessory"
      @close="showReplaceDialog = false"
      @confirm="handleConfirmReplace"
    />
  </aside>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useJewelryStore, ACCESSORY_TYPES } from '@/stores/jewelry'
import MaterialReplaceDialog from './MaterialReplaceDialog.vue'

const props = defineProps({
  showPanel: {
    type: Boolean,
    default: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const store = useJewelryStore()

const typeList = computed(() => Object.values(ACCESSORY_TYPES))
const showReplaceDialog = ref(false)
const selectedAccessory = ref(null)

// 处理拖拽开始
function handleDragStart(event, accessory) {
  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData('application/json', JSON.stringify({
    type: 'accessory',
    accessoryId: accessory.id,
    accessoryType: accessory.type
  }))
  
  // 创建拖拽预览
  const dragPreview = document.createElement('div')
  dragPreview.innerHTML = `
    <div style="
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${accessory.material ? `url(${accessory.material})` : accessory.color};
      background-size: cover;
      border: 2px solid #2563eb;
      opacity: 0.8;
    "></div>
  `
  dragPreview.style.position = 'absolute'
  dragPreview.style.top = '-1000px'
  document.body.appendChild(dragPreview)
  event.dataTransfer.setDragImage(dragPreview, 30, 30)
  
  setTimeout(() => {
    document.body.removeChild(dragPreview)
  }, 0)
}

// 添加新配件
function handleAddAccessory(type) {
  // 触发文件选择
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const materialData = await processImageFile(file)
      const newId = store.addAccessory(type, materialData)
      store.selectAccessory(newId)
      
      // 自动打开替换素材弹窗以设置名称等
      const accessory = store.getAccessoryById(newId)
      if (accessory) {
        handleReplaceMaterial(accessory)
      }
    } catch (error) {
      alert('图片处理失败：' + error.message)
    }
  }
  input.click()
}

// 删除配件
function handleDeleteAccessory(type, id) {
  if (confirm('确定要删除这个配件吗？')) {
    store.deleteAccessory(type, id)
  }
}

// 替换素材
function handleReplaceMaterial(accessory) {
  selectedAccessory.value = accessory
  showReplaceDialog.value = true
}

// 确认替换素材
function handleConfirmReplace(materialData, name) {
  if (selectedAccessory.value) {
    store.updateAccessoryMaterial(selectedAccessory.value.id, materialData)
    if (name && name.trim()) {
      selectedAccessory.value.name = name.trim()
    }
  }
  showReplaceDialog.value = false
  selectedAccessory.value = null
}

// 处理图片文件（转换为Base64）
function processImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('请选择有效的图片文件'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve({
          base64: e.target.result,
          width: img.width,
          height: img.height
        })
      }
      img.onerror = () => {
        reject(new Error('图片加载失败'))
      }
      img.src = e.target.result
    }
    reader.onerror = () => {
      reject(new Error('文件读取失败'))
    }
    reader.readAsDataURL(file)
  })
}
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
}

@media (max-width: 768px) {
  .sidebar {
    width: 320px;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }
}

.palette-item {
  user-select: none;
}

.palette-item:active {
  cursor: grabbing;
}

.palette-item:hover .accessory-thumbnail::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 0.5rem;
  pointer-events: none;
}

.category-section {
  position: relative;
}

.palette-item:hover .opacity-0 {
  opacity: 1;
}
</style>
