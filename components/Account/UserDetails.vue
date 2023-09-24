<template>
  <v-card>
    <v-card-title>User Details</v-card-title>
    <v-card-text>
      <!-- Display user details -->
      <div v-if="!isEditing">
        <!-- Display user details in view mode -->
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
        <button @click="toggleEdit">Edit</button>
      </div>
      <div v-else>
        <!-- Display user details in edit mode -->
        <input v-model="editedUser.name" placeholder="Name" />
        <input v-model="editedUser.email" placeholder="Email" />
        <input v-model="editedUser.age" placeholder="Age" />
        <button @click="saveChanges">Save</button>
        <button @click="toggleEdit">Cancel</button>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'UserDetails',
  props: {
    user: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    }, // User details
  },
  setup(props) {
    // Reactive references for editing state and edited user
    const isEditing = ref(false)
    const editedUser = ref({ ...props.user })

    // Toggle between view and edit mode
    const toggleEdit = () => {
      isEditing.value = !isEditing.value
    }

    // Save edited user details and emit an event to update the parent component
    const saveChanges = () => {
      // Validate and save changes if needed
      // Emit an event to notify the parent component
      toggleEdit() // Exit edit mode
    }

    return {
      isEditing,
      editedUser,
      toggleEdit,
      saveChanges,
    }
  },
}
</script>
