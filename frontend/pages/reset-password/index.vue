<template>
    <v-container fluid class="section">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card elevation="3" class="pa-5">
                    <h1 class="text-center">Set New Password</h1>

                    <v-form @submit.prevent="updatePassword">
                        <v-text-field v-model="password" label="New Password" type="password" required
                            :error-messages="errorMessage"></v-text-field>

                        <v-btn class="primary-btn" block type="submit" :loading="loading">
                            Update Password
                        </v-btn>

                        <v-alert v-if="successMessage" type="success" class="mt-3">
                            {{ successMessage }}
                        </v-alert>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const { $supabase } = useNuxtApp()
const router = useRouter()

const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const updatePassword = async () => {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    if (!password.value) {
        errorMessage.value = 'Password is required'
        loading.value = false
        return
    }

    const { error } = await $supabase.auth.updateUser({
        password: password.value,
    })

    if (error) {
        errorMessage.value = error.message
    } else {
        successMessage.value = 'Password updated successfully! Redirecting...'
        setTimeout(() => router.push('/login'), 2000)
    }

    loading.value = false
}
</script>