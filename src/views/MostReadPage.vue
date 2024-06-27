<template>
  <div>
    <PaginatedGeneralArticleList :articles="najcitanijiClanci" title="Najcitaniji clanci" />
  </div>
</template>

<script>
import PaginatedGeneralArticleList from "@/components/PaginatedGeneralArticleList";

export default {
  components: { PaginatedGeneralArticleList },
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
