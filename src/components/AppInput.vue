<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  error: '',
  placeholder: '',
  disabled: false,
});

const emit = defineEmits(['update:modelValue', 'blur']);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

function onBlur(event: FocusEvent) {
  emit('blur', event);
}
</script>

<template>
  <div class="flex flex-col gap-2 mb-4 text-left">
    <label v-if="label" class="text-sm font-semibold text-[#111] ml-1">{{ label }}</label>
    <div class="relative group">
      <input
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full px-5 py-3.5 bg-white border-2 border-[#111] rounded-2xl outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4 focus:ring-brand-pill-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-sm group-hover:shadow-md"
        :class="{ 'border-red-500 focus:ring-red-100': error }"
        @input="onInput"
        @blur="onBlur"
      />
    </div>
    <span v-if="error" class="text-xs font-medium text-red-500 ml-1">{{ error }}</span>
  </div>
</template>
