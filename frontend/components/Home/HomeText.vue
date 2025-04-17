<template>
  <div>
    <section class="intro m-auto bg-stone-100">
      <div class="section text-center">
        <h2>Are you a proud dog parent?</h2>
        <div class="layout">
          <p>Our mission is to reconnect dogs from the same litter and help them stay in touch as they grow. </p>
          <p>Whether you're
            curious about your dog's siblings or hoping to arrange a playdate, this platform makes it easy to connect
            with
            other owners and share updates, photos, and stories. Because every pup deserves to know their pack.
          </p>
        </div>
        <v-btn size="large" to="/register" class="mt-8 primary-btn">Find your dog siblings</v-btn>
      </div>
    </section>

    <v-container class="section">
      <h2 align="center">What We Do</h2>
      <v-row>
        <v-col v-for="col in presentation" :key="col.icon" cols="6" align="center" class="!p-8">
          <img :src="getImageUrl(col.icon)" alt="" width="120" /><br />
          <h3>{{ col.title }}</h3>
          <div>{{ col.content }}</div>
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
      "Our platform makes it easy to discover and connect with other dogs from the same litter. Whether you're curious about your pup's brothers and sisters or just want to reunite them, LitterFinder is the place to start.",
  },
  {
    icon: 'list2.png',
    title: 'Share your story',
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