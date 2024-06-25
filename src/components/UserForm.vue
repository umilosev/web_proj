<template>
  <div>
    <h2>{{ isEdit ? 'Edit User' : 'Add User' }}</h2>
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input type="text" v-model="user.name" required>
      <label>Email:</label>
      <input type="email" v-model="user.email" required>
      <label>Password:</label>
      <input type="password" v-model="user.password" required>
      <label>Confirm Password:</label>
      <input type="password" v-model="user.confirmPassword" required>
      <label>Type:</label>
      <select v-model="user.type" required>
        <option value="admin">Administrator</option>
        <option value="editor">Content Editor</option>
      </select>
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['user', 'isEdit'],
  methods: {
    submitForm() {
      // Handle form submission, e.g., API call to create/update user
      if (this.isEdit) {
        // Update logic
      } else {
        // Create logic
      }
    }
  }
};
</script>
