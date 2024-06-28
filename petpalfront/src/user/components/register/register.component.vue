<template>
  <div class="main">
    <div class="fondo"></div>
    <div class="form p-col-4">
      <div class="box">
        <h2>Pet Pal</h2>
        <h3><strong>Amamos cuidar a los animales</strong></h3>
        <div class="formulario">
          <div class="rellenar">
            <label>Correo:</label>
            <pv-inputText placeholder="Email" class="texto p-inputtext-lg w-19rem" v-model="email"/>
          </div>
          <div class="rellenar p-field">
            <label>Contraseña:</label>
            <pv-password placeholder="Password" class="texto2 p-inputtext-lg w-18rem" v-model="password" toggleMask />
          </div>
          <p v-if="showPassword">{{ showPassword? 'Hide' : 'Show' }} Password</p>
          <p><pv-button @click="register" class="caja p-button-lg p-button-warning justify-content-center w-19rem">Registrarse</pv-button></p>
          <p><pv-button @click="singInWithGoogle" class="caja p-button-lg p-button-secondary justify-content-center w-19rem ">Iniciar sesión con Google</pv-button></p>
          <!-- Agregar aquí el enlace para iniciar sesión -->
          <p class="login-link">¿Ya estás registrado? <a href="#" @click="goToLogin">Inicia sesión</a></p>
        </div>
      </div>
    </div>
    <dialogComponent :isVisible="isDialogVisible" :message="dialogMessage" @close="isDialogVisible = false"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import dialogComponent from "../dialog/dialog.component.vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const router = useRouter();
const isDialogVisible = ref(false);
const dialogMessage = ref("");

function goToLogin() {
  router.push('/login');
}

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully registered");
      console.log(auth.currentUser);
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      dialogMessage.value = error.message; // Set the error message
      isDialogVisible.value = true; // Show the dialog
    });
};

const singInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push('/home');
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
}

.fondo {
  background-image: url('../../../assets/images/fondo.png');
  background-size: cover; /* Para ajustar la imagen de fondo */
  margin-left: -30px;
  margin-top: -10px;
  width: 1200px; /* 2/3 de la página */
  height: 787px;
}

.form {
  margin-left: 20px;
  background-color: white;
}


.caja{
  border-radius:5px;
}

.rellenar {
  display:flex;
  flex-direction: column;
  margin-bottom: 10px;
}


@media (max-width: 1150px) {
  .fondo {
    display: none;
  }

  .form {
    margin: -10px;
    margin-top: -20px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 110%; /* 1/3 de la anchura de la ventana del navegador */
    height: 100vh; /* Ajusta la altura al 100% de la altura de la ventana del navegador */
    background-image: url('../../../assets/images/fondo.png');
  }

  .box{
    background-color: white;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
