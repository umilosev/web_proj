<template>
  <div>
    <h1>Admin Dashboard</h1>
    <nav>
      <ul>
        <li><router-link to="/admin/articles">Manage Articles</router-link></li>
        <li><router-link to="/admin/destinations">Manage Destinations</router-link></li>
        <li><router-link to="/admin/users">Manage Users</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>

</template>
