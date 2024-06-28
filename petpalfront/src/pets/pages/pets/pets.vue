<script>
import SidebarComponent from '@/pets/shared/components/sidebar.component.vue';
import PetListComponent from '@/pets/components/pet-register/pet-list.component.vue';

export default {
    name:'app-pets',
    components: {PetListComponent, SidebarComponent}
    }


</script>

<template>
  <div class="container">
    <sidebar-component></sidebar-component>
    <div class="main">
      <div class="toolbar"></div>
      </div>
      <pet-list-component :pets="pets"></pet-list-component>
    </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 50px;
  margin-top: 20px;
}
</style>
