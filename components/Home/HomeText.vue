<template>
  <div>
    <section class="intro">
      <div class="section text-center">
        <h2>Are you a proud dog parent?</h2>
        <p>
          At LitterConnect, we understand the unique bond that comes from
          raising a pup from the same litter.
          <br />
          Our mission is to foster these special connections, helping you and
          your furry friend find their siblings and build lifelong
          relationships.
        </p>
      </div>
    </section>

    <v-container class="section">
      <h2 align="center">What We Do</h2>
      <v-row>
        <v-col
          v-for="col in presentation"
          :key="col.icon"
          cols="6"
          align="center"
        >
          <img :src="'@/assets/images/' + col.icon" alt="" width="120" /><br />
          <h3>{{ col.title }}</h3>
          {{ col.content }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const presentation = [
  {
    icon: 'list1.png',
    title: 'Discover Siblings',
    content:
      "Our platform makes it easy to discover and connect with other dogs from the same litter. Whether you're curious about your pup's brothersand sisters or just want to reunite them, LitterConnect is the place to start.",
  },
  {
    icon: 'list2.png',
    title: 'Discover Siblings',
    content:
      "Share your dog's journey and learn about your littermates. Share stories, photos, and updates to keep the litter family connected, no matter where they are.",
  },
  {
    icon: 'list3.png',
    title: 'Organize Playdates',
    content:
      'Arrange playdates, meetups, and reunions with littermates. Watching your dogs play and interact with their siblings is a heartwarming experience.',
  },
  {
    icon: 'list4.png',
    title: 'Stay Informed',
    content:
      'Access valuable resources, from health tips to training advice. Our community is here to support your journey as a dog owner and help you provide the best for your furry friend.',
  },
]
</script>

<style scoped lang="scss">
.intro {
  background-color: #222222;
  color: white;
}
.section {
  li {
    margin-bottom: 5px;
  }
}
</style>
