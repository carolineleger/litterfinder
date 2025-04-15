<template>
  <v-card class="mx-auto">
    <v-card-text>
      <v-row align="center">
        <v-col>
          <v-card-title>Your dogs</v-card-title>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div v-for="dog in dogs" :key="dog.id">
              <h3>{{ dog.name }}</h3>
              <p>Date of Birth: {{ dog.date_of_birth }}</p>
              <p>Primary Breed: {{ dog.breed_primary }}</p>
              <p>Secondary Breed: {{ dog.breed_secondary || 'N/A' }}</p>
              <img v-if="dog.image_url" :src="dog.image_url" alt="Dog Photo" class="dog-photo" />
              <v-file-input @change="(e) => uploadDogImage(e, dog.id)" label="Upload Image"
                accept="image/*"></v-file-input>
              <hr />
            </div>
          </div>
        </v-col>
        <v-col align="right">
          <v-btn @click="toggleDogModal()" class="mr-4">
            Add dog
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <AddDogModal v-model="dogModalOpen" @fetch-dogs="fetchDogs" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '~/store/auth';
import AddDogModal from '@/components/Account/AddDogModal.vue';

const { $supabase } = useNuxtApp()
const userStore = useAuthStore()
const user = computed(() => userStore.user)
const dogs = ref([]);
const loading = ref(true);
const dogModalOpen = ref(false);

const fetchDogs = async () => {
  if (!user.value) return;

  loading.value = true;
  const { data, error } = await $supabase
    .from('dogs')
    .select('*')
    .eq('owner_id', user.value.id);

  if (error) {
    console.error('Error fetching dogs:', error.message);
  } else {
    dogs.value = data;
    loading.value = false;
  }

  loading.value = false;
};

const toggleDogModal = () => {
  dogModalOpen.value = !dogModalOpen.value;
}

const uploadDogImage = async (event, dogId) => {
  const file = event.target.files[0];
  if (!file) return;

  const filePath = `dogs/${user.value.id}/${dogId}/${file.name}`;

  const { error } = await supabase.storage.from('dog-images').upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error.message);
    return;
  }

  const { data } = supabase.storage.from('dog-images').getPublicUrl(filePath);

  if (data.publicUrl) {
    await supabase
      .from('dogs')
      .update({ image_url: data.publicUrl })
      .eq('id', dogId);

    fetchDogs(); // Refresh dog list to update image
  }
};

onMounted(fetchDogs);
</script>

<style scoped>
.dog-photo {
  max-width: 150px;
  border-radius: 10px;
}
</style>