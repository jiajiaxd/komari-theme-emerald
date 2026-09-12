<script setup lang="ts">
import { computed } from 'vue'
import { useNodeFormatters } from '@/composables/useNodeFormatters'

export interface TrafficProgressProps {
  upload: number
  download: number
  trafficLimit: number
  height?: number | string
  showIndicator?: boolean
}

const props = withDefaults(defineProps<TrafficProgressProps>(), {
  height: 4,
  showIndicator: false,
})
const { formatBytes } = useNodeFormatters()
const upload = computed(() => Number.isFinite(props.upload) ? Math.max(0, props.upload) : 0)
const download = computed(() => Number.isFinite(props.download) ? Math.max(0, props.download) : 0)
const denominator = computed(() => Math.max(upload.value + download.value, props.trafficLimit > 0 ? props.trafficLimit : 0))
const uploadPercentage = computed(() => denominator.value > 0 ? upload.value / denominator.value * 100 : 0)
const downloadPercentage = computed(() => denominator.value > 0 ? download.value / denominator.value * 100 : 0)
const progressHeight = computed(() => typeof props.height === 'number' ? `${props.height}px` : props.height)
</script>

<template>
  <div class="flex w-full min-w-0 flex-col gap-1">
    <div v-if="showIndicator" class="flex flex-wrap justify-end gap-x-2 text-xs">
      <span class="text-yellow-600 dark:text-yellow-400">↑ {{ formatBytes(upload) }}</span>
      <span class="text-green-600 dark:text-green-400">↓ {{ formatBytes(download) }}</span>
    </div>
    <div
      class="flex overflow-hidden rounded-full bg-muted" :style="{ height: progressHeight }"
      role="img" :aria-label="`↑ ${formatBytes(upload)} · ↓ ${formatBytes(download)}`"
    >
      <div class="h-full shrink-0 bg-yellow-500 transition-[width] duration-200" :style="{ width: `${uploadPercentage}%` }" />
      <div class="h-full shrink-0 bg-green-500 transition-[width] duration-200" :style="{ width: `${downloadPercentage}%` }" />
    </div>
  </div>
</template>
