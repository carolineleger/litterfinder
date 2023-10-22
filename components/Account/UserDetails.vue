<template>
  <v-card>
    <v-card-title>User Details</v-card-title>
    <v-card-text>
      <v-form>
        <v-row>
          <v-col v-for="(field, key) in Object.keys(editedUser)" :key="key">
            <v-text-field
              :label="field"
              v-model="editedUser[key]"
              :readonly="!isEditing"
              :placeholder="field"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="toggleEdit">{{
              isEditing ? 'Cancel' : 'Edit'
            }}</v-btn>
            <v-btn v-if="isEditing" @click="saveChanges">Save</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
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
  data() {
    return {
      isEditing: false,
      editedUser: { ...this.user },
    }
  },
  mounted() {
    // Fetch data after the component is mounted
    // this.$store.dispatch('fetchUser')
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        // If cancel is clicked, revert editedUser to the original user
        this.editedUser = { ...this.user }
      }
      this.isEditing = !this.isEditing
    },
    saveChanges() {
      // Validate and save changes if needed
      this.$emit('updateUser', this.editedUser)
      this.isEditing = false
    },
  },
}
</script>
