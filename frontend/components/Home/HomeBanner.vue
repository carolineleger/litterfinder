<template>
  <div class="banner bg-cover bg-center w-full h-[60vh] relative">
    <div
      class="banner__content bg-black/50 w-full h-full flex justify-center items-center absolute text-white text-center">
      <div class="container">
        <h1>Connect with pups from the same litter</h1>
        <p>
          Reunite your dog with their littermates.
          <br />Schedule playdates, share stories, and explore their family.
        </p>

        <v-btn size="large" to="/register" class="mt-4 primary-btn">Get started</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  background: url('/public/images/two_dogs.webp') no-repeat center/cover;
}
</style>