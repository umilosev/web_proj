<template>
  <div>
    <h2>User Management</h2>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>User Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.username">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.userType }}</td>
        <td>{{ user.status }}</td>
        <td>
          <button @click="editUser(user)">Edit</button>
          <button @click="toggleStatus(user)">{{ user.status === 'aktivan' ? 'Deactivate' : 'Activate' }}</button>
        </td>
      </tr>
      </tbody>
    </table>
    <button @click="showAddForm = true">Add User</button>

    <!-- Add User Form -->
    <div v-if="showAddForm">
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

    <!-- Edit User Form -->
    <div v-if="showEditForm">
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
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: [], // Array of users
      newUser: {
        name: '',
        email: '',
        userType: 'editor',
        password: '',
        id:''
      },
      confirmPassword: '',
      editedUser: {
        username: null,
        name: '',
        email: '',
        userType: '',
        id:''
      },
      showAddForm: false,
      showEditForm: false
    };
  },
  methods: {
    // Fetch users data from backend
    fetchUsers() {
      this.axios.get('/api/korisnici')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
    },
    // Add new user
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
    // Edit existing user
    editUser(user) {
      this.editedUser = { ...user };
      this.showEditForm = true;
    },
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
    // Toggle user status (activate/deactivate)
    toggleStatus(user) {
      if (!user.id) {
        console.error('User id is missing:', user);
        return;
      }

      this.axios.post(`/api/korisnici/${user.id}/status`)
          // eslint-disable-next-line no-unused-vars
          .then(response => {
            // Handle success
            // Update user status in UI
            window.location.reload();
          })
          .catch(error => {
            console.error('Error toggling user status:', error);
          });
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
/* Add your component's styles here */
</style>
