<script>
import SidebarComponent from "@/pets/shared/components/sidebar.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import PetListComponent from "@/pets/components/pet-register/pet-list.component.vue";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import { Pet } from "@/pets/models/pet.entity";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";



export default {
  name: 'pet-register',
  components: {
    PetListComponent,
    SidebarComponent, InputText, FloatLabel, FileUpload, Button, Pet, Toast},
  data() {
    return {
      pet: new Pet(),
      petService: new PetService()
    }
  },
  methods: {
    async submitForm() {
        await this.petService.submitForm(this.pet)
        .then(response => {
          console.log(response.data);
          console.log(this.pet);
          this.showSuccess();
        })
        .catch(error => {
          console.error(error);
          this.showError();
        });
      },
    showSuccess() {
      const toast = this.$toast;
      toast.add({severity:'success', summary: 'Registro exitoso', detail: 'La mascota fue registrada correctamente', life: 3000});
    },
    showError() {
      const toast = this.$toast;
      toast.add({severity:'error', summary: 'Error', detail: 'No se pudo registrar la mascota', life: 3000});
    },
  }
}
</script>

<template>
  <div class="container">
    <div class="main">
      <div class="card">
        <h1>Registrar mascota</h1>
          <FloatLabel>
            <InputText class="input" id="name" v-model="pet.name"/>
            <label for="name">Nombre</label>
          </FloatLabel>

          <FloatLabel>
            <InputText class="input" id="species" v-model="pet.species"/>
            <label for="species">Especie</label>
          </FloatLabel>

          <FloatLabel>
            <InputText class="input" id="breed" v-model="pet.breed"/>
            <label for="breed">Raza</label>
          </FloatLabel>

          <FloatLabel>
            <InputText class="input" id="age" v-model="pet.age"/>
            <label for="age">Edad</label>
          </FloatLabel>

          <FloatLabel>
            <InputText class="input" id="weight" v-model="pet.weight"/>
            <label for="weight">Peso</label>
          </FloatLabel>

          <FloatLabel>
            <InputText class="input" id="description" v-model="pet.description"/>
            <label for="description">Descripción</label>
          </FloatLabel>

          <FloatLabel>
            <InputText class="input" id="image" v-model="pet.imagePath"/>
            <label for="image">URL imagen</label>
          </FloatLabel>

          <Button label="Crear" @click="submitForm"/>

          <Toast></Toast>

      </div>
    </div>
  </div>
  <div class="file-upload-container">
</div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 50px;
}

h1 {
  text-align: center;
}

label {
  opacity: 0.5;
}

.input {
  width: 50vh;
}

.card{
  display: flex;
  flex-direction: column;
  gap: 30px
}

.main {
  display: flex;
}
.description {
  display:flex;
  flex-direction: column;
  margin-top: 100px ;
}


.container-description{
  margin-top: 20px;
  margin-left: 30px;
  height: 100px;
  width: 300px;
}

@media (max-width: 600px) {
  .container {
    width: 100%; 
    height: auto; 
  }
}


@media (max-width: 900px) {
  .container {
    width: 80%; 
    height: auto; 
  }
}
</style>