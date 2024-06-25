<template>
  <div>
    <h1>Najčitaniji Članci</h1>
    <div v-for="clanak in najcitanijiClanci" :key="clanak.id">
      <h2>{{ clanak.naslov }}</h2>
      <p>{{ clanak.isecak }}</p>
      <router-link :to="'/clanak/' + clanak.id">Pročitaj više</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      najcitanijiClanci: [],
    };
  },
  async mounted() {
    try {
      const response = await this.axios.get("api/clanci/popular");
      this.najcitanijiClanci = response.data;
    } catch (error) {
      console.error("Došlo je do greške prilikom preuzimanja najčitanijih članaka:", error);
    }
  }
};
</script>

