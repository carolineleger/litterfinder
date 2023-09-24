<template>
  <v-container fluid class="section">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3" class="pa-5">
          <h1 class="text-center">Register</h1>
          <v-form
            v-model="form"
            class="d-flex flex-wrap gap-10"
            @submit.prevent="registerUser"
          >
            <div
              v-for="item in registrationFormFields"
              :key="item.label"
              :class="item.col ? 'half' : 'w-100'"
            >
              <v-text-field
                v-if="item.field === 'input'"
                v-model="register[item.model]"
                :label="item.label"
                :placeholder="item.placeholder"
                :type="item.type"
                :rules="item.rules"
              ></v-text-field>

              <p v-if="item.hint" class="hint">
                {{ item.hint }}
              </p>

              <v-select
                v-if="item.field === 'select'"
                v-model="register[item.model]"
                :label="item.label"
                :items="item.items"
                item-text="label"
              ></v-select>
            </div>

            <v-btn color="primary" block type="submit" :disabled="!form">
              Sign up
            </v-btn>
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
import Cookies from 'universal-cookie'
import { registrationForm } from '../../data/registration.js'
const cookies = new Cookies(null, { path: '/' })

export default {
  data() {
    return {
      register: {
        email: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: '',
        dogBreed1: '',
        dogBreed2: '',
        breederName: '',
      },
      registrationFormFields: registrationForm,
      datePickerMode: 'date',
      datePickerDialog: false,
      selectedDate: null,
      form: false,
    }
  },
  methods: {
    async registerUser() {
      // Check if the passwords match
      if (this.register.password !== this.register.passwordConfirm) {
        this.$toast.error('Passwords do not match')
        return
      }
      const requestBody = this.setupRequestBody()
      try {
        const response = await this.$axios.post(
          '/api/user/register',
          requestBody
        )

        if (response.status === 201) {
          const token = response.data.token
          if (token) {
            cookies.set('token', response.data.token, { sameSite: 'strict' })
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
          console.log(err)
          this.$toast.error('An error occurred')
        }
      }
    },
    openDatePicker(mode) {
      this.datePickerMode = mode
      this.datePickerDialog = true
    },
    closeDatePicker() {
      this.datePickerDialog = false
    },
    setupRequestBody() {
      const {
        email,
        password,
        dogBreed1,
        dogBreed2,
        dateOfBirth,
        dogName,
        breederName,
      } = this.register
      const requestBody = {
        email,
        password,
        dogs: [{ dateOfBirth, dogBreed1, dogBreed2, dogName }],
        breederName,
      }

      console.log(requestBody)
      return requestBody
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep {
  .v-text-field {
    padding-top: 0 !important;
  }

  .half {
    width: calc(50% - 5px);
  }
}
</style>
