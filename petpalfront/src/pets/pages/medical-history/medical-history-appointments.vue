<script>
import MedicalHistoryAppointmentsComponent from "@/pets/components/medical-history/medical-history-appointments.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import {Appointment} from "@/pets/models/appointment.entity.js";
import AppSidebar from "@/pets/shared/components/sidebar.component.vue";
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";
import MedicalHistoryToolbarComponent from "@/pets/components/medical-history/medical-history-toolbar.component.vue";
export default {
  name: 'app-medical-history-appointments',
  components: {ActionToolbarComponent, AppSidebar, MedicalHistoryAppointmentsComponent, MedicalHistoryToolbarComponent},
  data() {
    return {
      appointments: [],
      newApi: new PetService()
    }
  },
  created() {
    this.getAppointments();
  },
  methods: {
    buildAppointmentListFromResponseData(appointments) {
      return appointments.map(appointment => new Appointment(appointment.petID, appointment.id, appointment.vet, appointment.reason, appointment.details, appointment.date, appointment.hour));
    },
    getAppointments() {
      this.newApi.getAppointments()
          .then(response => {
            let appointments_json = response.data;
            this.appointments = this.buildAppointmentListFromResponseData(appointments_json);
            console.log(response.data);
            console.log(this.appointments);
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
        <action-toolbar-component></action-toolbar-component>
      </div>
      <div class="medical-toolbar">
        <medical-history-toolbar-component></medical-history-toolbar-component>
      </div>
      <div class="cards">
        <medical-history-appointments-component :appointments="appointments"></medical-history-appointments-component>
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

.medical-toolbar {
  width: 50%;
  margin: auto;
}
</style>