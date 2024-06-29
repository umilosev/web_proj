<template>
  <nav>
    <ul>
      <li v-if="isLoggedIn">
        <router-link to="/admin">Dashboard</router-link>
      </li>
      <li><router-link to="/">Početna stranica</router-link></li>
      <li><router-link to="/most-read">Najčitanije</router-link></li>
      <li><router-link to="/destinations">Destinacije</router-link></li>
      <li><router-link to="/login" v-if="!isLoggedIn">Login</router-link></li>
      <li v-if="isLoggedIn">
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('jwt');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/');
      window.location.reload()
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
