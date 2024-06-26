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
import { jwtDecode } from 'jwt-decode';  // Correct named import

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

        if (response.data.jwt) {
          const token = response.data.jwt;
          // Store the JWT in localStorage
          localStorage.setItem('jwt', token);

          // Decode the JWT to get the role
          const decoded = jwtDecode(token);
          const role = decoded.role; // Adjust this if your role key is different

          // Navigate based on the role
          if (role === 'admin') {
            this.$router.push('/admin');
            window.location.reload()
          } else if (role === 'uredjivac') {
            this.$router.push('/director');
            window.location.reload()
          } else {
            this.error = 'Invalid role';
          }
        } else {
          this.error = 'Invalid credentials';
        }
      } catch (error) {
        console.error('Error logging in:', error);
        this.error = 'An error occurred while logging in';
      }
    }
  }
};
</script>
