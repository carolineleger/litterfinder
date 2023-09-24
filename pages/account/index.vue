<template>
  <div class="container">
    <h1>Account</h1>
    <UserDetails :user="user" @updateUser="updateUser"></UserDetails>
    <DogList :dogs="dogs" @addDog="addDog"></DogList>
  </div>
</template>

<script>
import UserDetails from '@/components/Account/UserDetails.vue'
import DogList from '@/components/Account/DogList.vue'

export default {
  components: {
    UserDetails,
    DogList,
  },
  data() {
    return {
      user: {},
      dogs: [],
    }
  },
  methods: {
    updateUser() {
      // Implement user update logic here
    },
    addDog() {
      // Implement adding a new dog logic here
    },
  },
}
</script>

<script setup>
const { user, dogs } = defineProps(['user', 'dogs'])
</script>

<script>
export default {
  middleware: ['auth'],
}
</script>
