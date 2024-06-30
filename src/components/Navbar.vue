<template>
  <nav>
    <ul>
      <li><router-link to="/">Početna stranica</router-link></li>
      <li><router-link to="/most-read">Najčitanije</router-link></li>
      <li><router-link to="/destinations">Destinacije</router-link></li>
      <li v-if="isAdmin"><router-link to="/admin">Admin Dashboard</router-link></li>
      <li v-if="isDirector"><router-link to="/director">Director Dashboard</router-link></li>
      <li><router-link to="/login" v-if="!isLoggedIn">Login</router-link></li>
      <li v-if="isLoggedIn">Dobro dosli, {{ userName }}</li>
      <li v-if="isLoggedIn"><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script>
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'NavBar',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('jwt');
    },
    userName() {
      const token = localStorage.getItem('jwt');
      if (!token) return null;

      try {
        const decoded = jwtDecode(token);
        return decoded.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    },
    userRole() {
      const token = localStorage.getItem('jwt');
      if (!token) return null;

      try {
        const decoded = jwtDecode(token);
        return decoded.role;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    },
    isAdmin() {
      return this.isLoggedIn && this.userRole === 'admin';
    },
    isDirector() {
      return this.isLoggedIn && this.userRole === 'uredjivac';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/');
      window.location.reload();
    }
  }
};
</script>

<style scoped>
nav {
  /* Your styling here */
}

ul {
  list-style-type: none;
}

li {
  display: inline;
  margin-right: 10px;
}

button {
  background-color: #f00;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
