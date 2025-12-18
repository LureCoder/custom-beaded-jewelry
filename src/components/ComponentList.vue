<template>
  <div class="border-t border-gray-200 bg-white p-4 max-h-48 overflow-y-auto">
    <h3 class="text-sm font-semibold mb-2">配件列表（拖拽调整顺序）</h3>
    <draggable
      v-model="sortedComponents"
      item-key="id"
      tag="div"
      @end="handleDragEnd"
      class="space-y-2"
      handle=".drag-handle"
    >
      <template #item="{ element }">
        <div
          :class="[
            'flex items-center gap-2 p-2 rounded border cursor-pointer transition',
            element.id === store.selectedId
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          ]"
          @click="store.selectComponent(element.id)"
        >
          <div class="drag-handle cursor-move text-gray-400 hover:text-gray-600">
            ☰
          </div>
          <div
            class="w-8 h-8 rounded-full border border-gray-300 flex-shrink-0"
            :style="{
              backgroundColor: element.customImage ? 'transparent' : element.color,
              backgroundImage: element.customImage ? `url(${element.customImage})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }"
          ></div>
          <div class="flex-1 text-sm">
            <div class="font-medium">{{ element.name }}</div>
            <div class="text-xs text-gray-500">{{ element.type }}</div>
          </div>
          <button
            @click.stop="store.removeComponent(element.id)"
            class="text-red-500 hover:text-red-700 text-sm px-2"
          >
            删除
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useJewelryStore } from '@/stores/jewelry'
import draggable from 'vuedraggable'

const store = useJewelryStore()

const sortedComponents = computed({
  get: () => [...store.components].sort((a, b) => a.position - b.position),
  set: (newOrder) => {
    store.updateComponentOrder(newOrder)
  }
})

function handleDragEnd() {
  // 拖拽结束后，顺序已经通过 computed setter 更新
}
</script>

