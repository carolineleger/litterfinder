<template>
  <v-card>
    <v-card-title>Dog List</v-card-title>
    <v-card-text>
      <!-- Display the list of dogs -->
      <!-- Allow adding new dogs with fields for dateOfBirth, dogBreed1, dogBreed2, dogName, and dogPhoto -->
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    dogs: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      newDog: {
        // New dog details
        dateOfBirth: '',
        dogBreed1: '',
        dogBreed2: '',
        dogName: '',
        dogPhoto: null,
      },
    }
  },
  methods: {
    addNewDog() {
      // Add the new dog to the list and clear the form
    },
    // Implement other dog-related actions here (e.g., editing, deleting)
  },
}
</script>
<template>
  <v-card>
    <v-card-title>Dog List</v-card-title>
    <v-card-text>
      <!-- Display the list of dogs -->
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

      <!-- Allow adding new dogs -->
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
      default() {
        return []
      },
    },
  },
  setup(props) {
    // Reactive reference for new dog
    const newDog = ref({
      dateOfBirth: '',
      dogBreed1: '',
      dogBreed2: '',
      dogName: '',
      dogPhoto: null,
    })

    // Function to add a new dog
    const addNewDog = () => {
      // Validate and add the new dog to the list
      if (
        newDog.value.dateOfBirth &&
        newDog.value.dogBreed1 &&
        newDog.value.dogName
      ) {
        props.dogs.push({ ...newDog.value })
        clearForm()
      }
    }

    // Function to clear the new dog form
    const clearForm = () => {
      newDog.value = {
        dateOfBirth: '',
        dogBreed1: '',
        dogBreed2: '',
        dogName: '',
        dogPhoto: null,
      }
    }

    // Function to handle file input change
    const handleFileChange = (event) => {
      const file = event.target.files[0]
      if (file) {
        // You can handle the selected file (e.g., upload it to a server or store it)
        // For now, we'll set it in the new dog object
        newDog.value.dogPhoto = URL.createObjectURL(file)
      }
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
