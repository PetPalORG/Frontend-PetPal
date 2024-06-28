<script>
import TreatmentsComponent from "@/pets/components/treatments/treatment.component.vue";
import {Treatment} from "@/pets/models/treatment.entity.js";
import {PetService} from "@/pets/services/pet.service.js";
import AppSidebar from "@/pets/shared/components/sidebar.component.vue";
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";
import { Medication } from "@/pets/models/medication.entity";

export default {
  name: 'treatments',
  components: {ActionToolbarComponent, AppSidebar, TreatmentsComponent},
  data() {
    return {
      treatments: [],
      newApi: new PetService()
    }
  },
  created() {
    this.getTreatments();
  },
  methods: {
      buildTreatmentListFromResponseData(treatments) {
        return treatments.map(treatment => new Treatment(treatment.id, treatment.appointmentId, treatment.diagnosis, treatment.startDate, treatment.endDate));
      },
      async getTreatments() {
        const petId = this.$route.params.id;
        try {
          const appointments = await this.newApi.getAppointmentsByPetIdToArray(petId);
            if (!Array.isArray(appointments)) {
              console.error('Expected an array for appointments, received:', appointments);
              return;
            }
            let allTreatments = [];
            for (let appointment of appointments) {
              const appointmentId = appointment.id;
              const response = await this.newApi.getTreatmentsByAppointmentId(appointmentId);
              let treatments_json = response.data;
              let treatmentsForAppointment = this.buildTreatmentListFromResponseData(treatments_json);
              for (let treatment of treatmentsForAppointment) {
                const treatmentId = treatment.id;
                console.log('Obteniendo medicación para el tratamiento con ID:', treatmentId);
                try {
                  const medicationResponse = await this.newApi.getMedicationByTreatmentId(treatmentId);
                  console.log('Medicación obtenida:', medicationResponse);
                  let medicationForTreatment = medicationResponse;
                  treatment.medication = medicationForTreatment; // Asignar la medicación directamente al tratamiento
                  console.log('Medicación para el tratamiento con ID:', treatmentId, treatment.medication);
                } catch (error) {
                  console.error('Error al obtener medicación para el tratamiento con ID:', treatmentId, error);
                }
              }
              allTreatments = allTreatments.concat(treatmentsForAppointment);
            }
            this.treatments = allTreatments;
        } catch (error) {
          console.error(error);
        }
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
      <treatments-component :treatments="treatments"></treatments-component>
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

