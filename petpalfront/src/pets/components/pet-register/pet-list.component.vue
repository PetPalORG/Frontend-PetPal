<script>

import AppCard from '@/pets/components/pet-register/info-card.component.vue';
import {PetService} from "@/pets/services/pet.service.js";
export default {
  name: 'app-list',
  components: {AppCard},
  data() {
    return {
      pet: null,
      petService: new PetService()
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  async created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const id = this.$route.params.id;
      this.petService.getPetById(id).then(pet => {
        this.pet = pet;
      });
    }
  }
}
</script>

<template>
  <div v-if="pet">
    <app-card :pet="pet"></app-card>
  </div>
</template>

<style scoped>

</style>