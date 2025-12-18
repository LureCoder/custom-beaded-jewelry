<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <!-- 头部 -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">替换素材</h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>

          <!-- 当前素材预览 -->
          <div class="mb-4">
            <label class="block text-sm text-gray-700 mb-2">当前素材</label>
            <div class="flex items-center gap-4">
              <div
                v-if="!accessory.material"
                class="w-20 h-20 rounded-full border-2 border-gray-300"
                :style="{ backgroundColor: accessory.color }"
              ></div>
              <img
                v-else
                :src="accessory.material"
                :alt="accessory.name"
                class="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
              />
              <div>
                <div class="text-sm font-medium">{{ accessory.name }}</div>
                <div class="text-xs text-gray-500">{{ store.getTypeName(accessory.type) }}</div>
                <div v-if="accessory.materialInfo" class="text-xs text-gray-400 mt-1">
                  {{ accessory.materialInfo.width }} × {{ accessory.materialInfo.height }}
                </div>
              </div>
            </div>
          </div>

          <!-- 名称编辑 -->
          <div class="mb-4">
            <label class="block text-sm text-gray-700 mb-2">配件名称</label>
            <input
              v-model="newName"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              :placeholder="accessory.name"
            />
          </div>

          <!-- 上传新素材 -->
          <div class="mb-4">
            <label class="block text-sm text-gray-700 mb-2">新素材</label>
            <div
              @click="triggerFileInput"
              @dragover.prevent="isDragOver = true"
              @dragleave.prevent="isDragOver = false"
              @drop.prevent="handleDrop"
              :class="[
                'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition',
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
              ]"
            >
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />
              
              <div v-if="!previewImage" class="space-y-2">
                <div class="text-4xl text-gray-400">📷</div>
                <div class="text-sm text-gray-600">
                  点击或拖拽图片到这里上传
                </div>
                <div class="text-xs text-gray-400">
                  支持 JPG、PNG、GIF 等格式
                </div>
              </div>
              
              <div v-else class="space-y-2">
                <img
                  :src="previewImage"
                  alt="预览"
                  class="max-w-full max-h-48 mx-auto rounded border border-gray-300"
                />
                <div class="text-xs text-gray-600">
                  尺寸: {{ imageSize.width }} × {{ imageSize.height }}
                </div>
                <button
                  @click.stop="clearPreview"
                  class="text-xs text-red-500 hover:text-red-700"
                >
                  清除预览
                </button>
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-2 justify-end">
            <button
              @click="$emit('close')"
              class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              取消
            </button>
            <button
              @click="handleConfirm"
              :disabled="!previewImage"
              :class="[
                'px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition',
                !previewImage && 'opacity-50 cursor-not-allowed'
              ]"
            >
              确认替换
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useJewelryStore } from '@/stores/jewelry'

const props = defineProps({
  accessory: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const store = useJewelryStore()
const fileInput = ref(null)
const previewImage = ref(null)
const imageSize = ref({ width: 0, height: 0 })
const isDragOver = ref(false)
const newName = ref(props.accessory.name)

// 触发文件选择
function triggerFileInput() {
  fileInput.value?.click()
}

// 处理文件选择
async function handleFileSelect(event) {
  const file = event.target.files[0]
  if (file) {
    await processImageFile(file)
  }
}

// 处理拖拽放置
async function handleDrop(event) {
  isDragOver.value = false
  const file = event.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    await processImageFile(file)
  }
}

// 处理图片文件
function processImageFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择有效的图片文件')
      reject(new Error('Invalid file type'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        previewImage.value = e.target.result
        imageSize.value = {
          width: img.width,
          height: img.height
        }
        resolve()
      }
      img.onerror = () => {
        alert('图片加载失败')
        reject(new Error('Image load failed'))
      }
      img.src = e.target.result
    }
    reader.onerror = () => {
      alert('文件读取失败')
      reject(new Error('File read failed'))
    }
    reader.readAsDataURL(file)
  })
}

// 清除预览
function clearPreview() {
  previewImage.value = null
  imageSize.value = { width: 0, height: 0 }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// 确认替换
function handleConfirm() {
  if (previewImage.value) {
    emit('confirm', {
      base64: previewImage.value,
      width: imageSize.value.width,
      height: imageSize.value.height
    }, newName.value)
  }
}
</script>


