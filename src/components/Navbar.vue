<template>
  <nav>
    <ul>
      <li><router-link to="/">Početna stranica</router-link></li>
      <li><router-link to="/most-read">Najčitanije</router-link></li>
      <li><router-link to="/destinations">Destinacije</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <!-- Add links to all available destinations dynamically -->
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>
