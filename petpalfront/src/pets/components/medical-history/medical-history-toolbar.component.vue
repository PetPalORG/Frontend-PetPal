<script>

import { ref, computed } from "vue";
import { useRouter } from 'vue-router';
export default {
  name: "app-medicalHistoryToolbar",
  setup() {
    const router = useRouter();

    const items = computed(() => {
      return [
        {
          label: 'Citas',
          icon: 'pi pi-calendar',
          path: `/pet/${router.currentRoute.value.params.id}/medical-history/appointments`,
          command: () => {
            router.push(`/pet/${router.currentRoute.value.params.id}/medical-history/appointments`);
          }
        },
        {
          label: 'Tratamientos',
          icon: 'pi pi-heart-fill',
          path: `/pet/${router.currentRoute.value.params.id}/medical-history/treatments`,
          command: () => {
            router.push(`/pet/${router.currentRoute.value.params.id}/medical-history/treatments`);
          }
        }
      ]
    });

    return {items};
  }
}

</script>
<template>
  <div class="card">
    <pv-tabMenu :model="items"/>

  </div>
</template>

<style>
@media (max-width: 768px) {
  .card {
    width: 100%;
  }
}

</style>
