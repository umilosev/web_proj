<template>
  <!-- Add User Form -->
  <div>
    <h3>Add User</h3>
    <form @submit.prevent="addUser">
      <input type="text" v-model="newUser.name" placeholder="Name" required>
      <input type="email" v-model="newUser.email" placeholder="Email" required>
      <select v-model="newUser.userType" required>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <input type="password" v-model="newUser.password" placeholder="Password" required>
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required>
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['user', 'isEdit'],
  methods: {
    addUser() {
      this.axios.get("/api/korisnici/new_user")
      if (this.newUser.password !== this.confirmPassword) {
        // Show error message
        return;
      }

      this.axios.post('/api/korisnici', this.newUser)
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            // Handle success
            // Reset form and close it
            this.fetchUsers();
            this.newUser = {
              name: '',
              email: '',
              userType: 'editor',
              password: ''
            };
            this.confirmPassword = '';
            this.showAddForm = false;
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });
    },
  }
};
</script>
