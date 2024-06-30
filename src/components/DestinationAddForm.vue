<template>
  <div>
    <h2>Add New Destination</h2>

    <form @submit.prevent="handleSubmit">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newDestination.ime" required>
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="newDestination.opis" rows="4" required></textarea>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit">Add Destination</button>
      </div>

    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newDestination: {
        ime: '',
        opis: ''
      },
      destinations: [] // Initialize the destinations array
    };
  },
  methods: {
    handleSubmit() {
      // Validate if the destination name already exists
      const existingDestination = this.destinations.find(dest => dest.ime === this.newDestination.ime);
      if (existingDestination) {
        alert('Destination with this name already exists.');
        return;
      }

      // Call your API to add the destination

       this.axios.post('/api/destinacije/add', this.newDestination)
         .then(response => {
           console.log('Destination added successfully', response.data);
           // Optionally, perform additional actions after successful submission
         })
         .catch(error => {
           console.error('Error adding destination:', error);
           // Handle error scenarios
        });
    },
    fetchDestinations() {
      this.axios.get('/api/destinacije')
          .then(response => {
            console.log('Fetched destinations:', response.data);
            this.destinations = response.data;
          })
          .catch(error => {
            console.error('Error fetching destinations:', error);
            // Handle error scenarios
          });
    }
  },
  mounted() {
    this.fetchDestinations();
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
