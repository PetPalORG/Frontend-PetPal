<template>
  <div class="main">
    <div class="fondo"></div>

    <!-- Sección derecha con el formulario de inicio de sesión -->
    <div class="form p-col-4">
      <h2>Pet Pal</h2>
      <h3><strong>Amamos cuidar a nuestras mascotas</strong></h3>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useRouter} from "vue-router";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const router = useRouter();

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
        alert(error.message);
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

@media (min-width: 768px) {
  .form {
    max-width: 400px; /* Limita el ancho máximo del formulario en pantallas grandes */
  }
}

@media (max-width: 768px) {
  .fondo {
    display: none;
  }

  .main {
    flex-direction: column;
  }

  .form {
    margin-top: 0;
  }
}
</style>
