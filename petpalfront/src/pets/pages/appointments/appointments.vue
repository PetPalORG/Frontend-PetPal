<script>
import AppointmentComponent from "@/pets/components/appointments/appointment.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import {Appointment} from "@/pets/models/appointment.entity.js";
import AppSidebar from "@/pets/shared/components/sidebar.component.vue";
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";

export default {
  name: "appointment",
  components: {ActionToolbarComponent, AppSidebar, AppointmentComponent},
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
      <appointment-component :appointments="appointments"></appointment-component>
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