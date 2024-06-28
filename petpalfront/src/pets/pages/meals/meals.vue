<script>
import DietComponent from "@/pets/components/meals/meal.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import {Meal} from "@/pets/models/meal.entity.js";
import AppSidebar from "@/pets/shared/components/sidebar.component.vue";
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";

export default {
  name: "diet",
  components: {ActionToolbarComponent, AppSidebar, DietComponent},
  data() {
    return {
      meals: [],
      newApi: new PetService()
    }
  },
  created() {
    this.getMeals();
  },
  methods: {
    buildMealListFromResponseData(meals) {
      return meals.map(meal => new Meal(meal.id, meal.petId, meal.food, meal.description, meal.hour));
    },
    getMeals() {
      const petId = this.$route.params.id;
      this.newApi.getMealsByPetId(petId)
          .then(response => {
            let meals_json = response.data;
            this.meals = this.buildMealListFromResponseData(meals_json);
            console.log(response.data);
            console.log(this.meals);
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
    <app-sidebar class="sidebar"></app-sidebar>
    <div class="main">
      <div class="toolbar">
        <action-toolbar-component ></action-toolbar-component>
      </div>
      <diet-component :meals="meals"></diet-component>
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