<template>
  <div>
    <PaginatedGeneralArticleList :articles="articles" :title="'Clanci destinacije ' + destination.ime" />
  </div>
</template>

<script>
import PaginatedGeneralArticleList from "@/components/PaginatedGeneralArticleList";

export default {
  components: { PaginatedGeneralArticleList },
  data() {
    return {
      articles: [],
      destination: null
    };
  },
  async mounted() {
    const destinationId = this.$route.params.id;
    await this.fetchArticles(destinationId);
  },
  methods: {
    async fetchArticles(destinationId) {
      try {
        const articlesResponse = await this.axios.get(`/api/clanci/clanci_for_destinacija/${destinationId}`);
        const destinationResponse = await this.axios.get(`/api/destinacije/${destinationId}`);

        this.articles = articlesResponse.data;
        this.destination = destinationResponse.data;
      } catch (error) {
        console.error("There was an error fetching the articles:", error);
      }
    },
  },
};
</script>
