<template>
  <div>
    <h1>{{ article.naslov }}</h1>
    <div>
      <p>Aktivnosti:
        <span v-for="(aktivnost, index) in article.aktivnosti" :key="aktivnost.id">
        <router-link :to="`/activities/clanci/${aktivnost.id}`">{{ aktivnost.naziv }}</router-link>
        <span v-if="index < article.aktivnosti.length - 1">, </span>
      </span>
      </p>
    </div>
    <p>{{ article.tekst }}</p>
    <p>Author: {{ article.autor }}</p>
    <p>Created at: {{ article.vremeKreiranja }}</p>

    <h2>Comments</h2>
    <div v-for="(comment, index) in paginatedComments" :key="index">
      <p><strong>{{ comment.autorKomentara }}</strong>: {{ comment.tekst }}</p>
      <p>Posted at: {{ comment.datumKreiranja }}</p>
    </div>

    <div v-if="pages.length > 1">
      <button v-for="page in pages" :key="page" @click="changePage(page)" :disabled="page === currentPage">{{ page }}</button>
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
      pageSize: 10, // Number of comments per page
      currentPage: 1,
    };
  },
  async mounted() {
    const articleId = this.$route.params.id;
    await this.fetchArticleDetails(articleId);
    await this.fetchComments(articleId);
  },
  computed: {
    paginatedComments() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      return this.comments.slice(startIndex, startIndex + this.pageSize);
    },
    totalPages() {
      return Math.ceil(this.comments.length / this.pageSize);
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
  },
  methods: {
    async fetchArticleDetails(articleId) {
      try {
        const articleResponse = await this.$axios.get(`api/clanci/${articleId}`);
        this.article = articleResponse.data;
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    },
    async fetchComments(articleId) {
      try {
        const commentsResponse = await axios.get(`http://localhost:8081/api/komentari/clanak/${articleId}`);
        this.comments = commentsResponse.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
  }
};
</script>

<style>
/* Add any styles here if needed */
</style>
