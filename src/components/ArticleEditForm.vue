<template>
  <div>
    <h2>Edit Article</h2>

    <form @submit.prevent="handleSubmit">

      <!-- Title -->
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="editedArticle.naslov" required>
      </div>

      <!-- Destination -->
      <div class="form-group">
        <label for="destination">Destination:</label>
        <select id="destination" v-model="editedArticle.destinacijaId" required>
          <option v-for="destination in destinations" :key="destination.id" :value="destination.id">{{ destination.ime }}</option>
        </select>
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="editedArticle.tekst" rows="6" required></textarea>
      </div>

      <!-- Tourist Activities -->
      <div class="form-group">
        <label for="activities">Tourist Activities:</label>
        <input type="text" id="activities" v-model="activityText" @keydown.enter.prevent="addActivity">
        <ul>
          <li v-for="(activity, index) in editedArticle.activities" :key="index">{{ activity }}</li>
        </ul>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit">Save Changes</button>
      </div>

      <!-- Error Messages -->
      <div v-if="error" class="error">
        {{ error }}
      </div>

    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      editedArticle: {
        id: null,
        naslov: '',
        destinacijaId: null,
        tekst: '',
        activities: []
      },
      activityText: '',
      destinations: [], // Populate with existing destinations
      error: '' // To display error messages
    };
  },
  methods: {
    fetchArticle() {
      const articleId = this.$route.params.id;
      // Replace with your API call to fetch article details
      this.axios.get(`/api/clanci/${articleId}`)
          .then(response => {
            this.editedArticle = response.data;
          })
          .catch(error => {
            console.error('Error fetching article:', error);
          });
    },
    fetchDestinations(){
      this.axios.get('/api/destinacije/edit')
          .then(response => {
            this.destinations = response.data;
            // Ensure that editedArticle.destinacijaId is set correctly if it has a value
            if (!this.editedArticle.destinacijaId && this.destinations.length > 0) {
              this.editedArticle.destinacijaId = this.destinations[0].id;
            }
          })
          .catch(error => {
            console.error('Error fetching destinations:', error);
          });
    },
    handleSubmit() {
      // Call your API to update the article
      // Example:
      this.axios.post(`/api/clanci/edit`, this.editedArticle)
          .then(response => {
            console.log('Article updated successfully', response.data);
            // Optionally, perform additional actions after successful submission
          })
          .catch(error => {
            console.error('Error updating article:', error);
            this.error = 'Error updating article: ' + error.response.data.message;
            // Handle error scenarios
          });
    },
    addActivity() {
      if (this.activityText.trim() !== '') {
        this.editedArticle.activities.push(this.activityText.trim());
        this.activityText = '';
      }
    }
  },
  mounted() {
    this.fetchArticle();
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

.error {
  color: red;
  margin-top: 1em;
}
</style>
