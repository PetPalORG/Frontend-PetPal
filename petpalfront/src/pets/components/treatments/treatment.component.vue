<script>
import {PetService} from "@/pets/services/pet.service.js";

export default {
  name: 'app-treatments',
  props: {
    treatments: Array,
  },
  data() {
    return {
      showForm: false,
      newTreatment: {
        title: '',
        startDate: '',
        duration: '',
        medicine: '',
        dose: '',
        indications: ''
      },
      petService: new PetService()
    }
  },
  methods: {
    async fetchTreatments() {
      const response = await this.petService.getTreatments();
      this.treatments = response.data;
    },
    async addTreatment() {
      try {
        this.newTreatment.petID = this.$route.params.petID;
        const response = await this.petService.saveTreatment(this.newTreatment);
        console.log(response.data);
        this.showForm = false;
        await this.fetchTreatments();
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTreatment(treatmentId) {
      try {
        const response = await this.petService.deleteTreatment(treatmentId);
        if (!(response instanceof Error)) {
          console.log(response);
          await this.fetchTreatments();
          this.$forceUpdate();
        } else {
          console.error('Failed to delete treatment:', response.message);
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
        <h1>Tratamientos</h1>
        <div class="title-button">
          <h1>Agregar tratamiento</h1>
          <pv-button class="add" @click="showForm = true">+</pv-button>
        </div>
        <div v-if="showForm" class="modal">
          <div class="modal-content">
            <input v-model="newTreatment.title" placeholder="Título">
            <input v-model="newTreatment.startDate" placeholder="Fecha de inicio">
            <input v-model="newTreatment.duration" placeholder="Duración">
            <input v-model="newTreatment.medicine" placeholder="Medicamento">
            <input v-model="newTreatment.dose" placeholder="Dosis">
            <input v-model="newTreatment.indications" placeholder="Indicaciones">
            <pv-button @click="addTreatment">Agregar</pv-button>
          </div>
        </div>
      </div>
      <div class="card-container" v-for="treatment in treatments">
        <pv-card class="card">
          <template #title>Tratamiento: {{treatment.title}}</template>
          <template #content>
            <h2>Duración: {{treatment.startDate}}</h2>
            <h2>Medicamento: {{treatment.medicine}}</h2>
            <h2>Dosis: {{treatment.dose}}</h2>
            <h2>Indicaciones: {{treatment.indications}}</h2>
          </template>
          <template #footer>
            <pv-button class="delete-button" @click="deleteTreatment(treatment.id)">Eliminar</pv-button>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.titles {
  display: flex;
  gap: 300px;
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

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

input:focus {
  outline: none;
  border-color: #6c63ff;
  box-shadow: 0 0 5px #6c63ff;
}

button:hover {
  transform: scale(1.05);
}

.card-container {
  display: flex;
  margin-top: 40px;
  gap: 20px;
}

.card-container .hour {
  margin-top: 100px;
}

.card {
  height: auto;
  width: auto;
  overflow: auto;
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
  margin-left: 110vh;
  margin-top: -30px;
  color: black;
}
</style>