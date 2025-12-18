<template>
  <div class="border-t border-gray-200 bg-white p-4">
    <div class="flex justify-between items-center mb-3">
      <h3 class="text-sm font-semibold">
        编辑：{{ accessory?.name || '配件' }}
      </h3>
      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
    
    <div class="space-y-3">
      <!-- 预览 -->
      <div class="flex items-center gap-3">
        <div
          v-if="!accessory?.material"
          class="w-16 h-16 rounded-full border-2 border-gray-300 flex-shrink-0"
          :style="{ backgroundColor: accessory?.color || '#CCCCCC' }"
        ></div>
        <img
          v-else
          :src="accessory.material"
          :alt="accessory.name"
          class="w-16 h-16 rounded-full border-2 border-gray-300 object-cover flex-shrink-0"
        />
        <div>
          <div class="text-sm font-medium">{{ accessory?.name }}</div>
          <div class="text-xs text-gray-500">{{ store.getTypeName(item.type) }}</div>
        </div>
      </div>

      <!-- 位置信息 -->
      <div>
        <label class="block text-xs text-gray-700 mb-1">位置索引</label>
        <div class="flex gap-2">
          <input
            v-if="item.type !== store.ACCESSORY_TYPES.WAIST_BEAD"
            :value="item.position"
            type="number"
            min="0"
            :max="store.baseBeadCount - 1"
            @input="handlePositionChange"
            class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <select
            v-else
            :value="item.position"
            @change="handleWaistBeadPositionChange"
            class="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option :value="waistBeadPositions.left">左侧（三通左侧第28个位置）</option>
            <option :value="waistBeadPositions.right">右侧（三通右侧第28个位置）</option>
          </select>
        </div>
        <p v-if="item.type === store.ACCESSORY_TYPES.WAIST_BEAD" class="text-xs text-gray-500 mt-1">
          腰珠只能放在三通左侧或右侧第28个位置
        </p>
      </div>

      <!-- 删除按钮 -->
      <button
        @click="handleDelete"
        class="w-full px-3 py-2 text-sm border border-red-200 text-red-600 bg-white rounded-md hover:bg-red-50 cursor-pointer transition"
      >
        从念珠中移除
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useJewelryStore, ACCESSORY_TYPES } from '@/stores/jewelry'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'delete'])

const store = useJewelryStore()

const accessory = computed(() => store.getAccessoryById(props.item.accessoryId))

// 计算腰珠的可用位置
const waistBeadPositions = computed(() => {
  const throughBead = store.rosaryStructure[ACCESSORY_TYPES.THROUGH_BEAD][0]
  if (!throughBead) {
    return { left: 0, right: 0 }
  }
  
  const throughPosition = throughBead.position
  const waistOffset = 28
  const leftPosition = (throughPosition - waistOffset + store.baseBeadCount) % store.baseBeadCount
  const rightPosition = (throughPosition + waistOffset) % store.baseBeadCount
  
  return { left: leftPosition, right: rightPosition }
})

function handlePositionChange(event) {
  const newPosition = parseInt(event.target.value) || 0
  const clamped = Math.max(0, Math.min(store.baseBeadCount - 1, newPosition))
  try {
    store.adjustAccessoryPosition(props.item.type, props.item.id, clamped)
  } catch (error) {
    alert(error.message)
  }
}

function handleWaistBeadPositionChange(event) {
  const newPosition = parseInt(event.target.value) || waistBeadPositions.value.left
  try {
    store.adjustAccessoryPosition(props.item.type, props.item.id, newPosition)
  } catch (error) {
    alert(error.message)
  }
}

function handleDelete() {
  if (confirm('确定要从念珠中移除这个配件吗？')) {
    emit('delete', props.item)
  }
}
</script>

