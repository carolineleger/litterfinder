<template>
  <v-container fluid class="section">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3" class="pa-5">
          <h1 class="text-center">Register</h1>
          <v-form @submit.prevent="registerUser">
            <v-text-field
              v-model="register.email"
              label="Email"
              required
            ></v-text-field>

            <v-text-field
              v-model="register.password"
              label="Password"
              type="password"
            ></v-text-field>

            <v-btn color="primary" block @click="registerUser"> Sign up </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p>
              Already have an account?
              <router-link to="/">Click here</router-link>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      register: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async registerUser() {
      try {
        const response = await this.$axios.post(
          '/api/user/register',
          this.register
        )

        if (response.status === 201) {
          const token = response.data.token
          if (token) {
            localStorage.setItem('jwt', token)
            this.$router.push('/account')
            this.$toast.success('Registration was successful')
          } else {
            this.$toast.error('Something went wrong')
          }
        } else {
          this.$toast.error('Something went wrong')
        }
      } catch (err) {
        if (err.response) {
          const error = err.response
          if (error.status === 409) {
            this.$toast.error(error.data.message)
          }
        } else {
          this.$toast.error('An error occurred')
        }
      }
    },
  },
}
</script>
