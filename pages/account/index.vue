<template>
  <div class="container">
    <h1>Account</h1>
    <UserDetails :user="user" @updateUser="updateUser"></UserDetails>
    <!-- <DogList :dogs="dogs" @addDog="addDog"></DogList> -->
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
    updateUser(updatedUser) {
      console.log('update user', updatedUser)
      this.user = updatedUser
    },
    addDog(dog) {
      console.log(dog)
    },
  },
}
</script>
