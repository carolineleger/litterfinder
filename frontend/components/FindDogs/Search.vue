<template>
    <div class="bg-white shadow-md rounded-lg px-12 py-12 layout">
        <h2 class="text-xl font-semibold mb-4">Find your dog siblings</h2>

        <form @submit.prevent="handleSearch" class="flex flex-col gap-x-6">
            <div class="flex gap-4 items-end">
                <div class="w-full">
                    <label class="block mb-1 font-semibold">Primary Breed <span class="text-red-500">*</span></label>
                    <v-select v-model="search.primaryBreed" :items="breeds" item-title="label" item-value="value"
                        variant="outlined" dense placeholder="Select a breed" required class="min-h-[45px]" />
                </div>

                <div class="min-w-[100px]">
                    <label class="block mb-1 font-semibold">State <span class="text-red-500">*</span></label>
                    <v-select v-model="search.state" :items="states" item-title="label" item-value="value"
                        variant="outlined" dense required class="min-h-[45px]" />
                </div>

                <div class="w-full">
                    <label class="block mb-1 font-semibold">Date of Birth</label>
                    <PartialDateSelector @update="(val) => birthDate = val" />
                </div>

                <div class="w-1/4 mb-6">
                    <v-btn type="submit" class="w-full primary-btn !h-[45px]">Search</v-btn>
                </div>
            </div>

            <!-- More Options Toggle -->
            <div>
                <button type="button" @click="showMoreOptions = !showMoreOptions"
                    class="text-sm text-blue-600 flex items-center gap-1 hover:underline mb-2">
                    More options
                    <svg :class="['transition-transform duration-200', showMoreOptions ? 'rotate-180' : 'rotate-0']"
                        xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            <!-- Optional Fields -->
            <div v-if="showMoreOptions" class="flex gap-4">
                <div class="w-full">
                    <label class="block mb-1 font-semibold">Secondary Breed</label>
                    <v-select v-model="search.secondaryBreed" :items="breeds" item-title="label" item-value="value"
                        variant="outlined" dense clearable placeholder="Select a breed" />
                </div>

                <div class="w-full">
                    <label class="block mb-1 font-semibold">Breeder</label>
                    <v-text-field v-model="search.breederName" variant="outlined" dense
                        placeholder="Enter breeder name" />
                </div>
                <div class="w-full">
                    <label class="block mb-1 font-semibold">Postcode</label>
                    <v-text-field v-model="search.postcode" variant="outlined" dense
                        placeholder="Enter breeder postcode" />
                </div>
            </div>
        </form>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { breeds } from '~/data/breeds'
import { states } from '~/data/location'
import { useSearchStore } from '~/store/search'

const searchStore = useSearchStore()

import PartialDateSelector from '../Common/PartialDateSelector.vue'

const search = ref({
    primaryBreed: '',
    secondaryBreed: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    breederName: '',
    postcode: ''
})

const birthDate = ref(null)
const showMoreOptions = ref(false)

const handleSearch = () => {
    searchStore.setFilters({
        ...search.value,
        birthDate: birthDate.value
    })
    searchStore.triggerSearch()
}
</script>