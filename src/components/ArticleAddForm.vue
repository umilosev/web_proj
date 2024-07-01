<template>
  <div>
    <h2>Add New Article</h2>

    <form @submit.prevent="handleSubmit">

      <!-- Title -->
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="newArticle.naslov" required>
      </div>

      <!-- Destination -->
      <div class="form-group">
        <label for="destination">Destination:</label>
        <select id="destination" v-model="newArticle.destinacijaId" required>
          <option v-for="destination in destinations" :key="destination.id" :value="destination.id">
            {{ destination.ime }}
          </option>
        </select>
      </div>

      <!-- Content -->
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea id="content" v-model="newArticle.tekst" rows="6" required></textarea>
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
import { jwtDecode } from 'jwt-decode'; // Correct the import statement

export default {
  data() {
    return {
      newArticle: {
        naslov: '',
        destinacijaId: null,
        tekst: '',
        activities: [],
        autor: '' // Add author property
      },
      activityText: '',
      destinations: [] // Populate with existing destinations
    };
  },
  methods: {
    handleSubmit() {
      // Call your API to add the article
      this.axios.post('/api/clanci/add', this.newArticle)
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
    },
    decodeJWT(token) {
      const decoded = jwtDecode(token);
      return decoded.sub; // Return the sub claim
    }
  },
  mounted() {
    console.log('Component mounted, fetching destinations...');
    this.fetchDestinations();

    // Decode the JWT and set the author
    const token = localStorage.getItem('jwt'); // Replace with your method of getting the JWT
    if (token) {
      this.newArticle.autor = this.decodeJWT(token);
      console.log('Author set to:', this.newArticle.autor);
    } else {
      console.error('JWT token not found');
    }
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