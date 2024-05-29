<script>
export default {
  name: 'medical-history-appointments',
  props: {
    appointments: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="main">
      <div class="card-container" v-for="appointment in appointments">
        <div class="time">
          <h1 class="date">Día: {{appointment.date}}</h1>
          <h1 class="hour">Hora: {{appointment.hour}}</h1>
        </div>
        <pv-card class="card">
          <template #title>Cita veterinaria</template>
          <template #content>
            <h2>Veterinaria: {{appointment.vet}}</h2>
            <h2>Propósito: {{appointment.reason}}</h2>
            <h2>Detalles </h2>
            <ul>
              <li v-for="detail in appointment.details">{{detail}}</li>
            </ul>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>


button:hover {
  transform: scale(1.05);
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
  height: auto;
  width: auto;
  overflow: auto;
  background-color: #D9D9D9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


/* Ajuste el diseño para pantallas pequeñas */
@media (max-width: 768px) {
  .main {
    margin-left: 0;
  }
  .card-container {
    flex-direction: column;
    gap: 20px; /* Reducir el espacio entre tarjetas */
  }
  .card {
    height: auto; /* Ajustar la altura de las tarjetas */
    width: 100%; /* Hacer las tarjetas responsivas */
  }
}



</style>
