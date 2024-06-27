<template>
  <div>
    <PaginatedGeneralArticleList :articles="articles" title="Najcitaniji clanci" />
  </div>
</template>

<script>
import PaginatedGeneralArticleList from "@/components/PaginatedGeneralArticleList";

export default {
  components: { PaginatedGeneralArticleList },
  data() {
    return {
      articles: [],
    };
  },
  async mounted() {
    const destinationId = this.$route.params.id;
    await this.fetchArticles(destinationId);
  },
  methods: {
    async fetchArticles(destinationId) {
      try {
        const response = await this.axios.get(`/api/clanci/clanci_for_destinacija/${destinationId}`);
        this.articles = response.data;
      } catch (error) {
        console.error("There was an error fetching the articles:", error);
      }
    },
  },
};
</script>
