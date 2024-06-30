<template>
  <div>
    <h2>Add New User</h2>

    <form @submit.prevent="handleSubmit">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="newUser.name" required>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newUser.email" required>
      </div>

      <!-- User Type -->
      <div class="form-group">
        <label for="type">User Type:</label>
        <select id="type" v-model="newUser.type" required>
          <option value="admin">Admin</option>
          <option value="editor">Uredjivac</option>
        </select>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="newUser.password" required>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>

      <!-- Submit Button -->
      <div>
        <button type="submit">Add User</button>
      </div>

    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        name: '',
        email: '',
        type: 'admin',
        password: ''
      },
      confirmPassword: ''
    };
  },
  methods: {
    handleSubmit() {
      if (this.newUser.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      this.axios.post('/api/users', this.newUser)
          .then(response => {
            console.log('User added successfully', response.data);
            // Optionally, perform additional actions after successful submission
          })
          .catch(error => {
            console.error('Error adding user:', error);
            // Handle error scenarios
          });
    }
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
