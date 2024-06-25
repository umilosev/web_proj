<template>
  <div>
    <h1>Najnoviji clanci</h1>
    <div v-for="clanak in latestArticles" :key="clanak.id">
      <h2>{{ clanak.naslov }}</h2>
      <p>{{ clanak.isecak }}</p>
      <router-link :to="'/clanak/' + clanak.id">Pročitaj više</router-link>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      latestArticles: [],
    };
  },
  mounted() {
    this.fetchLatestArticles();
  },
  methods: {
    async fetchLatestArticles() {
      try {
        console.log("??");
        const response = await this.axios.get('/api/clanci'); // Adjust endpoint as needed
        this.latestArticles = response.data;
      } catch (error) {
        console.error('There was an error fetching the latest articles:', error);
      }
    }
  }
};
</script>