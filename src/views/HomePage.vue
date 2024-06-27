<template>
  <div>
    <PaginatedGeneralArticleList :articles="latestArticles" title="Najnoviji clanci" />
  </div>
</template>

<script>
import PaginatedGeneralArticleList from "@/components/PaginatedGeneralArticleList";

export default {
  components: { PaginatedGeneralArticleList },
  data() {
    return {
      latestArticles: []
    };
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
    }
  }
};
</script>
