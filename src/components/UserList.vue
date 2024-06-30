<template>
  <div>
    <h2>User Management</h2>
    <div>
      <button @click="addUser">Add User</button>
    </div>

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
        <td>{{ user.ime }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.tipKorisnika }}</td>
        <td>{{ user.status }}</td>
        <td>
          <button @click="editUser(user)">Edit</button>
        </td>
        <td v-if = "user.tipKorisnika!='admin'">
          <button @click="toggleStatus(user)">{{ user.status === 'aktivan' ? 'Deactivate' : 'Activate' }}</button>
        </td>
      </tr>
      </tbody>
    </table>



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
    addUser(){
      this.$router.push('/admin/user/add')
    },
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

    // Edit existing user
    editUser(user) {
      this.editedUser = { ...user };
      this.$router.push(`/admin/user/edit/${user.id}`);
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
