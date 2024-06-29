<template>
  <!-- Edit User Form -->
  <div>
    <h3>Edit User</h3>
    <form @submit.prevent="updateUser">
      <input type="text" v-model="editedUser.name" required>
      <input type="email" v-model="editedUser.email" required>
      <select v-model="editedUser.userType" required>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['user', 'isEdit'],
  methods: {
    // Update user data
    updateUser() {
      this.axios.put(`/api/korisnici/${this.editedUser.username}`, this.editedUser)
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            // Handle success
            // Reset form and close it
            this.fetchUsers();
            this.editedUser = {
              username: null,
              name: '',
              email: '',
              userType: ''
            };
            this.showEditForm = false;
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
    },
  }
};
</script>
