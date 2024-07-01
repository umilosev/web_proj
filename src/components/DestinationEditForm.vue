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
        ime: '',
        description: ''
      },
      destinations: []
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
    fetchDestinations(){
      this.axios.get(`/api/destinacije`)
      .then(response => {
        this.destinations = response.data;
      })
    },
    handleSubmit() {
      // Call your API to update the destination
      const existingDestination = this.destinations.find(dest => dest.ime === this.editedDestination.ime);
      if (existingDestination) {
        alert('Destination with this name already exists.');
        return;
      }

       this.axios.post(`/api/destinacije/edit`, this.editedDestination)
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
    this.fetchDestinations()
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
