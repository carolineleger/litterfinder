<template>
  <v-app>
    <v-app-bar app>
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col>
            <router-link to="/">
              <!-- Link to your homepage or logo -->
              <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
            </router-link>
          </v-col>
          <v-col align="right">
            <v-btn text to="/finder">Find your dog siblings</v-btn>
            <v-btn v-if="loggedIn" color="orange" to="/account"
              >My Account</v-btn
            >
            <v-btn v-else color="orange" to="/login">Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>

    <v-footer class="footer">
      <v-container>
        <v-row align="center">
          <v-col>
            <p>&copy; Copyright Litterfinder 2023</p>
          </v-col>
          <v-col align="right">
            <router-link to="/about">About</router-link>
            <router-link to="/privacy">Privacy Policy</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '@nuxtjs/composition-api'
const store = useStore()

const loggedIn = ref(false)

watch(
  () => store.getters.getToken,
  (currentValue) => {
    console.log('login')
    currentValue ? (loggedIn.value = true) : (loggedIn.value = false)
  }
)
</script>

<style scoped lang="scss">
.logo {
  width: 170px;
}

.footer {
  background-color: black;
  color: white;

  p {
    margin-bottom: 0;
  }

  a:not(:last-of-type) {
    margin-right: 15px;
  }
}
</style>
