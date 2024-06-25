<template>
  <div>
    <h2>Destinations</h2>
    <button @click="addNew">Add New Destination</button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      destinations: [],
    };
  },
  methods: {
    addNew() {
      this.$router.push('/admin/destinations/new');
    },
    edit(destination) {
      this.$router.push(`/admin/destinations/${destination.id}/edit`);
    },
    async fetchArticles() {
      try {
        const response = await this.axios.get('/api/destinacije');
        this.destinations = response.data;
      } catch (error) {
        console.error("There was an error fetching the destinations:", error);
      }
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>
