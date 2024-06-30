<template>
  <div>
    <h2>Add New Article</h2>

    <form @submit.prevent="handleSubmit">

      <!-- Title -->
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newArticle.title" required>
      </div>

      <!-- Destination -->
      <div class="form-group">
        <label for="destination">Destination:</label>
        <select id="destination" v-model="newArticle.destinationId" required>
          <option v-for="destination in destinations" :key="destination.id" :value="destination.id">
            {{ destination.ime }}
          </option>
        </select>
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="newArticle.content" rows="6" required></textarea>
      </div>

      <!-- Tourist Activities -->
      <div class="form-group">
        <label for="activities">Tourist Activities:</label>
        <input type="text" id="activities" v-model="activityText" @keydown.enter.prevent="addActivity">
        <ul>
          <li v-for="(activity, index) in newArticle.activities" :key="index">{{ activity }}</li>
        </ul>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit">Add Article</button>
      </div>

    </form>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newArticle: {
        title: '',
        destinationId: null,
        content: '',
        activities: []
      },
      activityText: '',
      destinations: [] // Populate with existing destinations
    };
  },
  methods: {
    handleSubmit() {
      // Call your API to add the article
      axios.post('/api/articles', this.newArticle)
          .then(response => {
            console.log('Article added successfully', response.data);
            // Optionally, perform additional actions after successful submission
          })
          .catch(error => {
            console.error('Error adding article:', error);
            // Handle error scenarios
          });
    },
    addActivity() {
      if (this.activityText.trim() !== '') {
        this.newArticle.activities.push(this.activityText.trim());
        this.activityText = '';
      }
    },
    fetchDestinations() {
      this.axios.get('/api/destinacije')
          .then(response => {
            console.log('Fetched destinations:', response.data);
            this.destinations = response.data;
          })
          .catch(error => {
            console.error('Error fetching destinations:', error);
            // Handle error scenarios
          });
    }
  },
  mounted() {
    console.log('Component mounted, fetching destinations...');
    this.fetchDestinations();
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
}

textarea {
  width: 100%;
}
</style>
