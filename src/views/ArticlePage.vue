<template>
  <div>
    <h1>{{ article.naslov }}</h1>
    <p>{{ article.tekst }}</p>
    <p>Author: {{ article.autor }}</p>
    <p>Created at: {{ formatDate(article.vremeKreiranja) }}</p>

    <h2>Comments</h2>
    <div v-for="comment in comments" :key="comment.id">
      <p><strong>{{ comment.autorKomentara }}</strong>: {{ comment.tekst }}</p>
      <p>Posted at: {{ formatDate(comment.datumKreiranja) }}</p>
    </div>

    <CommentForm :articleId="article.id" @comment-added="fetchComments" />
  </div>
</template>

<script>
import axios from 'axios';
import CommentForm from '../components/CommentForm.vue';

export default {
  components: {
    CommentForm,
  },
  data() {
    return {
      article: {},
      comments: [],
      autor:{},
    };
  },
  async mounted() {
    const articleId = this.$route.params.id; // Get the article id from route params
    await this.fetchArticleDetails(articleId);
    await this.fetchComments(articleId);
  },
  methods: {
    async fetchArticleDetails(articleId) {
      try {
        const articleResponse = await this.$axios.get(`api/clanci/${articleId}`);
        this.article = articleResponse.data;
        const autorResponse = await this.$axios.get(`/api/korisnici/${articleResponse.data.korisnikId}`)
        this.autor = autorResponse.data;
      } catch (error) {
        console.error("Došlo je do greške prilikom preuzimanja detalja članka:", error);
      }
    },
    async fetchComments() {
      try {
        const articleId = this.$route.params.id;
        const commentsResponse = await axios.get(`http://localhost:8081/api/komentari/clanak/${articleId}`);
        this.comments = commentsResponse.data;
      } catch (error) {
        console.error("Došlo je do greške prilikom preuzimanja komentara:", error);
      }
    },
    formatDate(dateArray) {
      if (!dateArray) return '';
      const [year, month, day, hour, minute] = dateArray;
      return `${day}-${month}-${year} ${hour}:${minute}`;
    }
  }
};
</script>

<style>
/* Add any styles here if needed */
</style>
