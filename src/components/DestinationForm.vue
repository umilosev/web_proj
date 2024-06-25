<template>
  <div>
    <h2>{{ isEdit ? 'Edit Destination' : 'Add Destination' }}</h2>
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input type="text" v-model=destination.name required>
      <label>Description:</label>
      <textarea v-model=destination.description required></textarea>
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['destination', 'isEdit'],
  methods: {
    submitForm() {
      // Handle form submission, e.g., API call to create/update destination
      if (this.isEdit) {
        // Update logic
      } else {
        // Create logic
      }
    }
  }
};
</script>
