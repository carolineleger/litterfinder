import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const filters = ref({})
  const searchTriggered = ref(false)

  function setFilters(newFilters) {
    filters.value = newFilters
  }

  function triggerSearch() {
    searchTriggered.value = true
  }

  function resetTrigger() {
    searchTriggered.value = false
  }

  return {
    filters,
    searchTriggered,
    setFilters,
    triggerSearch,
    resetTrigger,
  }
})
