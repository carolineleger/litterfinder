<template>
  <v-container fluid class="section">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3" class="pa-5">
          <h1 class="text-center">Register</h1>
          <v-form
            v-model="form"
            class="flex wrap"
            @submit.prevent="registerUser"
          >
            <div
              v-for="item in registrationFormFields"
              :key="item.label"
              :class="item.col ? 'half' : 'full'"
            >
              <v-text-field
                v-if="item.field === 'input'"
                :label="item.label"
                :placeholder="item.placeholder"
                :required="item.required"
                :type="item.type"
                :model="register[item.model]"
                :rules="item.rules"
              ></v-text-field>

              <div v-if="item.field === 'date'">
                <DateOfBirthPicker />
              </div>

              <v-select
                v-if="item.field === 'select'"
                :label="item.label"
                :items="item.items"
                item-text="label"
                :model="register[item.model]"
                :required="item.required"
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
import DateOfBirthPicker from '../../components/Registration/DateOfBirthPicker'
const cookies = new Cookies(null, { path: '/' })

export default {
  components: {
    DateOfBirthPicker,
  },
  data() {
    return {
      register: {},
      registrationFormFields: registrationForm,
      datePickerMode: 'date',
      datePickerDialog: false,
      selectedDate: null,
      form: false,
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
