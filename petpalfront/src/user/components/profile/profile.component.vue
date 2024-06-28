<script>
import { getAuth, onAuthStateChanged, deleteUser } from 'firebase/auth';

export default {
  name: 'profile',
  data() {
    return {
      user: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async deleteAccount() {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await deleteUser(currentUser);
          // Redirect to login page or show a message
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        this.user.email = currentUser.email;
        this.user.password = '******';
        // Add the rest of the user data here
      }
    });
  }
}
</script>


<template>
  <div class="profile">
    <div class="row">
      <div class="card" v-for="(value, key) in user" :key="key">
        <h2>{{ key }}</h2>
        <p>{{ value }}</p>
      </div>
    </div>
    <button @click="deleteAccount">Eliminar cuenta</button>
  </div>
</template>


<style scoped>
.profile {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>