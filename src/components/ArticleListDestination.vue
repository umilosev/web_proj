<template>
  <div>
    <h2>Articles</h2>
    <table>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Date Created</th>
      </tr>
      <tr v-for="article in articles" :key="article.id">
        <td><router-link :to="'/clanak/' + article.id">{{ article.naslov }}</router-link></td>
        <td>{{ article.autor }}</td>
        <td>{{article.vremeKreiranja}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      articles: [],
    };
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
  mounted() {
    const destinationId = this.$route.params.id;
    this.fetchArticles(destinationId);
  }
};
</script>
