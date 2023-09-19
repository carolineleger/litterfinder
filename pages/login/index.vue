<template>
  <v-container fluid class="section">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3" class="pa-5">
          <h1 class="text-center">Login</h1>
          <v-form @submit.prevent="loginUser">
            <v-text-field
              v-model="login.email"
              label="Email"
              required
            ></v-text-field>

            <v-text-field
              v-model="login.password"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-btn color="primary" block @click="loginUser"> Sign in </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p>
              Don't have an account?
              <router-link to="/register">Click here</router-link>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Cookies from 'universal-cookie'

const cookies = new Cookies(null, { path: '/' })

export default {
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async loginUser() {
      try {
        const response = await this.$axios.post('/api/user/login', this.login)
        const token = response.data.token
        cookies.set('token', response.data.token, { sameSite: 'strict' })
        this.$store.dispatch('setToken', response.data.token)
        if (token) {
          this.$toast.success('Logged in successfully')
          this.$router.push('/account')
        }
      } catch (err) {
        if (err.response?.status === 400) {
          this.$toast.error('Invalid login or password.')
        } else {
          this.$toast.error('Something went wrong. Please try again later.')
        }
      }
    },
  },
}
</script>
