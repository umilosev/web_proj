<template>
  <div>
    <h1>{{ this.title }}</h1>

    <div v-for="clanak in paginatedArticles" :key="clanak.id">
      <h2>{{ clanak.naslov }}</h2>
      <p>{{ clanak.vremeKreiranja }}</p>
      <p>{{ clanak.isecak }}</p>
      <router-link :to="'/clanak/' + clanak.id">Pročitaj više</router-link>
    </div>
    <br>
    <div>
      <button @click="prevPage" :disabled="currentPage === 1">Prethodna</button>
      <span>  Strana {{ currentPage }} od {{ totalPages }}  </span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Sledeća</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: 'Articles'
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5 // Number of articles per page
    };
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      const slicedArticles = this.articles.slice(start, end)

      return slicedArticles.map(clanak => ({
        ...clanak,
        isecak: clanak.tekst.slice(0, 20) + '...'
      }));
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.pageSize);
    }
  },
  methods: {
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
