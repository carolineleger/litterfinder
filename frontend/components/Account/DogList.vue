<template>
  <v-card class="mx-auto p-6">
    <v-row align="center" justify="space-between" class="px-4">
      <v-col cols=" auto">
        <v-card-title class="text-xl font-semibold">Your Dogs</v-card-title>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="toggleDogModal" class="primary-btn">
          Add Dog
        </v-btn>
      </v-col>
    </v-row>

    <v-card-text>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-for="dog in dogs" :key="dog.id" class="mb-6 p-4 rounded-lg border border-gray-200 shadow-sm">
          <v-row no-gutters align="stretch">
            <v-col cols="auto" class="mr-4">
              <div class="h-full">
                <img v-if="dog.image_url" :src="dog.image_url" alt="Dog Photo"
                  class="h-full w-32 object-cover rounded-lg" />
              </div>
            </v-col>
            <v-col>
              <div class="py-2">
                <h3 class="text-lg font-bold">{{ dog.name }}</h3>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">Date of Birth:</span> {{ dog.date_of_birth }}
                </p>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">Primary Breed:</span> {{ mapBreed(dog.breed_primary) }}
                </p>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold">Secondary Breed:</span>
                  {{ dog.breed_secondary ? mapBreed(dog.breed_secondary) : 'N/A' }}
                </p>
                <p class="text-sm text-gray-700" v-if="dog.breeder_name">
                  <span class="font-semibold">Breeder:</span>
                  {{ dog.breeder_name }}
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-card-text>

    <AddDogModal v-model="dogModalOpen" @fetch-dogs="fetchDogs" />
  </v-card>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '~/store/auth';
import AddDogModal from '@/components/Account/AddDogModal.vue';
import { breeds } from '~/data/breeds';

const { $supabase } = useNuxtApp();
const userStore = useAuthStore();
const user = computed(() => userStore.user);
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
  }

  loading.value = false;
};

const mapBreed = (value) => {
  const match = breeds.find((x) => x.value === value);
  return match ? match.label : value;
};

const toggleDogModal = () => {
  dogModalOpen.value = !dogModalOpen.value;
};

onMounted(fetchDogs);
</script>
