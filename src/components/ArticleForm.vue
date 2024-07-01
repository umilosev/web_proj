<template>
  <div>
    <h2>{{ isEdit ? 'Edit Article' : 'Add Article' }}</h2>
    <form @submit.prevent="submitForm">
      <label>Title:</label>
      <input type="text" v-model="article.title" required />

      <label>Destination:</label>
      <select v-model="article.destinationId" required>
        <option v-for="destination in destinations" :key="destination.id" :value="destination.id">
          {{ destination.name }}
        </option>
      </select>

      <label>Content:</label>
      <textarea v-model="article.content" required></textarea>

      <label>Activities:</label>
      <input type="text" v-model="article.activities" placeholder="Comma separated" />

      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>

export default {
  props: {
    article: {
      type: Object,
      default: () => ({
        title: '',
        destinationId: null,
        content: '',
        activities: ''
      })
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      destinations: []
    };
  },
  methods: {
    async fetchDestinations() {
      try {
        const response = await this.axios.get('/api/destinacije');  // Change this to the correct API endpoint
        this.destinations = response.data;
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
      }
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await this.axios.put(`/api/clanci/${this.article.id}`, this.article);  // Change this to the correct API endpoint
        } else {
          await this.axios.post('/api/clanci', this.article);  // Change this to the correct API endpoint
        }
        this.$emit('article-saved');
      } catch (error) {
        console.error('Failed to save article:', error);
      }
    }
  },
  mounted() {
    this.fetchDestinations();
  }
};
</script>
