<template>
  <div class="bg-gray-100 h-screen">
    <div class="!p-12 layout">
      <h1 class="text-center">Your Account</h1>
      <UserDetails v-if="user" />
      <br />
      <DogList v-if="user" />
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from "~/store/auth";
import UserDetails from '@/components/Account/UserDetails.vue'
import DogList from '@/components/Account/DogList.vue'

const authStore = useAuthStore()
const user = ref(null)

onMounted(async () => {
  await authStore.loadUser()

  if (!authStore.isAuthenticated) {
    router.push('/login')
  } else {
    user.value = authStore.user
  }
})
</script>
