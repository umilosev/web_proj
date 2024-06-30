<template>
  <div>
    <h3>Edit User</h3>
    <form @submit.prevent="updateUser">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Ime:</label>
        <input type="text" id="first_name" v-model="editedUser.ime" required>
      </div>

      <div class="form-group">
        <label for="name">Prezime:</label>
        <input type="text" id="last_name" v-model="editedUser.prezime" required>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="editedUser.email" required>
      </div>

      <!-- User Type -->
      <div class="form-group">
        <label for="userType">User Type:</label>
        <select id="userType" v-model="editedUser.tipKorisnika" required>
          <option value="uredjivac">Uredjivac</option>
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
        ime: '',
        prezime: '',
        email: '',
        tipKorisnika: ''
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
      this.axios.post(`/api/korisnici/update`, {
        ime: this.editedUser.ime,
        prezime: this.editedUser.prezime,
        email: this.editedUser.email,
        tipKorisnika: this.editedUser.tipKorisnika,
        id: this.editedUser.id
      })
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
