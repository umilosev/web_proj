<template>
  <div>
    <h3>Edit User</h3>
    <form @submit.prevent="updateUser">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="editedUser.name" required>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedUser.email" required>
      </div>

      <!-- User Type -->
      <div class="form-group">
        <label for="userType">User Type:</label>
        <select id="userType" v-model="editedUser.userType" required>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit">Save</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editedUser: {
        id: null,
        name: '',
        email: '',
        userType: ''
      }
    };
  },
  methods: {
    fetchUser() {
      const userId = this.$route.params.id;
      this.axios.get(`/api/korisnici/${userId}`)
          .then(response => {
            this.editedUser = response.data;
          })
          .catch(error => {
            console.error('Error fetching user:', error);
          });
    },
    updateUser() {
      const userId = this.$route.params.id;
      this.axios.put(`/api/korisnici/${userId}`, this.editedUser)
          .then(() => {
            this.$router.push('/admin/users');
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
    }
  },
  mounted() {
    this.fetchUser();
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
</style>
