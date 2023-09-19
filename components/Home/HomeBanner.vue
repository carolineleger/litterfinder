<template>
  <div class="banner">
    <div class="banner__content">
      <div class="container">
        <h1>Connect with pups from the same litter</h1>
        <p>
          Reunite your dog with their littermates.
          <br />Schedule playdates, share stories, and explore their family.
        </p>

        <v-btn color="orange" size="large" to="/register">Join now</v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 400px;
  background: url('@/assets/images/two_dogs.webp') no-repeat center/cover;
  position: relative;

  &__content {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: white;
    text-align: center;
  }
}
</style>
