<script setup lang="ts">
interface Props {
  variant?: 'solid' | 'split' | 'gradient';
  title?: string;
  description?: string;
  tag?: string;
  topColor?: string;
  stats?: Array<{ label: string; value: string | number }>;
  imageUrl?: string;
}

withDefaults(defineProps<Props>(), {
  variant: 'solid',
});
</script>

<template>
  <div
    class="neo-card flex flex-col h-full"
    :class="{
      'bg-white': variant === 'solid',
      'bg-transparent border-none shadow-none': variant === 'gradient',
    }"
  >
    <div
      v-if="variant === 'split'"
      class="p-6 border-b-2 border-[#111] flex-1 relative overflow-hidden"
      :class="topColor || 'bg-brand-card-teal'"
    >
      <div v-if="tag" class="inline-block bg-white/50 border border-[#111] px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
        {{ tag }}
      </div>
      <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
      <p v-if="description" class="text-sm text-[#333] max-w-[80%] leading-relaxed">{{ description }}</p>

      <div class="absolute bottom-5 right-5 w-16 h-16 opacity-80">
        <slot name="top-icon"></slot>
        <img v-if="imageUrl" :src="imageUrl" :alt="title" class="w-full h-full object-contain" />
      </div>
    </div>

    <div
      class="p-6 flex flex-col flex-1"
      :class="{
        'bg-white': variant === 'split',
        'p-0': variant === 'gradient'
      }"
    >
      <template v-if="variant === 'solid'">
        <slot name="header"></slot>
        <h3 v-if="title" class="text-xl font-bold mb-4">{{ title }}</h3>
        <p v-if="description" class="text-sm text-[#555] mb-6">{{ description }}</p>
      </template>

      <div v-if="variant === 'gradient'" class="p-6 rounded-brand h-full flex flex-col">
        <slot></slot>
      </div>

      <div v-if="variant === 'split' && stats" class="flex items-center justify-around">
        <div
          v-for="(stat, index) in stats"
          :key="stat.label"
          class="flex flex-col items-center gap-1 flex-1"
          :class="{ 'border-r border-[#e0d9c8]': index < stats.length - 1 }"
        >
          <span class="text-lg font-bold">{{ stat.value }}</span>
          <span class="text-[10px] text-[#666] uppercase font-medium">{{ stat.label }}</span>
        </div>
      </div>

      <div v-if="$slots.default && variant !== 'gradient'" class="mt-auto pt-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
