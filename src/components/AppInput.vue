<script setup lang="ts">
import { ref, computed } from 'vue';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  modelValue: string | number;
  label?: string;
  error?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  error: '',
  placeholder: '',
  disabled: false,
});

const emit = defineEmits(['update:modelValue', 'blur']);

const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

function onBlur(event: FocusEvent) {
  emit('blur', event);
}

function togglePassword() {
  showPassword.value = !showPassword.value;
}
</script>

<template>
  <div class="flex flex-col gap-2 mb-4 text-left">
    <label v-if="label" class="text-sm font-semibold text-[#111] ml-1">{{ label }}</label>
    <div class="relative group">
      <input
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        class="w-full px-5 py-3.5 bg-white border-2 border-[#111] rounded-2xl outline-none transition-all duration-200 placeholder:text-gray-400 focus:ring-4 focus:ring-brand-pill-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-sm group-hover:shadow-md pr-12"
        :class="{ 'border-red-500 focus:ring-red-100': error }"
        @input="onInput"
        @blur="onBlur"
      />
      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#666] hover:text-[#111] transition-colors focus:outline-none"
        @click="togglePassword"
      >
        <font-awesome-icon :icon="showPassword ? faEyeSlash : faEye" />
      </button>
    </div>
    <span v-if="error" class="text-xs font-medium text-red-500 ml-1">{{ error }}</span>
  </div>
</template>
