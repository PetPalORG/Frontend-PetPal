<script>
import {PetService} from "@/pets/services/pet.service.js";
import {Meal} from "@/pets/models/meal.entity.js";

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
      <div class="image">
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Labrador_Retriever_%281210559%29.jpg" alt="image">
      </div>
      <div class="titles">
        <h1>Comidas diarias</h1>
        <div class="title-button">
          <h1>Agregar comida</h1>
          <Button class="add" @click="showForm = true">+</Button>
        </div>
        <div v-if="showForm" class="modal">
          <div class="modal-content">
            <input v-model="newMeal.title" placeholder="Título">
            <input v-model="newMeal.hour" placeholder="Hora">
            <input v-model="newMeal.description" placeholder="Descripción">
            <Button @click="addMeal" >Save</Button>
          </div>
        </div>
      </div>
      <div class="card-container" v-for="meal in meals">
        <h1 class="hour">{{meal.hour}}</h1>
        <div class="card">
          <h1>{{meal.title}}</h1>
          <p>{{meal.description}}</p>
          <Button class="delete-button" @click="deleteMeal(meal.id)">Eliminar</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.image {
  margin-left: 350px;
  margin-top: -50px;
}

.main {
  margin-left: 300px;
}

.titles {
  display: flex;
  gap: 650px;
}

.title-button {
  display: flex;
}

.add {
  height: 3vh;
  margin-top: 25px;
  background-color: white;
  border-color: white;
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
  gap: 500px;
}

.card-container .hour {
  margin-top: 100px;
}

.card {
  height: 20vh;
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
  font-size: 2rem;
  margin-left: 340px;
  margin-top: 10px;
}


img {
  width: 30%;
  height: 30%;
  border-radius: 50%;
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
