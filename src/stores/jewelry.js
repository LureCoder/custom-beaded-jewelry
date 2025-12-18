import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 配件类型枚举
export const ACCESSORY_TYPES = {
  TOP_BEAD: 'topBead',      // 顶珠
  WAIST_BEAD: 'waistBead',  // 腰珠
  JUMP_BEAD: 'jumpBead',    // 跳珠
  SIDE_HANG: 'sideHang',    // 侧挂
  THROUGH_BEAD: 'throughBead', // 三通
  BACK_CLOUD: 'backCloud',  // 背云
  DISCIPLE_BEAD: 'discipleBead' // 弟子珠
}

// 配件类型配置（每个类型的限制数量）
const TYPE_CONFIG = {
  [ACCESSORY_TYPES.TOP_BEAD]: { maxCount: 1, defaultPosition: 'top' },
  [ACCESSORY_TYPES.WAIST_BEAD]: { maxCount: 2, defaultPosition: 'waistBead' },
  [ACCESSORY_TYPES.JUMP_BEAD]: { maxCount: 4, defaultPosition: 'interval' },
  [ACCESSORY_TYPES.SIDE_HANG]: { maxCount: 2, defaultPosition: 'side' },
  [ACCESSORY_TYPES.THROUGH_BEAD]: { maxCount: 1, defaultPosition: 'center' },
  [ACCESSORY_TYPES.BACK_CLOUD]: { maxCount: 1, defaultPosition: 'belowThrough' },
  [ACCESSORY_TYPES.DISCIPLE_BEAD]: { maxCount: 10, defaultPosition: 'end' }
}

