<template>
  <div>
    <h2>Destinations</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      <tr v-for="destination in destinations" :key="destination.id">
        <td>{{ destination.ime }}</td>
        <td>{{ destination.opis }}</td>
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
    async fetchDestinations() {
      try {
        const response = await this.axios.get('/api/destinacije');
        this.destinations = response.data;
      } catch (error) {
        console.error("There was an error fetching the destinations:", error);
      }
    }
  },
  mounted() {
    this.fetchDestinations();
  }
};
</script>
