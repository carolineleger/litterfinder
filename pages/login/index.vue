<template>
  <v-container fluid class="section">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3" class="pa-5">
          <h1 class="text-center">Login</h1>
          <v-form @submit.prevent="loginUser">
            <v-text-field v-model="login.email" label="Email" required :error-messages="errors.email"></v-text-field>

            <v-text-field v-model="login.password" label="Password" type="password" required
              :error-messages="errors.password"></v-text-field>

            <v-btn class="primary-btn" block type="submit" :loading="loading">
              Sign in
            </v-btn>

            <v-alert v-if="errorMessage" type="error" class="mt-3">
              {{ errorMessage }}
            </v-alert>
            <p class="mt-4 text-center text-sm"><a class="underline" href="/forgot-password">Forgot your password?</a>
            </p>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p>
              Don't have an account?
              <router-link to="/register" class="text-orange-600 underline">Get started</router-link>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const login = ref({ email: '', password: '' })
const loading = ref(false)
const errorMessage = ref('')
const errors = ref({ email: '', password: '' })
const { $supabase } = useNuxtApp()

const loginUser = async () => {
  loading.value = true;
  errorMessage.value = '';
  errors.value = { email: '', password: '' };

  // Input validation
  if (!login.value.email) {
    errors.value.email = 'Email is required';
  }

  if (!login.value.password) {
    errors.value.password = 'Password is required';
  }

  if (errors.value.email || errors.value.password) {
    loading.value = false;
    return;
  }

  try {
    const { data, error } = await $supabase.auth.signInWithPassword({
      email: login.value.email,
      password: login.value.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Update user in store, including metadata (name)
    authStore.setUser({
      ...data.user,
      name: data.user?.user_metadata?.name || '' 
    });

    // Redirect after successful login
    router.push('/account');
  } catch (err) {
    errorMessage.value = err.message;
    console.error("Error logging in:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  authStore.loadUser()
})
</script>
