<!--
split this so it's just destinations?
or reuse destination list but add the additional stuff in?
-->

<template>
  <div>
    <h2>Destinations</h2>
    <button @click="addNew">Add New Destination</button>
    <br>
    <br>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>

      <tr v-for="destination in destinations" :key="destination.id">
        <td>{{ destination.ime }}</td>
        <td>{{ destination.opis }}</td>
        <td>
          <button @click="edit(destination)">Edit</button>
          <button @click="remove(destination.id)">Delete</button>
        </td>
      </tr>
    </table>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      destinations: [],
      error: ''
    };
  },
  methods: {
    addNew() {
      this.$router.push('/admin/destinations/new');
    },
    edit(destination) {
      this.$router.push(`/admin/destinations/${destination.id}/edit`);
    },
    async remove(destId) {
      try {
        await this.axios.delete(`/api/destinacije/${destId}`);
        this.destinations = this.destinations.filter(dest => dest.id !== destId); // Update local list
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.error = 'An error occurred while deleting destination: ' + error.response.data.message;
          } else {
            this.error = 'An unexpected error occurred: ' + error.response.data.message;
          }
        } else if (error.request) {
          this.error = 'No response received from server';
        } else {
          this.error = 'Error in setting up request: ' + error.message;
        }
        console.error('Error deleting destination:', error);
      }
    },
    async fetchDestinacije() {
      try {
        const response = await this.axios.get('/api/destinacije');
        this.destinations = response.data;
      } catch (error) {
        console.error('Error fetching destinacije:', error);
      }
    }
  },
  mounted() {
    this.fetchDestinacije();
  }
};
</script>
