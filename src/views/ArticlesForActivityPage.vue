<template>
  <div>
    <PaginatedGeneralArticleList :articles="articles" :title="'Clanci aktivnosti ' + activity.naziv" />
  </div>
</template>

<script>
import PaginatedGeneralArticleList from "@/components/PaginatedGeneralArticleList";
export default {
  components: {PaginatedGeneralArticleList},
  data() {
    return {
      activityId: null,
      articles: null,
      activity: null
    };
  },
  async mounted() {
    // Accessing the id parameter from the route
    this.activityId = this.$route.params.id;
    await this.fetchActivityArticles(this.activityId);
  },
  methods: {
    async fetchActivityArticles(activityId) {
      const activityResponse = await this.$axios.get(`/api/aktivnosti/${activityId}`)
      const articlesResponse = await this.$axios.get(`/api/clanci/clanci_for_aktivnost/${activityId}`);

      this.activity = activityResponse.data;
      this.articles = articlesResponse.data;
    }
  }
};
</script>

<style scoped>

</style>