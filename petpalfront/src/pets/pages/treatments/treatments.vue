<script>
import TreatmentsComponent from "@/pets/components/treatments/treatment.component.vue";
import {Treatment} from "@/pets/models/treatment.entity.js";
import {PetService} from "@/pets/services/pet.service.js";
import AppSidebar from "@/pets/shared/components/sidebar.component.vue";
import ActionToolbarComponent from "@/pets/shared/components/action-toolbar.component.vue";

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
      return treatments.map(treatment => new Treatment(treatment.id, treatment.petID, treatment.title, treatment.startDate, treatment.duration, treatment.medicine, treatment.dose, treatment.indications));
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

