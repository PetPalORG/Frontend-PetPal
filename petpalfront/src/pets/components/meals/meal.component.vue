<script>
import {PetService} from "@/pets/services/pet.service.js";
import { Meal } from "@/pets/models/meal.entity";
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

export default {
  name: 'app-diet',
  props: {
    meals: Array,
  },
  components: {
    Button, Dialog, InputText
  },
  data() {
    return {
      showForm: false,
      meal: new Meal(),
      petService: new PetService(),
      visible: false
    }
  },
  created() {
    this.fetchMeals();
  },
  methods: {
    async fetchMeals() {
      const petId = this.$route.params.id;
      const response = await this.petService.getMealsByPetId(this.petId);
      this.meals = response.data;
    },
    async addMeal() {
      try {
        this.meal.petId = this.$route.params.id;
        const response = await this.petService.saveMeal(this.meal);
        console.log(response.data);
        this.showForm = false;
        await this.fetchMeals();
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteMeal(mealId) {
      try {
        const response = await this.petService.deleteMeal(mealId);
        if (!(response instanceof Error)) {
          console.log(response);
          await this.fetchMeals();
          this.$forceUpdate();
        } else {
          console.error('Failed to delete meal:', response.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="main">
      <div class="titles">
        <h1>Comidas diarias</h1>
        <div class="title-button">
          <h1>Agregar comida</h1>
          <pv-button class="add" @click="visible = true">+</pv-button>
        </div>
        <Dialog v-model:visible="visible" modal header="Añadir tratamiento" :style="{ width: '60rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Añade información de la comida de tu mascota.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="food" class="font-semibold w-24">Comida</label>
                <InputText id="food" class="flex-auto" autocomplete="off" v-model="meal.food" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="description" class="font-semibold w-24">Descripción</label>
                <InputText id="description" class="flex-auto" autocomplete="off" v-model="meal.description" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="hour" class="font-semibold w-24">Hora</label>
                <InputText id="hour" class="flex-auto" autocomplete="off" v-model="meal.hour"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Guardar" @click="visible = false; addMeal()"></Button>
            </div>
        </Dialog>
      </div>
      <div class="card-container" v-for="meal in meals">
        <h1 class="hour">{{meal.hour}}</h1>
        <pv-card class="card">
          <template #title>{{meal.food}}</template>
          <template #content>{{meal.description}}</template>
          <template #footer>
          <pv-button class="delete-button" @click="deleteMeal(meal.id)">Eliminar</pv-button>
          </template>
        </pv-card>
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

.titles {
  display: flex;
  gap: 200px;
}

.title-button {
  display: flex;
}

.add {
  height: 3vh;
  margin-top: 3vh;
  margin-left: 1vh;
  background-color: yellow;
  border-radius: 1rem;
  color: black;
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

button:hover {
  transform: scale(1.05);
}

.card-container {
  display: flex;
  gap: 200px;
}

.card-container .hour {
  margin-top: 100px;
}

.card {
  height: 27vh;
  width: 50vh;
  background-color: #D9D9D9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
}

.delete-button {
  background-color: cyan;
  border-radius: 1rem;
  border: none;
  font-size: 1.5rem;
  margin-left: 30vh;
  color: black;
}

/* Ajuste el diseño para pantallas pequeñas */
@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
  .titles {
    flex-direction: column;
    gap: 20px; /* Reducir el espacio entre elementos */
  }
  .card-container {
    flex-direction: column;
    gap: 20px; /* Reducir el espacio entre tarjetas */
  }
  .delete-button {
    margin-left: 0; /* Alinear el botón de eliminar a la izquierda */
  }
  .image img {
    width: 100%; /* Hacer la imagen responsiva */
    height: auto;
  }
}

</style>
