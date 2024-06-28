<script>
import {PetService} from "@/pets/services/pet.service.js";
import { Appointment } from "@/pets/models/appointment.entity";
import { Treatment } from "@/pets/models/treatment.entity";
import { v4 as uuidv4 } from 'uuid';
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default {
  name: 'app-appointment',
  components: {
    Button, Dialog, InputText
  },
  props: {
    appointments: Array
  },
  data() {
    return {
      showForm: false,
      newAppointment: new Appointment(),
      newTreatment: new Treatment(),
      petService: new PetService(),
      visibleTreatment: false,
      visibleAppointment: false
    }
  },
  methods: {
    async fetchAppointments() {
      const petId = this.$route.params.id;
      const response = await this.petService.getAppointmentsByPetId(petId);
      this.appointments = response.data;
    },
    async addAppointment() {
      try {
        this.newAppointment.petId = this.$route.params.id;
        const response = await this.petService.saveAppointments(this.newAppointment);
        console.log(response.data);
        this.showForm = false;
        await this.fetchAppointments();
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
    async addTreatmentToAppointment(appointmentId) {
      try {
        this.newTreatment.appointmentId = appointmentId;
        const response = await this.petService.saveTreatment(this.newTreatment);
        console.log(response.data);
        this.showForm = false;
        await this.fetchTreatments();
        this.$forceUpdate();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAppointment(appointmentId) {
      try {
        const response = await this.petService.deleteAppointment(appointmentId);
        if (!(response instanceof Error)) {
          console.log(response);
          await this.fetchAppointments();
          this.$forceUpdate();
        } else {
          console.error('Failed to delete appointment:', response.message);
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
        <h1>Citas veterinarias</h1>
        <div class="title-button">
          <h1>Agregar cita</h1>
          <pv-button class="add" @click="visibleAppointment = true">+</pv-button>
        </div>
        <Dialog v-model:visible="visibleAppointment" modal header="Añadir tratamiento" :style="{ width: '60rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Añade información de tu cita veterinaria.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="vet" class="font-semibold w-24">Veterinaria</label>
                <InputText id="vet" class="flex-auto" autocomplete="off" v-model="newAppointment.vet" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="reason" class="font-semibold w-24">Propósito</label>
                <InputText id="reason" class="flex-auto" autocomplete="off" v-model="newAppointment.reason" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="detail" class="font-semibold w-24">Detalle</label>
                <InputText id="detail" class="flex-auto" autocomplete="off" v-model="newAppointment.detail"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="date" class="font-semibold w-24">Fecha</label>
                <InputText id="date" class="flex-auto" autocomplete="off" v-model="newAppointment.date"/>
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="hour" class="font-semibold w-24">Hora</label>
                <InputText id="hour" class="flex-auto" autocomplete="off" v-model="newAppointment.hour"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Guardar" @click="visibleAppointment = false; addAppointment()"></Button>
            </div>
        </Dialog>
        </div>
      <div class="card-container" v-for="appointment in appointments">
        <div class="time">
          <h1 class="date">Día: {{appointment.date}}</h1>
          <h1 class="hour">Hora: {{appointment.hour}}</h1>
        </div>
        <pv-card class="card">
          <template #title>Cita veterinaria</template>
          <template #content>
            <h3>Veterinaria: {{appointment.vet}}</h3>
            <h3>Propósito: {{appointment.reason}}</h3>
            <h3>Detalle: {{appointment.detail}}</h3>
            <Button @click="visibleTreatment = true">Añadir tratamiento</Button>
            <Dialog v-model:visible="visibleTreatment" modal header="Añadir tratamiento" :style="{ width: '60rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Añade información de tu tratamiento.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="diagnosis" class="font-semibold w-24">Diagnosis</label>
                <InputText id="diagnosis" class="flex-auto" autocomplete="off" v-model="newTreatment.diagnosis" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="startDate" class="font-semibold w-24">Fecha de inicio</label>
                <InputText id="startDate" class="flex-auto" autocomplete="off" v-model="newTreatment.startDate" />
            </div>
            <div class="flex items-center gap-4 mb-4">
                <label for="endDate" class="font-semibold w-24">Fecha de fin</label>
                <InputText id="endDate" class="flex-auto" autocomplete="off" v-model="newTreatment.endDate"/>
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                <Button type="button" label="Guardar" @click="visibleTreatment = false; addTreatmentToAppointment(appointment.id)"></Button>
            </div>
        </Dialog>
          </template>
          <template #footer>
            <pv-button class="delete-button" @click="deleteAppointment(appointment.id)">Eliminar</pv-button>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

.titles {
  display: flex;
  gap: 25vh;
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

.time {
  margin-top: 40px;
}

.card-container {
  display: flex;
  margin-top: 40px;
  gap: 20vh;
}

.card-container .hour {
  margin-top: 100px;
}

.card {
  height: auto; /* Cambia la altura a auto para que la tarjeta se expanda automáticamente */
  overflow: auto; /* Asegura que el texto se mantenga dentro de la tarjeta */
  width: auto;
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

button:hover {
  transform: scale(1.05);
}

/* Estilos para pantallas pequeñas */
@media (max-width: 767px) {
  .main {
    margin-left: 0; /* Elimina el margen izquierdo para pantallas pequeñas */
  }

  .titles {
    flex-direction: column; /* Cambia la dirección del flexbox a columna para pantallas pequeñas */
    gap: 20px; /* Reduce el espacio entre los elementos del título */
  }

  .card-container {
    flex-direction: column; /* Cambia la dirección del flexbox a columna para pantallas pequeñas */
  }

  .card {
    width: 100%; /* Hace que las tarjetas ocupen todo el ancho disponible */
  }

  .delete-button {
    margin-left: 0; /* Ajusta la posición del botón de eliminar */
    margin-top: 10px; /* Ajusta el margen superior del botón de eliminar */
  }

}

</style>
