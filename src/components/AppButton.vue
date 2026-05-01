<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
});

const variantClasses = {
  primary: 'bg-[#111] text-white border-[#111] hover:bg-black',
  secondary: 'bg-brand-pill text-[#111] border-[#111] hover:bg-brand-pill-hover',
  ghost: 'bg-transparent text-[#111] border-transparent hover:bg-brand-pill-hover',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3.5 text-base',
  lg: 'px-8 py-4 text-lg',
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-semibold rounded-full border-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative"
    :class="[variantClasses[variant], sizeClasses[size]]"
  >
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
    </div>
    <span :class="{ 'opacity-0': loading }" class="flex items-center gap-2">
      <slot name="icon-left"></slot>
      <slot></slot>
      <slot name="icon-right"></slot>
    </span>
  </button>
</template>
