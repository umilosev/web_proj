<template>
  <div>
    <h2>Articles</h2>
    <button @click="addNew">Add New Article</button>
    <table>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Date Created</th>
        <th>Actions</th>
      </tr>
      <tr v-for="article in articles" :key="article.id">
        <td>{{ article.naslov }}</td>
        <td>{{ article.korisnikId }}</td>
        <td>{{ article.vremeKreiranja }}</td>
        <td>
          <button @click="edit(article)">Edit</button>
          <button @click="remove(article.id)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      articles: [],
      korisnik: {}
    };
  },
  methods: {
    addNew() {
      this.$router.push('/admin/articles/new');
    },
    edit(article) {
      this.$router.push(`/admin/articles/${article.id}/edit`);
    },
    async remove(id) {
      try {
        await axios.delete(`/api/clanci/${id}`);
        window.location.reload();
      } catch (error) {
        console.error("There was an error deleting the article:", error);
      }
    },
    async fetchArticles() {
      try {
        const response = await this.axios.get('/api/clanci');
        this.articles = response.data;
/*        const userResponse = await this.axios.get(`/api/korisnici/${response.data.korisnikId}`);
        this.korisnik = userResponse.data;*/
      } catch (error) {
        console.error("There was an error fetching the articles:", error);
      }
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>
