<template>
  <div>
    <h1>{{ destination.name }}</h1>
    <p>{{ destination.description }}</p>
    <div v-for="article in articles" :key="article.id">
      <h2>{{ article.title }}</h2>
      <p>{{ article.excerpt }}</p>
      <router-link :to="'/article/' + article.id">Read more</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      destination: {},
      articles: [],
    };
  },
  mounted() {
    // Fetch destination details and related articles from API
  }
};
</script>
