<script>
import {PetService} from "@/pets/services/pet.service.js";
import { Treatment } from "@/pets/models/treatment.entity";
import { Medication } from "@/pets/models/medication.entity";
import { TreatmentDetail } from "@/pets/models/treatmentDetail.entity";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default {
  name: 'app-treatments',
  components: {
    Button, Dialog, InputText
  },
  props: {
    treatments: Array,
    medications: Array
  },
  data() {
    return {
      showForm: false,
      newTreatment: new Treatment(),
      newMedication: new Medication(),
      newTreatmentDetail: new TreatmentDetail(),
      medicationDetails: {},
      petService: new PetService(),
      visible: false
    }
  },
  methods: {
    async addTreatment() {
      try {
        this.newTreatment.petId = this.$route.params.id;
        const response = await this.petService.saveTreatment(this.newTreatment);
        console.log(response.data);
        this.showForm = false;
        await this.fetchTreatments();
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
    async addMedicationToTreatment(treatmentId) {
      try {
        this.newMedication.treatmentId = treatmentId;
        const response = await this.petService.saveMedication(this.newMedication);
        console.log(response.data)
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
      </div>
      <div class="card-container" v-for="treatment in treatments">
        <pv-card class="card">
          <template #title>Tratamiento: {{treatment.diagnosis}}</template>
          <template #content>
            <h2>Fecha de inicio: {{treatment.startDate}}</h2>
            <h2>Fecha de fin: {{treatment.endDate}}</h2>

            <div v-if="treatment.medication && treatment.medication.length">
              <h4>Medicación:</h4>
              <div v-for="(medication, index) in treatment.medication" :key="index">
                <p>Nombre: {{ medication.name }}</p>
                <p>Dosis: {{ medication.dosage }}</p>
                <p>Indicaciones: {{ medication.indications }}</p>
              </div>
            </div>
            <div v-else>
              <h4>No hay medicación para este tratamiento</h4>
            </div>
              
            
            <Button @click="visible = true">Añadir medicamento</Button>
            <Dialog v-model:visible="visible" modal header="Añadir medicación" :style="{ width: '60rem' }">
              <span class="text-surface-500 dark:text-surface-400 block mb-8">Añade información de tu medicación.</span>
              <div class="flex items-center gap-4 mb-4">
                  <label for="name" class="font-semibold w-24">Nombre</label>
                  <InputText id="name" class="flex-auto" autocomplete="off" v-model="newMedication.name" />
              </div>
              <div class="flex items-center gap-4 mb-8">
                  <label for="dosage" class="font-semibold w-24">Dosis</label>
                  <InputText id="dosage" class="flex-auto" autocomplete="off" v-model="newMedication.dosage" />
              </div>
              <div class="flex items-center gap-4 mb-4">
                  <label for="indications" class="font-semibold w-24">Indicaciones</label>
                  <InputText id="indications" class="flex-auto" autocomplete="off" v-model="newMedication.indications"/>
              </div>
              <div class="flex justify-end gap-2">
                  <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                  <Button type="button" label="Guardar" @click="visible = false; addMedicationToTreatment(treatment.id)"></Button>
              </div>
            </Dialog>
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