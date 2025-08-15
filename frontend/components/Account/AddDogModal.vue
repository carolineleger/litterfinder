<template>
    <v-dialog max-width="600px">
        <v-card>
            <v-card-title><b>{{ isEdit ? 'Edit Dog' : 'Add a Dog' }}</b></v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitDog" ref="formRef">
                    <v-text-field v-model="newDog.name" label="Dog Name *" :rules="[rules.required]"
                        required></v-text-field>

                    <p class="mb-1"><b>Date of birth <span class="text-red-600">*</span></b></p>
                    <PartialDateSelector @update="onPartialDateUpdate" :date-of-birth="newDog.date_of_birth" />

                    <p class="mb-3"><b>Birth Location</b></p>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="newDog.postcode" label="Postcode" type="text"
                                maxlength="4"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select v-model="newDog.state" :items="states" label="State" item-title="label"
                                item-value="value"></v-select>
                        </v-col>
                    </v-row>

                    <p class="mb-3"><b>Breed info</b></p>
                    <v-row>
                        <v-col>
                            <v-autocomplete v-model="newDog.breed_primary" :items="breeds" label="Primary Breed *"
                                :rules="[rules.required]" item-title="label" item-value="value"
                                required></v-autocomplete>
                        </v-col>
                        <v-col>
                            <v-autocomplete v-model="newDog.breed_secondary" :items="breeds"
                                label="Secondary Breed (Optional)" item-title="label"
                                item-value="value"></v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-text-field v-model="newDog.breeder_name" label="Breeder Name (Optional)"></v-text-field>

                    <p class="mb-3"><b>Your doggy face!</b></p>
                    <v-file-input v-model="newDog.image" label="Upload Image" accept="image/*"></v-file-input>

                    <v-card-actions class="!p-0">
                        <v-btn @click="closeModal()" class="secondary-btn">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" class="primary-btn">{{ isEdit ? 'Save Changes' : 'Add Dog' }}</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { breeds } from '~/data/breeds'
import { states } from '~/data/location'
import { useAuthStore } from '~/store/auth'
import PartialDateSelector from '~/components/Common/PartialDateSelector.vue'

const { $supabase } = useNuxtApp()
const userStore = useAuthStore()
const user = computed(() => userStore.user)

const props = defineProps({
    dogModalOpen: Boolean,
    existingDog: Object
})
const emit = defineEmits(['fetch-dogs', 'update:modelValue'])

const defaultDog = () => ({
    name: '',
    date_of_birth: '',
    breed_primary: '',
    breed_secondary: '',
    breeder_name: '',
    postcode: '',
    state: '',
    image: null
})

const newDog = ref(defaultDog())

const rules = {
    required: (value) => !!value || 'This field is required'
}

const formRef = ref(null)
const isEdit = computed(() => !!props.existingDog)

const resetForm = () => {
    newDog.value = defaultDog()
}

watch(
    () => props.existingDog,
    (dog) => {
        if (dog) {
            newDog.value = {
                name: dog.name || '',
                date_of_birth: dog.date_of_birth || '',
                breed_primary: dog.breed_primary || '',
                breed_secondary: dog.breed_secondary || '',
                breeder_name: dog.breeder_name || '',
                postcode: dog.postcode || '',
                state: dog.state || '',
                image: null
            }
        } else {
            resetForm()
        }
    },
    { immediate: true }
)

const submitDog = async () => {
    const form = formRef.value
    const isValid = await form.validate()
    if (!isValid || !user.value) return

    let imageUrl = null
    if (newDog.value.image) {
        imageUrl = await uploadDogImage(newDog.value.image)
    }

    const dogData = {
        owner_id: user.value.id,
        name: newDog.value.name,
        date_of_birth: newDog.value.date_of_birth,
        breed_primary: newDog.value.breed_primary,
        breed_secondary: newDog.value.breed_secondary || null,
        breeder_name: newDog.value.breeder_name || null,
        postcode: newDog.value.postcode || null,
        state: newDog.value.state || null,
        ...(imageUrl && { image_url: imageUrl })
    }

    let error
    if (isEdit.value && props.existingDog?.id) {
        console.log('Updating dog with data:', dogData)
        const { error: updateError } = await $supabase
            .from('dogs')
            .update(dogData)
            .eq('id', props.existingDog.id)
        error = updateError
    } else {
        const { error: insertError } = await $supabase
            .from('dogs')
            .insert([dogData])
        error = insertError
    }

    if (error) {
        console.error('Error saving dog:', error.message)
    } else {
        closeModal()
        resetForm()
        emit('fetch-dogs')
    }
}

const onPartialDateUpdate = (date) => {
    const { day, month, year } = date
    if (!year) return

    if (month && day) {
        newDog.value.date_of_birth = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    } else if (month) {
        newDog.value.date_of_birth = `${year}-${String(month).padStart(2, '0')}`
    } else {
        newDog.value.date_of_birth = `${year}`
    }
}

const closeModal = () => {
    emit('update:modelValue', false)
}

const uploadDogImage = async (file) => {
    if (!file || !user.value) return null

    const filePath = `dogs/${user.value.id}/${file.name}`
    const { error } = await $supabase.storage.from('dog-images').upload(filePath, file)
    if (error) {
        console.error('Error uploading file:', error.message)
        return null
    }

    const { data: urlData } = $supabase.storage.from('dog-images').getPublicUrl(filePath)
    return urlData.publicUrl
}
</script>
