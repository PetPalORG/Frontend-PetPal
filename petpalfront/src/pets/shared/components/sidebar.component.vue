<script>
import ButtonComponent from "@/pets/components/pet-register/button.component.vue";
import {Pet} from "@/pets/models/pet.entity.js";
import {PetService} from "@/pets/services/pet.service.js";
export default {
  name: 'app-sidebar',
  components: {ButtonComponent},
  data() {
    return {
      pets: [],
      newApi: new PetService(),
      items: [
        {label: 'Agregar mascota', icon: 'pi pi-plus', command: () => { this.goToPetRegister(); }}
      ]
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
    },
    goToPetRegister() {
      this.$router.push('/pet-register');
    }
  }
}
</script>



<template >
  <pv-card style="width: 25rem; overflow: hidden" class="p-card">
    <router-link v-for="pet in pets" :key="pet.id" :to="`/pet/${pet.id}`" >
      <div class="pets">
        <img :src="pet.imagen" alt="image" class="profile-image">
      </div>
    </router-link>
    <div class="card" >
      <div :style="{ height: '200px' }" class="flex align-items-center justify-content-center" >
        <pv-speedDial :model="items" :radius="80" type="circle" buttonClass="p-button-warning"  />
        <Toast @click="goToPetRegister" />
      </div>
    </div>
  </pv-card>

</template>


<style scoped>

.p-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;


}

.pets {
  display: flex;
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}


.card {
}

</style>


