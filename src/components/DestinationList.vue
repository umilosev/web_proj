<template>
  <div>
    <h2>Destinations</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Vise</th>
      </tr>
      <tr v-for="destination in destinations" :key="destination.id">
        <td>{{ destination.ime }}</td>
        <td>{{ destination.opis }}</td>
        <td><router-link :to="'/destination/clanci/' + destination.id">Clanci</router-link></td>
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
