<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUIStore } from '@/stores/ui';
import { getFirebaseErrorMessage } from '@/utils/firebase-errors';
import { hasStringProperty } from '@/utils/ts-utils';
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import { useFormKit } from '@/utils/form';
import { Validators } from '@/utils/validators';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const router = useRouter();
const authStore = useAuthStore();
const uiStore = useUIStore();
const isSubmitting = ref(false);

const { defineField, handleSubmit, meta } = useFormKit({
  initialValues: {
    email: '',
    password: '',
  },
  validationSchema: {
    email: (val: string) => Validators.required()(val) || Validators.email()(val) || true,
    password: (val: string) => Validators.required()(val) || Validators.minLength(6)(val) || true,
  },
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const onEmailLogin = handleSubmit(async () => {
  isSubmitting.value = true;
  try {
    await authStore.loginWithEmail(email.value, password.value);
    uiStore.showToast('Welcome back!', 'success');
    router.push('/');
  } catch (error: unknown) {
    if (hasStringProperty(error, 'code')) {
      const message = getFirebaseErrorMessage(error.code);
      uiStore.showToast(message, 'error');
    } else {
      uiStore.showToast('Login failed. Please check your credentials.', 'error');
    }
    console.error('Login failed:', error);
  } finally {
    isSubmitting.value = false;
  }
});

async function onGoogleLogin() {
  isSubmitting.value = true;
  try {
    await authStore.loginWithGoogle();
    uiStore.showToast('Welcome back!', 'success');
    router.push('/');
  } catch (error: unknown) {
    if (hasStringProperty(error, 'code')) {
      const message = getFirebaseErrorMessage(error.code);
      uiStore.showToast(message, 'error');
    } else {
      uiStore.showToast('Google login failed.', 'error');
    }
    console.error('Google login failed:', error);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-brand-cream flex items-center justify-center p-6 font-inter">
    <div class="neo-card bg-white p-10 w-full max-w-[440px] shadow-sm">
      <div class="flex flex-col items-center text-center mb-8">
        <div class="w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center mb-6">
          <div class="w-8 h-8 border-4 border-white rounded-md"></div>
        </div>
        <h1 class="text-3xl font-bold text-[#111] mb-2">Welcome Back</h1>
        <p class="text-[#666] font-medium">Sign in to your account</p>
      </div>

      <form @submit="onEmailLogin" class="flex flex-col gap-2">
        <AppInput
          v-model="email"
          v-bind="emailProps"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          autocomplete="username"
        />
        <AppInput
          v-model="password"
          v-bind="passwordProps"
          label="Password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
        />
        <AppButton
          type="submit"
          class="w-full mt-2"
          :disabled="!meta.dirty || !meta.valid || isSubmitting"
          :loading="isSubmitting"
        >
          Sign In
        </AppButton>
      </form>
      <div class="relative my-8 text-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t-2 border-brand-pill-hover"></div>
        </div>
        <span class="relative px-4 bg-white text-[10px] font-bold text-[#888] uppercase tracking-widest">
          Or continue with
        </span>
      </div>
      <div class="flex flex-col gap-3">
        <AppButton variant="secondary" @click="onGoogleLogin" class="w-full" :disabled="isSubmitting">
          <template #icon-left>
            <font-awesome-icon :icon="faGoogle" />
          </template>
          Google
        </AppButton>
      </div>
      <p class="mt-8 text-center text-[15px] font-medium text-[#666]">
        Don't have an account?
        <router-link to="/register" class="text-[#111] font-bold underline underline-offset-4 decoration-brand-card-yellow decoration-4">Register here</router-link>
      </p>
    </div>
  </div>
</template>
