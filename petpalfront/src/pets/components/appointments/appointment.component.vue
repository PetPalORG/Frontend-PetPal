<script>
import {PetService} from "@/pets/services/pet.service.js";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'app-appointment',
  props: {
    appointments: Array
  },
  data() {
    return {
      showForm: false,
      newAppointment: {
        vet: '',
        reason: '',
        details: [''],
        date: '',
        hour: ''
      },
      petService: new PetService()
    }
  },
  methods: {
    addDetailField() {
      this.newAppointment.details.push('');
    },
    async fetchAppointments() {
      const response = await this.petService.getAppointments();
      this.appointments = response.data;
    },
    async addAppointment() {
      try {
        this.newAppointment.id = uuidv4();
        this.newAppointment.petID = this.$route.params.petID;
        const response = await this.petService.saveAppointments(this.newAppointment);
        console.log(response.data);
        this.showForm = false;
        await this.fetchAppointments();
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
          <pv-button class="add" @click="showForm = true">+</pv-button>
        </div>
          <div v-if="showForm" class="modal">
            <div class="modal-content">
              <input v-model="newAppointment.vet" placeholder="Veterinaria">
              <input v-model="newAppointment.reason" placeholder="Razón">
              <div v-for="(detail, index) in newAppointment.details" :key="index">
                <input v-model="newAppointment.details[index]" placeholder="Detail">
                <pv-button @click="addDetailField">+</pv-button>
              </div>
              <input v-model="newAppointment.date" placeholder="Fecha">
              <input v-model="newAppointment.hour" placeholder="Hora">
              <pv-button @click="addAppointment" >Save</pv-button>
            </div>
          </div>
        </div>
      <div class="card-container" v-for="appointment in appointments">
        <div class="time">
          <h1 class="date">Día: {{appointment.date}}</h1>
          <h1 class="hour">Hora: {{appointment.hour}}</h1>
        </div>
        <pv-card class="card">
          <template #title>Cita veterinaria</template>
          <template #subtitle>
            <h3>Veterinaria: {{appointment.vet}}</h3>
            <h3>Propósito: {{appointment.reason}}</h3>
            <h3>Propósito: {{appointment.reason}}</h3>
            <h3>Detalles</h3>
          </template>
          <template #content>
            <ul>
              <li v-for="detail in appointment.details">{{detail}}</li>
            </ul>
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
