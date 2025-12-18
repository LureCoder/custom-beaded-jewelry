<template>
  <div class="app-container">
    <!-- 移动端遮罩 -->
    <div
      v-if="isMobile && showPanel"
      class="mobile-overlay"
      @click="showPanel = false"
    ></div>

    <!-- 左侧面板 -->
    <PalettePanel
      :show-panel="showPanel"
      :is-mobile="isMobile"
      @close="showPanel = false"
    />

    <!-- 右侧编辑区 -->
    <EditingArea
      :is-mobile="isMobile"
      @show-panel="showPanel = true"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PalettePanel from './components/PalettePanel.vue'
import EditingArea from './components/EditingArea.vue'

const showPanel = ref(false)
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
  if (!isMobile.value) {
    showPanel.value = true
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
}

.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9;
}

@media (min-width: 769px) {
  .app-container {
    padding-left: 280px;
  }
}
</style>
