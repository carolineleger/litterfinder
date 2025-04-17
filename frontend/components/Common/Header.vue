<template>
  <v-app-bar elevation="2" class="bg-white shadow-md px-6 h-[70px]">
    <NuxtLink to="/" class="flex items-center">
      <img src="/images/logo.png" alt="Logo" class="h-8 w-auto" />
    </NuxtLink>

    <v-spacer />

    <nav class="flex items-center gap-4">
      <client-only>
        <template v-if="isLoggedIn">
          <NuxtLink to="/find-dogs" class="text-gray-700 hover:text-gray-900">
            <FontAwesomeIcon :icon="faMagnifyingGlass" class="text-gray-500 mr-2" />
            <span class="text-base">Find your dog siblings</span>
          </NuxtLink>

          <v-menu offset-y transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" variant="text" class="text-gray-700">
                Account
                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </template>

            <v-list class="dropdown-menu">
              <v-list-item to="/account">
                <v-list-item-title>My Account</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item @click="logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <template v-else>
          <v-btn class="primary-btn" size="large" to="/login">Login</v-btn>
          <NuxtLink to="/register" class="text-orange-500 hover:underline">Sign up</NuxtLink>
        </template>
      </client-only>
    </nav>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "~/store/auth";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isAuthenticated);

const logout = () => {
  authStore.logout();
  navigateTo('/');
};
</script>
