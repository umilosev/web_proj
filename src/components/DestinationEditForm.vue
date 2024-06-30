<template>
  <div>
    <h2>Edit Destination</h2>

    <form @submit.prevent="handleSubmit">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedDestination.ime" required>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="editedDestination.opis" rows="4" required></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit">Save Changes</button>
      </div>

    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      editedDestination: {
        id: null,
        name: '',
        description: ''
      }
    };
  },
  methods: {
    fetchDestination() {
      const destinationId = this.$route.params.id;
      // Replace with your API call to fetch destination details
      this.axios.get(`/api/destinacije/${destinationId}`)
          .then(response => {
            this.editedDestination = response.data;
          })
          .catch(error => {
            console.error('Error fetching destination:', error);
          });
    },
    handleSubmit() {
      // Call your API to update the destination
      const destinationId = this.$route.params.id;

       this.axios.put(`/api/destinacije/${destinationId}`, this.editedDestination)
         .then(response => {
           console.log('Destination updated successfully', response.data);
           // Optionally, perform additional actions after successful submission
        })
         .catch(error => {
           console.error('Error updating destination:', error);
           // Handle error scenarios
         });
    }
  },
  mounted() {
    this.fetchDestination();
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
}

textarea {
  width: 100%;
}
</style>
