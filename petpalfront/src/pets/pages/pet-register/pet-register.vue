<script>
import AppButton from "@/pets/components/pet-register/button.component.vue";
import FormComponent from "@/pets/components/pet-register/form.component.vue";
import FileUploadComponent from "@/pets/components/pet-register/file-upload.component.vue";
import DescriptionComponent from "@/pets/components/pet-register/description.component.vue";
import SidebarComponent from "@/pets/shared/components/sidebar.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import PetListComponent from "@/pets/components/pet-register/pet-list.component.vue";
import { ref } from 'vue';
const value = ref(null);


export default {
  name: 'pet-register',
  components: {
    PetListComponent,
    AppButton, FormComponent, FileUploadComponent, DescriptionComponent, SidebarComponent},
  data() {
    return {
      pet: {
        nombre: '',
        especie: '',
        raza: '',
        edad: '',
        peso: '',
        comidaFavorita: '',
        descripcion: '',
      },
      petService: new PetService()
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.petService.submitForm(this.pet);
        console.log(response.data);
        console.log(this.pet);
      } catch (error) {
        console.error(error);
      }
    },
    updatePetImage(imageUrl) {
      this.pet.imagen = imageUrl;
    },
  }
}
</script>

<template>
  <div class="container">
    <sidebar-component></sidebar-component>
    <div class="main">
      <div class="card">
        <h1>General Information</h1>
        <pv-inputGroup class="input" >
          <pv-inputGroupAddon>
            <i class="pi pi-user"></i>
          </pv-inputGroupAddon>
          <InputText placeholder="Nombre" />
        </pv-inputGroup >
        <pv-inputGroup class="input" >
          <pv-inputGroupAddon>
            <i class="pi pi-user"></i>
          </pv-inputGroupAddon>
          <InputText placeholder="Especie" />
        </pv-inputGroup >
        <pv-inputGroup class="input" >
          <pv-inputGroupAddon>
            <i class="pi pi-user"></i>
          </pv-inputGroupAddon>
          <InputText placeholder="Raza" />
        </pv-inputGroup >
        <pv-inputGroup class="input" >
          <pv-inputGroupAddon>
            <i class="pi pi-user"></i>
          </pv-inputGroupAddon>
          <InputText placeholder="Edad" />
        </pv-inputGroup >
        <pv-inputGroup class="input" >
          <pv-inputGroupAddon>
            <i class="pi pi-user"></i>
          </pv-inputGroupAddon>
          <InputText placeholder="Peso" />
        </pv-inputGroup >
        <pv-inputGroup class="input" >
          <pv-inputGroupAddon>
            <i class="pi pi-user"></i>
          </pv-inputGroupAddon>
          <InputText placeholder="Comida Favorita" />
        </pv-inputGroup >
      </div>
      <div class="description">
        <file-upload-component @update-image="updatePetImage" />
        <FloatLabel >
          <InputText class="container-description" id="username" v-model="value"  placeholder="description"/>
        </FloatLabel>
      </div>

    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 50px;
  margin-top: 20px;
}

.card{
  display: flex;
  flex-direction: column;
}

.input {
  margin-top: 15px;
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
    width: 100%; /* Ajusta el ancho al 100% de la pantalla */
    height: auto; /* Ajusta la altura automáticamente */
  }
}

/* Para pantallas con un ancho máximo de 900px */
@media (max-width: 900px) {
  .container {
    width: 80%; /* Ajusta el ancho al 80% de la pantalla */
    height: auto; /* Ajusta la altura automáticamente */
  }
}
</style>