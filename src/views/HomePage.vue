<template>
  <div>
    <h1>Najnoviji clanci</h1>
    <div v-for="clanak in paginatedArticles" :key="clanak.id">
      <h2>{{ clanak.naslov }}</h2>
      <p>{{ clanak.isecak }}</p>
      <router-link :to="'/clanak/' + clanak.id">Pročitaj više</router-link>
    </div>
    <div>
      <button @click="prevPage" :disabled="currentPage === 1">Prethodna</button>
      <span>Strana {{ currentPage }} od {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Sledeća</button>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      latestArticles: [],
      currentPage: 1,
      pageSize: 5 // Number of articles per page
    };
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.latestArticles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.latestArticles.length / this.pageSize);
    }
  },
  mounted() {
    this.fetchLatestArticles();
  },
  methods: {
    async fetchLatestArticles() {
      try {
        const response = await this.axios.get('/api/clanci'); // Adjust endpoint as needed
        this.latestArticles = response.data;
      } catch (error) {
        console.error('There was an error fetching the latest articles:', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>