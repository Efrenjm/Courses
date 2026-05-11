<script setup lang="ts">
import AppToast from './components/AppToast.vue';
</script>

<template>
  <div class="min-h-screen bg-brand-cream text-[#111] flex font-inter">
    <!-- Content Area -->
    <main class="flex-1 overflow-y-auto">
      <router-view />
    </main>
    <AppToast />
  </div>
</template>
