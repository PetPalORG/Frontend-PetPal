<script>
export default {
  name: 'app-medical-history-treatments',
  props: {
    treatments: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="main">
      <div class="card-container" v-for="treatment in treatments">
        <pv-card class="card">
          <template #title>Tratamiento: {{treatment.title}}</template>
          <template #content>
            <h2>Duración: {{treatment.startDate}}</h2>
            <h2>Medicamento: {{treatment.medicine}}</h2>
            <h2>Dosis: {{treatment.dose}}</h2>
            <h2>Indicaciones: {{treatment.indications}}</h2>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  justify-content: center;
}

.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
  width: 90%; /* Adjust this value to control the width of the card container */
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

</style>