<script setup lang="ts">
import { useUIStore } from '@/stores/ui';
import { faCircleCheck, faCircleExclamation, faCircleInfo, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

const uiStore = useUIStore();

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return faCircleCheck;
    case 'error': return faCircleExclamation;
    case 'warning': return faTriangleExclamation;
    default: return faCircleInfo;
  }
};

const getTypeClasses = (type: string) => {
  switch (type) {
    case 'success': return 'bg-green-50 text-green-800 border-green-500';
    case 'error': return 'bg-red-50 text-red-800 border-red-500';
    case 'warning': return 'bg-yellow-50 text-yellow-800 border-yellow-500';
    default: return 'bg-blue-50 text-blue-800 border-blue-500';
  }
};
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="toast in uiStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-[400px] border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white animate-in slide-in-from-right duration-300"
        :class="getTypeClasses(toast.type)"
      >
        <font-awesome-icon :icon="getIcon(toast.type)" class="text-lg shrink-0" />
        <p class="text-sm font-bold flex-1">{{ toast.message }}</p>
        <button
          @click="uiStore.removeToast(toast.id)"
          class="hover:opacity-70 transition-opacity p-1"
        >
          <font-awesome-icon :icon="faXmark" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
