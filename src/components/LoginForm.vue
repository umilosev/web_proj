<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">

        <label>Username:</label>
        <input type="username" v-model="username" required>

        <label>Password:</label>
        <input type="password" v-model="password" required>

      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.axios.post('api/korisnici/login', {
          username: this.username,
          password: this.password
        });

        // Assuming the response contains a JWT token or some indication of successful login
        // You may need to adjust this based on your actual response format
        if (response.data.jwt) {
          // Successful login, navigate to admin page
          this.$router.push('/admin');
        } else {
          // Handle invalid credentials or other errors
          this.error = 'Invalid credentials';
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error logging in:', error);
        this.error = 'An error occurred while logging in';
      }
    }
  }
};
</script>
