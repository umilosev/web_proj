<template>
  <div>
    <h2>Add Destination</h2>
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input type="text" v-model=ime required>

      <label>Description:</label>
      <textarea v-model=opis required></textarea>

      <button type="submit">{{ 'Create' }}</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ime: '',
      opis: '',
      error: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        console.log(this.ime + " " + this.opis)

        const response = await this.axios.post('api/destinacije/add', {
          ime: this.ime,
          opis: this.opis
        });

        if(response.status === 422)
        {
          this.error = 'An error occurred while creating destination: ' + response.data["message"];
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.error = 'An error occurred while creating destination: ' + error.response.data.message;
          } else {
            this.error = 'An unexpected error occurred: ' + error.response.data.message;
          }
        } else if (error.request) {
          this.error = 'No response received from server';
        } else {
          this.error = 'Error in setting up request: ' + error.message;
        }
        console.error('Error creating destination:', error);
      }
    }
  }
};
</script>
