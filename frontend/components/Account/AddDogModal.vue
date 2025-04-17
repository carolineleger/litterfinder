<template>
    <v-dialog max-width="500px">
        <v-card>
            <v-card-title><b>Add a Dog</b></v-card-title>
            <v-card-text>
                <v-form @submit.prevent="addDog">
                    <v-text-field v-model="newDog.name" label="Dog Name" required></v-text-field>

                    <p><b>Date of birth</b></p>
                    <v-switch v-model="knowsFullDate" label="I know my dog full birth date" color="green" />

                    <template v-if="knowsFullDate">
                        <v-menu v-model="datePickerOpen" :close-on-content-click="false" transition="scale-transition">
                            <template v-slot:activator="{ props }">
                                <v-text-field v-bind="props" v-model="formattedDate" label="Date of Birth"
                                    readonly></v-text-field>
                            </template>
                            <v-date-picker v-model="selectedDate" @update:modelValue="setFullDate"></v-date-picker>
                        </v-menu>
                    </template>

                    <template v-else>
                        <v-select v-model="selectedMonth" :items="months" label="Month" />
                        <v-select v-model="selectedYear" :items="years" label="Year" />
                    </template>

                    <p class="mb-4"><b>Breed info</b></p>
                    <v-autocomplete v-model="newDog.breed_primary" :items="breeds" label="Primary Breed"
                        item-title="label" item-value="value" required></v-autocomplete>

                    <v-autocomplete v-model="newDog.breed_secondary" :items="breeds" label="Secondary Breed (Optional)"
                        item-title="label" item-value="value"></v-autocomplete>

                    <v-text-field v-model="newDog.breeder_name" label="Breeder Name (Optional)"></v-text-field>

                    <p class="mb-4"><b>Your doggy face!</b></p>
                    <v-file-input v-model="newDog.image" label="Upload Image" accept="image/*"></v-file-input>

                    <v-card-actions class="!p-0">
                        <v-btn @click="closeModal()" class="secondary-btn">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" class="primary-btn">Add Dog</v-btn>
                    </v-card-actions>

                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script setup>
import { breeds } from '~/data/breeds';
import { months } from '~/data/date';
import { useAuthStore } from '~/store/auth';

const { $supabase } = useNuxtApp()
const userStore = useAuthStore()
const user = computed(() => userStore.user)

const props = defineProps({
    dogModalOpen: Boolean,
});

const emit = defineEmits(['fetch-dogs']);

// Date stuff
const datePickerOpen = ref(false);
const knowsFullDate = ref(true);
const selectedDate = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

const formattedDate = computed(() => {
    if (knowsFullDate.value && selectedDate.value) {
        const date = new Date(selectedDate.value);
        return date.toLocaleDateString('en-GB');
    } else if (!knowsFullDate.value && selectedMonth.value && selectedYear.value) {
        return `${selectedMonth.value}/${selectedYear.value}`;
    }
    return '';
});

const years = Array.from({ length: 30 }, (_, i) => ({
    label: (new Date().getFullYear() - i).toString(),
    value: (new Date().getFullYear() - i).toString()
}));

const setFullDate = (date) => {
    selectedDate.value = date;
    newDog.value.date_of_birth = formattedDate.value;
};

const newDog = ref({
    name: '',
    date_of_birth: '',
    breed_primary: '',
    breed_secondary: '',
    breeder_name: '',
    image: null
});

const addDog = async () => {
    if (!user.value) return;

    let imageUrl = null;
    if (newDog.value.image) {
        imageUrl = await uploadDogImage(newDog.value.image);
    }

    const { data, error } = await $supabase.from('dogs').insert([
        {
            owner_id: user.value.id,
            name: newDog.value.name,
            date_of_birth: newDog.value.date_of_birth,
            breed_primary: newDog.value.breed_primary,
            breed_secondary: newDog.value.breed_secondary || null,
            breeder_name: newDog.value.breeder_name || null,
            image_url: imageUrl
        }
    ]);

    if (error) {
        console.error('Error adding dog:', error.message);
    } else {
        closeModal();
        newDog.value = { name: '', date_of_birth: '', breed_primary: '', breed_secondary: '', breeder_name: '', image: null };
        emit('fetch-dogs')
    }
};

const closeModal = () => {
    emit('update:modelValue', false);
}

const uploadDogImage = async (file) => {
    if (!file || !user.value) return null;

    const filePath = `dogs/${user.value.id}/${file.name}`;
    const { data, error } = await $supabase.storage.from('dog-images').upload(filePath, file);

    if (error) {
        console.error('Error uploading file:', error.message);
        return null;
    }

    const { data: urlData } = $supabase.storage.from('dog-images').getPublicUrl(filePath);
    return urlData.publicUrl;
};


</script>
