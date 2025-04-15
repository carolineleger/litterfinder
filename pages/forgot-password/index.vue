<template>
    <v-container fluid class="section">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card elevation="3" class="pa-5">
                    <h1 class="text-center">Reset Password</h1>
                    <p class="text-center text-muted mb-4">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <v-form @submit.prevent="resetPassword">
                        <v-text-field v-model="email" label="Email" required
                            :error-messages="errorMessage"></v-text-field>

                        <v-btn class="primary-btn" block type="submit" :loading="loading">
                            Send Reset Link
                        </v-btn>

                        <v-alert v-if="successMessage" type="success" class="mt-3">
                            {{ successMessage }}
                        </v-alert>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <div class="text-center">
                        <p>
                            Remembered your password?
                            <router-link to="/login" class="text-orange-600 underline">Sign in</router-link>
                        </p>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
const { $supabase } = useNuxtApp()

const email = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const resetPassword = async () => {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    if (!email.value) {
        errorMessage.value = 'Email is required'
        loading.value = false
        return
    }

    const { error } = await $supabase.auth.resetPasswordForEmail(email.value, {
        redirectTo: '/reset-password',
    })

    if (error) {
        errorMessage.value = error.message
    } else {
        successMessage.value = 'Password reset link sent! Check your email.'
    }

    loading.value = false
}
</script>