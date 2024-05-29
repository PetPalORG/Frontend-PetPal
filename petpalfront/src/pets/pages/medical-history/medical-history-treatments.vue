<script>
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";
import AppSidebar from "@/pets/shared/components/sidebar.component.vue";
import MedicalHistoryTreatmentsComponent from "@/pets/components/medical-history/medical-history-treatments.component.vue";
import MedicalHistoryToolbarComponent from "@/pets/components/medical-history/medical-history-toolbar.component.vue";
import {PetService} from "@/pets/services/pet.service.js";
import {Treatment} from "@/pets/models/treatment.entity.js";
export default {
  name: 'app-medical-history',
  components: {
    ActionToolbarComponent, AppSidebar, MedicalHistoryTreatmentsComponent, MedicalHistoryToolbarComponent},
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
      return treatments.map(treatment => new Treatment(treatment.petID, treatment.id, treatment.title, treatment.startDate, treatment.duration, treatment.medicine, treatment.dose, treatment.indications));
    },
    getTreatments() {
      this.newApi.getTreatments()
          .then(response => {
            let treatments_json = response.data;
            this.treatments = this.buildTreatmentListFromResponseData(treatments_json);
            console.log(response.data);
            console.log(this.treatments);
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
        <medical-history-treatments-component :treatments="treatments"></medical-history-treatments-component>
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

