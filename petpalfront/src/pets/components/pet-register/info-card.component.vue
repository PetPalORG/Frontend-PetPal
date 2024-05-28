<script>
import {Pet} from '@/pets/models/pet.entity.js';
export default {
  name: 'AppCard',
  props: {
    pet: Pet
  }
};
</script>



<template>
  <div class="columna1">
    <div class="image">
      <img :src="pet.imagen" alt="imagen de la mascota" width="400px" height="365px">
    </div>
    <div class="columna2">
      <div class="columna3">
        <pv-card class="p-card">
          <template #title>Nombre</template>
          <template #content>
            <p class="m-0">{{ pet.nombre }}</p>
          </template>
        </pv-card>
        <pv-card class="p-card">
          <template #title>Especie</template>
          <template #content>
            <p class="m-0">{{ pet.especie }}</p>
          </template>
        </pv-card>
        <pv-card class="p-card">
          <template #title>Edad</template>
          <template #content>
            <p class="m-0">{{ pet.edad }}</p>
          </template>
        </pv-card>
      </div>
      <div class="columna4">
        <pv-card class="p-card">
          <template #title>Raza</template>
          <template #content>
            <p class="m-0">{{ pet.raza }}</p>
          </template>
        </pv-card>
        <pv-card class="p-card">
          <template #title>Peso</template>
          <template #content>
            <p class="m-0">{{ pet.peso }}</p>
          </template>
        </pv-card>
        <pv-card class="p-card">
          <template #title>Comida Favorita</template>
          <template #content>
            <p class="m-0">{{ pet.comidaFavorita }}</p>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
  <div class="description">
    <pv-card class="p-card-description">
      <template #title>Descripción</template>
      <template #content>
        <p class="m-0">{{ pet.descripcion }}</p>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
.image {
  margin-top: 20px;
}

.columna1{
  display: flex;
}
.columna2{
  display: grid;
}
.columna3{
  display:flex;
}
.columna4{
  display:flex;
}
.p-card {
  margin: 20px;
  width: 150px;
}

.p-card-description{
  width: 87%;
  margin-left: -6px;

}

@media (max-width: 768px) {
  .columna1,.columna2,.columna3,.columna4 {
    flex-direction: column;
  }
  .p-card {
    width: 90%;
  }
  .description{
    margin-left: 30px;
    width: 500px;
  }
}

</style>
