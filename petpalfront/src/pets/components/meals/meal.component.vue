<script>
import {PetService} from "@/pets/services/pet.service.js";

export default {
  name: 'app-diet',
  props: {
    meals: Array,
  },
  data() {
    return {
      showForm: false,
      newMeal: {
        title: '',
        description: '',
        hour: ''
      },
      petService: new PetService()
    }
  },
  created() {
    this.fetchMeals();
  },
  methods: {
    async fetchMeals() {
      const response = await this.petService.getMeals();
      this.meals = response.data;
    },
    async addMeal() {
      try {
        const response = await this.petService.saveMeal(this.newMeal);
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
          <pv-button class="add" @click="showForm = true">+</pv-button>
        </div>
        <div v-if="showForm" class="modal">
          <div class="modal-content">
            <input v-model="newMeal.title" placeholder="Título">
            <input v-model="newMeal.hour" placeholder="Hora">
            <input v-model="newMeal.description" placeholder="Descripción">
            <pv-button @click="addMeal" >Save</pv-button>
          </div>
        </div>
      </div>
      <div class="card-container" v-for="meal in meals">
        <h1 class="hour">{{meal.hour}}</h1>
        <pv-card class="card">
          <template #title>{{meal.title}}</template>
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
