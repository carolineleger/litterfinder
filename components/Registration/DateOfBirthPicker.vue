<!-- DateOfBirthPicker.vue -->
<template>
  <div class="relative mb-4">
    <p class="mb-3">Do you know your dog's date of birth?*</p>

    <div class="flex">
      <v-btn type="secondary" @click.prevent="openDatePicker('date')"
        >Yes</v-btn
      >
      <v-btn type="secondary" @click.prevent="openDatePicker('month')"
        >Month Only</v-btn
      >
      <!-- <v-btn type="secondary" @click.prevent="openDatePicker('year')"
        >Year Only</v-btn
      > -->
    </div>
    <v-dialog v-model="datePickerDialog" max-width="290px">
      <v-date-picker
        v-model="selectedDate"
        :type="datePickerMode"
      ></v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datePickerDialog: false,
      selectedDate: null,
      datePickerMode: 'date',
    }
  },
  methods: {
    openDatePicker(mode) {
      this.datePickerMode = mode
      this.datePickerDialog = true
    },
  },
}
</script>
