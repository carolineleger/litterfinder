<template>
  <v-app>
    <v-main>
      <Header />
      <div class="page h-full">
        <NuxtPage />
      </div>
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
import { useHead } from "#imports";
import Footer from "./components/Common/Footer";
import Header from './components/Common/Header'
import '@mdi/font/css/materialdesignicons.css'

useHead({
  title: "Find my litter",
  meta: [
    { name: "description", content: "Find your dog siblings" },
  ],
});
</script>
<style>
@import '~/assets/css/main.scss';
</style>