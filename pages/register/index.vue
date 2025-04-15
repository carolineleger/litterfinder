<template>
  <v-container fluid class="section">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="3" class="pa-5 m-auto" v-if="!formSubmitted">
          <h1 class="text-center">Register</h1>
          <p class="text-center font-weight-bold mb-8">Register first to access our search!</p>

          <v-form ref="formRef" v-model="form" class="d-flex flex-wrap gap-10" @submit.prevent="handleSubmit">
            <div v-for="item in registrationFormFields" :key="item.model" :class="[item.col ? 'half' : 'w-100']">
              <v-text-field v-if="item.field === 'input'" v-model="register[item.model]" :label="item.label"
                :placeholder="item.placeholder" :type="item.type" :rules="getRules(item)" required></v-text-field>

              <v-select v-if="item.field === 'select'" v-model="register[item.model]" :label="item.label"
                item-title="label" item-value="value" :items="item.items" required></v-select>

              <p v-if="item.hint" class="hint">{{ item.hint }}</p>
            </div>

            <v-btn class="primary-btn" block type="submit" :loading="loading" :disabled="!form">
              Sign up
            </v-btn>

            <v-alert v-if="errorMessage" type="error" class="mt-3">
              {{ errorMessage }}
            </v-alert>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p>
              Already have an account?
              <router-link to="/"><span class="underline">Click here</span></router-link>
            </p>
          </div>
        </v-card>
        <NextStep v-else />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useNuxtApp } from '#app';
import { registrationFormFields } from '../data/registration';
import NextStep from '~/components/Register/NextStep.vue';

const { $supabase } = useNuxtApp();

const register = ref({
  email: '',
  password: '',
  passwordConfirm: '',
});

const loading = ref(false);
const errorMessage = ref('');
const form = ref(false);
const formRef = ref(null);
const formSubmitted = ref(false);

const getRules = (item) => {
  const rules = item.rules ? [...item.rules] : [];

  if (item.model === 'passwordConfirm') {
    rules.push((value) => value === register.value.password || 'Passwords do not match');
  }

  return rules;
};

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = '';

  if (register.value.password !== register.value.passwordConfirm) {
    errorMessage.value = 'Passwords do not match';
    loading.value = false;
    return;
  }

  const { data, error } = await $supabase.auth.signUp({
    email: register.value.email,
    password: register.value.password,
  });

  if (error) {
    errorMessage.value = error.message;
    loading.value = false;
    return;
  }

  formSubmitted.value = true;
  loading.value = false;
};
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
