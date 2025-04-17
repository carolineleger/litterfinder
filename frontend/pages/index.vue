<template>
  <div>
    <HomeBanner />
    <HomeText />
  </div>
</template>

<script>
import HomeBanner from '@/components/Home/HomeBanner.vue'
import HomeText from '@/components/Home/HomeText.vue'

export default {
  components: {
    HomeBanner,
    HomeText,
  },
}
</script>
