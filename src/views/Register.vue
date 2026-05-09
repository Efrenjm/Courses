<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppInput from '@/components/AppInput.vue';
import { useFormKit } from '@/utils/form';
import { Validators } from '@/utils/validators';

const { defineField, errors, handleSubmit, meta, values } = useFormKit({
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
  },
  validationSchema: {
    email: (val: string) => Validators.required()(val) || Validators.email()(val) || true,
    password: (val: string) => Validators.required()(val) || Validators.minLength(6)(val) || true,
    confirmPassword: (val: string) => {
      const required = Validators.required()(val);
      if (required) return required;
      return val === values.password ? true : 'Passwords do not match';
    },
  },
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword');

const onRegister = handleSubmit((formValues) => {
  console.log('Registering with:', formValues);
});
</script>

<template>
  <div class="min-h-screen bg-brand-cream flex items-center justify-center p-6 font-inter">
    <div class="neo-card bg-white p-10 w-full max-w-[440px] shadow-sm">
      <div class="flex flex-col items-center text-center mb-8">
        <div class="w-14 h-14 bg-[#111] rounded-2xl flex items-center justify-center mb-6">
          <div class="w-8 h-8 border-4 border-white rounded-md"></div>
        </div>
        <h1 class="text-3xl font-bold text-[#111] mb-2">Create Account</h1>
        <p class="text-[#666] font-medium">Join our community today!</p>
      </div>

      <form @submit="onRegister" class="flex flex-col gap-2">
        <AppInput
          v-model="email"
          v-bind="emailProps"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          autocomplete="username"
          :error="errors.email"
        />
        <AppInput
          v-model="password"
          v-bind="passwordProps"
          label="Password"
          type="password"
          placeholder="••••••••"
          autocomplete="new-password"
          :error="errors.password"
        />
        <AppInput
          v-model="confirmPassword"
          v-bind="confirmPasswordProps"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          autocomplete="new-password"
          :error="errors.confirmPassword"
        />

        <AppButton
          type="submit"
          class="w-full mt-2"
          :disabled="!meta.valid && meta.touched"
        >
          Sign Up
        </AppButton>
      </form>

      <p class="mt-8 text-center text-[15px] font-medium text-[#666]">
        Already have an account?
        <router-link to="/login" class="text-[#111] font-bold underline underline-offset-4 decoration-brand-card-purple decoration-4">Login here</router-link>
      </p>
    </div>
  </div>
</template>
