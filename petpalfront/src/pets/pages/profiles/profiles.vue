<script>
import PetListComponent from "@/pets/components/pet-register/pet-list.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import {Pet} from "@/pets/models/pet.entity.js";
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";
import AppButton from "@/pets/components/pet-register/button.component.vue";
import SidebarComponent from "@/pets/shared/components/sidebar.component.vue";

export default {
  name: 'app-pet',
  components: {AppButton, PetListComponent, ActionToolbarComponent, SidebarComponent},
  data() {
    return {
      pets: [],
      newApi: new PetService()
    }
  },
  created() {
    this.getPets();
  },
  methods: {
    buildPetListFromResponseData(pets) {
      return pets.map(pet => new Pet(pet.id, pet.nombre, pet.especie, pet.raza, pet.edad, pet.peso, pet.comidaFavorita, pet.imagen, pet.descripcion));
    },
    getPets() {
      this.newApi.getPets()
          .then(response => {
            let pets_json = response.data;
            this.pets = this.buildPetListFromResponseData(pets_json);
            console.log(response.data);
            console.log(this.pets);
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
}
</script>

<template>
  <div class="container">
    <sidebar-component></sidebar-component>
    <div class="main">
      <action-toolbar-component></action-toolbar-component>
      <pet-list-component :pets="pets"></pet-list-component>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 50px;
  margin-top: 20px;
}
</style>