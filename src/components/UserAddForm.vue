<template>
  <div>
    <h3>Add User</h3>
    <form @submit.prevent="addUser">

      <!-- Name -->
      <div class="form-group">
        <label for="name">Ime:</label>
        <input type="text" id="name" v-model="newUser.ime" required>
      </div>

      <div class="form-group">
        <label for="name">Prezime:</label>
        <input type="text" id="name" v-model="newUser.prezime" required>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="newUser.email" required>
      </div>

      <!-- User Type -->
      <div class="form-group">
        <label for="userType">User Type:</label>
        <select id="userType" v-model="newUser.tipKorisnika" required>
          <option value="uredjivac">Uredjivac</option>
          <option value="admin">Admin</option>
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
        <button type="submit">Save</button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        ime: '',
        prezime: '',
        email: '',
        tipKorisnika: '',
        password: '',
      },
      confirmPassword: ''
    };
  },
  methods: {
    addUser() {
      if (this.newUser.password !== this.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      this.axios.post(`/api/korisnici`, {
        ime: this.newUser.ime,
        prezime: this.newUser.prezime,
        email: this.newUser.email,
        tipKorisnika: this.newUser.tipKorisnika,
        password: this.newUser.password
      })
          .then(() => {
            this.$router.push('/admin/users');
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
    }
  },
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
