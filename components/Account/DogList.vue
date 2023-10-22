<template>
  <v-card>
    <v-card-title>Dog List</v-card-title>
    <v-card-text>
      <div v-for="(dog, index) in dogs" :key="index">
        <h3>Dog {{ index + 1 }}</h3>
        <p>Date of Birth: {{ dog.dateOfBirth }}</p>
        <p>Dog Breed 1: {{ dog.dogBreed1 }}</p>
        <p>Dog Breed 2: {{ dog.dogBreed2 }}</p>
        <p>Dog Name: {{ dog.dogName }}</p>
        <img :src="dog.dogPhoto" alt="Dog Photo" v-if="dog.dogPhoto" />
        <button @click="editDog(index)">Edit</button>
        <button @click="deleteDog(index)">Delete</button>
        <hr />
      </div>

      <h3>Add New Dog</h3>
      <form @submit.prevent="addNewDog">
        <input v-model="newDog.dateOfBirth" placeholder="Date of Birth" />
        <input v-model="newDog.dogBreed1" placeholder="Dog Breed 1" />
        <input v-model="newDog.dogBreed2" placeholder="Dog Breed 2" />
        <input v-model="newDog.dogName" placeholder="Dog Name" />
        <input type="file" @change="handleFileChange" accept="image/*" />
        <button type="submit">Add Dog</button>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DogList',
  props: {
    dogs: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const newDog = ref({
      dateOfBirth: '',
      dogBreed1: '',
      dogBreed2: '',
      dogName: '',
      dogPhoto: null,
    })

    const addNewDog = () => {
      if (isFormValid(newDog.value)) {
        props.dogs.push({ ...newDog.value })
        clearForm()
        context.emit('addDog', props.dogs)
      }
    }

    const clearForm = () => {
      newDog.value = {
        dateOfBirth: '',
        dogBreed1: '',
        dogBreed2: '',
        dogName: '',
        dogPhoto: null,
      }
    }

    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        newDog.value.dogPhoto = URL.createObjectURL(file)
      }
    }

    const isFormValid = (dog) => {
      return dog.dateOfBirth && dog.dogBreed1 && dog.dogName
    }

    // Implement other dog-related actions here (e.g., editing, deleting)

    return {
      newDog,
      addNewDog,
      clearForm,
      handleFileChange,
    }
  },
}
</script>