export const useJewelryStore = defineStore('jewelry', () => {
  // ========== 状态数据 ==========
  
  // 基础珠数量
  const baseBeadCount = ref(108)
  
  // 配件库（按分类存储）
  const accessoryLibrary = ref({
    [ACCESSORY_TYPES.TOP_BEAD]: [],
    [ACCESSORY_TYPES.WAIST_BEAD]: [],
    [ACCESSORY_TYPES.JUMP_BEAD]: [],
    [ACCESSORY_TYPES.SIDE_HANG]: [],
    [ACCESSORY_TYPES.THROUGH_BEAD]: [],
    [ACCESSORY_TYPES.BACK_CLOUD]: [],
    [ACCESSORY_TYPES.DISCIPLE_BEAD]: []
  })
  
  // 默认预设配件
  const defaultAccessories = {
    [ACCESSORY_TYPES.TOP_BEAD]: [
      { id: 'top-1', name: '顶珠1', color: '#D4AF37', radius: 16 },
      { id: 'top-2', name: '顶珠2', color: '#C0C0C0', radius: 16 }
    ],
    [ACCESSORY_TYPES.WAIST_BEAD]: [
      { id: 'waist-1', name: '腰珠1', color: '#4CAF50', radius: 14 },
      { id: 'waist-2', name: '腰珠2', color: '#2196F3', radius: 14 }
    ],
    [ACCESSORY_TYPES.JUMP_BEAD]: [
      { id: 'jump-1', name: '跳珠1', color: '#FF9800', radius: 10 },
      { id: 'jump-2', name: '跳珠2', color: '#9C27B0', radius: 10 }
    ],
    [ACCESSORY_TYPES.SIDE_HANG]: [
      { id: 'side-1', name: '侧挂1', color: '#F44336', radius: 12 },
      { id: 'side-2', name: '侧挂2', color: '#00BCD4', radius: 12 }
    ],
    [ACCESSORY_TYPES.THROUGH_BEAD]: [
      { id: 'through-1', name: '三通1', color: '#795548', radius: 18 },
      { id: 'through-2', name: '三通2', color: '#607D8B', radius: 18 }
    ],
    [ACCESSORY_TYPES.BACK_CLOUD]: [
      { id: 'back-1', name: '背云1', color: '#E91E63', radius: 14 },
      { id: 'back-2', name: '背云2', color: '#3F51B5', radius: 14 }
    ],
    [ACCESSORY_TYPES.DISCIPLE_BEAD]: [
      { id: 'disciple-1', name: '弟子珠1', color: '#FFC107', radius: 8 },
      { id: 'disciple-2', name: '弟子珠2', color: '#009688', radius: 8 }
    ]
  }
  
  // 初始化默认配件
  Object.keys(ACCESSORY_TYPES).forEach(key => {
    const type = ACCESSORY_TYPES[key]
    accessoryLibrary.value[type] = defaultAccessories[type].map(item => ({
      ...item,
      type,
      material: null, // 自定义素材（base64）
      materialInfo: null, // { width, height, url }
      isSelected: false
    }))
  })
  
  // 念珠结构：存储已添加到念珠上的配件及其位置
  const rosaryStructure = ref({
    [ACCESSORY_TYPES.TOP_BEAD]: [], // [{ id, position, accessoryId }]
    [ACCESSORY_TYPES.WAIST_BEAD]: [],
    [ACCESSORY_TYPES.JUMP_BEAD]: [],
    [ACCESSORY_TYPES.SIDE_HANG]: [],
    [ACCESSORY_TYPES.THROUGH_BEAD]: [],
    [ACCESSORY_TYPES.BACK_CLOUD]: [],
    [ACCESSORY_TYPES.DISCIPLE_BEAD]: []
  })
  
  // 当前选中的配件ID（配件库中的）
  const selectedAccessoryId = ref(null)
  
  // 当前选中的念珠上的配件
  const selectedRosaryAccessory = ref(null)
  
  // ========== 计算属性 ==========
  
  // 获取指定分类的配件列表
  const getAccessoriesByType = computed(() => (type) => {
    return accessoryLibrary.value[type] || []
  })
  
  // 获取配件库中指定ID的配件
  const getAccessoryById = computed(() => (id) => {
    for (const type of Object.values(ACCESSORY_TYPES)) {
      const found = accessoryLibrary.value[type].find(a => a.id === id)
      if (found) return found
    }
    return null
  })
  
  // 检查指定类型是否可以添加更多配件到念珠上
  const canAddToRosary = computed(() => (type) => {
    const config = TYPE_CONFIG[type]
    const current = rosaryStructure.value[type].length
    return current < config.maxCount
  })
  
  // ========== 操作方法 ==========
  
  // 添加新配件到配件库（分类）
  function addAccessory(type, materialData) {
    const newId = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newAccessory = {
      id: newId,
      type,
      name: `新${getTypeName(type)}`,
      color: '#CCCCCC',
      radius: getDefaultRadius(type),
      material: materialData?.base64 || null,
      materialInfo: materialData ? {
        width: materialData.width,
        height: materialData.height,
        url: materialData.base64
      } : null,
      isSelected: false
    }
    accessoryLibrary.value[type].push(newAccessory)
    return newId
  }
  
  // 删除配件库中的配件
  function deleteAccessory(type, id) {
    const index = accessoryLibrary.value[type].findIndex(a => a.id === id)
    if (index !== -1) {
      accessoryLibrary.value[type].splice(index, 1)
      // 如果删除了已选中的配件，清空选中状态
      if (selectedAccessoryId.value === id) {
        selectedAccessoryId.value = null
      }
      // 如果这个配件在念珠上，也需要移除
      removeFromRosary(type, id)
    }
  }
  
  // 更新配件的素材信息
  function updateAccessoryMaterial(id, materialData) {
    const accessory = getAccessoryById.value(id)
    if (accessory) {
      accessory.material = materialData?.base64 || null
      accessory.materialInfo = materialData ? {
        width: materialData.width,
        height: materialData.height,
        url: materialData.base64
      } : null
      
      // 如果这个配件在念珠上，也需要更新
      updateRosaryAccessoryMaterial(id, materialData)
    }
  }
  
  // 选择配件库中的配件
  function selectAccessory(id) {
    // 取消之前的选中
    if (selectedAccessoryId.value) {
      const prev = getAccessoryById.value(selectedAccessoryId.value)
      if (prev) prev.isSelected = false
    }
    
    selectedAccessoryId.value = id
    const accessory = getAccessoryById.value(id)
    if (accessory) {
      accessory.isSelected = true
    }
  }
  
  // 清空配件库选中
  function clearAccessorySelection() {
    if (selectedAccessoryId.value) {
      const prev = getAccessoryById.value(selectedAccessoryId.value)
      if (prev) prev.isSelected = false
    }
    selectedAccessoryId.value = null
  }
  
  // ========== 念珠操作方法 ==========
  
  // 添加配件到念珠
  function addToRosary(type, accessoryId, position = null) {
    if (!canAddToRosary.value(type)) {
      const config = TYPE_CONFIG[type]
      throw new Error(`该位置仅支持${config.maxCount}个${getTypeName(type)}`)
    }
    
    const accessory = getAccessoryById.value(accessoryId)
    if (!accessory) {
      throw new Error('配件不存在')
    }
    
    // 计算默认位置
    if (position === null) {
      position = calculateDefaultPosition(type)
    }
    
    const rosaryItem = {
      id: `rosary-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position,
      accessoryId,
      type
    }
    
    rosaryStructure.value[type].push(rosaryItem)
    return rosaryItem.id
  }
  
  // 从念珠移除配件
  function removeFromRosary(type, accessoryId) {
    rosaryStructure.value[type] = rosaryStructure.value[type].filter(
      item => item.accessoryId !== accessoryId
    )
    // 如果删除的是选中的，清空选中
    if (selectedRosaryAccessory.value?.accessoryId === accessoryId) {
      selectedRosaryAccessory.value = null
    }
  }
  
  // 调整配件在念珠中的位置
  function adjustAccessoryPosition(type, id, newPosition) {
    const item = rosaryStructure.value[type].find(i => i.id === id)
    if (item) {
      // 腰珠位置限制：只能放在三通左侧和右侧第28个位置
      if (type === ACCESSORY_TYPES.WAIST_BEAD) {
        const throughBead = rosaryStructure.value[ACCESSORY_TYPES.THROUGH_BEAD][0]
        if (!throughBead) {
          throw new Error('请先添加三通，腰珠需要基于三通位置放置')
        }
        
        const throughPosition = throughBead.position
        const waistOffset = 28
        const leftPosition = (throughPosition - waistOffset + baseBeadCount.value) % baseBeadCount.value
        const rightPosition = (throughPosition + waistOffset) % baseBeadCount.value
        
        // 检查新位置是否有效
        if (newPosition !== leftPosition && newPosition !== rightPosition) {
          throw new Error('腰珠只能放在三通左侧或右侧第28个位置')
        }
        
        // 检查是否与其他腰珠位置冲突
        const otherWaistBead = rosaryStructure.value[type].find(i => i.id !== id)
        if (otherWaistBead && otherWaistBead.position === newPosition) {
          throw new Error('该位置已有腰珠，请选择另一个位置')
        }
      }
      
      item.position = newPosition
      // 重新排序
      rosaryStructure.value[type].sort((a, b) => a.position - b.position)
    }
  }
  
  // 更新念珠上配件的素材
  function updateRosaryAccessoryMaterial(accessoryId, materialData) {
    for (const type of Object.values(ACCESSORY_TYPES)) {
      const items = rosaryStructure.value[type].filter(item => item.accessoryId === accessoryId)
      items.forEach(item => {
        // 素材信息已经通过引用更新到accessoryLibrary中了
      })
    }
  }
  
  // 选择念珠上的配件
  function selectRosaryAccessory(type, id) {
    const item = rosaryStructure.value[type].find(i => i.id === id)
    if (item) {
      selectedRosaryAccessory.value = { ...item, type }
    }
  }
  
  // 清空念珠选中
  function clearRosarySelection() {
    selectedRosaryAccessory.value = null
  }
  
  // 计算默认位置
  function calculateDefaultPosition(type) {
    const config = TYPE_CONFIG[type]
    const existing = rosaryStructure.value[type]
    
    switch (config.defaultPosition) {
      case 'top':
        return 0
      case 'center':
        return Math.floor(baseBeadCount.value / 2)
      case 'end':
        return baseBeadCount.value - 1 - existing.length
      case 'belowThrough':
        // 背云放在三通下方
        const throughItem = rosaryStructure.value[ACCESSORY_TYPES.THROUGH_BEAD][0]
        return throughItem ? throughItem.position + 1 : baseBeadCount.value - 1
      case 'waistBead':
        // 腰珠：只能放在三通左侧和右侧第28个位置
        const throughBead = rosaryStructure.value[ACCESSORY_TYPES.THROUGH_BEAD][0]
        if (!throughBead) {
          throw new Error('请先添加三通，腰珠需要基于三通位置放置')
        }
        const throughPosition = throughBead.position
        const waistOffset = 28
        
        if (existing.length === 0) {
          // 第一个腰珠：三通左侧第28个位置
          return (throughPosition - waistOffset + baseBeadCount.value) % baseBeadCount.value
        } else if (existing.length === 1) {
          // 第二个腰珠：三通右侧第28个位置
          return (throughPosition + waistOffset) % baseBeadCount.value
        }
        return throughPosition
      case 'interval':
        // 跳珠插入到基础珠间隔
        const intervals = Math.floor(baseBeadCount.value / (existing.length + 2))
        return (existing.length + 1) * intervals
      case 'side':
        // 侧挂位置
        return existing.length === 0 ? 27 : 81
      default:
        return existing.length
    }
  }
  
  // ========== 辅助方法 ==========
  
  function getTypeName(type) {
    const names = {
      [ACCESSORY_TYPES.TOP_BEAD]: '顶珠',
      [ACCESSORY_TYPES.WAIST_BEAD]: '腰珠',
      [ACCESSORY_TYPES.JUMP_BEAD]: '跳珠',
      [ACCESSORY_TYPES.SIDE_HANG]: '侧挂',
      [ACCESSORY_TYPES.THROUGH_BEAD]: '三通',
      [ACCESSORY_TYPES.BACK_CLOUD]: '背云',
      [ACCESSORY_TYPES.DISCIPLE_BEAD]: '弟子珠'
    }
    return names[type] || '配件'
  }
  
  function getDefaultRadius(type) {
    const radii = {
      [ACCESSORY_TYPES.TOP_BEAD]: 16,
      [ACCESSORY_TYPES.WAIST_BEAD]: 14,
      [ACCESSORY_TYPES.JUMP_BEAD]: 10,
      [ACCESSORY_TYPES.SIDE_HANG]: 12,
      [ACCESSORY_TYPES.THROUGH_BEAD]: 18,
      [ACCESSORY_TYPES.BACK_CLOUD]: 14,
      [ACCESSORY_TYPES.DISCIPLE_BEAD]: 8
    }
    return radii[type] || 12
  }
  
  // ========== 数据持久化 ==========
  
  // 导出配置
  function exportData() {
    return {
      baseBeadCount: baseBeadCount.value,
      accessoryLibrary: accessoryLibrary.value,
      rosaryStructure: rosaryStructure.value,
      version: '1.0'
    }
  }
  
  // 导入配置
  function importData(data) {
    if (data.accessoryLibrary) {
      accessoryLibrary.value = data.accessoryLibrary
    }
    if (data.rosaryStructure) {
      rosaryStructure.value = data.rosaryStructure
    }
    if (data.baseBeadCount) {
      baseBeadCount.value = data.baseBeadCount
    }
    selectedAccessoryId.value = null
    selectedRosaryAccessory.value = null
  }
  
  // 重置
  function reset() {
    // 重置配件库为默认
    Object.keys(ACCESSORY_TYPES).forEach(key => {
      const type = ACCESSORY_TYPES[key]
      accessoryLibrary.value[type] = defaultAccessories[type].map(item => ({
        ...item,
        type,
        material: null,
        materialInfo: null,
        isSelected: false
      }))
    })
    // 清空念珠结构
    Object.keys(ACCESSORY_TYPES).forEach(key => {
      rosaryStructure.value[ACCESSORY_TYPES[key]] = []
    })
    selectedAccessoryId.value = null
    selectedRosaryAccessory.value = null
  }
  
  return {
    // 状态
    baseBeadCount,
    accessoryLibrary,
    rosaryStructure,
    selectedAccessoryId,
    selectedRosaryAccessory,
    ACCESSORY_TYPES,
    TYPE_CONFIG,
    
    // 计算属性
    getAccessoriesByType,
    getAccessoryById,
    canAddToRosary,
    
    // 配件库方法
    addAccessory,
    deleteAccessory,
    updateAccessoryMaterial,
    selectAccessory,
    clearAccessorySelection,
    
    // 念珠方法
    addToRosary,
    removeFromRosary,
    adjustAccessoryPosition,
    selectRosaryAccessory,
    clearRosarySelection,
    
    // 工具方法
    getTypeName,
    
    // 持久化
    exportData,
    importData,
    reset
  }
})
