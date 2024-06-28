<script>
import {Pet} from "@/pets/models/pet.entity.js";
import {PetService} from "@/pets/services/pet.service.js";
import SpeedDial from 'primevue/speeddial';
export default {
  name: 'app-sidebar',
  components: {SpeedDial},
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
      return pets.map(pet => new Pet(pet.id, pet.name, pet.species, pet.breed, pet.age, pet.weight, pet.imagePath, pet.description));
    },
    getPets() {
      this.newApi.getPets()
          .then(response => {
            let pets_json = response.data;
            this.pets = this.buildPetListFromResponseData(pets_json);
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
  <Card style="width: 25rem; overflow: hidden" class="p-card">
    <router-link v-for="pet in pets" :key="pet.id" :to="`/pet/${pet.id}`" class="pet-link">
      <div class="pets">
        <h2>{{pet.name}}</h2>
        <img :src="pet.imagePath" alt="image" class="profile-image">
      </div>
    </router-link>
    <div class="card" >
      <div :style="{ height: '200px' }" class="flex align-items-center justify-content-center" >
        <SpeedDial :model="items" :radius="80" type="circle" buttonClass="p-button-warning"  />
        <Toast @click="goToPetRegister" />
      </div>
    </div>
  </Card>

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
  gap: 20px;
}

.pets h2 {
  margin-top: 30px;
}

.pet-link {
  text-decoration: none;
  color: inherit; 
}

.profile-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

</style>


