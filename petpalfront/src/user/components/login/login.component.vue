<template>
  <div class="main p-grid p-jc-center p-ai-center">
    <div class="fondo p-col-8"></div>

    <!-- Sección derecha con el formulario de inicio de sesión -->
    <div class="form p-col-4">
      <h2>Pet Pal</h2>
      <h3><strong>Que bueno verte de nuevo</strong></h3>
      <div class="formulario">
        <div class="rellenar p-field">
          <label>Usuario:</label>
          <pv-inputText placeholder="Email" class="p-inputtext-lg w-19rem " v-model="email"/>
        </div>
        <div class="rellenar p-field">
          <label>Contraseña:</label>
          <pv-password placeholder="Password" class="p-inputtext-lg w-18rem" v-model="password" toggleMask  />
        </div>
        <p v-if="errMsg">{{ errMsg }}</p>
        <p><pv-button @click="login" class="caja p-button-lg p-button-warning justify-content-center w-19rem">Iniciar Sesión</pv-button></p>
        <p><pv-button @click="singInWithGoogle" class="caja p-button-lg p-button-secondary justify-content-center w-19rem ">Iniciar sesión con Google</pv-button></p>
        <div class="p-field">
          <label>No tienes cuenta?</label>
        </div>
        <p><pv-button @click="register" class="caja p-button-lg p-button-warning justify-content-center w-19rem">Registrate</pv-button></p>
      </div>
    </div>
  </div>
</template>


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
  padding: 20px;
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

@media (min-width: 768px) {
  .form {
    max-width: 400px; /* Limita el ancho máximo del formulario en pantallas grandes */
  }
}

</style>



<script setup>
import {ref} from "vue";
import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();

const register = () => {
  router.push('/register');
};

const login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        console.log("Successfully signed in!");
        console.log(auth.currentUser);
        router.push('/home');
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Correo electrónico inválido, profe, error básico, deme 20 puem";
            break;
          case "auth/wrong-password":
            errMsg.value = "Contraseña incorrecta";
            break;
          default:
            errMsg.value = "Error en correo o contraseña";
            break;
        }
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

