<template>
    <div class="px-12 py-10 layout">
        <h2 class="text-xl font-semibold mb-6">Search Results</h2>

        <div v-if="results.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <v-card v-for="(dog, index) in results" :key="index" class="rounded-2xl overflow-hidden shadow-md border">
                <v-img :src="dog.image_url" height="200px" cover />
                <v-card-title class="font-bold">{{ dog.name }}</v-card-title>
                <v-card-text class="text-sm">
                    <div><strong>Primary Breed:</strong> {{ dog.breed_primary }}</div>
                    <div v-if="dog.breed_secondary"><strong>Secondary Breed:</strong> {{ dog.breed_secondary }}</div>
                    <div><strong>Date of Birth:</strong> {{ formatDate(dog.date_of_birth) }}</div>
                    <div><strong>Breeder:</strong> {{ dog.breeder_name || '—' }}</div>
                    <div><strong>Location:</strong> {{ dog.postcode }}, {{ dog.state }}</div>
                </v-card-text>
            </v-card>
        </div>

        <div v-else class="mt-6 text-gray-600">
            <p>Sorry, no dogs matched your search. Try adjusting your filters.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSearchStore } from '~/store/search'
import dogsData from '~/data/test-dogs.json'
import { breeds } from '~/data/breeds'
import { matchRequiredDob, formatDate } from '~/utils/date'

const searchStore = useSearchStore()
const allDogs = ref(dogsData)
const results = ref([])

const normalize = (str) => str?.toString().toLowerCase().trim() || ''

const getLabelFromValue = (value) => {
    const match = breeds.find((b) => b.value === value)
    return match?.label || ''
}

function matchesRequiredFields(dog, filters) {
    const selectedPrimaryBreedLabel = getLabelFromValue(filters.primaryBreed)
    const selectedSecondaryBreedLabel = getLabelFromValue(filters.secondaryBreed)

    const matchesPrimaryBreed = normalize(dog.breed_primary) === normalize(selectedPrimaryBreedLabel)
    const matchesState = normalize(dog.state) === normalize(filters.state)
    const matchesDob = matchRequiredDob(dog.date_of_birth, filters.birthDate)

    return matchesPrimaryBreed && matchesState && matchesDob
}

function matchesOptionalFields(dog, filters) {
    const selectedSecondaryBreedLabel = getLabelFromValue(filters.secondaryBreed)

    const matchesSecondary =
        !filters.secondaryBreed || normalize(dog.breed_secondary) === normalize(selectedSecondaryBreedLabel)
    const matchesBreeder =
        !filters.breederName || normalize(dog.breeder_name).includes(normalize(filters.breederName))
    const matchesPostcode =
        !filters.postcode || normalize(dog.postcode) === normalize(filters.postcode)

    return matchesSecondary && matchesBreeder && matchesPostcode
}

function filterDogs(filters) {
    return allDogs.value.filter((dog) => {
        if (!matchesRequiredFields(dog, filters)) return false
        return matchesOptionalFields(dog, filters)
    })
}

watch(
    () => searchStore.searchTriggered,
    (triggered) => {
        if (triggered) {
            results.value = filterDogs(searchStore.filters)
            searchStore.resetTrigger()
        }
    },
    { immediate: true }
)
</script>