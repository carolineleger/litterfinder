<template>
  <v-card class="mx-auto">
    <v-card-text>
      <v-form @submit.prevent="saveChanges">
        <v-row align="center">
          <v-col>
            <v-label>Name</v-label>
            <h2 v-if="!user?.name" class="mb-0">User {{ user?.id.substr(0, user?.id.indexOf('-')) }}</h2>
            <h2 v-else>{{ user?.name }}</h2>
          </v-col>
          <v-col align="right">
            <v-btn @click="toggleEdit" class="mr-4">
              {{ isEditing ? 'Cancel' : 'Edit' }}
            </v-btn>
            <v-btn class="primary-btn" v-if="isEditing" type="submit" :loading="loading">Save</v-btn>
          </v-col>
        </v-row>

        <v-row v-if="isEditing">
          <v-col>
            <v-text-field label="Name" v-model="editedName" :readonly="!isEditing"
              placeholder="Enter your name"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-label>Email</v-label>
            <p class="mt-2">{{ user.email }}</p>
          </v-col>
        </v-row>
      </v-form>

      <v-alert v-if="errorMessage" type="error" class="mt-3">
        {{ errorMessage }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from "~/store/auth";
import { useNuxtApp } from '#app'

const userStore = useAuthStore()
const { $supabase } = useNuxtApp()

const user = computed(() => userStore.user)
const editedName = ref(user.value?.name || '')
const isEditing = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const toggleEdit = () => {
  if (isEditing.value) {
    editedName.value = user.value?.name || ''
  }
  isEditing.value = !isEditing.value
}

const saveChanges = async () => {
  if (!editedName.value.trim()) {
    errorMessage.value = "Name cannot be empty.";
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    // Update user metadata using Supabase Auth API
    const { user: updatedUser, error: usersError } = await $supabase.auth.updateUser({
      data: {
        name: editedName.value.trim() // Update the 'name' field in user metadata
      }
    });

    if (usersError) {
      throw usersError;
    }

    // Log the updated user data for debugging
    console.log('Updated user data:', updatedUser);

    // Update the local store to reflect the new name
    userStore.setUser({ ...user.value, name: editedName.value.trim() });

    isEditing.value = false;
  } catch (err) {
    errorMessage.value = err.message || 'Unknown error';
    console.error("Error updating user:", err);  // Log the full error object for debugging
  } finally {
    loading.value = false;
  }
};

</script>
