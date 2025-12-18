<template>
  <g
    :transform="`translate(${position.x}, ${position.y})`"
    :class="['accessory-group', { selected: isSelected }]"
    @click.stop="$emit('click')"
  >
    <!-- 自定义素材pattern -->
    <pattern
      v-if="accessory?.material"
      :id="`pattern-${item.id}`"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      patternContentUnits="objectBoundingBox"
    >
      <image
        :href="accessory.material"
        x="0"
        y="0"
        width="1"
        height="1"
        preserveAspectRatio="xMidYMid slice"
      />
    </pattern>
    
    <!-- 配件主体 -->
    <circle
      :r="accessory?.radius || 12"
      :fill="accessory?.material ? `url(#pattern-${item.id})` : (accessory?.color || '#CCCCCC')"
      stroke="#333"
      :stroke-width="isSelected ? 3 : 1"
      :stroke-dasharray="isSelected ? '5,5' : 'none'"
      filter="url(#shadow)"
      class="accessory-circle cursor-pointer transition-all"
      :class="{ 'selected-ring': isSelected }"
    />
    
    <!-- 选中高亮 -->
    <circle
      v-if="isSelected"
      :r="(accessory?.radius || 12) + 5"
      fill="none"
      stroke="#2563eb"
      stroke-width="2"
      stroke-dasharray="5,5"
      opacity="0.6"
      class="selection-ring"
    />
  </g>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  position: {
    type: Object,
    required: true
  },
  accessory: {
    type: Object,
    default: null
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

defineEmits(['click'])
</script>

<style scoped>
.accessory-circle {
  transition: all 0.2s ease;
}

.accessory-circle:hover {
  transform: scale(1.15);
  filter: url(#shadow) brightness(1.1);
}

.selected-ring {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.selection-ring {
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

